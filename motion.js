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
