document.getElementById('year').textContent = new Date().getFullYear();

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.side-nav a');

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--text)'
            : '';
          link.style.borderLeftColor = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--accent)'
            : 'transparent';
        });
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}
