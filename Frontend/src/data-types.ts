export interface Student {
  _id: any;
  name: string;
  course: string;
  fee: string;
  image: string;
}

export interface PcComponent {
  _id: string;
  name: string;
  category: string;
  manufacturer: string;
  specifications: { spec: string; value: string; }[];
  description: string;
}