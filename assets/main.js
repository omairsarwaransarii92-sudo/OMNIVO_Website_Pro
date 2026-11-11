(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', open);
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('is-open');
        menu.focus();
      }
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const form = document.querySelector('#contact-form');
  if (form) {
    const status = document.querySelector('#form-status');
    const serviceSelect = form.querySelector('#service');
    const requestedService = new URLSearchParams(window.location.search).get('service');
    if (serviceSelect && requestedService && [...serviceSelect.options].some((option) => option.value === requestedService)) {
      serviceSelect.value = requestedService;
    }

    const requiredFields = [...form.querySelectorAll('[required]')];
    requiredFields.forEach((field) => field.addEventListener('input', () => {
      field.removeAttribute('aria-invalid');
      if (status) status.textContent = '';
    }));

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let firstInvalid = null;
      requiredFields.forEach((field) => {
        const valid = field.checkValidity() && (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
        if (!valid) {
          field.setAttribute('aria-invalid', 'true');
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.removeAttribute('aria-invalid');
        }
      });
      if (firstInvalid) {
        firstInvalid.focus();
        if (status) status.textContent = 'Please complete the required fields with valid details.';
        return;
      }
      if (status) status.textContent = 'Your enquiry draft is complete. This preview does not transmit it; connect a form endpoint to receive submissions.';
    });
  }
})();
