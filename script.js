const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

navToggle?.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', siteNav.classList.contains('open'));
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 720) {
        siteNav.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
    }
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.site-nav a');

const highlightCurrentSection = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (sectionId) {
            const link = document.querySelector(`.site-nav a[href="#${sectionId}"]`);
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                link?.classList.add('active');
            } else {
                link?.classList.remove('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightCurrentSection);
window.addEventListener('load', highlightCurrentSection);

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
        formFeedback.textContent = 'Por favor, preencha todos os campos.';
        formFeedback.style.color = '#dc2626';
        return;
    }

    formFeedback.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
    formFeedback.style.color = '#16a34a';
    contactForm.reset();
});

const revealElements = document.querySelectorAll('.hero, .section, .project-card, .skill-card, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
});

revealElements.forEach((element) => revealObserver.observe(element));
