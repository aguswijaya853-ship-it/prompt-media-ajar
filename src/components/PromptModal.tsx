import React, { useState, useMemo, useRef } from 'react';
import {
  MediaCategory,
  EducationLevel,
  TargetAI,
  PromptFormData,
  SavedPrompt,
  AppTheme,
} from '../types';
import { generateEducationalPrompt } from '../utils/promptGenerator';
import {
  EDUCATION_LEVELS,
  COMMON_SUBJECTS,
  PANCASILA_DIMENSIONS,
} from '../data/mediaTypes';
import {
  PHASE_CLASS_MAPPINGS,
  CURRICULUM_DATABASE,
  AI_MODELS_LIST,
  LEVEL_SUBJECTS_MAPPING,
  ALL_LKPD_TYPES,
  LKPD_PICTURE_ACTIVITIES,
  LKPD_EXERCISES,
  LKPD_PAGE_PRESETS,
  LKPD_QUESTION_PRESETS,
  ILLUSTRATION_STYLES,
  MODUL_DETAILED_COMPONENTS,
  MODUL_TIME_ALLOCATIONS_BY_LEVEL,
} from '../data/curriculumData';
import { APP_THEMES } from '../data/themes';
import { LkpdWorkbookView } from './LkpdWorkbookView';
import { exportToWordDoc, exportToImage, exportToPdf } from '../utils/exportUtils';
import {
  X,
  Copy,
  Check,
  Star,
  ExternalLink,
  Download,
  Sparkles,
  Sliders,
  Eye,
  Loader2,
  RefreshCw,
  BookOpen,
  FileSpreadsheet,
  CheckCircle2,
  Layers,
  Image as ImageIcon,
  Palette,
  CheckSquare,
  Wand2,
  Cpu,
  FileText,
  Lock,
  Unlock,
  Clock,
  Hash,
  Minus,
  Plus,
  Search,
} from 'lucide-react';

interface PromptModalProps {
  category: MediaCategory;
  onClose: () => void;
  onSaveFavorite: (saved: SavedPrompt) => void;
  isFavorited: boolean;
  currentTheme?: AppTheme;
  defaultAI?: TargetAI;
  defaultLevel?: EducationLevel;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  category,
  onClose,
  onSaveFavorite,
  isFavorited: initialFavorited,
  currentTheme = 'forest-green',
  defaultAI = 'dola',
  defaultLevel = 'SD_FASE_B',
}) => {
  const theme = APP_THEMES[currentTheme] || APP_THEMES['forest-green'];
  const isPresentasi = category.id === 'presentasi';
  const isModul = category.id === 'modul';
  const isLkpd = category.id === 'lkpd';

  const [educationLevel, setEducationLevel] = useState<EducationLevel>(defaultLevel);
  const [gradeClass, setGradeClass] = useState<string>(
    PHASE_CLASS_MAPPINGS[defaultLevel]?.defaultClass || 'Kelas 4 SD'
  );
  const [subject, setSubject] = useState<string>(
    LEVEL_SUBJECTS_MAPPING[defaultLevel]?.[0] || category.subjectDefault
  );
  const [topic, setTopic] = useState<string>(category.defaultTopic);
  const [topicInputMode, setTopicInputMode] = useState<'auto' | 'manual'>('auto');

  // Requirement 3: In PPT/Canva menu, AI Sasaran starts locked/defaulted to 'canva',
  // while still allowing the user to unlock or directly choose any other AI.
  const [targetAI, setTargetAI] = useState<TargetAI>(
    isPresentasi ? 'canva' : defaultAI
  );
  const [isCanvaLocked, setIsCanvaLocked] = useState<boolean>(isPresentasi);

  const [learningObjectives, setLearningObjectives] = useState<string>('');
  const [pancasilaDimensions, setPancasilaDimensions] = useState<string[]>([
    'Bernalar Kritis',
    'Kreatif',
    'Bergotong Royong',
  ]);
  const [differentiation, setDifferentiation] = useState<boolean>(true);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // AI-Assisted topic generation
  const [aiGeneratedTopics, setAiGeneratedTopics] = useState<string[]>([]);
  const [isGeneratingTopics, setIsGeneratingTopics] = useState<boolean>(false);
  const [aiTopicError, setAiTopicError] = useState<string>('');

  // LKPD specific configurations (Type, Page Count, Question Count, Picture Activities, Exercises, 28 Art Styles)
  const [lkpdType, setLkpdType] = useState<string>('LKPD Eksperimen');
  const [lkpdPageCount, setLkpdPageCount] = useState<number>(2);
  const [lkpdQuestionCount, setLkpdQuestionCount] = useState<number>(10);
  const [selectedPictureActivities, setSelectedPictureActivities] = useState<string[]>([
    'Mengamati gambar',
    'Mengisi jawaban',
    'Memberi label pada gambar',
  ]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([
    'Pilihan Ganda',
    'Isian Singkat',
  ]);
  const [illustrationStyle, setIllustrationStyle] = useState<string>('Kartun Edukatif');
  const [styleSearchQuery, setStyleSearchQuery] = useState<string>('');
  const [lkpdPromptMode, setLkpdPromptMode] = useState<'filled' | 'raw'>('filled');

  // Modul Ajar specific configurations (Detailed Components Checklist & Custom Time Allocation)
  const [selectedModulComponents, setSelectedModulComponents] = useState<string[]>(
    MODUL_DETAILED_COMPONENTS
  );
  const [customTimeAllocation, setCustomTimeAllocation] = useState<string>('');

  // Search filter per quickQuestion field (helpful when browsing 26–36 options)
  const [fieldSearchMap, setFieldSearchMap] = useState<Record<string, string>>({});

  // Category specific answers
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    category.quickQuestions.forEach((q) => {
      if (q.defaultValue) {
        initial[q.field] = q.defaultValue;
      }
    });
    if (category.id === 'modul') {
      const levelAlloc = MODUL_TIME_ALLOCATIONS_BY_LEVEL[defaultLevel];
      if (levelAlloc) {
        initial.meetingCount = levelAlloc.defaultAllocation;
      }
    }
    return initial;
  });

  // Open on 'form' so all customization controls are immediately accessible
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'workbook' | 'test'>('form');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(initialFavorited);
  const [actionNotice, setActionNotice] = useState<string>('');

  // Gemini Live Testing state & AI model selection in Test Tab
  const [selectedTestAI, setSelectedTestAI] = useState<TargetAI>(
    isPresentasi ? 'canva' : 'gemini'
  );
  const [testResult, setTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testError, setTestError] = useState<string>('');

  // Export states
  const [exportingType, setExportingType] = useState<'word' | 'image' | 'pdf' | null>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  const aiResultRef = useRef<HTMLDivElement>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3000);
  };

  // Handle AI Sasaran selection (supports Canva lock/pin in PPT/Canva while allowing any other AI)
  const handleSelectTargetAI = (nextAI: TargetAI) => {
    setTargetAI(nextAI);
    if (isPresentasi) {
      setIsCanvaLocked(nextAI === 'canva');
    }
  };

  const toggleCanvaLock = () => {
    if (!isPresentasi) return;
    if (isCanvaLocked) {
      setIsCanvaLocked(false);
    } else {
      setTargetAI('canva');
      setIsCanvaLocked(true);
    }
  };

  // Available subjects for the current level
  const availableSubjects = useMemo(() => {
    return LEVEL_SUBJECTS_MAPPING[educationLevel] || COMMON_SUBJECTS;
  }, [educationLevel]);

  // Filtered LKPD illustration styles
  const filteredIllustrationStyles = useMemo(() => {
    const q = styleSearchQuery.trim().toLowerCase();
    if (!q) return ILLUSTRATION_STYLES;
    return ILLUSTRATION_STYLES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.badge.toLowerCase().includes(q)
    );
  }, [styleSearchQuery]);

  // Automated curriculum topics based on selected Phase and Subject
  const suggestedTopics = useMemo(() => {
    const topicsForLevel = CURRICULUM_DATABASE[educationLevel];
    if (topicsForLevel) {
      const directMatch = topicsForLevel[subject];
      if (directMatch && directMatch.length > 0) return directMatch;

      for (const key of Object.keys(topicsForLevel)) {
        if (
          key.toLowerCase().includes(subject.toLowerCase()) ||
          subject.toLowerCase().includes(key.toLowerCase())
        ) {
          return topicsForLevel[key];
        }
      }
    }
    return [
      'Siklus Air dan Pengaruhnya bagi Bumi',
      'Operasi Hitung Pecahan Campuran',
      'Harmoni dalam Ekosistem & Rantai Makanan',
      'Teks Prosedur & Eksperimen Sains',
      'Kearifan Lokal Nusantara & P5',
      'Gaya dan Energi di Sekitar Kita',
    ];
  }, [educationLevel, subject]);

  // Handle phase change and auto-select appropriate class, subject, and Modul Ajar time allocation
  const handleLevelChange = (lvl: EducationLevel) => {
    setEducationLevel(lvl);
    const mapping = PHASE_CLASS_MAPPINGS[lvl];
    if (mapping) {
      setGradeClass(mapping.defaultClass);
    }
    const defaultSub = LEVEL_SUBJECTS_MAPPING[lvl]?.[0];
    if (defaultSub) {
      setSubject(defaultSub);
    }
    if (isModul) {
      const allocConfig = MODUL_TIME_ALLOCATIONS_BY_LEVEL[lvl];
      if (allocConfig) {
        setCustomAnswers((prev) => ({
          ...prev,
          meetingCount: allocConfig.defaultAllocation,
        }));
        setCustomTimeAllocation('');
      }
    }
    setAiGeneratedTopics([]);
  };

  // Generate topics using Server-Side Gemini AI
  const handleGenerateTopicsWithAI = async () => {
    setIsGeneratingTopics(true);
    setAiTopicError('');
    try {
      const prompt = `Berikan daftar 6 topik / materi ajar Kurikulum Merdeka yang paling menarik, penting, dan aplikatif untuk siswa ${gradeClass} (${educationLevel}) pada mata pelajaran "${subject}".
Format jawaban WAJIB HANYA berupa JSON string array tanpa tanda kutip markdown, contoh persis:
["Topik 1: Contoh", "Topik 2: Contoh", "Topik 3: Contoh", "Topik 4: Contoh", "Topik 5: Contoh", "Topik 6: Contoh"]`;

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      let text = (data.text || '').trim();
      text = text.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();

      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAiGeneratedTopics(parsed);
          return;
        }
      } catch {}

      const lines = text
        .split('\n')
        .map((l: string) => l.replace(/^[-*0-9.)"'\s]+/, '').replace(/["',]+$/, '').trim())
        .filter((l: string) => l.length > 3);

      if (lines.length > 0) {
        setAiGeneratedTopics(lines.slice(0, 6));
      } else {
        setAiGeneratedTopics([
          `Eksplorasi Konseptual ${subject}`,
          `Penyelidikan Lapangan & Praktik ${subject}`,
          `Studi Kasus Kontekstual ${subject}`,
          `Aktivitas Kolaborasi & Pemecahan Masalah ${subject}`,
        ]);
      }
    } catch (err: any) {
      console.warn('AI topic generation fallback:', err);
      setAiGeneratedTopics([
        `Eksplorasi Konseptual & Dasar ${subject}`,
        `Penyelidikan Lapangan & Praktik Nyata ${subject}`,
        `Studi Kasus Kontekstual & Kehidupan Sehari-hari ${subject}`,
        `Aktivitas Kolaborasi & Misi Kelompok ${subject}`,
        `Pemecahan Masalah Kritis & Tantangan HOTS ${subject}`,
        `Projek Kreatif & Refleksi Pembelajaran ${subject}`,
      ]);
    } finally {
      setIsGeneratingTopics(false);
    }
  };

  // Toggle picture activity
  const togglePictureActivity = (act: string) => {
    if (selectedPictureActivities.includes(act)) {
      if (selectedPictureActivities.length > 1) {
        setSelectedPictureActivities(selectedPictureActivities.filter((a) => a !== act));
      }
    } else {
      setSelectedPictureActivities([...selectedPictureActivities, act]);
    }
  };

  // Toggle exercise
  const toggleExercise = (ex: string) => {
    if (selectedExercises.includes(ex)) {
      if (selectedExercises.length > 1) {
        setSelectedExercises(selectedExercises.filter((e) => e !== ex));
      }
    } else {
      setSelectedExercises([...selectedExercises, ex]);
    }
  };

  // Toggle Modul Ajar detailed component
  const toggleModulComponent = (comp: string) => {
    if (selectedModulComponents.includes(comp)) {
      if (selectedModulComponents.length > 1) {
        setSelectedModulComponents(selectedModulComponents.filter((c) => c !== comp));
      }
    } else {
      setSelectedModulComponents([...selectedModulComponents, comp]);
    }
  };

  // Toggle multi-pills in customAnswers
  const toggleMultiPillAnswer = (field: string, option: string, defaultVal?: string) => {
    const raw = customAnswers[field] || defaultVal || '';
    const currentList = raw
      .split(' • ')
      .map((s) => s.trim())
      .filter(Boolean);

    let nextList: string[];
    if (currentList.includes(option)) {
      nextList = currentList.length > 1 ? currentList.filter((item) => item !== option) : currentList;
    } else {
      nextList = [...currentList, option];
    }
    setCustomAnswers({
      ...customAnswers,
      [field]: nextList.join(' • '),
    });
  };

  // Build the live prompt
  const generatedPrompt = useMemo(() => {
    const effectiveAnswers = { ...customAnswers };
    if (isModul && customTimeAllocation.trim()) {
      effectiveAnswers.meetingCount = customTimeAllocation.trim();
    }

    const formData: PromptFormData = {
      categoryId: category.id,
      educationLevel,
      gradeLevel: gradeClass,
      subject,
      topic: topic.trim() || category.defaultTopic,
      targetAI,
      learningObjectives,
      pancasilaDimensions,
      differentiation,
      additionalNotes,
      lkpdType,
      lkpdPageCount,
      lkpdQuestionCount,
      pictureActivities: selectedPictureActivities,
      includeExercises: selectedExercises,
      illustrationStyle,
      modulComponentsList: isModul ? selectedModulComponents : undefined,
    };
    return generateEducationalPrompt(
      category,
      formData,
      effectiveAnswers,
      isLkpd && lkpdPromptMode === 'raw'
    );
  }, [
    category,
    educationLevel,
    gradeClass,
    subject,
    topic,
    targetAI,
    learningObjectives,
    pancasilaDimensions,
    differentiation,
    additionalNotes,
    customAnswers,
    customTimeAllocation,
    lkpdType,
    lkpdPageCount,
    lkpdQuestionCount,
    selectedPictureActivities,
    selectedExercises,
    illustrationStyle,
    selectedModulComponents,
    lkpdPromptMode,
    isModul,
    isLkpd,
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const item: SavedPrompt = {
      id: 'saved-' + Date.now(),
      categoryId: category.id,
      categoryTitle: category.title,
      topic: topic || category.defaultTopic,
      subject,
      educationLevel: `${gradeClass} (${educationLevel})`,
      targetAI,
      promptText: generatedPrompt,
      createdAt: Date.now(),
    };
    onSaveFavorite(item);
    setIsSaved(true);
    showNotice('Prompt disimpan ke daftar Favorit.');
  };

  const handleDownload = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Prompt-${category.id}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setShowDownloadMenu(false);
  };

  const handleDownloadWordResult = () => {
    try {
      setExportingType('word');
      const content = testResult || generatedPrompt;
      const docTitle = `${isLkpd ? 'LKPD' : category.title} - ${topic || category.defaultTopic}`;
      exportToWordDoc(
        `${isLkpd ? 'LKPD' : category.title}-${topic || category.defaultTopic}-${gradeClass}`,
        content,
        {
          title: docTitle,
          topic: topic || category.defaultTopic,
          subject,
          gradeClass,
          categoryTitle: category.title,
          targetAI: selectedTestAI,
        }
      );
    } catch (e) {
      console.error(e);
      showNotice('Gagal mengekspor dokumen Word.');
    } finally {
      setExportingType(null);
      setShowDownloadMenu(false);
    }
  };

  const handleDownloadImageResult = async () => {
    const targetElement =
      aiResultRef.current ||
      document.getElementById('lkpd-workbook-sheet') ||
      document.getElementById('ai-test-result-container');
    if (!targetElement) {
      showNotice('Buka tab Workbook A4 atau Uji Langsung AI terlebih dahulu untuk mengunduh foto.');
      return;
    }
    try {
      setExportingType('image');
      await exportToImage(
        targetElement,
        `${isLkpd ? 'LKPD' : category.title}-${topic || category.defaultTopic}-${gradeClass}`,
        'png'
      );
    } catch (e) {
      console.error(e);
      showNotice('Gagal mengekspor foto gambar.');
    } finally {
      setExportingType(null);
      setShowDownloadMenu(false);
    }
  };

  const handleDownloadPdfResult = async () => {
    const targetElement =
      aiResultRef.current ||
      document.getElementById('lkpd-workbook-sheet') ||
      document.getElementById('ai-test-result-container');
    if (!targetElement) {
      window.print();
      return;
    }
    try {
      setExportingType('pdf');
      await exportToPdf(
        targetElement,
        `${isLkpd ? 'LKPD' : category.title}-${topic || category.defaultTopic}-${gradeClass}`
      );
    } catch (e) {
      console.error(e);
      showNotice('Gagal mengekspor dokumen PDF.');
    } finally {
      setExportingType(null);
      setShowDownloadMenu(false);
    }
  };

  const getAIUrl = (ai: TargetAI, promptText: string) => {
    const encodedPrompt = encodeURIComponent(promptText);
    switch (ai) {
      case 'dola':
        return `https://dola.com/`;
      case 'chatgpt':
        return `https://chatgpt.com/?q=${encodedPrompt}`;
      case 'gemini':
        return `https://gemini.google.com/app`;
      case 'claude':
        return `https://claude.ai/new`;
      case 'canva':
        return `https://www.canva.com/`;
      case 'deepseek':
        return `https://chat.deepseek.com/`;
      case 'copilot':
        return `https://copilot.microsoft.com/`;
      case 'perplexity':
        return `https://www.perplexity.ai/search?q=${encodedPrompt}`;
      case 'quizizz':
        return `https://quizizz.com/`;
      case 'gamma':
        return `https://gamma.app/`;
      case 'poe':
        return `https://poe.com/`;
      default:
        return `https://dola.com/`;
    }
  };

  const handleOpenExternalAI = (ai?: TargetAI) => {
    const chosen = ai || targetAI;
    const url = getAIUrl(chosen, generatedPrompt);
    navigator.clipboard.writeText(generatedPrompt);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  const togglePancasila = (dim: string) => {
    if (pancasilaDimensions.includes(dim)) {
      setPancasilaDimensions(pancasilaDimensions.filter((d) => d !== dim));
    } else {
      setPancasilaDimensions([...pancasilaDimensions, dim]);
    }
  };

  // Live Preview via server-side Gemini API with dynamic AI model selection
  const runLiveTestWithGemini = async (aiToTest?: TargetAI) => {
    const modelTarget = aiToTest || selectedTestAI;
    setIsTesting(true);
    setTestError('');
    setTestResult('');

    let specificInstruction =
      'Kamu adalah konsultan Kurikulum Merdeka dan pembuat media ajar edukatif interaktif Indonesia.';
    if (modelTarget === 'dola') {
      specificInstruction =
        'Kamu adalah Dola AI (dola.com), asisten cerdas guru yang sangat komunikatif, ramah, to-the-point, dan menyajikan solusi praktis siap dieksekusi di ruang kelas Kurikulum Merdeka.';
    } else if (modelTarget === 'claude') {
      specificInstruction =
        'Kamu adalah Claude 3.7 (Anthropic), asisten instruksional dengan bahasa Indonesia yang sangat tertata rapi, komprehensif, kaya penjelasan pedagogis, dan memiliki alur bertahap yang mendalam.';
    } else if (modelTarget === 'deepseek') {
      specificInstruction =
        'Kamu adalah DeepSeek AI, asisten spesialis penalaran logis, analitis, sistematis, berlandaskan kaidah sains & logika yang kuat, serta terstruktur rapi.';
    } else if (modelTarget === 'chatgpt') {
      specificInstruction =
        'Kamu adalah ChatGPT (OpenAI GPT-4o), asisten pendidikan interaktif yang menyajikan contoh kontekstual, analogi cerdas, serta format siap pakai untuk guru.';
    } else if (modelTarget === 'canva') {
      specificInstruction =
        'Kamu adalah Canva Magic & Code Designer, buatkan struktur tata letak teks, kata kunci rekomendasi elemen ilustrasi Canva, palet warna HEX, dan panduan visual siap tempel ke Canva Slides/Docs.';
    } else if (modelTarget === 'quizizz') {
      specificInstruction =
        'Kamu adalah Quizizz AI, rancang paket soal kuis interaktif gamifikasi lengkap dengan alokasi waktu detik, poin skor, opsi pilihan jawaban, dan kunci penjelasan.';
    }

    try {
      const response = await fetch('/api/gemini/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt:
            generatedPrompt +
            `\n\n[SIMULASI RESPON MODEL ${modelTarget.toUpperCase()}]\nTolong eksekusi prompt di atas dan buatkan hasil karya media ajar konkretnya sekarang.`,
          systemInstruction: specificInstruction,
        }),
      });

      if (!response.ok) {
        const fallbackRes = await fetch('/api/gemini/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt:
              generatedPrompt +
              `\n\n[SIMULASI RESPON MODEL ${modelTarget.toUpperCase()}]\nTolong eksekusi prompt di atas dan buatkan hasil karya media ajar konkretnya sekarang.`,
            systemInstruction: specificInstruction,
          }),
        });

        if (!fallbackRes.ok) {
          const errData = await fallbackRes.json().catch(() => ({}));
          throw new Error(errData.error || `Server error (${response.status})`);
        }

        const data = await fallbackRes.json();
        setTestResult(data.text || '');
        setIsTesting(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Streaming response body tidak dapat dibaca.');
      }

      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;

          const dataStr = trimmed.replace(/^data:\s*/, '');
          if (dataStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) {
              accumulatedText += parsed.text;
              setTestResult(accumulatedText);
            }
            if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch (e: any) {
            if (e.message && e.message !== 'Unexpected token') {
              console.warn('SSE parse error:', e);
            }
          }
        }
      }

      if (!accumulatedText) {
        setTestResult('Hasil pratinjau media ajar siap pakai berhasil dibuat.');
      }
    } catch (err: any) {
      console.warn('Live test error caught, switching to fallback preview:', err);
      let cleanMsg = '';
      const rawMsg = err?.message || '';

      if (
        rawMsg.includes('429') ||
        rawMsg.includes('quota') ||
        rawMsg.includes('RESOURCE_EXHAUSTED')
      ) {
        cleanMsg =
          'Batas kuota API Gemini tercapai (429 Rate Limit). Sistem menampilkan simulasi media ajar interaktif langsung agar Anda tetap dapat mengajar tanpa hambatan.';
      } else {
        try {
          const parsed = JSON.parse(rawMsg);
          cleanMsg = parsed.error?.message || parsed.message || rawMsg;
        } catch {
          cleanMsg = rawMsg;
        }
      }

      setTestError(cleanMsg);

      setTestResult((prev) => {
        if (prev && prev.length > 50) return prev;
        return `**[SIMULASI RESPON AI - MEDIA AJAR KURIKULUM MERDEKA]**\n\n### Media Ajar: ${category.title}\n- **Mata Pelajaran**: ${subject}\n- **Topik / Materi**: ${topic || category.defaultTopic}\n- **Jenjang & Kelas**: ${gradeClass} (${educationLevel})\n- **Model AI Terpilih**: ${AI_MODELS_LIST.find((m) => m.id === modelTarget)?.name || 'AI'}\n\n### Tujuan Pembelajaran Konkret\n1. Siswa mampu memahami dan mengidentifikasi konsep esensial materi "${topic || category.defaultTopic}" melalui aktivitas visual terpadu.\n2. Siswa menunjukkan Profil Pelajar Pancasila (Bernalar Kritis & Gotong Royong) dalam diskusi terbimbing.\n\n### Langkah Pelaksanaan di Kelas\n1. **Apersepsi**: Guru menampilkan gambar stimulus kontekstual dan mengajukan pertanyaan pemantik.\n2. **Eksplorasi Mandiri**: Siswa mengerjakan lembar aktivitas bergambar berpasangan.\n3. **Refleksi & Asesmen**: Diskusi kelas dan penguatan konsep dari guru.`;
      });
    } finally {
      setIsTesting(false);
    }
  };

  const activeTimeAllocConfig = MODUL_TIME_ALLOCATIONS_BY_LEVEL[educationLevel];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div
          className={`bg-gradient-to-r ${theme.headerGradient} text-white p-4 sm:px-6 flex items-center justify-between shadow-sm`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-white/90 font-semibold">
                <span>Generator Prompt &amp; Media Ajar</span>
                <span aria-hidden="true">·</span>
                <span>Kurikulum Merdeka</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                {category.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              title="Simpan ke Favorit"
              className={`p-2 rounded-full border transition ${
                isSaved
                  ? 'bg-amber-400 text-amber-950 border-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Segmented Controls */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl text-xs font-bold text-slate-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ${
                activeTab === 'form' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Detail Kelas &amp; Materi</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 tabular-nums ${
                activeTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Hasil Prompt ({generatedPrompt.length} char)</span>
            </button>

            {/* Dedicated Workbook A4 Tab */}
            <button
              onClick={() => setActiveTab('workbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ${
                activeTab === 'workbook'
                  ? 'bg-slate-900 text-white shadow-xs font-extrabold'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>
                Workbook A4{isLkpd ? ` (${lkpdPageCount} Hal · ${lkpdQuestionCount} Soal)` : ''}
              </span>
            </button>

            {/* Uji Langsung AI Tab */}
            <button
              onClick={() => {
                setActiveTab('test');
                if (!testResult && !isTesting) {
                  runLiveTestWithGemini();
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ${
                activeTab === 'test'
                  ? 'text-white shadow-xs font-black'
                  : 'hover:text-slate-900'
              }`}
              style={{ backgroundColor: activeTab === 'test' ? theme.primaryHex : undefined }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Uji Langsung AI</span>
            </button>
          </div>

          {/* Quick Target AI Selector (In PPT/Canva: Locked/Defaulted to Canva, yet freely switchable to other AIs) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 flex-wrap">
            {isPresentasi && (
              <button
                type="button"
                onClick={toggleCanvaLock}
                title={
                  isCanvaLocked
                    ? 'Terkunci otomatis di Canva sebagai bawaan PPT/Canva. Klik atau pilih langsung dari daftar untuk beralih ke AI lain.'
                    : 'Klik untuk mengunci kembali ke Canva Magic & Code'
                }
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition whitespace-nowrap ${
                  isCanvaLocked && targetAI === 'canva'
                    ? 'bg-sky-100 text-sky-900 border-sky-300'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isCanvaLocked && targetAI === 'canva' ? (
                  <>
                    <Lock className="w-3 h-3 text-sky-700" />
                    <span>Default: Canva</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3 h-3 text-slate-500" />
                    <span>Kunci ke Canva</span>
                  </>
                )}
              </button>
            )}
            <span className="hidden sm:inline">AI Sasaran:</span>
            <select
              value={targetAI}
              onChange={(e) => handleSelectTargetAI(e.target.value as TargetAI)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-extrabold focus:outline-hidden focus:ring-2 focus:ring-slate-400 shadow-2xs"
            >
              {AI_MODELS_LIST.map((ai) => (
                <option key={ai.id} value={ai.id}>
                  {ai.name} ({ai.badge})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Inline Notice Banner */}
        {actionNotice && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs font-bold text-emerald-800 flex items-center justify-between">
            <span>{actionNotice}</span>
            <button
              type="button"
              onClick={() => setActionNotice('')}
              className="text-emerald-700 hover:text-emerald-950 font-black"
            >
              ×
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-5">
          {/* TAB 1: FORM CUSTOMIZATION */}
          {activeTab === 'form' && (
            <div className="space-y-5">
              {/* Card 1: Profil Jenjang & Pemilihan Kelas Otomatis */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                    <BookOpen className="w-4 h-4" style={{ color: theme.primaryHex }} />
                    <span>1. Jenjang Pendidikan &amp; Fase Belajar</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    {PHASE_CLASS_MAPPINGS[educationLevel]?.phaseName}
                  </span>
                </div>

                {/* 8 Jenjang / Fase Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {EDUCATION_LEVELS.map((lvl) => {
                    const isSelected = educationLevel === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => handleLevelChange(lvl.id as EducationLevel)}
                        className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-slate-50 font-bold shadow-2xs'
                            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                        }`}
                        style={
                          isSelected
                            ? {
                                borderColor: theme.primaryHex,
                                borderWidth: '2px',
                                color: theme.primaryHex,
                              }
                            : undefined
                        }
                      >
                        <span className="text-xs font-bold leading-tight">{lvl.label}</span>
                        <span className="text-[10px] text-slate-500 mt-1">{lvl.desc}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Pemilihan Kelas Otomatis untuk Fase Terpilih */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: theme.primaryHex }} />
                      <span>
                        Pilihan Kelas untuk {PHASE_CLASS_MAPPINGS[educationLevel]?.phaseName}:
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">
                      Terpilih: <strong className="font-extrabold">{gradeClass}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {PHASE_CLASS_MAPPINGS[educationLevel]?.classes.map((cls) => {
                      const isCurrent = gradeClass === cls;
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setGradeClass(cls)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                            isCurrent
                              ? 'text-white shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                          style={
                            isCurrent
                              ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex }
                              : undefined
                          }
                        >
                          {isCurrent && <Check className="w-3 h-3 text-white" />}
                          <span>{cls}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mata Pelajaran Otomatis & Manual */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <span>Mata Pelajaran:</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          (Pilih otomatis atau ketik manual)
                        </span>
                      </label>
                      <span className="text-[11px] font-bold" style={{ color: theme.primaryHex }}>
                        Aktif: {subject}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {availableSubjects.map((sub) => {
                        const isSelected = subject === sub;
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => {
                              setSubject(sub);
                              setAiGeneratedTopics([]);
                            }}
                            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition ${
                              isSelected
                                ? 'text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                            }`}
                            style={
                              isSelected
                                ? {
                                    backgroundColor: theme.primaryHex,
                                    borderColor: theme.primaryHex,
                                  }
                                : undefined
                            }
                          >
                            {isSelected ? '✓ ' : ''}
                            {sub}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      list="subject-list"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Atau ketik nama mata pelajaran kustom..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-medium focus:outline-hidden"
                    />
                    <datalist id="subject-list">
                      {COMMON_SUBJECTS.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>

                  {/* Materi Pembelajaran + Tombol Munculkan dengan AI */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                      <label className="text-xs font-bold text-slate-700">
                        Materi / Topik Pembelajaran:
                      </label>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleGenerateTopicsWithAI}
                          disabled={isGeneratingTopics}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition active:scale-95 disabled:opacity-50"
                        >
                          {isGeneratingTopics ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                          )}
                          <span>
                            {isGeneratingTopics
                              ? 'Menyusun Materi...'
                              : 'Munculkan Materi dengan AI'}
                          </span>
                        </button>

                        <div className="flex items-center gap-1 text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setTopicInputMode('auto')}
                            className={`px-2 py-0.5 rounded ${
                              topicInputMode === 'auto'
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Otomatis
                          </button>
                          <button
                            type="button"
                            onClick={() => setTopicInputMode('manual')}
                            className={`px-2 py-0.5 rounded ${
                              topicInputMode === 'manual'
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Manual
                          </button>
                        </div>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Ketik topik materi secara bebas di sini..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-medium focus:outline-hidden"
                    />

                    {aiGeneratedTopics.length > 0 && (
                      <div className="mt-2.5 p-3 rounded-xl bg-purple-50/80 border border-purple-200/90 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-purple-950 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span>Topik Rekomendasi AI Generatif ({subject}):</span>
                          </span>
                          <span className="text-[10px] text-purple-700 font-semibold">
                            Klik untuk memilih
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {aiGeneratedTopics.map((aiTopic) => {
                            const isChosen = topic === aiTopic;
                            return (
                              <button
                                key={aiTopic}
                                type="button"
                                onClick={() => setTopic(aiTopic)}
                                className={`text-xs px-2.5 py-1 rounded-lg border text-left transition flex items-center gap-1 ${
                                  isChosen
                                    ? 'bg-purple-600 text-white font-bold border-purple-600 shadow-xs'
                                    : 'bg-white hover:bg-purple-100 text-purple-900 border-purple-200'
                                }`}
                              >
                                {isChosen ? '✓ ' : '+ '}
                                <span>{aiTopic}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {aiTopicError && (
                      <p className="text-xs text-rose-600 mt-1">{aiTopicError}</p>
                    )}

                    <div className="mt-2.5">
                      <span className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1 mb-1.5">
                        <BookOpen className="w-3 h-3" style={{ color: theme.primaryHex }} />
                        <span>Materi Acuan Kurikulum Merdeka ({gradeClass}):</span>
                      </span>

                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1.5 bg-slate-50 rounded-xl border border-slate-200">
                        {suggestedTopics.map((item) => {
                          const isChosen = topic === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setTopic(item)}
                              className={`text-xs px-2.5 py-1 rounded-lg border text-left transition flex items-center gap-1 ${
                                isChosen
                                  ? 'text-white font-bold shadow-2xs'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                              style={
                                isChosen
                                  ? {
                                      backgroundColor: theme.primaryHex,
                                      borderColor: theme.primaryHex,
                                    }
                                  : undefined
                              }
                            >
                              {isChosen ? '✓ ' : '+ '}
                              <span>{item}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2A: Pengaturan LKPD Lengkap (Jumlah Halaman, Jumlah Soal, Bentuk, Aktivitas & 28 Gaya Seni Ilustrasi) */}
              {isLkpd && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                      <Layers className="w-4 h-4" style={{ color: theme.primaryHex }} />
                      <span>
                        2. Spesifikasi Bentuk LKPD, Jumlah Halaman, Jumlah Soal &amp; Gaya Ilustrasi
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-600 tabular-nums">
                      Format A4 · {lkpdPageCount} Halaman · {lkpdQuestionCount} Soal
                    </span>
                  </div>

                  {/* NEW FEATURE 1: Jumlah Halaman LKPD & Jumlah Soal LKPD */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/90 p-4 rounded-2xl border border-slate-200">
                    {/* Jumlah Halaman LKPD */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Jumlah Halaman LKPD (A4):</span>
                        </label>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setLkpdPageCount(Math.max(1, lkpdPageCount - 1))}
                            disabled={lkpdPageCount <= 1}
                            className="p-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40"
                            title="Kurangi halaman"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={15}
                            value={lkpdPageCount}
                            onChange={(e) =>
                              setLkpdPageCount(Math.max(1, Math.min(15, Number(e.target.value) || 1)))
                            }
                            className="w-14 text-center bg-white border border-slate-300 rounded-lg py-0.5 text-xs font-black text-slate-900 tabular-nums focus:outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => setLkpdPageCount(Math.min(15, lkpdPageCount + 1))}
                            disabled={lkpdPageCount >= 15}
                            className="p-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40"
                            title="Tambah halaman"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {LKPD_PAGE_PRESETS.map((p) => {
                          const active = lkpdPageCount === p.count;
                          return (
                            <button
                              key={p.count}
                              type="button"
                              onClick={() => setLkpdPageCount(p.count)}
                              className={`p-2 rounded-xl border text-left transition ${
                                active
                                  ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-2xs'
                                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="text-xs font-extrabold tabular-nums">
                                {p.count} Hal
                              </div>
                              <div
                                className={`text-[10px] truncate ${
                                  active ? 'text-emerald-100' : 'text-slate-400'
                                }`}
                              >
                                {p.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Jumlah Soal LKPD */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5 text-amber-600" />
                          <span>Jumlah Butir Soal LKPD:</span>
                        </label>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setLkpdQuestionCount(Math.max(1, lkpdQuestionCount - 1))}
                            disabled={lkpdQuestionCount <= 1}
                            className="p-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40"
                            title="Kurangi soal"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={50}
                            value={lkpdQuestionCount}
                            onChange={(e) =>
                              setLkpdQuestionCount(
                                Math.max(1, Math.min(50, Number(e.target.value) || 1))
                              )
                            }
                            className="w-14 text-center bg-white border border-slate-300 rounded-lg py-0.5 text-xs font-black text-slate-900 tabular-nums focus:outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => setLkpdQuestionCount(Math.min(50, lkpdQuestionCount + 1))}
                            disabled={lkpdQuestionCount >= 50}
                            className="p-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40"
                            title="Tambah soal"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {LKPD_QUESTION_PRESETS.map((q) => {
                          const active = lkpdQuestionCount === q.count;
                          return (
                            <button
                              key={q.count}
                              type="button"
                              onClick={() => setLkpdQuestionCount(q.count)}
                              className={`p-2 rounded-xl border text-left transition ${
                                active
                                  ? 'bg-amber-500 text-white border-amber-500 font-bold shadow-2xs'
                                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="text-xs font-extrabold tabular-nums">
                                {q.label}
                              </div>
                              <div
                                className={`text-[10px] truncate ${
                                  active ? 'text-amber-50' : 'text-slate-400'
                                }`}
                              >
                                {q.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 22 Pilihan Jenis / Bentuk LKPD */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pilih Jenis / Bentuk LKPD:
                    </label>
                    <select
                      value={lkpdType}
                      onChange={(e) => setLkpdType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-bold text-slate-800 focus:outline-hidden"
                    >
                      {ALL_LKPD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Kegiatan Bergambar */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" style={{ color: theme.primaryHex }} />
                      <span>
                        Pilihan Kegiatan Bergambar ({selectedPictureActivities.length} terpilih):
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {LKPD_PICTURE_ACTIVITIES.map((act) => {
                        const isChecked = selectedPictureActivities.includes(act);
                        return (
                          <button
                            key={act}
                            type="button"
                            onClick={() => togglePictureActivity(act)}
                            className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                              isChecked
                                ? 'text-white font-bold shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                            style={
                              isChecked
                                ? {
                                    backgroundColor: theme.primaryHex,
                                    borderColor: theme.primaryHex,
                                  }
                                : undefined
                            }
                          >
                            {isChecked ? '✓ ' : '+ '}
                            {act}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Latihan Tambahan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-sky-600" />
                      <span>Format Butir Soal Latihan ({selectedExercises.length} terpilih):</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {LKPD_EXERCISES.map((ex) => {
                        const isChecked = selectedExercises.includes(ex);
                        return (
                          <button
                            key={ex}
                            type="button"
                            onClick={() => toggleExercise(ex)}
                            className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                              isChecked
                                ? 'bg-sky-600 text-white font-bold border-sky-600 shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {isChecked ? '✓ ' : '+ '}
                            {ex}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* NEW FEATURE 2: 28 Gaya Seni Ilustrasi LKPD */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-purple-600" />
                        <span>
                          Gaya Seni Ilustrasi LKPD ({ILLUSTRATION_STYLES.length} Pilihan Gaya Seni):
                        </span>
                      </label>

                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={styleSearchQuery}
                          onChange={(e) => setStyleSearchQuery(e.target.value)}
                          placeholder="Cari gaya seni (misal: Anime, Cat Air)..."
                          className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Quick Select Dropdown synced with Grid */}
                    <select
                      value={illustrationStyle}
                      onChange={(e) => setIllustrationStyle(e.target.value)}
                      className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2 text-xs font-bold text-purple-950 focus:outline-hidden"
                    >
                      {ILLUSTRATION_STYLES.map((style) => (
                        <option key={style.id} value={style.name}>
                          {style.name} — {style.badge} ({style.desc})
                        </option>
                      ))}
                    </select>

                    {/* Visual Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1">
                      {filteredIllustrationStyles.map((style) => {
                        const isSelected = illustrationStyle === style.name;
                        return (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => setIllustrationStyle(style.name)}
                            className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                              isSelected
                                ? 'border-purple-600 bg-purple-50/90 text-purple-950 ring-2 ring-purple-500/20 shadow-2xs'
                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span
                                  className={`w-3 h-3 rounded-full bg-gradient-to-br ${style.previewColor} shrink-0`}
                                />
                                <span className="text-[10px] font-semibold text-purple-700 truncate">
                                  {style.badge}
                                </span>
                              </div>
                              <div className="text-xs font-extrabold leading-snug">
                                {style.name}
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                              {style.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2B: Spesifikasi Kategori Lainnya (Presentasi, Modul Ajar, Infografis, Cetak, Literasi, dll.) */}
              {!isLkpd && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                      <Sliders className="w-4 h-4" style={{ color: theme.primaryHex }} />
                      <span>2. Spesifikasi Khusus {category.categoryName}</span>
                    </div>
                  </div>

                  {/* REQUIREMENT 3: Dedicated AI Sasaran Control inside PPT/Canva Menu */}
                  {isPresentasi && (
                    <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-3.5 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-extrabold text-sky-950 flex items-center gap-1.5">
                            {isCanvaLocked && targetAI === 'canva' ? (
                              <Lock className="w-3.5 h-3.5 text-sky-700" />
                            ) : (
                              <Unlock className="w-3.5 h-3.5 text-slate-600" />
                            )}
                            <span>
                              AI Sasaran Presentasi:{' '}
                              <span className="text-sky-700">
                                {AI_MODELS_LIST.find((m) => m.id === targetAI)?.name}
                              </span>
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            Otomatis terkunci di <strong>Canva Magic &amp; Code</strong> saat
                            membuka menu PPT/Canva, namun Anda tetap bebas memilih AI lainnya di
                            bawah ini:
                          </p>
                        </div>

                        {targetAI !== 'canva' && (
                          <button
                            type="button"
                            onClick={() => {
                              setTargetAI('canva');
                              setIsCanvaLocked(true);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shrink-0 transition"
                          >
                            <Lock className="w-3 h-3" />
                            <span>Kunci Kembali ke Canva</span>
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {AI_MODELS_LIST.map((ai) => {
                          const active = targetAI === ai.id;
                          return (
                            <button
                              key={ai.id}
                              type="button"
                              onClick={() => handleSelectTargetAI(ai.id)}
                              className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition flex items-center gap-1.5 ${
                                active
                                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                                  : 'bg-white hover:bg-sky-100/70 text-slate-700 border-slate-200'
                              }`}
                            >
                              {ai.id === 'canva' && <Lock className="w-3 h-3" />}
                              <span>{ai.name}</span>
                              {ai.id === 'canva' && (
                                <span
                                  className={`text-[10px] ${
                                    active ? 'text-sky-100' : 'text-sky-600'
                                  }`}
                                >
                                  (Utama)
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Dynamic Category Questions */}
                  <div className="space-y-4">
                    {category.quickQuestions.map((q) => {
                      // REQUIREMENT 5C: Special Level & Phase-aware Alokasi Waktu for Modul Ajar
                      if (isModul && q.field === 'meetingCount' && activeTimeAllocConfig) {
                        const selectedAlloc =
                          customAnswers.meetingCount || activeTimeAllocConfig.defaultAllocation;
                        return (
                          <div
                            key={q.field}
                            className="bg-purple-50/60 rounded-2xl p-3.5 border border-purple-200 space-y-2.5"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <label className="text-xs font-extrabold text-purple-950 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-purple-700" />
                                <span>
                                  Alokasi Waktu Sesuai Jenjang &amp; Fase ({gradeClass}):
                                </span>
                              </label>
                              <span className="text-[11px] font-bold text-purple-700">
                                {activeTimeAllocConfig.jpLabel}
                              </span>
                            </div>

                            <select
                              value={selectedAlloc}
                              onChange={(e) => {
                                setCustomAnswers({
                                  ...customAnswers,
                                  meetingCount: e.target.value,
                                });
                                setCustomTimeAllocation('');
                              }}
                              className="w-full bg-white border border-purple-300 rounded-xl px-3.5 py-2 text-sm font-bold text-slate-800 focus:outline-hidden"
                            >
                              {activeTimeAllocConfig.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>

                            {/* Quick Chips for Phase Time Allocations */}
                            <div className="flex flex-wrap gap-1.5">
                              {activeTimeAllocConfig.options.map((opt) => {
                                const isChosen =
                                  !customTimeAllocation.trim() && selectedAlloc === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => {
                                      setCustomAnswers({
                                        ...customAnswers,
                                        meetingCount: opt,
                                      });
                                      setCustomTimeAllocation('');
                                    }}
                                    className={`text-xs px-2.5 py-1 rounded-lg border transition text-left ${
                                      isChosen
                                        ? 'bg-purple-600 text-white font-bold border-purple-600'
                                        : 'bg-white hover:bg-purple-100 text-slate-700 border-purple-200'
                                    }`}
                                  >
                                    {isChosen ? '✓ ' : ''}
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Optional Custom JP Input */}
                            <div className="pt-1">
                              <input
                                type="text"
                                value={customTimeAllocation}
                                onChange={(e) => setCustomTimeAllocation(e.target.value)}
                                placeholder={`Atau ketik alokasi waktu khusus (contoh: 2 Pertemuan @ 3 JP x ${activeTimeAllocConfig.minutesPerJp} Menit)...`}
                                className="w-full bg-white border border-purple-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-hidden"
                              />
                            </div>
                          </div>
                        );
                      }

                      const optionsList = q.options || [];
                      const isLargeSelect = q.type === 'select' && optionsList.length >= 12;
                      const searchVal = (fieldSearchMap[q.field] || '').toLowerCase();
                      const filteredOpts = searchVal
                        ? optionsList.filter((o) => o.toLowerCase().includes(searchVal))
                        : optionsList;

                      return (
                        <div key={q.field} className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <label className="block text-xs font-bold text-slate-700">
                              {q.label}:
                            </label>

                            {isLargeSelect && (
                              <div className="relative w-full sm:w-64">
                                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                  type="text"
                                  value={fieldSearchMap[q.field] || ''}
                                  onChange={(e) =>
                                    setFieldSearchMap({
                                      ...fieldSearchMap,
                                      [q.field]: e.target.value,
                                    })
                                  }
                                  placeholder={`Cari dari ${optionsList.length} pilihan...`}
                                  className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
                                />
                              </div>
                            )}
                          </div>

                          {q.type === 'select' && q.options && (
                            <>
                              <select
                                value={customAnswers[q.field] || q.defaultValue || ''}
                                onChange={(e) =>
                                  setCustomAnswers({
                                    ...customAnswers,
                                    [q.field]: e.target.value,
                                  })
                                }
                                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-800 focus:outline-hidden"
                              >
                                {q.options.map((opt, idx) => (
                                  <option key={opt} value={opt}>
                                    {idx + 1}. {opt}
                                  </option>
                                ))}
                              </select>

                              {/* Interactive Quick Grid for Rich Option Lists (30+ Presentation Styles, 26 Teaching Models, 30 Genres, Infografis, Cetak) */}
                              {isLargeSelect && (
                                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                                  {filteredOpts.map((opt) => {
                                    const active =
                                      (customAnswers[q.field] || q.defaultValue) === opt;
                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() =>
                                          setCustomAnswers({
                                            ...customAnswers,
                                            [q.field]: opt,
                                          })
                                        }
                                        className={`text-xs px-2.5 py-1 rounded-lg border text-left transition ${
                                          active
                                            ? 'text-white font-bold shadow-2xs'
                                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                                        }`}
                                        style={
                                          active
                                            ? {
                                                backgroundColor: theme.primaryHex,
                                                borderColor: theme.primaryHex,
                                              }
                                            : undefined
                                        }
                                      >
                                        {active ? '✓ ' : ''}
                                        {opt}
                                      </button>
                                    );
                                  })}
                                  {filteredOpts.length === 0 && (
                                    <span className="text-xs text-slate-400 px-2 py-1">
                                      Tidak ada pilihan yang cocok dengan pencarian.
                                    </span>
                                  )}
                                </div>
                              )}
                            </>
                          )}

                          {q.type === 'pills' && q.options && (
                            <div className="flex flex-wrap gap-1.5">
                              {q.options.map((opt) => {
                                const isSelected = customAnswers[q.field] === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() =>
                                      setCustomAnswers({ ...customAnswers, [q.field]: opt })
                                    }
                                    className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                                      isSelected
                                        ? 'text-white font-bold shadow-xs'
                                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                    }`}
                                    style={
                                      isSelected
                                        ? {
                                            backgroundColor: theme.primaryHex,
                                            borderColor: theme.primaryHex,
                                          }
                                        : undefined
                                    }
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {q.type === 'multi-pills' && q.options && (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[11px] text-slate-500">
                                <span>Klik untuk memilih satu atau beberapa fitur sekaligus:</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setCustomAnswers({
                                        ...customAnswers,
                                        [q.field]: q.options!.join(' • '),
                                      })
                                    }
                                    className="font-bold hover:underline"
                                    style={{ color: theme.primaryHex }}
                                  >
                                    Pilih Semua ({q.options.length})
                                  </button>
                                  <span>·</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setCustomAnswers({
                                        ...customAnswers,
                                        [q.field]: q.defaultValue || q.options![0],
                                      })
                                    }
                                    className="text-slate-500 hover:text-slate-800 font-semibold"
                                  >
                                    Reset
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {q.options.map((opt) => {
                                  const activeItems = (
                                    customAnswers[q.field] ||
                                    q.defaultValue ||
                                    ''
                                  )
                                    .split(' • ')
                                    .map((s) => s.trim());
                                  const isSelected = activeItems.includes(opt);
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() =>
                                        toggleMultiPillAnswer(q.field, opt, q.defaultValue)
                                      }
                                      className={`text-xs px-3 py-1.5 rounded-xl border transition text-left ${
                                        isSelected
                                          ? 'text-white font-bold shadow-xs'
                                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                      }`}
                                      style={
                                        isSelected
                                          ? {
                                              backgroundColor: theme.primaryHex,
                                              borderColor: theme.primaryHex,
                                            }
                                          : undefined
                                      }
                                    >
                                      {isSelected ? '✓ ' : '+ '}
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* REQUIREMENT 5B: Detailed Modul Ajar Components Checklist */}
                  {isModul && (
                    <div className="pt-3 border-t border-slate-200 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                          <CheckSquare className="w-4 h-4 text-purple-600" />
                          <span>
                            Rincian Komponen Modul Ajar yang Dihasilkan (
                            {selectedModulComponents.length} dari{' '}
                            {MODUL_DETAILED_COMPONENTS.length} Komponen):
                          </span>
                        </label>

                        <div className="flex items-center gap-2 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedModulComponents([...MODUL_DETAILED_COMPONENTS])
                            }
                            className="text-purple-700 hover:underline"
                          >
                            Pilih Semua Lengkap ({MODUL_DETAILED_COMPONENTS.length})
                          </button>
                          <span className="text-slate-300">·</span>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedModulComponents([
                                MODUL_DETAILED_COMPONENTS[0],
                                MODUL_DETAILED_COMPONENTS[7],
                                MODUL_DETAILED_COMPONENTS[11],
                                MODUL_DETAILED_COMPONENTS[14],
                                MODUL_DETAILED_COMPONENTS[15],
                              ])
                            }
                            className="text-slate-600 hover:text-slate-900"
                          >
                            Mode Inti Ringkas (5)
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-60 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                        {MODUL_DETAILED_COMPONENTS.map((comp) => {
                          const checked = selectedModulComponents.includes(comp);
                          return (
                            <button
                              key={comp}
                              type="button"
                              onClick={() => toggleModulComponent(comp)}
                              className={`p-2 rounded-lg border text-left text-xs transition flex items-start gap-2 ${
                                checked
                                  ? 'bg-purple-50 border-purple-300 text-purple-950 font-bold'
                                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                                  checked
                                    ? 'bg-purple-600 text-white'
                                    : 'border border-slate-300 bg-white'
                                }`}
                              >
                                {checked ? '✓' : ''}
                              </span>
                              <span className="leading-snug">{comp}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Card 3: Profil Pelajar Pancasila & Pembelajaran Berdiferensiasi */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>3. Profil Pelajar Pancasila &amp; Pembelajaran Berdiferensiasi</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Pilih Dimensi Profil Pelajar Pancasila:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PANCASILA_DIMENSIONS.map((dim) => {
                      const active = pancasilaDimensions.includes(dim);
                      return (
                        <button
                          key={dim}
                          type="button"
                          onClick={() => togglePancasila(dim)}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${
                            active
                              ? 'bg-purple-100 text-purple-900 border-purple-300 font-bold'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}
                          {dim}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Aktifkan Pendekatan Pembelajaran Berdiferensiasi
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Menyesuaikan materi untuk 3 kelompok kesiapan belajar (bimbingan, reguler,
                      pengayaan).
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={differentiation}
                    onChange={(e) => setDifferentiation(e.target.checked)}
                    className="w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Catatan Tambahan Guru (Opsional):
                  </label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Contoh: Gunakan contoh dari kehidupan sehari-hari siswa, tambahkan kunci jawaban..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROMPT PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles
                    className="w-4 h-4 text-emerald-600 shrink-0"
                    style={{ color: theme.primaryHex }}
                  />
                  <span>
                    Prompt tersusun otomatis untuk model{' '}
                    <strong>{targetAI.toUpperCase()}</strong> dengan spesifikasi{' '}
                    <strong>{gradeClass}</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('form')}
                  className="shrink-0 hover:underline font-bold ml-2"
                  style={{ color: theme.primaryHex }}
                >
                  Ubah Parameter &gt;
                </button>
              </div>

              {isLkpd && (
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                    <span>
                      Prompt Desainer LKPD A4 ({lkpdPageCount} Halaman · {lkpdQuestionCount} Soal ·{' '}
                      {illustrationStyle})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-emerald-200 text-xs font-bold self-start sm:self-auto shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setLkpdPromptMode('filled')}
                      className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
                        lkpdPromptMode === 'filled'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Versi Terisi (Siap Pakai)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLkpdPromptMode('raw')}
                      className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
                        lkpdPromptMode === 'raw'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3 h-3" />
                      <span>Template Mentah</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="relative bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed shadow-inner overflow-x-auto border border-slate-800">
                <pre className="whitespace-pre-wrap font-sans">{generatedPrompt}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: DEDICATED WORKBOOK A4 VIEW */}
          {activeTab === 'workbook' && (
            <div className="space-y-4">
              <LkpdWorkbookView
                topic={topic || category.defaultTopic}
                subject={subject}
                educationLevel={educationLevel}
                gradeClass={gradeClass}
                lkpdType={lkpdType}
                lkpdPageCount={lkpdPageCount}
                lkpdQuestionCount={lkpdQuestionCount}
                pictureActivities={selectedPictureActivities}
                includeExercises={selectedExercises}
                illustrationStyle={illustrationStyle}
                onPageCountChange={setLkpdPageCount}
                onQuestionCountChange={setLkpdQuestionCount}
                onStyleChange={setIllustrationStyle}
                onTypeChange={setLkpdType}
              />
            </div>
          )}

          {/* TAB 4: LIVE TEST WITH DYNAMIC AI MODEL SELECTION */}
          {activeTab === 'test' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-600" />
                      <span>Pilih AI Penguji Hasil Prompt:</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pilih model AI di bawah untuk mengeksekusi prompt dan melihat hasil nyata
                      media ajarnya.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedTestAI}
                      onChange={(e) => {
                        const newAi = e.target.value as TargetAI;
                        setSelectedTestAI(newAi);
                        runLiveTestWithGemini(newAi);
                      }}
                      className="bg-purple-50 text-purple-900 border border-purple-200 rounded-xl px-3 py-1.5 text-xs font-extrabold focus:outline-hidden focus:ring-2 focus:ring-purple-400 shadow-2xs"
                    >
                      <option value="gemini">Google Gemini 3.8 Flash</option>
                      <option value="canva">Canva Magic &amp; Code</option>
                      <option value="dola">Dola AI (dola.com)</option>
                      <option value="chatgpt">ChatGPT (GPT-4o)</option>
                      <option value="claude">Claude (Claude 3.7)</option>
                      <option value="deepseek">DeepSeek AI</option>
                      <option value="quizizz">Quizizz AI</option>
                      <option value="copilot">Microsoft Copilot</option>
                      <option value="perplexity">Perplexity AI</option>
                      <option value="gamma">Gamma App</option>
                    </select>

                    <button
                      onClick={() => runLiveTestWithGemini(selectedTestAI)}
                      disabled={isTesting}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold disabled:opacity-50 text-xs shadow-xs transition active:scale-95 whitespace-nowrap"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                      <span>{isTesting ? 'Menyusun...' : 'Uji Sekarang'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
                  {[
                    {
                      id: 'gemini',
                      label: 'Google Gemini',
                      color: 'bg-blue-50 text-blue-800 border-blue-200',
                    },
                    {
                      id: 'canva',
                      label: 'Canva Code',
                      color: 'bg-sky-50 text-sky-800 border-sky-200',
                    },
                    {
                      id: 'dola',
                      label: 'Dola AI (dola.com)',
                      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    },
                    {
                      id: 'chatgpt',
                      label: 'ChatGPT-4o',
                      color: 'bg-teal-50 text-teal-800 border-teal-200',
                    },
                    {
                      id: 'claude',
                      label: 'Claude 3.7',
                      color: 'bg-amber-50 text-amber-800 border-amber-200',
                    },
                    {
                      id: 'deepseek',
                      label: 'DeepSeek AI',
                      color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                    },
                    {
                      id: 'gamma',
                      label: 'Gamma Slide',
                      color: 'bg-violet-50 text-violet-800 border-violet-200',
                    },
                  ].map((m) => {
                    const isSelected = selectedTestAI === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          const next = m.id as TargetAI;
                          setSelectedTestAI(next);
                          runLiveTestWithGemini(next);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold transition flex items-center gap-1 ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                            : `${m.color} hover:bg-white`
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {isTesting && (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                  <p className="text-sm font-bold text-slate-800">
                    Menyusun Media Ajar dengan AI ({selectedTestAI.toUpperCase()})...
                  </p>
                  <p className="text-xs text-slate-500">
                    Menganalisis materi &ldquo;{topic}&rdquo; untuk {gradeClass}.
                  </p>
                </div>
              )}

              {testResult && !isTesting && (
                <div className="space-y-3">
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-800">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Hasil Uji Model: {selectedTestAI.toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500 tabular-nums">
                        {testResult.length} Karakter
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={handleDownloadWordResult}
                        disabled={exportingType !== null}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition active:scale-95 disabled:opacity-50"
                      >
                        {exportingType === 'word' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                        )}
                        <span>Unduh Word (.doc)</span>
                      </button>

                      <button
                        onClick={handleDownloadImageResult}
                        disabled={exportingType !== null}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold transition active:scale-95 disabled:opacity-50"
                      >
                        {exportingType === 'image' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                        ) : (
                          <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                        )}
                        <span>Unduh Foto (PNG)</span>
                      </button>

                      <button
                        onClick={handleDownloadPdfResult}
                        disabled={exportingType !== null}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold transition active:scale-95 disabled:opacity-50"
                      >
                        {exportingType === 'pdf' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                        ) : (
                          <Download className="w-3.5 h-3.5 text-rose-600" />
                        )}
                        <span>Unduh PDF</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(testResult);
                          showNotice('Hasil pengujian disalin ke clipboard.');
                        }}
                        className="text-xs text-slate-700 hover:text-slate-900 font-bold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Salin Hasil</span>
                      </button>

                      <button
                        onClick={() => handleOpenExternalAI(selectedTestAI)}
                        className="text-xs text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Buka di {selectedTestAI.toUpperCase()}</span>
                      </button>
                    </div>
                  </div>

                  <div
                    ref={aiResultRef}
                    id="ai-test-result-container"
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 text-slate-800 leading-relaxed text-sm"
                  >
                    <div className="border-b-2 border-emerald-600 pb-3">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-700 mb-1">
                        <span>Lembar Media Ajar · Kurikulum Merdeka</span>
                        <span aria-hidden="true">·</span>
                        <span>AI: {selectedTestAI.toUpperCase()}</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        {topic || category.defaultTopic}
                      </h2>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">
                        Mata Pelajaran:{' '}
                        <span className="font-bold text-emerald-700">{subject}</span> · Jenjang
                        &amp; Kelas:{' '}
                        <span className="font-bold text-slate-800">{gradeClass}</span> (
                        {educationLevel})
                      </p>
                    </div>

                    <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13.5px] text-slate-800 space-y-3 pt-2 leading-relaxed">
                      {testResult}
                    </div>
                  </div>
                </div>
              )}

              {testError && !isTesting && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800">
                  {testError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-slate-200 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                disabled={exportingType !== null}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition active:scale-95 disabled:opacity-50"
              >
                {exportingType !== null ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                <span>Unduh Media / Prompt</span>
              </button>

              {showDownloadMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-black text-slate-500 border-b border-slate-100 flex items-center justify-between">
                    <span>Pilih Format Unduhan:</span>
                    <button
                      type="button"
                      onClick={() => setShowDownloadMenu(false)}
                      className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadWordResult}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-800 rounded-xl transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Dokumen Word (.doc)</div>
                      <div className="text-[10.5px] text-slate-400 font-normal">
                        Dapat diedit di MS Word &amp; Google Docs
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdfResult}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-800 rounded-xl transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Dokumen PDF (.pdf)</div>
                      <div className="text-[10.5px] text-slate-400 font-normal">
                        Format A4 portrait rapi siap cetak
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadImageResult}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-800 rounded-xl transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Foto / Gambar (.png)</div>
                      <div className="text-[10.5px] text-slate-400 font-normal">
                        Resolusi tinggi untuk media ajar &amp; WA
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition text-left border-t border-slate-100 mt-1"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div>File Teks Mentah (.txt)</div>
                      <div className="text-[10.5px] text-slate-400 font-normal">
                        Prompt format teks untuk disalin
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSave}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition ${
                isSaved
                  ? 'border-amber-400 bg-amber-50 text-amber-900'
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isSaved ? 'Tersimpan' : 'Favorit'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Prompt</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleOpenExternalAI()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition active:scale-95"
              style={{ backgroundColor: theme.primaryHex }}
            >
              <span>Buka di {targetAI.toUpperCase()}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
