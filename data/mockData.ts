import { Transaction, DonorDistribution } from '../types';

// Mock transactions for real-time updates
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'mal',
    amount: 2500000,
    date: '2023-05-15T09:30:00Z',
    userId: 'user1',
  },
  {
    id: '2',
    type: 'fitrah',
    amount: 45000,
    date: '2023-05-16T14:20:00Z',
    userId: 'user2',
  },
  {
    id: '3',
    type: 'mal',
    amount: 5000000,
    date: '2023-05-17T11:45:00Z',
    userId: 'user3',
  },
  {
    id: '4',
    type: 'fitrah',
    amount: 50000,
    date: '2023-05-18T16:10:00Z',
    userId: 'user4',
  },
  {
    id: '5',
    type: 'mal',
    amount: 3750000,
    date: '2023-05-19T10:05:00Z',
    userId: 'user5',
  },
];

// Mock donor distribution data
export const mockDonorDistribution: DonorDistribution[] = [
  { region: 'Jakarta', count: 250 },
  { region: 'Bandung', count: 180 },
  { region: 'Surabaya', count: 150 },
  { region: 'Yogyakarta', count: 120 },
  { region: 'Makassar', count: 90 },
  { region: 'Medan', count: 85 },
  { region: 'Palembang', count: 70 },
  { region: 'Semarang', count: 65 },
];

// Previous zakat payment for prefill
export const previousZakatMal = {
  assets: 100000000,
  debts: 20000000,
  amount: 2000000,
};

export const previousZakatFitrah = {
  familyMembers: 4,
  ricePrice: 15000,
  amount: 60000,
};

// Nisab threshold (85 grams of gold)
export const goldPricePerGram = 1000000; // Rp 1,000,000 per gram
export const nisabThreshold = 85 * goldPricePerGram; // 85 grams of gold