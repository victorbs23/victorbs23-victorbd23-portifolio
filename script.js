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

contactForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
        formFeedback.textContent = 'Por favor, preencha todos os campos.';
        formFeedback.style.color = '#dc2626';
        return;
    }
   // Insira o ID do formulário do Formspree aqui.
    // Exemplo: se o link fornecido pelo Formspree for https://formspree.io/f/xbjwpnzd, o ID é "xbjwpnzd".
    const formspreeId = 'xeewjyek'; 

    if (formspreeId === 'xeewjyek') {
        formFeedback.textContent = 'Configuração pendente: Por favor, insira o ID do Formspree no arquivo script.js para começar a receber as mensagens.';
        formFeedback.style.color = '#d97706';
        return;
    }

    formFeedback.textContent = 'Enviando mensagem...';
    formFeedback.style.color = '#2563eb';

    try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        if (response.ok) {
            formFeedback.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
            formFeedback.style.color = '#16a34a';
            contactForm.reset();
        } else {
            const data = await response.json();
            if (data.errors && data.errors.length > 0) {
                formFeedback.textContent = `Erro: ${data.errors.map(err => err.message).join(', ')}`;
            } else {
                formFeedback.textContent = 'Não foi possível enviar a mensagem. Tente novamente.';
            }
            formFeedback.style.color = '#dc2626';
        }
    } catch (error) {
        formFeedback.textContent = 'Erro ao enviar a mensagem. Verifique sua conexão.';
        formFeedback.style.color = '#dc2626';
    }
12:37, 03';
    
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
