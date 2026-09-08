document.addEventListener('DOMContentLoaded', () => {
  const birthdayIntro = document.getElementById('birthday-intro');
  const introBalloons = document.getElementById('intro-balloons');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const balloonColors = [
    '#ff8faa', '#ffd66b', '#86d7ff', '#b9a0ff',
    '#83dfc5', '#ffb17e', '#f5a6d8', '#91b9ff'
  ];

  if (birthdayIntro && introBalloons && !reduceMotion) {
    const totalBalloons = window.innerWidth < 520 ? 13 : 20;

    for (let i = 0; i < totalBalloons; i += 1) {
      const balloon = document.createElement('span');
      balloon.className = 'intro-balloon';

      const size = 42 + Math.random() * 40;
      const x = -3 + Math.random() * 101;
      const delay = Math.random() * 1.25;
      const duration = 2.8 + Math.random() * 1.6;
      const rotate = -12 + Math.random() * 24;
      const driftA = -28 + Math.random() * 56;
      const driftB = -42 + Math.random() * 84;
      const driftC = -55 + Math.random() * 110;

      balloon.style.setProperty('--balloon-size', `${size}px`);
      balloon.style.setProperty('--balloon-x', `${x}%`);
      balloon.style.setProperty('--balloon-delay', `${delay}s`);
      balloon.style.setProperty('--balloon-duration', `${duration}s`);
      balloon.style.setProperty('--balloon-rotate', `${rotate}deg`);
      balloon.style.setProperty('--balloon-drift-a', `${driftA}px`);
      balloon.style.setProperty('--balloon-drift-b', `${driftB}px`);
      balloon.style.setProperty('--balloon-drift-c', `${driftC}px`);
      balloon.style.setProperty('--balloon-color', balloonColors[i % balloonColors.length]);

      introBalloons.appendChild(balloon);
    }

    window.setTimeout(() => {
      birthdayIntro.classList.add('is-leaving');
      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-finished');
    }, 3900);

    window.setTimeout(() => {
      birthdayIntro.remove();
    }, 4700);
  } else {
    birthdayIntro?.remove();
    document.body.classList.remove('intro-active');
    document.body.classList.add('intro-finished');
  }
  const letterSection = document.getElementById('letter-section');
  const openLetterButton = document.getElementById('open-letter');
  const heartButton = document.getElementById('floating-heart');
  const heartLayer = document.getElementById('heart-layer');
  const closeButton = document.getElementById('close-app');

  closeButton?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  openLetterButton?.addEventListener('click', () => {
    letterSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  // La primera tarjeta debe verse inmediatamente.
  document.querySelector('.hero-card')?.classList.add('visible');

  heartButton?.addEventListener('click', () => {
    if (!heartLayer) return;

    for (let i = 0; i < 9; i += 1) {
      const heart = document.createElement('span');
      heart.className = 'flying-heart';
      heart.textContent = Math.random() > 0.35 ? '♥' : '💙';
      heart.style.setProperty('--size', `${18 + Math.random() * 18}px`);
      heart.style.setProperty('--drift', `${-160 + Math.random() * 250}px`);
      heart.style.right = `${18 + Math.random() * 55}px`;
      heart.style.animationDelay = `${Math.random() * 0.25}s`;
      heartLayer.appendChild(heart);
      heart.addEventListener('animationend', () => heart.remove(), { once: true });
    }
  });
});
