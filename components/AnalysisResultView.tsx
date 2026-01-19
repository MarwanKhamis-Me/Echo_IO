
import React from 'react';
import { AnalysisResult, Language } from '../types';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  lang: Language;
}

const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result, onReset, lang }) => {
  const isAr = lang === 'ar';
  
  const statusConfig = {
    safe: {
      text: isAr ? 'آمن / حقيقي' : 'Safe / Real',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: 'text-emerald-400',
      barColor: 'bg-emerald-500'
    },
    warning: {
      text: isAr ? 'غير مؤكد / تدقيق' : 'Uncertain / Verify',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'text-amber-400',
      barColor: 'bg-amber-500'
    },
    danger: {
      text: isAr ? 'مزيف / خطر' : 'Fake / Danger',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      color: 'text-rose-400',
      barColor: 'bg-rose-500'
    }
  };

  const config = statusConfig[result.status] || statusConfig.warning;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="bg-[#1b222d] border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">{isAr ? 'نتائج التحليل' : 'Analysis Results'}</h2>
        
        <div className="space-y-10">
          {/* Status Badge */}
          <div className="space-y-4">
            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">{isAr ? 'الحكم النهائي' : 'Final Judgment'}</h3>
            <div className={`bg-[#0f141e] border border-slate-800 px-6 py-5 rounded-2xl flex items-center justify-between`}>
              <span className={`text-2xl font-bold ${config.color}`}>{result.judgment}</span>
              <div className={`${config.color} p-1`}>
                {config.icon}
              </div>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className="space-y-4">
             <div className="flex justify-between items-center text-slate-400 font-bold">
               <span>{isAr ? 'مؤشر الثقة' : 'Confidence Indicator'}</span>
               <span className="text-xl">{result.confidence}%</span>
             </div>
             <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
               <div 
                 className={`h-full ${config.barColor} transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
                 style={{ width: `${result.confidence}%` }}
               ></div>
             </div>
          </div>

          {/* Explanation */}
          <div className="space-y-4">
            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">{isAr ? 'التقرير المفصل' : 'Detailed Report'}</h3>
            <div className="prose prose-invert max-w-none bg-[#0f141e]/50 p-6 rounded-2xl border border-slate-800/50">
              <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                {result.explanation}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-950/20 border-l-4 border-amber-500/50 p-4 rounded-xl text-xs text-amber-200/60 font-medium italic">
            {isAr 
              ? 'إخلاء مسؤولية: هذا التحليل يعتمد على نماذج ذكاء اصطناعي وتوقعات إحصائية، ويجب استشارة الخبراء أو الأطباء في الحالات الحرجة.'
              : 'Disclaimer: This analysis is based on AI models and statistical predictions. Please consult experts or doctors in critical cases.'}
          </div>

          {/* Sources */}
          {result.sources && result.sources.length > 0 && (
            <div className="pt-6 border-t border-slate-800">
              <h4 className="text-lg font-bold text-white mb-6">{isAr ? 'المصادر المرجعية' : 'Reference Sources'}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.sources.map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#0f141e] p-4 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-all text-sm truncate text-slate-400 hover:text-white flex items-center gap-3 font-semibold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {source.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
           <button
            onClick={onReset}
            className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            {isAr ? 'إجراء فحص جديد' : 'Perform New Scan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultView;
