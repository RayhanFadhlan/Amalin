// Mock data for the Zakat app

// Mock transactions
export const mockTransactions = [
  {
    id: '1',
    type: 'mal',
    amount: 2500000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    userId: 'user1',
  },
  {
    id: '2',
    type: 'fitrah',
    amount: 35000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    userId: 'user2',
  },
  {
    id: '3',
    type: 'mal',
    amount: 1750000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    userId: 'user3',
  },
  {
    id: '4',
    type: 'fitrah',
    amount: 140000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    userId: 'user4',
  },
  {
    id: '5',
    type: 'mal',
    amount: 5000000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    userId: 'user5',
  },
  {
    id: '6',
    type: 'fitrah',
    amount: 70000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    userId: 'user6',
  },
];

// Mock donor distribution
export const mockDonorDistribution = [
  { region: 'Jakarta', count: 250 },
  { region: 'Jawa Barat', count: 180 },
  { region: 'Jawa Tengah', count: 150 },
  { region: 'Jawa Timur', count: 120 },
  { region: 'Sumatera', count: 100 },
  { region: 'Kalimantan', count: 80 },
  { region: 'Sulawesi', count: 70 },
  { region: 'Bali & Nusa Tenggara', count: 50 },
];

// Gold price and nisab threshold
export const goldPricePerGram = 1050000; // Rp 1,050,000 per gram
export const nisabThreshold = goldPricePerGram * 85; // 85 grams of gold

// Previous zakat mal data
export const previousZakatMal = {
  assets: 100000000, // Rp 100,000,000
  debts: 20000000, // Rp 20,000,000
};

// Previous zakat fitrah data
export const previousZakatFitrah = {
  familyMembers: 4,
  ricePrice: 15000, // Rp 15,000 per kg
};

// Mock users
export const mockUsers = [
  {
    id: 'user1',
    name: 'Ahmad Fauzi',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'user2',
    name: 'Siti Rahma',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'user3',
    name: 'Budi Santoso',
    photoUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
  {
    id: 'user4',
    name: 'Dewi Lestari',
    photoUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    id: 'user5',
    name: 'Rudi Hermawan',
    photoUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: 'user6',
    name: 'Rina Wati',
    photoUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
];

// Mock doas
export const mockDoas = [
  {
    id: 'doa1',
    text: 'Ya Allah, berikanlah kesehatan kepada seluruh keluargaku dan lindungilah mereka dari segala penyakit. Aamiin.',
    userId: 'user1',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    ameenCount: 24,
    isAmeen: false,
    templateBackground: '#1E88E5',
  },
  {
    id: 'doa2',
    text: 'Ya Allah, permudahkanlah segala urusan kami dan berikanlah rezeki yang halal dan berkah. Aamiin.',
    userId: 'user2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    ameenCount: 42,
    isAmeen: true,
  },
  {
    id: 'doa3',
    text: 'Ya Allah, jadikanlah kami termasuk orang-orang yang selalu bersyukur atas nikmat-Mu. Aamiin.',
    userId: 'user3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    ameenCount: 18,
    isAmeen: false,
    templateBackground: '#43A047',
  },
  {
    id: 'doa4',
    text: 'Ya Allah, ampunilah dosa-dosa kami, kedua orang tua kami, dan seluruh umat Islam. Aamiin.',
    userId: 'user4',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    ameenCount: 56,
    isAmeen: true,
  },
  {
    id: 'doa5',
    text: 'Ya Allah, berikanlah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa neraka. Aamiin.',
    userId: 'user5',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    ameenCount: 37,
    isAmeen: false,
    templateBackground: '#E53935',
  },
  {
    id: 'doa6',
    text: 'Ya Allah, jadikanlah Al-Quran sebagai penerang hati kami dan penyembuh segala penyakit. Aamiin.',
    userId: 'user1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    ameenCount: 29,
    isAmeen: true,
    templateId: 'template1',
  },
  {
    id: 'doa7',
    text: 'Ya Allah, kuatkanlah iman kami dan teguhkanlah pendirian kami dalam menegakkan agama-Mu. Aamiin.',
    userId: 'user1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    ameenCount: 45,
    isAmeen: false,
    templateId: 'template2',
    templateBackground: '#7B1FA2',
  },
];

// Mock templates for doa backgrounds
export const mockTemplates = [
  {
    id: '1',
    background: '#1E88E5', // Blue
  },
  {
    id: '2',
    background: '#43A047', // Green
  },
  {
    id: '3',
    background: '#E53935', // Red
  },
  {
    id: '4',
    background: '#7B1FA2', // Purple
  },
  {
    id: '5',
    background: '#FB8C00', // Orange
  },
  {
    id: '6',
    background: 'linear-gradient(45deg, #1E88E5, #43A047)', // Blue to Green gradient
  },
];