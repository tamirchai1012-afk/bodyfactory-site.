const root = document.documentElement;
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let framePending = false;
function paintScroll() {
  framePending = false;
  const y = Math.max(0, window.scrollY);
  const progress = Math.min(1, y / Math.max(1, root.scrollHeight - innerHeight));
  root.style.setProperty('--read', progress);
  root.style.setProperty('--slide', motionPreference.matches ? '0px' : Math.min(190, y * .2) + 'px');
  root.style.setProperty('--lift', motionPreference.matches ? '0px' : Math.min(36, y * .075) + 'px');
}
function requestPaint() {
  if (!framePending) {framePending = true; requestAnimationFrame(paintScroll);}
}
addEventListener('scroll', requestPaint, {passive:true});
addEventListener('resize', requestPaint);
motionPreference.addEventListener('change', requestPaint);
paintScroll();

/* Floating social shortcuts */
(() => {
  if (document.querySelector('.bf-social-float')) return;
  const wrap = document.createElement('aside');
  wrap.className = 'bf-social-float';
  wrap.setAttribute('aria-label', 'יצירת קשר ברשתות חברתיות');
  const links = [
    ['WhatsApp', 'https://wa.me/972537255526?text=' + encodeURIComponent('היי תמיר, הגעתי דרך האתר של Body Factory ורציתי לשמוע על אימון ניסיון.'), 'wa'],
    ['Instagram', 'https://www.instagram.com/tamirchai1/', 'ig']
  ];
  for (const [label, url, type] of links) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'bf-social bf-social-' + type;
    a.setAttribute('aria-label', 'פתיחת ' + label);
    a.title = label;
    a.innerHTML = type === 'wa'
      ? '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0C5.55 0 .2 5.3.2 11.87c0 2.1.55 4.15 1.6 5.96L.1 24l6.34-1.66a11.9 11.9 0 0 0 5.65 1.44h.01c6.55 0 11.9-5.32 11.9-11.88a11.8 11.8 0 0 0-3.48-8.42ZM12.1 21.77a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.76.99 1-3.67-.24-.38a9.9 9.9 0 0 1-1.52-5.25c0-5.48 4.45-9.93 9.93-9.93a9.85 9.85 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.03c0 5.48-4.46 9.9-9.93 9.9Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/></svg>';
    wrap.appendChild(a);
  }
  document.body.appendChild(wrap);
})();
