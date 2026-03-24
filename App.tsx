import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResponseCard from './components/ResponseCard';
import { RentalData, DEFAULT_RENTAL_DATA } from './types';
import { generateWhatsAppReply } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<RentalData>(DEFAULT_RENTAL_DATA);
  const [generatedResponse, setGeneratedResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (key: keyof RentalData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedResponse("");
    
    // Scroll to response area on mobile when generating
    if (window.innerWidth < 1024) {
       setTimeout(() => {
         document.getElementById('response-area')?.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    }

    try {
      const response = await generateWhatsAppReply(formData);
      setGeneratedResponse(response);
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-12 font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-2 rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-800">
                Samsar<span className="text-green-600">AI</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-medium -mt-1 uppercase tracking-wider">Broker Assistant</p>
            </div>
          </div>
          <div className="hidden md:block text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
             إصدار تجريبي (Beta)
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 font-arabic leading-tight">
            المساعد الذكي للوسطاء العقاريين
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-arabic leading-relaxed">
            أنشئ ردود واتساب احترافية ومقنعة في ثوانٍ باستخدام الذكاء الاصطناعي.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Form Side */}
          <div className="w-full lg:w-7/12 xl:w-2/3 order-2 lg:order-1">
            <InputForm 
              data={formData} 
              onChange={handleInputChange} 
              isLoading={isLoading} 
              onSubmit={handleGenerate}
            />
          </div>

          {/* Response Side (Sticky on Desktop) */}
          <div id="response-area" className="w-full lg:w-5/12 xl:w-1/3 order-1 lg:order-2">
            {error && (
              <div className="mb-4 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm font-arabic text-right flex items-center gap-2 justify-end" dir="rtl">
                <span>{error}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Show placeholder if no response yet */}
            {!generatedResponse && !isLoading && !error && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 text-center text-gray-400 font-arabic border-dashed border-2 h-full min-h-[400px] flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-gray-800 font-bold text-lg mb-1">الرد جاهز؟</h3>
                <p className="text-sm max-w-xs mx-auto text-gray-500">
                  اضغط على زر "إنشاء الرد" وستظهر رسالة الواتساب هنا جاهزة للمعاينة.
                </p>
              </div>
            )}

            {/* Loading Skeleton */}
            {isLoading && (
               <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
                 <div className="animate-pulse space-y-4">
                   <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                   <div className="h-64 bg-gray-100 rounded-xl w-full"></div>
                   <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
                 </div>
               </div>
            )}

            <ResponseCard response={generatedResponse} />
          </div>
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="text-center text-gray-400 text-xs py-6 font-arabic">
        &copy; {new Date().getFullYear()} SamsarAI. تم التطوير لتسهيل عمل الوسطاء.
      </footer>
    </div>
  );
};

export default App;