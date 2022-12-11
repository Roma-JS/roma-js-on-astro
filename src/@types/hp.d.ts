export interface Link {
  href: string;
  text: string;
  lang?: string;
}

export interface HpSection {
  heading: string;
  body: string;
  cta?: Link;
}

export interface HpContent {
  title: string;
  description: string;
  sections: HpSection[];
}
