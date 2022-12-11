import type { HpContent } from '../../../@types/hp';

export const enHpContent: Readonly<HpContent> = {
  title: 'The Javascript meetup in Rome!',
  description: 'offline and online every 3rd Wednesday of the month',
  sections: [
    {
      heading: 'Coming up next',
      body: 'Astro with Fabio Biondi - RomaJS #AperiTech Xmas 2022',
      cta: {
        href: 'https://www.youtube.com/watch?v=2Vp1ATBkdIQ',
        text: 'Register',
      },
    },
    {
      heading: 'Last meetup',
      body: 'Our experience with TailwindCSS',
      cta: {
        href: 'https://www.youtube.com/watch?v=S6gUGJLJ5tA',
        text: 'Watch the VOD',
      },
    },
  ],
};

export async function get() {
  return {
    body: JSON.stringify(enHpContent),
  };
}
