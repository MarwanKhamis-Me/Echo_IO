
import React from 'react';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  lang: Language;
  setLang: (l: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onBack, showBack, lang, setLang }) => {
  const isAr = lang === 'ar';

  return (
    <div className={`min-h-screen bg-[#0f141e] text-slate-100 flex flex-col font-['Cairo']`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Bar with Language Switcher and Back Button */}
      <div className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <button 
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 px-5 py-2 rounded-xl text-sm transition-all font-semibold"
        >
          {lang === 'ar' ? 'English' : 'العربية'}
        </button>
        
        {showBack && (
          <button 
            onClick={onBack}
            className={`flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-lg font-bold`}
          >
            <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            <span className="text-xl font-bold">{isAr ? '←' : '→'}</span>
          </button>
        )}
      </div>

      <header className="pt-6 pb-12 px-4 text-center relative">
        <div className="mb-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-[#b2b5ff] drop-shadow-[0_0_15px_rgba(178,181,255,0.4)]">
            Echo IO
          </h1>
        </div>
        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-80">
          {isAr ? 'مجموعة أدواتك الذكية لتعزيز الوعي الرقمي والأمان.' : 'Your smart toolkit for digital awareness and security.'}
        </p>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-4 flex flex-col items-center">
        {children}
      </main>

      <footer className="py-12 px-4 text-center text-slate-500 text-xs md:text-sm max-w-3xl mx-auto border-t border-slate-800/50 mt-12">
        <p className="mb-2 font-semibold">
          {isAr 
            ? 'تنبيه: هذه الأدوات تستخدم نماذج الذكاء الاصطناعي وقد لا تكون النتائج دقيقة بنسبة 100%.' 
            : 'Warning: These tools use AI models and results may not be 100% accurate.'}
        </p>
        <p className="opacity-70">
          {isAr 
            ? 'استخدم النتائج كنقطة انطلاق للمزيد من البحث والتحقق، وليس كحكم نهائي.' 
            : 'Use results as a starting point for further research, not as a final judgment.'}
        </p>
      </footer>
    </div>
  );
};

export default Layout;
