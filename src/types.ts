export enum Category {
  ILLUSTRATION = '插畫',
  PHOTOGRAPHY = '攝影',
  TATTOO = '刺青設計'
}

export interface Work {
  id: string;
  title: string;
  englishTitle: string;
  year: number;
  category: Category;
  imageUrl: string;
}
