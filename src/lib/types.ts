export interface AssetPrice {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  changePct24h: number;
  sparkline: number[];
  lastUpdated: string;
  isDelayed?: boolean;
}

export interface FearGaugeData {
  score: number;
  label: 'Calm' | 'Cautious' | 'Fear';
  components: {
    gold: number;
    dxy: number;
    chf: number;
    jpy: number;
  };
  lastUpdated: string;
}
