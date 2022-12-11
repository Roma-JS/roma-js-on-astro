import type { HpContent } from '../../../@types/hp';

export const enHpContent: Readonly<HpContent> = {
  title: 'The Javascript meetup in Rome!',
  description: 'offline and online every 3rd Wednesday of the month',
  sections: [
    {
      heading: 'Coming up next',
      body: 'fp-ts explained to my son by Emanuele De Cupis, June 15th 2022',
      cta: {
        href: 'https://www.youtube.com/watch?v=2Vp1ATBkdIQ',
        text: 'Register',
      },
    },
    {
      heading: 'Last meetup',
      body: 'fp-ts explained to my son by Emanuele De Cupis, June 15th 2022',
      cta: {
        href: 'https://www.youtube.com/watch?v=2Vp1ATBkdIQ',
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
