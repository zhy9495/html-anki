export interface OpmlNode {
  id: string;
  text: string;
  formattedText: string;
  children: OpmlNode[];
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  formattedFront: string;
  formattedBack: string;
}

export type Step = {
  number: number;
  name: string;
  description: string;
};