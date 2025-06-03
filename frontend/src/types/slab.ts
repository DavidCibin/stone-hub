export interface Slab {
  id: string;
  name: string;
  material: string;
  finish: string;
  thickness: number;
  dimensions: {
    width: number;
    height: number;
  };
  country: string;
  useCases: string[];
  pricePerSqFt: number;
  imageUrl: string;
  available: boolean;
  colors: string[];
  description?: string;
}
