import React, { useState } from 'react';
import { MediaCategory, AppTheme } from '../types';
import { APP_THEMES } from '../data/themes';
import { QUICK_LEARNING_TIPS } from '../data/quickTipsData';
import {
  Lightbulb,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  Presentation,
  ClipboardList,
  Gamepad2,
  BookOpenCheck,
  FileEdit,
  Image as ImageIcon,
  Music,
  Video,
  Bot,
  Printer,
  BookOpen,
  Rocket,
} from 'lucide-react';

interface QuickTipsSectionProps {
  categories: MediaCategory[];
  selectedCategoryId: string;
  onSelectCategoryId: (id: string) => void;
  onOpenPromptGenerator: (category: MediaCategory) => void;
  currentTheme: AppTheme;
}

export const QuickTipsSection: React.FC<QuickTipsSectionProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategoryId,
  onOpenPromptGenerator,
  currentTheme,
}) => {
  const [copied, setCopied] = useState(false);
  const activeTheme = APP_THEMES[currentTheme] || APP_THEMES['forest-green'];

  const activeCategory =
    categories.find((c) => c.id === selectedCategoryId) || categories[0];
  const tipData =
    QUICK_LEARNING_TIPS[activeCategory.id] || QUICK_LEARNING_TIPS['presentasi'];

  const currentIndex = Math.max(
    0,
    categories.findIndex((c) => c.id === activeCategory.id)
  );

  const handlePrevCategory = () => {
    const prevIdx = (currentIndex - 1 + categories.length) % categories.length;
    onSelectCategoryId(categories[prevIdx].id);
  };

  const handleNextCategory = () => {
    const nextIdx = (currentIndex + 1) % categories.length;
    onSelectCategoryId(categories[nextIdx].id);
  };

  const handleCopyTip = () => {
    const formattedText = [
      `TIPS BELAJAR CEPAT GURU — ${activeCategory.title.toUpperCase()}`,
      `Strategi Utama: ${tipData.headline}`,
      `${tipData.summary}`,
      `Waktu Ideal: ${tipData.bestTiming} | Durasi: ${tipData.idealDuration} | Pola Kelas: ${tipData.classGrouping}`,
      '',
      'LANGKAH PRAKTIS DI KELAS:',
      ...tipData.steps.map(
        (s) => `${s.stepNumber}. [${s.phase}] ${s.title} — ${s.detail}`
      ),
      '',
      `Hindari: ${tipData.avoidMistake}`,
      `Praktik Terbaik: ${tipData.bestPractice}`,
      `Catatan Guru: ${tipData.teacherNote}`,
    ].join('\n');

    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSmallCategoryIcon = (categoryId: string, isActive: boolean) => {
    const iconClass = `w-3.5 h-3.5 shrink-0 ${
      isActive ? 'text-white' : 'text-slate-500'
    }`;
    switch (categoryId) {
      case 'presentasi':
        return <Presentation className={iconClass} />;
      case 'kuis':
        return <ClipboardList className={iconClass} />;
      case 'game':
        return <Gamepad2 className={iconClass} />;
      case 'modul':
        return <BookOpenCheck className={iconClass} />;
      case 'lkpd':
        return <FileEdit className={iconClass} />;
      case 'infografis':
        return <ImageIcon className={iconClass} />;
      case 'audio':
        return <Music className={iconClass} />;
      case 'video':
        return <Video className={iconClass} />;
      case 'chatbot':
        return <Bot className={iconClass} />;
      case 'cetak':
        return <Printer className={iconClass} />;
      case 'literasi':
        return <BookOpen className={iconClass} />;
      case 'projek':
        return <Rocket className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  return (
    <section
      id="tips-belajar-cepat"
      aria-labelledby="tips-belajar-cepat-heading"
      className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
    >
      {/* Top Header & Navigation Controls */}
      <div className="p-4 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div
            className="w-11 h-11 rounded-xl text-white flex items-center justify-center shrink-0 shadow-xs"
            style={{ background: activeTheme.primaryGradient }}
          >
            <Lightbulb className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2
              id="tips-belajar-cepat-heading"
              className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug"
            >
              Tips Belajar Cepat untuk Guru
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-600 font-medium mt-0.5">
              Pilih kategori media ajar untuk melihat panduan praktis penerapan di kelas.
            </p>
          </div>
        </div>

        {/* Prev / Next & Copy Action Bar */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={handlePrevCategory}
              aria-label="Kategori sebelumnya"
              className="w-8 h-8 rounded-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-semibold text-slate-600 tabular-nums whitespace-nowrap">
              {currentIndex + 1} / {categories.length}
            </span>
            <button
              type="button"
              onClick={handleNextCategory}
              aria-label="Kategori berikutnya"
              className="w-8 h-8 rounded-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyTip}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tips Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin Panduan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Category Selector Strip */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50/80 border-b border-slate-200/80">
        <div
          role="tablist"
          aria-label="Pilih kategori tips media ajar"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin"
        >
          {categories.map((cat) => {
            const isSelected = cat.id === activeCategory.id;
            const shortName =
              QUICK_LEARNING_TIPS[cat.id]?.shortLabel || cat.categoryName;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectCategoryId(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
                style={
                  isSelected
                    ? { backgroundColor: activeTheme.primaryHex }
                    : undefined
                }
              >
                {renderSmallCategoryIcon(cat.id, isSelected)}
                <span>{shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Strategy & Practical Classroom Steps */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Strategy Overview & Unboxed Metadata */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-500">
              <span style={{ color: activeTheme.primaryHex }}>
                {activeCategory.title}
              </span>
              <span aria-hidden="true">·</span>
              <span>{tipData.bestTiming}</span>
              <span aria-hidden="true">·</span>
              <span>{tipData.idealDuration}</span>
              <span aria-hidden="true">·</span>
              <span>{tipData.classGrouping}</span>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug [text-wrap:balance]">
              {tipData.headline}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {tipData.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenPromptGenerator(activeCategory)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-xs hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 self-start"
            style={{ backgroundColor: activeTheme.primaryHex }}
          >
            <span>Susun Prompt {tipData.shortLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Actionable Classroom Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {tipData.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="flex items-start gap-3.5 pb-4 border-b border-slate-100 last:border-b-0 md:nth-last-[-n+2]:border-b-0 md:pb-1"
            >
              <span
                className="text-sm font-black tabular-nums shrink-0 mt-0.5"
                style={{ color: activeTheme.primaryHex }}
              >
                {step.stepNumber}.
              </span>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>{step.phase}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Avoid vs Best Practice & Teacher Tip Footer */}
        <div className="pt-5 border-t border-slate-200/80 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-amber-800">
                  Hindari Kebiasaan Ini
                </p>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {tipData.avoidMistake}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-emerald-800">
                  Saran Praktik Terbaik
                </p>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {tipData.bestPractice}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
            <p className="leading-relaxed">
              <span className="font-bold text-slate-800">Tips Pro Guru: </span>
              {tipData.teacherNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
