import React, { useState } from 'react';

interface ResponseCardProps {
  response: string;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ response }) => {
  const [copied, setCopied] = useState(false);

  if (!response) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppRedirect = () => {
    const encodedText = encodeURIComponent(response);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  return (
    <div className="sticky top-6 font-arabic">
      
      {/* Phone Header Mockup */}
      <div className="bg-gray-100 rounded-t-3xl border-x border-t border-gray-300 p-4 pb-2 flex justify-between items-center opacity-80">
         <div className="flex gap-1">
           <div className="w-2 h-2 rounded-full bg-red-400"></div>
           <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
           <div className="w-2 h-2 rounded-full bg-green-400"></div>
         </div>
         <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preview</div>
      </div>

      {/* WhatsApp Interface */}
      <div className="bg-[#E5DDD5] border-x border-b border-gray-300 rounded-b-3xl overflow-hidden shadow-2xl relative">
        {/* Chat Background Pattern (CSS Gradient simulating pattern) */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4a4a4a 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

        {/* Header Bar */}
        <div className="bg-[#075E54] p-3 flex items-center gap-3 text-white relative z-10" dir="rtl">
           <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
             <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
           </div>
           <div className="flex-1">
             <div className="text-sm font-bold leading-none">زبون (محزون)</div>
             <div className="text-[10px] opacity-80 mt-0.5">متصل الآن</div>
           </div>
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
        </div>

        {/* Message Area */}
        <div className="p-4 min-h-[300px] flex flex-col justify-end relative z-10">
          <div className="bg-[#DCF8C6] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[95%] self-end mb-2 relative" dir="rtl">
             {/* Tail */}
             <div className="absolute top-0 -right-2 w-0 h-0 border-[8px] border-transparent border-t-[#DCF8C6] border-l-[#DCF8C6]"></div>
             
             <div className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">
               {response}
             </div>
             <div className="text-[10px] text-gray-500 text-left mt-1 flex justify-end gap-1">
               <span>14:02</span>
               <span className="text-blue-400">✓✓</span>
             </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-[#f0f0f0] p-3 border-t border-gray-200 flex gap-2 relative z-10">
           <button
             onClick={handleCopy}
             className={`flex-1 py-2.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
               copied 
                 ? 'bg-gray-200 text-gray-600' 
                 : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
             }`}
           >
             {copied ? 'تم النسخ' : 'نسخ النص'}
           </button>
           <button
             onClick={handleWhatsAppRedirect}
             className="flex-1 py-2.5 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
           >
             إرسال
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
             </svg>
           </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;