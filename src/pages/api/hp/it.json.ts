import type { HpContent } from '../../../@types/hp';

export const itHpContent: Readonly<HpContent> = {
  title: 'Il meetup Javascript di Roma!',
  description: 'online & in presenza il terzo mercoledì del mese',
  sections: [
    {
      heading: 'Coming up next',
      body: 'Astro, con Fabio Biondi - RomaJS #AperiTech Natalizio 2022',
      cta: {
        href: 'https://events.codemotion.com/?city=Roma&type=meetup',
        text: 'Registrati',
      },
    },
    {
      heading: 'Last meetup',
      body: 'La nostra esperienza con TailwindCSS',
      cta: {
        href: 'https://www.youtube.com/watch?v=S6gUGJLJ5tA',
        text: 'Guarda la registrazione',
      },
    },
  ],
};

export async function get() {
  return {
    body: JSON.stringify(itHpContent),
  };
}
