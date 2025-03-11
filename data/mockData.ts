import { Transaction } from "../types";

// Mock data for the Zakat app

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "mal",
    amount: 2500000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    userId: "user1",
  },
  {
    id: "2",
    type: "fitrah",
    amount: 35000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    userId: "user2",
  },
  {
    id: "3",
    type: "mal",
    amount: 1750000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    userId: "user3",
  },
  {
    id: "4",
    type: "fitrah",
    amount: 140000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    userId: "user4",
  },
  {
    id: "5",
    type: "mal",
    amount: 5000000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    userId: "user5",
  },
  {
    id: "6",
    type: "fitrah",
    amount: 70000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    userId: "user6",
  },
];

// Mock donor distribution
export const mockDonorDistribution = [
  { region: "Jakarta", count: 250 },
  { region: "Jawa Barat", count: 180 },
  { region: "Jawa Tengah", count: 150 },
  { region: "Jawa Timur", count: 120 },
  { region: "Sumatera", count: 100 },
  { region: "Kalimantan", count: 80 },
  { region: "Sulawesi", count: 70 },
  { region: "Bali & Nusa Tenggara", count: 50 },
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
    id: "user1",
    name: "Ahmad Fauzi",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "user2",
    name: "Siti Rahma",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "user3",
    name: "Budi Santoso",
    photoUrl: "https://randomuser.me/api/portraits/men/62.jpg",
  },
  {
    id: "user4",
    name: "Dewi Lestari",
    photoUrl: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: "user5",
    name: "Rudi Hermawan",
    photoUrl: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "user6",
    name: "Rina Wati",
    photoUrl: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

// Mock doas
export const mockDoas = [
  {
    id: "doa1",
    text: "Ya Allah, berikanlah kesehatan kepada seluruh keluargaku dan lindungilah mereka dari segala penyakit. Aamiin.",
    userId: "user1",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    ameenCount: 24,
    isAmeen: false,
    templateBackground: "#1E88E5",
  },
  {
    id: "doa2",
    text: "Ya Allah, permudahkanlah segala urusan kami dan berikanlah rezeki yang halal dan berkah. Aamiin.",
    userId: "user2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    ameenCount: 42,
    isAmeen: true,
  },
  {
    id: "doa3",
    text: "Ya Allah, jadikanlah kami termasuk orang-orang yang selalu bersyukur atas nikmat-Mu. Aamiin.",
    userId: "user3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    ameenCount: 18,
    isAmeen: false,
    templateBackground: "#43A047",
  },
  {
    id: "doa4",
    text: "Ya Allah, ampunilah dosa-dosa kami, kedua orang tua kami, dan seluruh umat Islam. Aamiin.",
    userId: "user4",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    ameenCount: 56,
    isAmeen: true,
  },
  {
    id: "doa5",
    text: "Ya Allah, berikanlah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa neraka. Aamiin.",
    userId: "user5",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    ameenCount: 37,
    isAmeen: false,
    templateBackground: "#E53935",
  },
  {
    id: "doa6",
    text: "Ya Allah, jadikanlah Al-Quran sebagai penerang hati kami dan penyembuh segala penyakit. Aamiin.",
    userId: "user1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    ameenCount: 29,
    isAmeen: true,
    templateId: "template1",
  },
  {
    id: "doa7",
    text: "Ya Allah, kuatkanlah iman kami dan teguhkanlah pendirian kami dalam menegakkan agama-Mu. Aamiin.",
    userId: "user1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    ameenCount: 45,
    isAmeen: false,
    templateId: "template2",
    templateBackground: "#7B1FA2",
  },
];

// Mock templates for doa backgrounds
export const mockTemplates = [
  {
    id: "1",
    background: "#1E88E5", // Blue
  },
  {
    id: "2",
    background: "#43A047", // Green
  },
  {
    id: "3",
    background: "#E53935", // Red
  },
  {
    id: "4",
    background: "#7B1FA2", // Purple
  },
  {
    id: "5",
    background: "#FB8C00", // Orange
  },
  {
    id: "6",
    background: "linear-gradient(45deg, #1E88E5, #43A047)", // Blue to Green gradient
  },
];

// Mock articles
export const mockArticles = [
  {
    id: "article1",
    title: "Pentingnya Zakat dalam Kehidupan Muslim Modern",
    content:
      "Zakat merupakan salah satu rukun Islam yang wajib dilaksanakan oleh setiap Muslim yang mampu. Di era modern ini, menunaikan zakat menjadi lebih mudah dengan adanya platform digital...",
    category: "Zakat",
    author: "Dr. Ahmad Syafii",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    imageUrl:
      "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["zakat", "islam", "rukun islam"],
  },
  {
    id: "article2",
    title: "Cara Menghitung Zakat Mal dengan Benar",
    content:
      "Zakat mal atau zakat harta adalah zakat yang dikeluarkan atas harta yang dimiliki oleh seorang Muslim ketika telah mencapai nisab dan haul. Berikut adalah panduan lengkap cara menghitung zakat mal...",
    category: "Tutorial",
    author: "Ustadz Yusuf Mansur",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["zakat mal", "tutorial", "hitung zakat"],
  },
  {
    id: "article3",
    title: "Perbedaan Zakat, Infaq, dan Sedekah",
    content:
      "Meskipun sama-sama merupakan bentuk ibadah dalam memberikan harta, zakat, infaq, dan sedekah memiliki perbedaan mendasar. Artikel ini akan menjelaskan perbedaan ketiganya secara detail...",
    category: "Edukasi",
    author: "Ustadzah Oki Setiana Dewi",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["zakat", "infaq", "sedekah", "perbedaan"],
  },
  {
    id: "article4",
    title: "Dampak Zakat terhadap Pengentasan Kemiskinan",
    content:
      "Penelitian terbaru menunjukkan bahwa zakat memiliki dampak signifikan dalam upaya pengentasan kemiskinan. Dengan pengelolaan yang baik, zakat dapat menjadi instrumen ekonomi yang efektif...",
    category: "Ekonomi",
    author: "Prof. Dr. Didin Hafidhuddin",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    imageUrl:
      "https://images.unsplash.com/photo-1518398046578-8cca57782e17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["zakat", "kemiskinan", "ekonomi islam"],
  },
  {
    id: "article5",
    title: "Zakat di Era Digital: Peluang dan Tantangan",
    content:
      "Perkembangan teknologi membawa perubahan dalam berbagai aspek kehidupan, termasuk dalam pengelolaan zakat. Era digital membuka peluang sekaligus tantangan baru dalam optimalisasi zakat...",
    category: "Teknologi",
    author: "Dr. Irfan Syauqi Beik",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["zakat digital", "teknologi", "fintech"],
  },
];

// Mock quotes
export const mockQuotes = [
  {
    id: "quote1",
    text: "Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka.",
    author: "QS. At-Taubah: 103",
  },
  {
    id: "quote2",
    text: "Tangan di atas lebih baik daripada tangan di bawah.",
    author: "HR. Bukhari dan Muslim",
  },
  {
    id: "quote3",
    text: "Sedekah tidak akan mengurangi harta. Dan tidaklah seorang hamba memaafkan, melainkan Allah akan menambahkan kemuliaan baginya.",
    author: "HR. Muslim",
  },
  {
    id: "quote4",
    text: "Kekayaan yang sebenarnya bukanlah dengan banyaknya harta dunia, tetapi kekayaan yang hakiki adalah kaya hati.",
    author: "HR. Bukhari dan Muslim",
  },
  {
    id: "quote5",
    text: "Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.",
    author: "HR. Bukhari dan Muslim",
  },
  {
    id: "quote6",
    text: "Sesungguhnya Allah tidak melihat kepada rupa dan harta kalian, tetapi Dia melihat kepada hati dan amal kalian.",
    author: "HR. Muslim",
  },
  {
    id: "quote7",
    text: "Orang yang bersedekah dengan tangan kanannya hingga tangan kirinya tidak mengetahui apa yang disedekahkan tangan kanannya.",
    author: "HR. Bukhari dan Muslim",
  },
];
