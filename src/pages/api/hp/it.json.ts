import type { HpContent } from '../../../@types/hp';

export const itHpContent: Readonly<HpContent> = {
  title: 'Il meetup Javascript di Roma!',
  description: 'online & in presenza il terzo mercoledì del mese',
  sections: [
    {
      heading: 'Coming up next',
      body: 'fp-ts spiegato a mio figlio di Emanuele De Cupis 15 Giugno 2022',
      cta: { href: 'dsds', text: 'Registrati' },
    },
    {
      heading: 'Last meetup',
      body: 'fp-ts spiegato a mio figlio di Emanuele De Cupis 15 Giugno 2022',
      cta: {
        href: 'https://www.youtube.com/watch?v=2Vp1ATBkdIQ',
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
