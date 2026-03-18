const revealItems = document.querySelectorAll('.reveal');
const brandFilter = document.querySelector('#brandFilter');
const qualityFilter = document.querySelector('#qualityFilter');
const listingCards = document.querySelectorAll('.listing-card');
const floatingCard = document.querySelector('.float-card');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const applyFilters = () => {
  const selectedBrand = brandFilter.value;
  const selectedQuality = qualityFilter.value;

  listingCards.forEach((card) => {
    const brandMatch = selectedBrand === 'all' || card.dataset.brand === selectedBrand;
    const qualityMatch =
      selectedQuality === 'all' || card.dataset.quality === selectedQuality;

    card.classList.toggle('hidden', !(brandMatch && qualityMatch));
  });
};

brandFilter.addEventListener('change', applyFilters);
qualityFilter.addEventListener('change', applyFilters);

window.addEventListener('scroll', () => {
  if (!floatingCard) return;

  const offset = Math.min(window.scrollY * 0.12, 32);
  floatingCard.style.setProperty('--parallax-offset', `${offset}px`);
});
