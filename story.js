'use strict';
(() => {
  const scenes = [...document.querySelectorAll('.scene')];
  const previous = document.querySelector('.previous-scene');
  const next = document.querySelector('.next-scene');
  const count = document.querySelector('.scene-count');
  const sceneName = document.querySelector('.scene-name');
  const progress = document.querySelector('.story-progress span');
  let active = 0;
  const setActive = (index) => {
    active = index;
    scenes[index].classList.add('is-active');
    count.innerHTML = `${String(index + 1).padStart(2, '0')} <span>/ 07</span>`;
    sceneName.textContent = scenes[index].dataset.name;
    progress.style.width = `${((index + 1) / scenes.length) * 100}%`;
    previous.href = `#${scenes[Math.max(0, index - 1)].id}`;
    next.href = `#${scenes[Math.min(scenes.length - 1, index + 1)].id}`;
    previous.setAttribute('aria-disabled', String(index === 0));
    next.setAttribute('aria-disabled', String(index === scenes.length - 1));
    previous.tabIndex = index === 0 ? -1 : 0;
    next.tabIndex = index === scenes.length - 1 ? -1 : 0;
  };
  // Native vertical scrolling remains the source of truth, including without JS.
  let ticking = false;
  const update = () => {
    const marker = window.innerHeight * .42;
    let index = scenes.findIndex(s => {
      const r = s.getBoundingClientRect();
      return r.top <= marker && r.bottom > marker;
    });
    if (index < 0) index = 0;
    if (index !== active) setActive(index);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, {passive: true});
  window.addEventListener('resize', update, {passive: true});
  [previous, next].forEach(a => a.addEventListener('click', e => {
    if (a.getAttribute('aria-disabled') === 'true') e.preventDefault();
  }));
  document.addEventListener('keydown', e => {
    if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || e.target.closest('input,button,select,textarea,[contenteditable],.quote-track')) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const index = Math.max(0, Math.min(scenes.length - 1, active + (e.key === 'ArrowRight' ? 1 : -1)));
    if (index !== active) {
      scenes[index].scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
      // Move keyboard focus with the story without interfering with radio arrows.
      const heading = scenes[index].querySelector('h1,h2');
      heading.setAttribute('tabindex', '-1');
      heading.focus({preventScroll: true});
    }
  });
  const track = document.querySelector('.quote-track');
  const quotePrev = document.querySelector('.quote-prev');
  const quoteNext = document.querySelector('.quote-next');
  const quotes = [...track.children];
  let quoteIndex = 0;
  const updateQuotes = () => {
    quoteIndex = Math.max(0, Math.min(quotes.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    document.querySelector('.quote-position').textContent = `${String(quoteIndex + 1).padStart(2, '0')} / 05`;
    quotePrev.disabled = quoteIndex === 0;
    quoteNext.disabled = quoteIndex === quotes.length - 1;
  };
  const moveQuote = delta => {
    const target = Math.max(0, Math.min(quotes.length - 1, quoteIndex + delta));
    track.scrollTo({left: target * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  quotePrev.addEventListener('click', () => moveQuote(-1));
  quoteNext.addEventListener('click', () => moveQuote(1));
  track.addEventListener('scroll', updateQuotes, {passive: true});
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); moveQuote(e.key === 'ArrowRight' ? 1 : -1); }
  });
  window.addEventListener('resize', () => {track.scrollLeft = quoteIndex * track.clientWidth; updateQuotes();});
  setActive(0);
  update();
})();
