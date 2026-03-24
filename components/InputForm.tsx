import React from 'react';
import { RentalData } from '../types';

interface InputFormProps {
  data: RentalData;
  onChange: (key: keyof RentalData, value: string | number) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const COMMON_AMENITIES = ["واي فاي", "تكييف", "موقف سيارات", "إطلالة على البحر", "مصعد", "مطبخ مجهز", "غسالة", "سمارت تيفي"];
const COMMON_RULES = ["للعائلات فقط", "ممنوع التدخين", "ممنوع الحفلات", "عقد الزواج ضروري", "الحيوانات ممنوعة"];

const InputForm: React.FC<InputFormProps> = ({ data, onChange, isLoading, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    onChange(name as keyof RentalData, type === 'number' ? Number(value) : value);
  };

  const handleChipClick = (field: 'amenities' | 'rules', value: string) => {
    const currentText = data[field];
    if (currentText.includes(value)) return;
    const newText = currentText ? `${currentText}، ${value}` : value;
    onChange(field, newText);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 font-arabic overflow-hidden" dir="rtl">
      
      {/* Header / Availability */}
      <div className="bg-gray-50 p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            معلومات الحجز
          </h3>
          <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => onChange('availability', 'available')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${data.availability === 'available' ? 'bg-green-100 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              ✅ متوفرة
            </button>
            <button
              onClick={() => onChange('availability', 'unavailable')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${data.availability === 'unavailable' ? 'bg-red-100 text-red-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              ❌ غير متوفرة
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        
        {/* Section 1: Location & Details */}
        <section className="space-y-4">
          <h4 className="text-sm uppercase tracking-wide text-gray-400 font-bold border-b border-gray-100 pb-2">الموقع والشقة</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative group">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">المدينة</label>
              <div className="relative">
                <input type="text" name="city" value={data.city} onChange={handleChange} className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none" />
                <span className="absolute right-3 top-2.5 text-gray-400">🏙️</span>
              </div>
            </div>
            <div className="relative group">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">الحي / معلمة</label>
              <div className="relative">
                <input type="text" name="landmark" value={data.landmark} onChange={handleChange} className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none" />
                <span className="absolute right-3 top-2.5 text-gray-400">📍</span>
              </div>
            </div>
            <div className="relative group">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">تفاصيل الشقة</label>
              <div className="relative">
                <input type="text" name="roomsSetup" value={data.roomsSetup} onChange={handleChange} className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none" />
                <span className="absolute right-3 top-2.5 text-gray-400">🏠</span>
              </div>
            </div>
             <div className="relative group">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">نوع الزبون</label>
              <div className="relative">
                <select name="clientType" value={data.clientType} onChange={handleChange} className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none bg-white appearance-none">
                  <option value="family">عائلة (Family)</option>
                  <option value="couple">زوجين (Couple)</option>
                  <option value="mixed">مختلط (Mixed)</option>
                  <option value="singles">شباب/عزاب (Singles)</option>
                </select>
                <span className="absolute right-3 top-2.5 text-gray-400">👥</span>
                <span className="absolute left-3 top-3 text-gray-400 text-xs">▼</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Dates & Time */}
        <section className="space-y-4">
          <h4 className="text-sm uppercase tracking-wide text-gray-400 font-bold border-b border-gray-100 pb-2">التواريخ والأوقات</h4>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">تاريخ الدخول</label>
              <input type="text" name="checkInDate" value={data.checkInDate} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none text-center font-medium" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">تاريخ الخروج</label>
              <input type="text" name="checkOutDate" value={data.checkOutDate} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none text-center font-medium" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
             <div className="relative">
               <label className="text-xs font-semibold text-gray-400 mb-1 block">ساعة الدخول</label>
               <input type="text" name="checkInTime" value={data.checkInTime} onChange={handleChange} className="w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm text-center" />
             </div>
             <div className="relative">
               <label className="text-xs font-semibold text-gray-400 mb-1 block">ساعة الخروج</label>
               <input type="text" name="checkOutTime" value={data.checkOutTime} onChange={handleChange} className="w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm text-center" />
             </div>
          </div>
        </section>

        {/* Section 3: Amenities & Rules */}
        <section className="space-y-4">
           <h4 className="text-sm uppercase tracking-wide text-gray-400 font-bold border-b border-gray-100 pb-2">المزايا والشروط</h4>
           
           <div>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">المزايا (اختر لإضافة المزيد)</label>
            <input type="text" name="amenities" value={data.amenities} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none mb-3" />
            <div className="flex flex-wrap gap-2">
              {COMMON_AMENITIES.map(amenity => (
                <button 
                  key={amenity}
                  onClick={() => handleChipClick('amenities', amenity)}
                  className="text-xs bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-600 py-1.5 px-3 rounded-full transition-colors border border-transparent hover:border-green-200"
                >
                  + {amenity}
                </button>
              ))}
            </div>
           </div>

           <div>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">القواعد (اختر لإضافة المزيد)</label>
            <textarea name="rules" rows={2} value={data.rules} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none resize-none mb-3" />
            <div className="flex flex-wrap gap-2">
              {COMMON_RULES.map(rule => (
                <button 
                  key={rule}
                  onClick={() => handleChipClick('rules', rule)}
                  className="text-xs bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-600 py-1.5 px-3 rounded-full transition-colors border border-transparent hover:border-red-200"
                >
                  + {rule}
                </button>
              ))}
            </div>
           </div>
        </section>

        {/* Section 4: Price */}
        <section className="bg-green-50 p-5 rounded-xl border border-green-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-green-800 font-bold text-sm">التسعير</h4>
            <span className="text-green-600 text-xs bg-white px-2 py-1 rounded-md border border-green-200 shadow-sm">{data.guests} أشخاص</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-green-700 mb-1 block">الثمن (لليلة)</label>
              <div className="relative">
                <input type="number" name="pricePerNight" value={data.pricePerNight} onChange={handleChange} className="w-full pl-12 pr-4 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none font-bold text-green-900" />
                <span className="absolute left-3 top-2.5 text-xs text-green-600 font-bold">درهم</span>
              </div>
            </div>
             <div>
              <label className="text-xs font-semibold text-green-700 mb-1 block">عدد الأشخاص</label>
              <input type="number" name="guests" value={data.guests} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none font-bold text-green-900" />
            </div>
          </div>
        </section>

        {/* Alternative Offer */}
        {data.availability === 'unavailable' && (
          <div className="animate-fade-in bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <label className="block text-sm font-medium text-yellow-800 mb-1">اقتراح بديل</label>
            <input type="text" name="alternativeOffer" value={data.alternativeOffer} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none bg-white" />
          </div>
        )}

      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-whatsapp-600 to-whatsapp-500 hover:from-whatsapp-900 hover:to-whatsapp-600 text-white font-bold text-lg shadow-lg shadow-green-200 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري صياغة الرد...
            </>
          ) : (
            <>
              <span>✨</span>
              إنشاء الرد (Generate)
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;