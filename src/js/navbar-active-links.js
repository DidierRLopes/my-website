function setActiveNavbarLink() {
  // Use a small timeout to ensure the DOM is updated after route change
  setTimeout(() => {
    const pathname = window.location.pathname;
    const blogLink = document.querySelector('.navbar__items--center a[href="/blog"]');
    const intelligenceLink = document.querySelector('.navbar__items--center a[href="/intelligence"]');

    // Reset both links first to handle navigation away from them
    if (blogLink) blogLink.classList.remove('navbar__link--active');
    if (intelligenceLink) intelligenceLink.classList.remove('navbar__link--active');

    // Apply active class to the correct one based on the current path
    if (blogLink && pathname.startsWith('/blog')) {
      blogLink.classList.add('navbar__link--active');
    }

    if (intelligenceLink && pathname.startsWith('/intelligence')) {
      intelligenceLink.classList.add('navbar__link--active');
    }
  }, 50);
}

export default {
  onRouteUpdate({ location, previousLocation }) {
    // Initial load + page navigation
    if (!previousLocation || location.pathname !== previousLocation.pathname) {
      setActiveNavbarLink();
    }
  },
}; 