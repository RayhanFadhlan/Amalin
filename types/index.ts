export interface Transaction {
  id: string;
  type: 'mal' | 'fitrah';
  amount: number;
  date: string;
  userId: string;
}

export interface DonorDistribution {
  region: string;
  count: number;
}

export interface ZakatCalculation {
  type: 'mal' | 'fitrah';
  amount: number;
  nisab?: number;
  isEligible?: boolean;
}