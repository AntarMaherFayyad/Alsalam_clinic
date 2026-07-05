// ===== TYPES =====
export interface Doctor {
  name: string
  title: string
  specialty: string
  bio: string
  experience: number
  education: Education[]
  certifications: string[]
  image: string
}

export interface Education {
  degree: string
  university: string
  year: number
}

export interface Service {
  id: string
  title: string
  description: string
  longDescription: string
  price?: number
  image: string
  icon: string
  visible: boolean
}

export interface WorkingHours {
  day: string
  open: boolean
  from?: string
  to?: string
}

export interface Appointment {
  id: string
  patientName: string
  phone: string
  email: string
  date: string
  time: string
  reason: string
  serviceId?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  image?: string
  approved: boolean
  date: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  published: boolean
  createdAt: string
  metaTitle?: string
  metaDescription?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
}

export interface GalleryItem {
  id: string
  title: string
  image: string
  album: string
}

export interface Message {
  id: string
  name: string
  phone: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  specialty?: string
  image: string
}

export interface SiteSettings {
  doctorName: string
  clinicName: string
  phone: string
  whatsapp: string
  email: string
  address: string
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  tiktok?: string
  linkedin?: string
  googleMapsEmbed?: string
  primaryColor: string
}

// ===== MOCK DATA =====

export const doctor: Doctor = {
  name: 'د. أحمد محمد السالم',
  title: 'استشاري أمراض الباطنة والأمراض المزمنة',
  specialty: 'الباطنة والأمراض المزمنة',
  bio: 'طبيب متخصص في أمراض الباطنة والأمراض المزمنة مع خبرة واسعة تمتد لأكثر من 15 عاماً في تشخيص وعلاج الأمراض الداخلية. يؤمن الدكتور أحمد بتقديم رعاية صحية شاملة ومتكاملة للمرضى، مستعيناً بأحدث الأجهزة والتقنيات الطبية.',
  experience: 15,
  education: [
    { degree: 'بكالوريوس الطب والجراحة', university: 'جامعة القاهرة', year: 2005 },
    { degree: 'ماجستير في الطب الباطني', university: 'جامعة عين شمس', year: 2010 },
    { year: 2013, degree: 'زمالة الكلية الملكية للأطباء', university: 'جامعة لندن - المملكة المتحدة' },
  ],
  certifications: [
    'زمالة الكلية الملكية للأطباء - لندن',
    'بورد عربي في الطب الباطني',
    'شهادة متقدمة في علاج الأمراض المزمنة',
    'عضو الجمعية السعودية للطب الباطني',
  ],
  image: '/images/doctor.png',
}

export const services: Service[] = [
  {
    id: 'service-1',
    title: 'الكشف العام',
    description: 'فحص شامل للحالة الصحية العامة وتشخيص الأمراض',
    longDescription: 'نقدم خدمة الكشف العام الشامل للمرضى حيث يتم إجراء فحص دقيق للحالة الصحية العامة وتشخيص الأمراض والحالات الصحية المختلفة. يشمل الكشف مراجعة التاريخ الطبي والفحص السريري الكامل.',
    price: 150,
    image: '/images/clinic.png',
    icon: 'Stethoscope',
    visible: true,
  },
  {
    id: 'service-2',
    title: 'متابعة الأمراض المزمنة',
    description: 'رعاية متكاملة لمرضى السكر والضغط والأمراض المزمنة',
    longDescription: 'برنامج متكامل لمتابعة المرضى المصابين بالأمراض المزمنة مثل السكري وضغط الدم وأمراض القلب. يشمل البرنامج خطة علاجية شاملة ومتابعة دورية منتظمة.',
    price: 120,
    image: '/images/clinic.png',
    icon: 'HeartPulse',
    visible: true,
  },
  {
    id: 'service-3',
    title: 'الاستشارات الطبية',
    description: 'استشارات متخصصة في الطب الباطني والأمراض الداخلية',
    longDescription: 'نوفر استشارات طبية متخصصة من قِبل أطباء ذوي خبرة عالية في مجال الطب الباطني. سواء كانت استشارة حضورية أو عن بُعد، نضمن لك الحصول على التوجيه الطبي الصحيح.',
    price: 100,
    image: '/images/clinic.png',
    icon: 'MessageSquare',
    visible: true,
  },
  {
    id: 'service-4',
    title: 'تحاليل الدم والمختبر',
    description: 'جميع أنواع التحاليل المخبرية بدقة عالية وسرعة في النتائج',
    longDescription: 'مختبر طبي مجهز بأحدث الأجهزة لإجراء جميع أنواع التحاليل الطبية. نضمن دقة النتائج وسرعة تسليمها مع شرح وافٍ من الطبيب.',
    price: 80,
    image: '/images/clinic.png',
    icon: 'FlaskConical',
    visible: true,
  },
  {
    id: 'service-5',
    title: 'الإجراءات الطبية البسيطة',
    description: 'إجراء التدخلات والإجراءات الطبية اليومية بأمان تام',
    longDescription: 'نقدم مجموعة من الإجراءات الطبية البسيطة كالحقن، تضميد الجروح، والفحوصات الموجية بإشراف طبيب متخصص وفريق تمريض مدرب.',
    price: 200,
    image: '/images/clinic.png',
    icon: 'Syringe',
    visible: true,
  },
  {
    id: 'service-6',
    title: 'متابعة ما بعد الجراحة',
    description: 'رعاية ومتابعة المرضى في مرحلة التعافي بعد العمليات',
    longDescription: 'خدمة متخصصة لمتابعة المرضى في مرحلة التعافي بعد العمليات الجراحية، تشمل مراقبة الجروح وضبط الأدوية والتأكد من سير عملية الشفاء بشكل طبيعي.',
    price: 130,
    image: '/images/clinic.png',
    icon: 'Bandage',
    visible: true,
  },
]

export const workingHours: WorkingHours[] = [
  { day: 'الأحد', open: true, from: '09:00', to: '17:00' },
  { day: 'الاثنين', open: true, from: '09:00', to: '17:00' },
  { day: 'الثلاثاء', open: true, from: '09:00', to: '17:00' },
  { day: 'الأربعاء', open: true, from: '09:00', to: '13:00' },
  { day: 'الخميس', open: true, from: '09:00', to: '17:00' },
  { day: 'الجمعة', open: false },
  { day: 'السبت', open: true, from: '10:00', to: '15:00' },
]

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'محمد عبدالله',
    rating: 5,
    comment: 'دكتور ممتاز ومتمكن في مجاله. شرح لي حالتي بتفصيل وأعطاني خطة علاجية واضحة. أنصح الجميع بزيارته.',
    approved: true,
    date: '2024-12-10',
  },
  {
    id: 't-2',
    name: 'سارة أحمد',
    rating: 5,
    comment: 'تجربة رائعة من البداية للنهاية. الدكتور صبور ومستمع جيد، والعيادة نظيفة ومنظمة. شكراً على الاهتمام.',
    approved: true,
    date: '2024-11-25',
  },
  {
    id: 't-3',
    name: 'خالد المنصور',
    rating: 5,
    comment: 'أتابع مع الدكتور أحمد منذ 3 سنوات لمرض السكر. متابعته دقيقة ومنتظمة وتحسنت حالتي بشكل ملحوظ.',
    approved: true,
    date: '2024-11-15',
  },
  {
    id: 't-4',
    name: 'نورة العتيبي',
    rating: 4,
    comment: 'دكتور محترف ومتميز. وقت الانتظار معقول والموظفون لطيفون. سعيدة بالخدمة المقدمة.',
    approved: true,
    date: '2024-10-30',
  },
]

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'كيف يمكنني حجز موعد؟',
    answer: 'يمكنك حجز موعد من خلال نموذج الحجز الموجود في الموقع، أو عبر الاتصال بنا هاتفياً، أو من خلال واتساب. سنقوم بتأكيد موعدك في أقرب وقت.',
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'ما هي أوقات عمل العيادة؟',
    answer: 'تعمل العيادة من الأحد إلى الخميس من الساعة 9 صباحاً حتى 5 مساءً، والسبت من 10 صباحاً حتى 3 مساءً. العيادة مغلقة يوم الجمعة.',
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'هل يمكن إجراء استشارة عن بُعد؟',
    answer: 'نعم، نوفر خدمة الاستشارات الطبية عن بُعد عبر المكالمات المرئية. يمكنك التواصل معنا لترتيب موعد للاستشارة الإلكترونية.',
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'هل يقبل الدكتور تأمينات طبية؟',
    answer: 'نعم، نقبل معظم شركات التأمين الطبي الكبرى. يُرجى التواصل معنا مسبقاً للتأكد من قبول تأمينك قبل الحجز.',
    order: 4,
  },
  {
    id: 'faq-5',
    question: 'ماذا يجب أن أحضر معي في الزيارة الأولى؟',
    answer: 'يُرجى إحضار بطاقة الهوية، بطاقة التأمين الصحي إن وجدت، نتائج أي تحاليل أو أشعة سابقة، وقائمة بالأدوية التي تتناولها حالياً.',
    order: 5,
  },
]

export const articles: Article[] = [
  {
    id: 'art-1',
    title: 'كيف تتحكم في مرض السكر وتعيش حياة طبيعية',
    slug: 'diabetes-management',
    excerpt: 'دليل شامل لمرضى السكري يتضمن أهم النصائح الغذائية وطرق ضبط مستوى الجلوكوز.',
    content: 'مرض السكري من أكثر الأمراض المزمنة انتشاراً في العالم. في هذا المقال نستعرض أهم الطرق للتحكم في المرض والعيش بحياة طبيعية...',
    image: '/images/clinic.png',
    category: 'أمراض مزمنة',
    tags: ['سكري', 'تغذية', 'رياضة'],
    published: true,
    createdAt: '2024-12-01',
    metaTitle: 'كيف تتحكم في مرض السكر - د. أحمد السالم',
    metaDescription: 'دليل شامل للتعامل مع مرض السكري ونصائح عملية للحياة الصحية',
  },
  {
    id: 'art-2',
    title: 'ضغط الدم المرتفع: الأسباب والعلاج والوقاية',
    slug: 'high-blood-pressure',
    excerpt: 'تعرف على الأسباب الرئيسية لارتفاع ضغط الدم وأهمية العلاج المبكر والتغييرات في نمط الحياة.',
    content: 'ارتفاع ضغط الدم من الأمراض الصامتة التي تؤثر على ملايين الأشخاص. سنتحدث في هذا المقال عن أسبابه وطرق علاجه والوقاية منه...',
    image: '/images/clinic.png',
    category: 'صحة القلب',
    tags: ['ضغط الدم', 'قلب', 'وقاية'],
    published: true,
    createdAt: '2024-11-20',
    metaTitle: 'ضغط الدم المرتفع - د. أحمد السالم',
    metaDescription: 'كل ما تحتاج معرفته عن ارتفاع ضغط الدم وطرق العلاج',
  },
  {
    id: 'art-3',
    title: 'أهمية الفحص الدوري في الكشف المبكر عن الأمراض',
    slug: 'periodic-checkup-importance',
    excerpt: 'لماذا يُعد الفحص الدوري ضرورة وليس رفاهية؟ اكتشف كيف يمكن للفحص المبكر إنقاذ حياتك.',
    content: 'الكشف المبكر عن الأمراض هو مفتاح نجاح العلاج. يُوصى الأطباء بإجراء فحوصات دورية منتظمة لاكتشاف أي تغييرات في الجسم مبكراً...',
    image: '/images/clinic.png',
    category: 'الوقاية والصحة',
    tags: ['فحص دوري', 'كشف مبكر', 'وقاية'],
    published: true,
    createdAt: '2024-11-05',
  },
]

export const galleryItems: GalleryItem[] = [
  { id: 'g-1', title: 'غرفة الكشف', image: '/images/clinic.png', album: 'العيادة' },
  { id: 'g-2', title: 'غرفة الانتظار', image: '/images/clinic.png', album: 'العيادة' },
  { id: 'g-3', title: 'مختبر التحاليل', image: '/images/clinic.png', album: 'الأجهزة' },
  { id: 'g-4', title: 'الدكتور مع الفريق', image: '/images/clinic.png', album: 'الفريق' },
  { id: 'g-5', title: 'الاستقبال', image: '/images/clinic.png', album: 'العيادة' },
  { id: 'g-6', title: 'غرفة الإجراءات', image: '/images/clinic.png', album: 'الأجهزة' },
]

export const teamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'د. أحمد محمد السالم', role: 'استشاري', specialty: 'الباطنة والأمراض المزمنة', image: '/images/doctor.png' },
  { id: 'tm-2', name: 'أ. فاطمة العمري', role: 'مساعدة طبيب', specialty: 'التمريض', image: '/images/clinic.png' },
  { id: 'tm-3', name: 'أ. علي الزهراني', role: 'مسؤول المختبر', specialty: 'التحاليل المخبرية', image: '/images/clinic.png' },
  { id: 'tm-4', name: 'أ. منى الشمري', role: 'موظفة استقبال', image: '/images/clinic.png' },
]

export const siteSettings: SiteSettings = {
  doctorName: 'د. أحمد محمد السالم',
  clinicName: 'عيادة السالم الطبية',
  phone: '+966 50 123 4567',
  whatsapp: '+966501234567',
  email: 'info@drsalem.com',
  address: 'الرياض، حي النزهة، شارع الأمير محمد بن عبدالعزيز',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  tiktok: 'https://tiktok.com',
  linkedin: 'https://linkedin.com',
  primaryColor: '#0d9488',
}

export const appointments: Appointment[] = [
  {
    id: 'apt-1',
    patientName: 'محمد علي',
    phone: '0501234567',
    email: 'mohammed@email.com',
    date: '2024-12-20',
    time: '09:00',
    reason: 'متابعة ضغط الدم',
    serviceId: 'service-2',
    status: 'confirmed',
    createdAt: '2024-12-15',
  },
  {
    id: 'apt-2',
    patientName: 'سارة الأحمد',
    phone: '0559876543',
    email: 'sara@email.com',
    date: '2024-12-20',
    time: '10:00',
    reason: 'كشف عام',
    serviceId: 'service-1',
    status: 'pending',
    createdAt: '2024-12-16',
  },
  {
    id: 'apt-3',
    patientName: 'خالد محمد',
    phone: '0531112222',
    email: 'khalid@email.com',
    date: '2024-12-21',
    time: '11:00',
    reason: 'استشارة',
    serviceId: 'service-3',
    status: 'confirmed',
    createdAt: '2024-12-14',
  },
  {
    id: 'apt-4',
    patientName: 'نورة سعيد',
    phone: '0562223333',
    email: 'noura@email.com',
    date: '2024-12-19',
    time: '14:00',
    reason: 'تحاليل',
    serviceId: 'service-4',
    status: 'completed',
    createdAt: '2024-12-10',
  },
]

export const messages: Message[] = [
  {
    id: 'msg-1',
    name: 'أحمد العمري',
    phone: '0501234567',
    email: 'ahmed@email.com',
    subject: 'استفسار عن الخدمات',
    message: 'السلام عليكم، أريد الاستفسار عن أسعار تحاليل الدم الشاملة.',
    status: 'unread',
    createdAt: '2024-12-16',
  },
  {
    id: 'msg-2',
    name: 'هند القحطاني',
    phone: '0559998888',
    email: 'hind@email.com',
    subject: 'شكر وتقدير',
    message: 'شكراً جزيلاً للدكتور وطاقم العيادة على الخدمة الممتازة.',
    status: 'read',
    createdAt: '2024-12-15',
  },
]

// Available time slots
export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '13:00', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30',
]

export const articleCategories = ['الكل', 'أمراض مزمنة', 'صحة القلب', 'الوقاية والصحة', 'التغذية', 'نمط الحياة']
