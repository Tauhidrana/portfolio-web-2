export interface RatingBand {
  from: number;
  to: number;
  label: string;
  color: string;
}

export interface RatingScale {
  platform: string;
  handle: string;
  href: string;
  current: number;
  peak: number;
  rank: string;
  max: number;
  bands: RatingBand[];
  note: string;
}

export interface Photo {
  src: string;
  caption: string;
}

export interface SummitEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  organizer: string;
  description: string;
  photos: Photo[];
}
