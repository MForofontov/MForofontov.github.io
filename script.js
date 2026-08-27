(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.side-nav a')];
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  // Activate the section whose top last crossed the sticky marker.
  // Works reliably for long sections like Experience.
  const markerOffset = () => {
    const sticky = document.querySelector('.sidebar');
    const stickyTop = sticky ? parseFloat(getComputedStyle(sticky).top) || 20 : 20;
    return stickyTop + 48;
  };

  const updateActive = () => {
    const y = markerOffset();
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= y) current = section.id;
    }
    setActive(current);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateActive();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateActive();
})();
