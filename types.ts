export interface RentalData {
  availability: 'available' | 'unavailable';
  city: string;
  landmark: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  clientType: 'family' | 'couple' | 'mixed' | 'singles';
  roomsSetup: string;
  amenities: string;
  pricePerNight: number;
  checkInTime: string;
  checkOutTime: string;
  depositPolicy: string;
  rules: string;
  alternativeOffer: string;
}

export const DEFAULT_RENTAL_DATA: RentalData = {
  availability: 'available',
  city: 'الحسيمة',
  landmark: 'قريب للكورنيش',
  checkInDate: new Date().toLocaleDateString('en-GB').slice(0, 5), // DD/MM format roughly
  checkOutDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString('en-GB').slice(0, 5),
  guests: 4,
  clientType: 'family',
  roomsSetup: '2 غرف + صالون',
  amenities: 'واي فاي، باركينغ، سخان، تكييف',
  pricePerNight: 450,
  checkInTime: '14:00',
  checkOutTime: '12:00',
  depositPolicy: 'عربون 200 درهم للتأكيد، والباقي عند الدخول',
  rules: 'للعائلات فقط، ممنوع الحفلات، البطاقة الوطنية ضرورية',
  alternativeOffer: 'نقدر نقترح شقة قريبة وبنفس الثمن تقريباً'
};