(() => {
  // 1. Staggered Entrance & Scroll-Reveal Observer
  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    requestAnimationFrame(() => {
      revealElements.forEach((el) => observer.observe(el));
    });
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // 2. Auto-cycle the Autonomous Device Control 5-step sequential bar
  const simStatusText = document.getElementById('simStatusText');
  const simPills = Array.from(document.querySelectorAll('[data-sim-step]'));

  const SIM_MESSAGES = [
    '1/5 · Waking phone & opening WhatsApp',
    '2/5 · Sending custom {name} to Aarav Mehta (1/3)',
    '3/5 · Sending custom {name} to Sara Khan (2/3)',
    '4/5 · Sending custom {name} to Rohan Joshi (3/3)',
    '5/5 · Done! Closing WhatsApp & locking screen',
  ];

  let simIdx = 0;
  if (simStatusText && simPills.length > 0) {
    setInterval(() => {
      simIdx = (simIdx + 1) % SIM_MESSAGES.length;
      simPills.forEach((p, i) => {
        p.classList.toggle('is-current', i === simIdx);
      });
      simStatusText.classList.add('is-swapping');
      setTimeout(() => {
        simStatusText.textContent = SIM_MESSAGES[simIdx];
        simStatusText.classList.remove('is-swapping');
      }, 150);
    }, 2200);
  }

  // 4. Auto-cycle the Hero Phone Screen across the 4 app screenshots
  const heroScreenImg = document.getElementById('heroPhoneScreenImg');
  const SCREENS = [
    'assets/screen-broadcast.png',
    'assets/screen-live-send.png',
    'assets/screen-loved-ones.png',
    'assets/screen-setup.png',
  ];
  let screenIdx = 0;
  if (heroScreenImg) {
    setInterval(() => {
      screenIdx = (screenIdx + 1) % SCREENS.length;
      heroScreenImg.classList.add('is-swapping');
      setTimeout(() => {
        heroScreenImg.src = SCREENS[screenIdx];
        heroScreenImg.classList.remove('is-swapping');
      }, 180);
    }, 3600);
  }

  // 5. Auto-cycle Use Case 01 ({name} Broadcast bubble) & Use Case 02 (Loved Ones bubble)
  const broadcastWrap = document.getElementById('broadcastBubbleWrap');
  const broadcastText = document.getElementById('broadcastResolvedText');
  const broadcastMeta = document.getElementById('broadcastResolvedRecipient');
  const CLIENTS = [
    { name: 'Aarav Mehta', num: '1/48' },
    { name: 'Sara Khan', num: '2/48' },
    { name: 'Rohan Joshi', num: '3/48' },
    { name: 'Zoya Merchant', num: '4/48' },
  ];

  const occasionWrap = document.getElementById('occasionBubbleWrap');
  const occasionText = document.getElementById('occasionResolvedText');
  const occasionMeta = document.getElementById('occasionResolvedMeta');
  const OCCASIONS = [
    {
      msg: 'Happy Anniversary my love! Right on the dot ❤️',
      meta: 'Ayesha · 12:00 AM Yearly',
    },
    {
      msg: 'Happy Birthday Zaid! Wishing you health & big wins 🎂',
      meta: 'Zaid Bhai · 12:01 AM Birthday',
    },
    {
      msg: 'Good morning Ammi! Have a peaceful, blessed day ☀️',
      meta: 'Ammi & Abbu · 07:00 AM Daily',
    },
  ];

  let ucIdx = 0;
  setInterval(() => {
    ucIdx += 1;
    const c = CLIENTS[ucIdx % CLIENTS.length];
    const o = OCCASIONS[ucIdx % OCCASIONS.length];

    if (broadcastWrap) broadcastWrap.classList.add('is-swapping');
    if (occasionWrap) occasionWrap.classList.add('is-swapping');

    setTimeout(() => {
      if (broadcastText && broadcastMeta) {
        broadcastText.textContent = `Hi ${c.name}, your priority pass is ready.`;
        broadcastMeta.textContent = `Sent 1 by 1 · ${c.name} (${c.num})`;
      }
      if (occasionText && occasionMeta) {
        occasionText.textContent = o.msg;
        occasionMeta.textContent = o.meta;
      }
      if (broadcastWrap) broadcastWrap.classList.remove('is-swapping');
      if (occasionWrap) occasionWrap.classList.remove('is-swapping');
    }, 180);
  }, 3000);
})();
