---
title: 'Node.js: più thread di quelli che immagini'
author: 'Paolo Insogna'
website: 'https://it.linkedin.com/in/pinsogna'
categories: ['Javascript', 'NodeJS', 'Threads']
lang: it
---

Nel 2009 Node.js è stato presentato come un runtime JavaScript single thread e per quasi 10 anni abbiamo dovuto sentire “eh, non lo uso perché è single thread…” (leggi con accento milanese).

Nel 2018, però, è diventato multi-thread ma nessuno sembra essersene accorto.

In questo talk scopriremo il modulo [worker_threads](https://nodejs.org/docs/latest-v22.x/api/worker_threads.html), come usarlo, per quali situazioni può esserci utile e qual è il modo migliore per far comunicare due thread.
