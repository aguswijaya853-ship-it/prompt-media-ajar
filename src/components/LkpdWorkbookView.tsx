import React, { useState, useRef, useEffect, useMemo } from 'react';
import { EducationLevel } from '../types';
import {
  ALL_LKPD_TYPES,
  ILLUSTRATION_STYLES,
  LKPD_PAGE_PRESETS,
  LKPD_QUESTION_PRESETS,
} from '../data/curriculumData';
import { exportToWordDoc, exportToImage, exportToPdf } from '../utils/exportUtils';
import {
  Printer,
  Copy,
  Check,
  Sparkles,
  CheckCircle2,
  Smile,
  Meh,
  Frown,
  ZoomIn,
  ZoomOut,
  Tag,
  Palette,
  Image as ImageIcon,
  CheckSquare,
  ListOrdered,
  FileText,
  Download,
  Loader2,
  BookOpen,
  Hash,
  Minus,
  Plus,
} from 'lucide-react';

interface LkpdWorkbookViewProps {
  topic: string;
  subject: string;
  educationLevel: EducationLevel;
  gradeClass: string;
  learningObjectives?: string;
  lkpdType?: string;
  lkpdPageCount?: number;
  lkpdQuestionCount?: number;
  pictureActivities?: string[];
  includeExercises?: string[];
  illustrationStyle?: string;
  onPageCountChange?: (count: number) => void;
  onQuestionCountChange?: (count: number) => void;
  onStyleChange?: (style: string) => void;
  onTypeChange?: (type: string) => void;
  onClose?: () => void;
}

interface GeneratedQuestionItem {
  number: number;
  format: string;
  stem: string;
  options?: string[];
  matchingPairs?: { left: string; right: string }[];
  isTrueFalse?: boolean;
  isShortFill?: boolean;
}

function buildContextualQuestions(
  count: number,
  topic: string,
  subject: string,
  gradeClass: string,
  exerciseTypes: string[]
): GeneratedQuestionItem[] {
  const activeFormats =
    exerciseTypes && exerciseTypes.length > 0
      ? exerciseTypes
      : ['Pilihan Ganda', 'Isian Singkat', 'Uraian Singkat / Studi Kasus'];

  const stemsPool = [
    `Perhatikan ilustrasi fenomena pada materi "${topic}"! Manakah pernyataan yang paling tepat menjelaskan konsep utamanya?`,
    `Berdasarkan pengamatan di sekitar sekolah, faktor utama yang memengaruhi proses pada "${topic}" adalah`,
    `Analisislah hubungan sebab-akibat yang terjadi apabila salah satu komponen dalam "${topic}" mengalami perubahan!`,
    `Mengapa pemahaman konsep "${topic}" dalam mata pelajaran ${subject} sangat bermanfaat bagi kehidupan sehari-hari siswa ${gradeClass}?`,
    `Amati urutan tahapan pada gambar! Urutan langkah atau proses yang benar terkait "${topic}" ditunjukkan oleh...`,
    `Seorang siswa melakukan percobaan sederhana mengenai "${topic}". Kesimpulan logis yang sesuai dengan data pengamatan tersebut adalah...`,
    `Pasangkanlah istilah penting pada materi "${topic}" berikut dengan fungsi atau contoh nyatanya secara tepat!`,
    `Tentukan apakah pernyataan mengenai karakteristik "${topic}" berikut Benar atau Salah beserta alasannya!`,
    `Jika kamu menemukan permasalahan nyata di lingkungan rumah yang berkaitan dengan "${topic}", solusi kreatif apa yang kamu usulkan?`,
    `Bandingkan persamaan dan perbedaan antara dua contoh penerapan "${topic}" yang sering kamu jumpai!`,
    `Berdasarkan infografis mini di atas, informasi kunci manakah yang mendukung pembuktian konsep "${topic}"?`,
    `Tuliskan istilah ilmiah/konsep yang tepat untuk melengkapi bagian yang ditunjuk pada skema "${topic}"`,
  ];

  const items: GeneratedQuestionItem[] = [];
  for (let i = 0; i < count; i++) {
    const num = i + 1;
    const format = activeFormats[i % activeFormats.length];
    const baseStem = stemsPool[i % stemsPool.length];

    if (format.includes('Pilihan Ganda Kompleks')) {
      items.push({
        number: num,
        format: 'PG Kompleks (Pilih >1 Jawaban Benar)',
        stem: `${baseStem} (Berilah tanda centang ✓ pada jawaban yang benar!)`,
        options: [
          `[  ] Menunjukkan ciri utama konsep ${topic} secara langsung`,
          `[  ] Berkaitan erat dengan keseimbangan proses pada ${subject}`,
          `[  ] Tidak dipengaruhi oleh kondisi lingkungan sekitar`,
          `[  ] Dapat dibuktikan melalui pengamatan sederhana di kelas`,
        ],
      });
    } else if (format.includes('Pilihan Ganda')) {
      items.push({
        number: num,
        format: 'Pilihan Ganda',
        stem: baseStem,
        options: [
          `A. Prinsip dasar dan fungsi utama dari ${topic}`,
          `B. Perubahan faktor pendukung pada pengamatan kedua`,
          `C. Hasil perbandingan karakteristik komponen secara menyeluruh`,
          `D. Dampak penerapan konsep terhadap lingkungan sekitar`,
        ],
      });
    } else if (format.includes('Benar')) {
      items.push({
        number: num,
        format: 'Benar / Salah Beralasan',
        stem: `Pernyataan: "Setiap tahapan dalam proses ${topic} saling berkaitan dan memengaruhi hasil akhir pengamatan."`,
        isTrueFalse: true,
      });
    } else if (format.includes('Menjodohkan')) {
      items.push({
        number: num,
        format: 'Menjodohkan Konsep',
        stem: `Hubungkan komponen materi "${topic}" di sebelah kiri dengan pasangan keterangan di sebelah kanan!`,
        matchingPairs: [
          { left: `1) Komponen Inti (${topic})`, right: 'a. Contoh penerapan nyata di lingkungan' },
          { left: '2) Proses / Mekanisme Kerja', right: 'b. Fungsi utama dalam sistem' },
          { left: '3) Manfaat bagi Kehidupan', right: 'c. Tahapan perubahan yang teramati' },
        ],
      });
    } else if (format.includes('Isian') || format.includes('Teka-Teki')) {
      items.push({
        number: num,
        format,
        stem: `${baseStem}:`,
        isShortFill: true,
      });
    } else {
      items.push({
        number: num,
        format,
        stem: baseStem,
      });
    }
  }
  return items;
}

export const LkpdWorkbookView: React.FC<LkpdWorkbookViewProps> = ({
  topic,
  subject,
  educationLevel,
  gradeClass,
  learningObjectives,
  lkpdType = 'LKPD Eksperimen',
  lkpdPageCount = 2,
  lkpdQuestionCount = 10,
  pictureActivities = ['Mengamati gambar', 'Mengisi jawaban', 'Memberi label pada gambar'],
  includeExercises = ['Pilihan Ganda', 'Isian Singkat'],
  illustrationStyle = 'Kartun Edukatif',
  onPageCountChange,
  onQuestionCountChange,
  onStyleChange,
  onTypeChange,
}) => {
  const [activeType, setActiveType] = useState<string>(lkpdType);
  const [activeStyle, setActiveStyle] = useState<string>(illustrationStyle);
  const [activePageCount, setActivePageCount] = useState<number>(lkpdPageCount);
  const [activeQuestionCount, setActiveQuestionCount] = useState<number>(lkpdQuestionCount);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<'senang' | 'cukup' | 'bantuan'>('senang');
  const [exportingType, setExportingType] = useState<'word' | 'image' | 'pdf' | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveType(lkpdType);
  }, [lkpdType]);

  useEffect(() => {
    setActiveStyle(illustrationStyle);
  }, [illustrationStyle]);

  useEffect(() => {
    setActivePageCount(lkpdPageCount);
  }, [lkpdPageCount]);

  useEffect(() => {
    setActiveQuestionCount(lkpdQuestionCount);
  }, [lkpdQuestionCount]);

  const updatePageCount = (val: number) => {
    const clamped = Math.max(1, Math.min(15, val || 1));
    setActivePageCount(clamped);
    onPageCountChange?.(clamped);
  };

  const updateQuestionCount = (val: number) => {
    const clamped = Math.max(1, Math.min(50, val || 1));
    setActiveQuestionCount(clamped);
    onQuestionCountChange?.(clamped);
  };

  const handleTypeSelect = (val: string) => {
    setActiveType(val);
    onTypeChange?.(val);
  };

  const handleStyleSelect = (val: string) => {
    setActiveStyle(val);
    onStyleChange?.(val);
  };

  const generatedQuestions = useMemo(
    () =>
      buildContextualQuestions(
        activeQuestionCount,
        topic,
        subject,
        gradeClass,
        includeExercises
      ),
    [activeQuestionCount, topic, subject, gradeClass, includeExercises]
  );

  // Distribute questions cleanly across activePageCount pages
  const pagesQuestionBuckets = useMemo(() => {
    if (activePageCount <= 1) {
      return [generatedQuestions];
    }
    const buckets: GeneratedQuestionItem[][] = Array.from(
      { length: activePageCount },
      () => []
    );
    // Page 1 holds Identity, Objectives, Stimulus, Picture Activities & Observation Table.
    // Remaining pages (Pages 2..N) distribute the generated questions evenly!
    // If there are very many questions (> 8 per remaining page), Page 1 also takes a few.
    const remainingPages = activePageCount - 1;
    const perRemainingPage = Math.ceil(generatedQuestions.length / remainingPages);

    let cursor = 0;
    for (let p = 1; p < activePageCount; p++) {
      const sliceCount =
        p === activePageCount - 1
          ? generatedQuestions.length - cursor
          : perRemainingPage;
      buckets[p] = generatedQuestions.slice(cursor, cursor + Math.max(0, sliceCount));
      cursor += Math.max(0, sliceCount);
    }
    return buckets;
  }, [generatedQuestions, activePageCount]);

  const showNotice = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const questionsText = generatedQuestions
      .map((q) => {
        if (q.options) {
          return `${q.number}. [${q.format}] ${q.stem}\n   ${q.options.join('\n   ')}`;
        }
        if (q.matchingPairs) {
          return `${q.number}. [${q.format}] ${q.stem}\n   ${q.matchingPairs
            .map((m) => `${m.left}  <--->  ${m.right}`)
            .join('\n   ')}`;
        }
        if (q.isTrueFalse) {
          return `${q.number}. [${q.format}] ${q.stem}\n   Pilihan: [  ] Benar   [  ] Salah | Alasan: ...........................................`;
        }
        return `${q.number}. [${q.format}] ${q.stem}\n   Jawaban: ....................................................................................`;
      })
      .join('\n\n');

    const textContent = `Anda adalah desainer pembelajaran profesional, ahli visual edukasi, dan creator LKPD interaktif modern.
Buat tampilan LKPD dalam format A4 portrait sebanyak ${activePageCount} Halaman penuh dengan tepat ${activeQuestionCount} Butir Soal dalam desain full color yang clean, edukatif, student friendly, dan profesional seperti workbook sekolah modern.

SPESIFIKASI DESAIN & VOLUME
Ukuran kertas : A4 (21 cm × 29,7 cm) Portrait
Jumlah Halaman : ${activePageCount} Halaman A4
Jumlah Soal : ${activeQuestionCount} Butir Soal
Gaya Seni Ilustrasi : ${activeStyle}
Jenjang & Kelas : ${gradeClass} (${educationLevel})
Mata Pelajaran : ${subject}
Materi Pokok : ${topic}
Jenis LKPD : ${activeType}
Tujuan Pembelajaran : ${
      learningObjectives && learningObjectives.trim()
        ? learningObjectives.trim()
        : `Peserta didik mampu memahami materi "${topic}" secara jelas, sederhana, dan kontekstual.`
    }
Aktivitas Bergambar : ${pictureActivities.join(', ')}
Bentuk Latihan : ${includeExercises.join(', ')}

DAFTAR RANCANGAN ${activeQuestionCount} BUTIR SOAL LKPD:
${questionsText}

REFLEKSI SISWA (Halaman ${activePageCount})
- Ekspresi Belajar: [ ] Sangat Paham   [ ] Cukup Paham   [ ] Butuh Bantuan
- Hal baru yang kupelajari hari ini: ........................................................`;

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadWord = () => {
    try {
      setExportingType('word');
      const questionsMarkdown = generatedQuestions
        .map((q) => {
          if (q.options) {
            return `${q.number}. **(${q.format})** ${q.stem}\n${q.options.map((o) => `   - ${o}`).join('\n')}`;
          }
          if (q.matchingPairs) {
            return `${q.number}. **(${q.format})** ${q.stem}\n${q.matchingPairs
              .map((m) => `   - ${m.left} ➔ ${m.right}`)
              .join('\n')}`;
          }
          if (q.isTrueFalse) {
            return `${q.number}. **(${q.format})** ${q.stem}\n   - [ ] Benar   [ ] Salah\n   - *Alasan*: ..................................................................................`;
          }
          return `${q.number}. **(${q.format})** ${q.stem}\n   - *Jawaban Siswa*: ..................................................................................`;
        })
        .join('\n\n');

      const textContent = `
# LEMBAR KERJA PESERTA DIDIK (LKPD) - ${activePageCount} HALAMAN A4
**Mata Pelajaran:** ${subject} | **Kelas/Fase:** ${gradeClass} (${educationLevel})
**Topik / Materi Pokok:** ${topic}
**Bentuk LKPD:** ${activeType} | **Gaya Seni Ilustrasi:** ${activeStyle}
**Target Volume:** ${activePageCount} Halaman A4 • ${activeQuestionCount} Butir Soal

---

### 🎯 1. Capaian & Tujuan Pembelajaran
- ${
        learningObjectives && learningObjectives.trim()
          ? learningObjectives.trim()
          : `Peserta didik mampu menelaah dan memahami konsep esensial materi **${topic}** melalui kegiatan penyelidikan aktif dan eksplorasi visual kontekstual.`
      }
- **Profil Pelajar Pancasila**: Bernalar Kritis, Kreatif, dan Bergotong Royong.

### 🔍 2. Stimulus Kasus & Ilustrasi Kontekstual (Gaya ${activeStyle})
Di lingkungan sekitar, terdapat fenomena penting yang berkaitan langsung dengan materi **${topic}**. Amati gambar ilustrasi yang disajikan, catat poin-poin penting, dan diskusikan bersama teman kelompok untuk menemukan pembuktian ilmiahnya.

### 📝 3. Langkah Kegiatan Bergambar (${pictureActivities.join(', ')})
1. **Tahap 1 (Observasi Gambar)**: Perhatikan secara teliti ilustrasi bergaya *${activeStyle}* yang disajikan, kenali bagian-bagian utamanya.
2. **Tahap 2 (Pemberian Label & Analisis)**: Tuliskan label yang sesuai pada setiap bagian diagram / gambar di lembar aktivitas.
3. **Tahap 3 (Diskusi Kolaboratif)**: Bersama kelompok, diskusikan fungsi dan keterkaitan antar elemen pada materi ini.
4. **Tahap 4 (Perumusan Kesimpulan)**: Simpulkan pemahaman materi dengan bahasa sendiri secara lugas dan terstruktur.

### ✍️ 4. Paket Latihan ${activeQuestionCount} Soal Pemahaman & HOTS (${includeExercises.join(', ')})
${questionsMarkdown}

### 📋 5. Lembar Refleksi Mandiri Siswa (Halaman ${activePageCount})
- **Ekspresi Perasaan**: [ ] Sangat Paham   [ ] Cukup Paham   [ ] Butuh Bantuan
- **Hal Baru Yang Dipelajari Hari Ini**: .........................................................................
      `.trim();

      exportToWordDoc(`LKPD-${topic}-${gradeClass}-${activePageCount}Hal-${activeQuestionCount}Soal`, textContent, {
        title: `LKPD (${activePageCount} Halaman • ${activeQuestionCount} Soal): ${topic}`,
        topic,
        subject,
        gradeClass,
        categoryTitle: `${activeType} • ${activeStyle}`,
      });
    } catch (e) {
      console.error(e);
      showNotice('Gagal mengekspor dokumen Word.');
    } finally {
      setExportingType(null);
    }
  };

  const handleDownloadImage = async () => {
    if (!sheetRef.current) return;
    try {
      setExportingType('image');
      await exportToImage(
        sheetRef.current,
        `LKPD-${topic}-${gradeClass}-${activePageCount}Hal-${activeQuestionCount}Soal`,
        'png'
      );
    } catch (e) {
      console.error(e);
      showNotice('Gagal mengekspor foto LKPD.');
    } finally {
      setExportingType(null);
    }
  };

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    try {
      setExportingType('pdf');
      await exportToPdf(
        sheetRef.current,
        `LKPD-${topic}-${gradeClass}-${activePageCount}Hal-${activeQuestionCount}Soal`
      );
    } catch (e) {
      console.error(e);
      showNotice('Gagal mengekspor PDF LKPD.');
    } finally {
      setExportingType(null);
    }
  };

  const renderQuestionCard = (q: GeneratedQuestionItem) => (
    <div
      key={q.number}
      className="bg-slate-50/90 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-bold text-slate-800 leading-relaxed">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-emerald-600 text-white text-[10px] font-black mr-1.5">
            {q.number}
          </span>
          {q.stem}
        </span>
        <span className="text-[10px] font-semibold text-slate-500 shrink-0">
          {q.format}
        </span>
      </div>

      {q.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6 pt-0.5 text-slate-700">
          {q.options.map((opt) => (
            <div key={opt} className="bg-white px-2.5 py-1 rounded-lg border border-slate-200/80">
              {opt}
            </div>
          ))}
        </div>
      )}

      {q.matchingPairs && (
        <div className="pl-6 pt-1 space-y-1">
          {q.matchingPairs.map((pair) => (
            <div key={pair.left} className="flex items-center justify-between gap-2 text-[11px]">
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">
                {pair.left}
              </span>
              <span className="text-slate-400">• • • • •</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                {pair.right}
              </span>
            </div>
          ))}
        </div>
      )}

      {q.isTrueFalse && (
        <div className="pl-6 pt-1 space-y-1.5 text-slate-700">
          <div className="flex items-center gap-4 font-semibold">
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-0.5 rounded border border-slate-200">
              □ Benar
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-0.5 rounded border border-slate-200">
              □ Salah
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Alasan singkat:</span>
            <div className="flex-1 border-b border-dotted border-slate-400 h-4"></div>
          </div>
        </div>
      )}

      {q.isShortFill && (
        <div className="pl-6 pt-1 flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-600">Jawaban:</span>
          <div className="flex-1 border-b-2 border-dotted border-slate-400 h-5"></div>
        </div>
      )}

      {!q.options && !q.matchingPairs && !q.isTrueFalse && !q.isShortFill && (
        <div className="pl-6 pt-1 space-y-2">
          <div className="border-b border-dotted border-slate-400 h-4"></div>
          <div className="border-b border-dotted border-slate-400 h-4"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden during print) */}
      <div className="print:hidden bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Format Cetak A4 Portrait Full-Color</span>
            <span aria-hidden="true">·</span>
            <span>{activePageCount} Halaman</span>
            <span aria-hidden="true">·</span>
            <span>{activeQuestionCount} Soal</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
            Pratinjau LKPD: {topic}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {subject} · {gradeClass} · {activeType} · Ilustrasi {activeStyle}
          </p>
          {statusMessage && (
            <p className="text-xs text-rose-600 font-semibold mt-1">{statusMessage}</p>
          )}
        </div>

        {/* Buttons & Export Options */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs font-bold text-slate-600 tabular-nums">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 10))}
              className="p-1.5 hover:bg-white rounded-lg transition"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(125, zoomLevel + 10))}
              className="p-1.5 hover:bg-white rounded-lg transition"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition whitespace-nowrap"
            title="Salin teks LKPD ke clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Teks</span>
              </>
            )}
          </button>

          {/* Export 1: Document Word (.doc) */}
          <button
            onClick={handleDownloadWord}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50 whitespace-nowrap"
            title="Unduh dokumen Word yang siap diedit"
          >
            {exportingType === 'word' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-700" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-700" />
            )}
            <span>Unduh Word (.doc)</span>
          </button>

          {/* Export 2: Photo / Image (PNG) */}
          <button
            onClick={handleDownloadImage}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50 whitespace-nowrap"
            title="Unduh foto/gambar berkualitas tinggi format PNG"
          >
            {exportingType === 'image' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-700" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-purple-700" />
            )}
            <span>Unduh Foto (PNG)</span>
          </button>

          {/* Export 3: PDF Document (.pdf) */}
          <button
            onClick={handleDownloadPdf}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50 whitespace-nowrap"
            title="Unduh file dokumen PDF format A4"
          >
            {exportingType === 'pdf' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-700" />
            ) : (
              <Download className="w-3.5 h-3.5 text-rose-700" />
            )}
            <span>Unduh PDF</span>
          </button>

          {/* Print dialog */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition active:scale-95 whitespace-nowrap"
            title="Cetak langsung menggunakan printer atau browser"
          >
            <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Cetak A4</span>
          </button>
        </div>
      </div>

      {/* Quick Selectors Toolbar: Jenis LKPD, Gaya Ilustrasi, Jumlah Halaman & Jumlah Soal (Hidden during print) */}
      <div className="print:hidden bg-slate-100 p-3.5 rounded-2xl border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Jenis LKPD */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-700">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Jenis LKPD:</span>
            </label>
            <select
              value={activeType}
              onChange={(e) => handleTypeSelect(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {ALL_LKPD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Gaya Seni Ilustrasi (28 Pilihan) */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-700">
              <Palette className="w-3.5 h-3.5 text-purple-600" />
              <span>Gaya Seni Ilustrasi ({ILLUSTRATION_STYLES.length} Gaya):</span>
            </label>
            <select
              value={activeStyle}
              onChange={(e) => handleStyleSelect(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              {ILLUSTRATION_STYLES.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.badge})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Jumlah Halaman LKPD */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-700">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>Jumlah Halaman A4:</span>
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => updatePageCount(activePageCount - 1)}
                disabled={activePageCount <= 1}
                className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700"
                title="Kurangi halaman"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <select
                value={activePageCount}
                onChange={(e) => updatePageCount(Number(e.target.value))}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 tabular-nums focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                {Array.from({ length: 15 }, (_, idx) => idx + 1).map((num) => {
                  const preset = LKPD_PAGE_PRESETS.find((p) => p.count === num);
                  return (
                    <option key={num} value={num}>
                      {num} Halaman{preset ? ` (${preset.desc})` : ''}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                onClick={() => updatePageCount(activePageCount + 1)}
                disabled={activePageCount >= 15}
                className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700"
                title="Tambah halaman"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4. Jumlah Soal LKPD */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-700">
              <Hash className="w-3.5 h-3.5 text-amber-600" />
              <span>Jumlah Butir Soal:</span>
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => updateQuestionCount(activeQuestionCount - 1)}
                disabled={activeQuestionCount <= 1}
                className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700"
                title="Kurangi soal"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min={1}
                max={50}
                value={activeQuestionCount}
                onChange={(e) => updateQuestionCount(Number(e.target.value))}
                className="w-16 text-center bg-white border border-slate-300 rounded-xl px-2 py-1.5 text-xs font-extrabold text-slate-800 tabular-nums focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
              <select
                value={
                  LKPD_QUESTION_PRESETS.some((p) => p.count === activeQuestionCount)
                    ? activeQuestionCount
                    : ''
                }
                onChange={(e) => {
                  if (e.target.value) updateQuestionCount(Number(e.target.value));
                }}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-700 focus:outline-hidden"
              >
                <option value="" disabled>
                  Pilih Cepat
                </option>
                {LKPD_QUESTION_PRESETS.map((p) => (
                  <option key={p.count} value={p.count}>
                    {p.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => updateQuestionCount(activeQuestionCount + 1)}
                disabled={activeQuestionCount >= 50}
                className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700"
                title="Tambah soal"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* THE A4 PORTRAIT WORKBOOK SHEETS CANVAS (MULTI-PAGE)      */}
      {/* ======================================================== */}
      <div className="flex justify-center overflow-x-auto pb-8 print:p-0 print:overflow-visible">
        <div
          ref={sheetRef}
          id="lkpd-workbook-sheet"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
          }}
          className="w-full max-w-[800px] space-y-8 print:space-y-0 transition-transform duration-200"
        >
          {Array.from({ length: activePageCount }, (_, pageIndex) => {
            const pageNumber = pageIndex + 1;
            const isFirstPage = pageNumber === 1;
            const isLastPage = pageNumber === activePageCount;
            const pageQuestions = pagesQuestionBuckets[pageIndex] || [];

            return (
              <div
                key={pageNumber}
                className={`bg-white text-slate-800 shadow-xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-10 relative flex flex-col justify-between space-y-5 min-h-[1040px] ${
                  !isLastPage ? 'print:break-after-page' : ''
                }`}
              >
                <div className="space-y-5">
                  {/* PAGE 1 FULL HEADER & EXPLORATION ACTIVITIES */}
                  {isFirstPage ? (
                    <>
                      {/* 1. TOP HEADER BANNER */}
                      <div className="border-b-2 border-emerald-600 pb-3.5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-700 mb-1">
                              <span>Lembar Kerja Peserta Didik (LKPD)</span>
                              <span aria-hidden="true">·</span>
                              <span>Kurikulum Merdeka</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                              {topic}
                            </h1>
                            <p className="text-xs font-semibold text-slate-600 mt-1">
                              Mata Pelajaran:{' '}
                              <span className="text-emerald-700 font-bold">{subject}</span> ·{' '}
                              <span className="text-slate-800 font-bold">{gradeClass}</span>
                            </p>
                          </div>

                          <div className="text-right shrink-0 space-y-1">
                            <div className="inline-block bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-xl">
                              {activeType}
                            </div>
                            <div className="text-[10px] text-slate-500 font-bold block">
                              Ilustrasi: <span className="text-purple-700 font-black">{activeStyle}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold tabular-nums block">
                              {activePageCount} Halaman · {activeQuestionCount} Soal
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 2. STUDENT IDENTITY BOX */}
                      <div className="bg-[#f8faf9] rounded-2xl p-3.5 border border-emerald-200/90 grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-8 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-600 w-28 shrink-0">
                              Nama Siswa/Regu :
                            </span>
                            <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[20px]"></div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-600 w-16 shrink-0">
                                Kelas :
                              </span>
                              <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[20px] text-xs font-semibold text-emerald-900">
                                {gradeClass}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-600 w-20 shrink-0">
                                No. Absen :
                              </span>
                              <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[20px]"></div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-600 w-28 shrink-0">
                              Hari / Tanggal :
                            </span>
                            <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[20px]"></div>
                          </div>
                        </div>

                        <div className="sm:col-span-4 bg-white rounded-xl p-2 border border-emerald-200 flex flex-col justify-between text-center">
                          <span className="text-[10px] font-extrabold text-emerald-800">
                            Nilai &amp; Paraf Guru
                          </span>
                          <div className="flex-1 flex items-center justify-center my-0.5">
                            <div className="w-16 h-9 border-2 border-dashed border-emerald-300 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs">
                              ___ / 100
                            </div>
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium tabular-nums">
                            Target: {activeQuestionCount} Soal
                          </div>
                        </div>
                      </div>

                      {/* 3. CAPAIAN & TUJUAN BELAJAR */}
                      <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200">
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                          </div>
                          <div>
                            <h3 className="text-xs font-black text-emerald-950">
                              Tujuan Pembelajaran
                            </h3>
                            <p className="text-xs text-slate-700 mt-0.5 leading-relaxed whitespace-pre-line">
                              {learningObjectives && learningObjectives.trim() ? (
                                learningObjectives.trim()
                              ) : (
                                <>
                                  Peserta didik mampu memahami materi <strong>{topic}</strong>{' '}
                                  secara aktif, berpikir kritis melalui eksplorasi visual bergaya{' '}
                                  <em>{activeStyle}</em>, dan menyelesaikan {activeQuestionCount}{' '}
                                  butir tantangan dengan tepat.
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 4. STIMULUS SOAL CERITA BERGAMBAR */}
                      <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-extrabold text-slate-900">
                            Stimulus Kontekstual: Misi Penyelidikan &ldquo;{topic}&rdquo;
                          </h4>
                          <span className="text-[11px] font-semibold text-amber-800">
                            Visual: {activeStyle}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                          <div className="w-full sm:w-44 h-28 bg-white rounded-xl border border-amber-200 p-2 flex flex-col items-center justify-center text-center shrink-0">
                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-1">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">
                              Area Ilustrasi {activeStyle}
                            </span>
                            <span className="text-[9px] text-slate-400 line-clamp-2">
                              Adegan kontekstual materi {topic}
                            </span>
                          </div>

                          <div className="flex-1 text-xs text-slate-700 leading-relaxed space-y-1.5">
                            <p className="italic">
                              &ldquo;Di lingkungan sekolah, para siswa sedang mengamati fenomena
                              menarik yang berkaitan langsung dengan <strong>{topic}</strong>.
                              Perhatikan ilustrasi di samping dan catat hal penting yang kamu
                              temukan!&rdquo;
                            </p>
                            <div className="pt-1 flex items-center gap-2 text-[11px] font-bold text-emerald-800">
                              <span>Pertanyaan Pemantik:</span>
                              <span className="font-medium text-slate-700">
                                Apa penyebab utama fenomena tersebut menurut pendapatmu?
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. KEGIATAN BERGAMBAR INTERAKTIF */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                              A
                            </span>
                            <span>Kegiatan Bergambar Interaktif</span>
                          </h3>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {pictureActivities.slice(0, 3).join(' · ')}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                              <span className="flex items-center gap-1.5">
                                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Aktivitas 1: Beri Label Gambar</span>
                              </span>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
                              <div className="grid grid-cols-2 gap-2 w-full text-xs">
                                {[1, 2, 3, 4].map((num) => (
                                  <div
                                    key={num}
                                    className="p-1.5 bg-white border border-slate-200 rounded flex items-center gap-1.5"
                                  >
                                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                                      {num}
                                    </span>
                                    <div className="flex-1 border-b border-dotted border-slate-300 h-4"></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                              <span className="flex items-center gap-1.5">
                                <ListOrdered className="w-3.5 h-3.5 text-purple-600" />
                                <span>Aktivitas 2: Hubungkan Konsep</span>
                              </span>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-1.5 text-xs">
                              {['Konsep Inti 1', 'Konsep Inti 2', 'Konsep Inti 3'].map((k, idx) => (
                                <div key={k} className="flex items-center justify-between">
                                  <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                                    {k}
                                  </span>
                                  <span className="text-slate-400">• • •</span>
                                  <span className="text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                                    Ilustrasi {(idx + 1) % 3 + 1}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 6. TABEL OBSERVASI */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                            B
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-800">
                            Tabel Observasi &amp; Pengamatan Kerja
                          </h3>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-slate-300">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-emerald-600 text-white font-extrabold">
                                <th className="py-2 px-3 w-10 text-center border-r border-emerald-500">
                                  No
                                </th>
                                <th className="py-2 px-3 border-r border-emerald-500">
                                  Objek / Tahap Pengamatan
                                </th>
                                <th className="py-2 px-3 border-r border-emerald-500 w-36">
                                  Hasil Temuan
                                </th>
                                <th className="py-2 px-3">Analisis &amp; Kesimpulan</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                              <tr>
                                <td className="py-2.5 px-3 text-center font-bold text-slate-400 border-r border-slate-200">
                                  1
                                </td>
                                <td className="py-2.5 px-3 border-r border-slate-200 font-semibold">
                                  Kondisi awal pada materi {topic}
                                </td>
                                <td className="py-2.5 px-3 border-r border-slate-200">
                                  <div className="border-b border-dotted border-slate-300 h-4"></div>
                                </td>
                                <td className="py-2.5 px-3">
                                  <div className="border-b border-dotted border-slate-300 h-4"></div>
                                </td>
                              </tr>
                              <tr className="bg-slate-50/50">
                                <td className="py-2.5 px-3 text-center font-bold text-slate-400 border-r border-slate-200">
                                  2
                                </td>
                                <td className="py-2.5 px-3 border-r border-slate-200 font-semibold">
                                  Perubahan / proses inti yang diamati
                                </td>
                                <td className="py-2.5 px-3 border-r border-slate-200">
                                  <div className="border-b border-dotted border-slate-300 h-4"></div>
                                </td>
                                <td className="py-2.5 px-3">
                                  <div className="border-b border-dotted border-slate-300 h-4"></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* RUNNING HEADER FOR CONTINUATION PAGES (PAGE 2..N) */
                    <div className="border-b-2 border-emerald-600 pb-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-bold text-emerald-700">
                          Lanjutan Lembar Kerja Peserta Didik (LKPD) · Halaman {pageNumber}
                        </div>
                        <h2 className="text-base sm:text-lg font-black text-slate-900">
                          {topic}
                        </h2>
                      </div>
                      <div className="text-right text-xs text-slate-500 font-semibold shrink-0">
                        <div>{subject} · {gradeClass}</div>
                        <div className="text-[10px] text-purple-700 font-bold">
                          Ilustrasi: {activeStyle}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* QUESTIONS SECTION ON THIS PAGE */}
                  {pageQuestions.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                            C
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-800">
                            {pageQuestions[0].number === 1
                              ? `Latihan Soal Pemahaman & Tantangan (${activeQuestionCount} Butir Soal)`
                              : `Lanjutan Latihan Soal (Nomor ${pageQuestions[0].number} – ${
                                  pageQuestions[pageQuestions.length - 1].number
                                })`}
                          </h3>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {includeExercises.join(' · ')}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {pageQuestions.map((q) => renderQuestionCard(q))}
                      </div>
                    </div>
                  )}

                  {/* IF CONTINUATION PAGE HAS EXTRA SPACE & NO QUESTIONS ASSIGNED, ADD CREATIVE VISUAL SUMMARY */}
                  {!isFirstPage && pageQuestions.length === 0 && (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-800">
                        Lembar Peta Konsep &amp; Sketsa Visual Siswa ({activeStyle})
                      </h3>
                      <p className="text-xs text-slate-600">
                        Gambarkan skema, peta pikiran (mind map), atau ilustrasi kesimpulanmu mengenai{' '}
                        <strong>{topic}</strong> pada kotak kerja di bawah ini!
                      </p>
                      <div className="h-64 bg-white rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 font-medium">
                        Area Gambar / Peta Konsep Kreatif Siswa
                      </div>
                    </div>
                  )}

                  {/* STUDENT SELF-REFLECTION ON LAST PAGE */}
                  {isLastPage && (
                    <div className="bg-[#f0fbf5] rounded-2xl p-3.5 border border-emerald-300 space-y-2.5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                            D
                          </span>
                          <h4 className="text-xs font-extrabold text-emerald-950">
                            Refleksi Belajar Siswa (Student Self-Check)
                          </h4>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">
                          Lingkari ekspresi perasaanmu setelah mengerjakan {activeQuestionCount} soal!
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedMood('senang')}
                          className={`p-1.5 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                            selectedMood === 'senang'
                              ? 'bg-emerald-600 text-white font-bold border-emerald-600'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <Smile className="w-4 h-4" />
                          <span className="text-xs">Sangat Paham</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedMood('cukup')}
                          className={`p-1.5 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                            selectedMood === 'cukup'
                              ? 'bg-amber-500 text-white font-bold border-amber-500'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <Meh className="w-4 h-4" />
                          <span className="text-xs">Cukup Paham</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedMood('bantuan')}
                          className={`p-1.5 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                            selectedMood === 'bantuan'
                              ? 'bg-rose-500 text-white font-bold border-rose-500'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <Frown className="w-4 h-4" />
                          <span className="text-xs">Butuh Bantuan</span>
                        </button>
                      </div>

                      <div className="pt-0.5">
                        <span className="text-[11px] font-bold text-slate-700 block mb-1">
                          Hal paling menyenangkan atau hal baru yang kupelajari hari ini:
                        </span>
                        <div className="border-b border-dotted border-emerald-400 h-4"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FOOTER OF EACH WORKBOOK SHEET */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10.5px] text-slate-500 font-semibold tabular-nums">
                  <span>
                    LKPD Kurikulum Merdeka · {subject} ({gradeClass})
                  </span>
                  <span>
                    Halaman {pageNumber} dari {activePageCount} (Format A4 Portrait)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
