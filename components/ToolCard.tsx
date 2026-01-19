
import React from 'react';
import { ToolType } from '../types';

interface ToolCardProps {
  type: ToolType;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  onClick: (type: ToolType) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ type, title, description, icon, iconBg, onClick }) => {
  return (
    <button
      onClick={() => onClick(type)}
      className="bg-[#1b222d] hover:bg-[#212a38] border border-slate-800/40 p-8 rounded-3xl transition-all group text-center flex flex-col items-center h-full shadow-lg hover:-translate-y-1"
    >
      <div className={`w-20 h-20 ${iconBg} rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm font-medium opacity-90">
        {description}
      </p>
    </button>
  );
};

export default ToolCard;
