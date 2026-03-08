// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const topBar = document.querySelector('.site-navbar');
            const isFixedTopBar = topBar && window.getComputedStyle(topBar).position === 'fixed';
            const topBarOffset = isFixedTopBar ? topBar.offsetHeight : 0;
            const offsetTop = target.offsetTop - topBarOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Projects data (add new projects here)
const PROJECTS = [
    {
        title: 'WebHook analyser',
        imageSrc: 'https://mailparser.io/wp-content/uploads/2018/08/what-is-a-webhook.jpeg',
        imageAlt: 'E-Commerce Platform',
        description: 'In a quest to learn what DSA does in developement , ended up building a webhook analyser that can be used to analyse webhooks and their payloads.',
        projectUrl: 'xxxx',
        githubUrl: 'https://github.com/ERNEST-256',
        architectureUrl: 'https://github.com/ERNEST-256',
        tags: ['React', 'Node.js', 'Express js']
    },
    {
        title: 'AI Travel Agent',
        imageSrc: 'https://www.amritaz.com/wp-content/uploads/2025/02/travel_website_online.jpg',
        imageAlt: 'Real-time Chat App',
        description: 'A Travel Agent that uses AI agents to plan your trip, book hotels, and even create a personalized itinerary based on your preferences.The best part? It can also handle unexpected changes, like flight delays or cancellations, by rebooking and adjusting your plans on the fly.i',
        projectUrl: 'xxxx',
        githubUrl: 'https://github.com/ERNEST-256',
        architectureUrl: 'https://github.com/ERNEST-256',
        tags: ['LangGraph', 'n8n', 'Express', 'Redis','RAG','LLM Integration']
    }
];

const projectsContainer = document.getElementById('projectsContainer');

const escapeHtml = (value = '') => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const renderProjects = () => {
    if (!projectsContainer) return;

    projectsContainer.innerHTML = PROJECTS.map(project => `
        <article class="product-card work-card">
            <div class="work-preview">
                <a href="${escapeHtml(project.projectUrl)}" target="_blank" rel="noopener noreferrer" class="work-preview-link">
                    <img src="${escapeHtml(project.imageSrc)}" alt="${escapeHtml(project.imageAlt || 'Project preview')}">
                    <span class="work-preview-label">${escapeHtml(project.title)}</span>
                </a>
                <a href="${escapeHtml(project.projectUrl)}" target="_blank" rel="noopener noreferrer" class="work-hover-btn">View Project</a>
            </div>
            <div class="work-content">
                <div class="work-title-row">
                    <h3 class="work-title">${escapeHtml(project.title)}</h3>
                    <div class="work-actions">
                        <a href="${escapeHtml(project.githubUrl || project.projectUrl)}" target="_blank" rel="noopener noreferrer"
                            class="work-github-btn">GitHub</a>
                        <a href="${escapeHtml(project.architectureUrl || project.projectUrl)}" target="_blank" rel="noopener noreferrer"
                            class="work-github-btn">View Architecture</a>
                        <a href="${escapeHtml(project.projectUrl)}" target="_blank" rel="noopener noreferrer"
                            class="work-link-icon" aria-label="Open project">↗</a>
                    </div>
                </div>
                <p class="work-description">${escapeHtml(project.description)}</p>
                <div class="work-tags">
                    ${(project.tags || []).map(tag => `<span class="work-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
};

renderProjects();

// Advanced Scroll Reveals (Apple-style fade & slide)
const revealElements = document.querySelectorAll('.page-title, .hero-intro, .section-heading, .product-card, .split-text, .skill-pill, .timeline-item');
revealElements.forEach(el => el.classList.add('reveal-init'));

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a staggered delay based on index if they appear at the same time
            setTimeout(() => {
                entry.target.classList.add('reveal-active');
            }, (entry.target.classList.contains('product-card') || entry.target.classList.contains('skill-pill')) ? (index % 4) * 100 : 0);

            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));


// Interactive 3D Hover Effect for Cards
const cards = document.querySelectorAll('.product-card');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

cards.forEach(card => {
    if (card.classList.contains('work-card')) return;
    if (!finePointer) return;

    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let animationFrame = null;
    const maxRotation = 4;
    const smoothing = 0.14;

    const animateCard = () => {
        if (card.classList.contains('modal-active')) {
            card.style.transform = '';
            animationFrame = null;
            return;
        }

        currentRotateX += (targetRotateX - currentRotateX) * smoothing;
        currentRotateY += (targetRotateY - currentRotateY) * smoothing;

        const distance = Math.max(Math.abs(currentRotateX), Math.abs(currentRotateY));
        const lift = distance > 0.1 ? -6 : 0;

        card.style.transform = `perspective(1100px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translateY(${lift}px) scale3d(1.012, 1.012, 1.012)`;

        const settled = Math.abs(targetRotateX - currentRotateX) < 0.02 && Math.abs(targetRotateY - currentRotateY) < 0.02;
        if (!settled) {
            animationFrame = requestAnimationFrame(animateCard);
            return;
        }

        if (targetRotateX === 0 && targetRotateY === 0) {
            card.style.transform = '';
        }
        animationFrame = null;
    };

    const queueAnimation = () => {
        if (animationFrame === null) {
            animationFrame = requestAnimationFrame(animateCard);
        }
    };

    card.addEventListener('pointermove', e => {
        if (card.classList.contains('modal-active')) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetRotateX = ((y - centerY) / centerY) * -maxRotation;
        targetRotateY = ((x - centerX) / centerX) * maxRotation;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        queueAnimation();
    });

    card.addEventListener('pointerleave', () => {
        if (card.classList.contains('modal-active')) return;

        targetRotateX = 0;
        targetRotateY = 0;
        card.style.setProperty('--mouse-x', '-1000px');
        queueAnimation();
    });
});

// Card Read More Modal Logic
const readMoreBtns = document.querySelectorAll('.read-more-btn');
const pageBackdrop = document.getElementById('pageBackdrop');
const READ_MORE_LABEL = 'Read more';
const CLOSE_LABEL = 'Close';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const resetCardState = (card) => {
    const button = card.querySelector('.read-more-btn');
    card.classList.remove('modal-active', 'modal-closing');
    card.style.transform = '';
    if (button) {
        button.innerText = READ_MORE_LABEL;
        button.setAttribute('aria-expanded', 'false');
    }
};

const suppressImageFillUntilPointerLeaves = (card) => {
    card.classList.add('no-image-fill-anim');

    const clearSuppression = () => {
        card.classList.remove('no-image-fill-anim');
        card.removeEventListener('pointerleave', clearSuppression);
        card.removeEventListener('mouseleave', clearSuppression);
    };

    card.addEventListener('pointerleave', clearSuppression);
    card.addEventListener('mouseleave', clearSuppression);

    // Fallback for non-hover interactions (touch devices)
    if (!card.matches(':hover')) {
        setTimeout(clearSuppression, 220);
    }
};

const closeCardWithAnimation = (card, onComplete) => {
    if (!card || !card.classList.contains('modal-active')) {
        if (onComplete) onComplete();
        return;
    }

    if (prefersReducedMotion.matches) {
        resetCardState(card);
        if (onComplete) onComplete();
        return;
    }

    if (card.classList.contains('modal-closing')) return;

    card.classList.add('modal-closing');

    const handleCloseAnimation = (event) => {
        if (event.animationName !== 'modal-pop-out') return;
        card.removeEventListener('animationend', handleCloseAnimation);
        suppressImageFillUntilPointerLeaves(card);
        resetCardState(card);
        if (onComplete) onComplete();
    };

    card.addEventListener('animationend', handleCloseAnimation);
};

const syncModalState = () => {
    const hasOpenModal = document.querySelector('.product-card.modal-active') !== null;
    document.body.classList.toggle('modal-open', hasOpenModal);
};

readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Prevent event from bubbling up and maybe triggering other things
        e.stopPropagation();

        // Find the parent card
        const card = btn.closest('.product-card');

        // Check if already active
        if (card.classList.contains('modal-active')) {
            closeCardWithAnimation(card, () => {
                pageBackdrop.classList.remove('active');
                syncModalState();
            });
        } else {
            // Close any other open modals first
            document.querySelectorAll('.product-card.modal-active').forEach(openCard => {
                resetCardState(openCard);
            });

            card.classList.add('modal-active');
            card.classList.remove('modal-closing');
            card.style.transform = '';
            pageBackdrop.classList.add('active');
            btn.innerText = CLOSE_LABEL;
            btn.setAttribute('aria-expanded', 'true');
            syncModalState();
        }
    });
});

// Close modal when clicking on backdrop
if (pageBackdrop) {
    pageBackdrop.addEventListener('click', () => {
        const openCards = document.querySelectorAll('.product-card.modal-active');
        if (openCards.length === 0) return;

        let pending = openCards.length;
        openCards.forEach(openCard => {
            closeCardWithAnimation(openCard, () => {
                pending -= 1;
                if (pending === 0) {
                    pageBackdrop.classList.remove('active');
                    syncModalState();
                }
            });
        });
    });
}

// Parallax header effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const pageHeader = document.querySelector('.page-header');
    const headerContent = document.querySelector('.header-container');

    if (pageHeader) {
        pageHeader.classList.toggle('scrolled', scrollY > 16);
    }

    if (headerContent && scrollY < 800) {
        headerContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        headerContent.style.opacity = 1 - (scrollY / 500);
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const CONTACT_EMAIL = '190hp150nm@gmail.com';
if (contactForm) {
    let statusEl = document.getElementById('contactStatus');
    if (!statusEl) {
        statusEl = document.createElement('p');
        statusEl.id = 'contactStatus';
        statusEl.className = 'contact-status';
        statusEl.setAttribute('aria-live', 'polite');
        contactForm.appendChild(statusEl);
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const messageEl = document.getElementById('message');
        const originalText = btn ? btn.innerText : 'Send Message';

        const name = (nameEl?.value || '').trim();
        const senderEmail = (emailEl?.value || '').trim();
        const message = (messageEl?.value || '').trim();

        if (!name || !senderEmail || !message) {
            statusEl.innerText = 'Please complete all fields before sending.';
            return;
        }

        const subject = encodeURIComponent(`Portfolio Contact - ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
        );
        const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

        if (btn) {
            btn.innerText = 'Opening email...';
            btn.style.opacity = '0.8';
        }

        window.location.href = mailtoUrl;
        statusEl.innerText = 'Your email app should open with a pre-filled message.';
        contactForm.reset();

        if (btn) {
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }, 1400);
        }
    });
}

// Techy Background Canvas Animation
const initTechyCanvas = (canvas) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    };

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(41, 151, 255, 0.5)';
            ctx.fill();
        }
    }

    const createParticles = () => {
        particles = [];
        for (let i = 0; i < 80; i += 1) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i += 1) {
            for (let j = i + 1; j < particles.length; j += 1) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(41, 151, 255, ${0.4 - dist / 300})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
};

document.querySelectorAll('.techy-canvas').forEach(initTechyCanvas);

// Initialize GitHub Contributions Calendar
// We use a famous open-source contributor here as a placeholder to ensure the graph looks busy and impressive.
// Replace 'sindresorhus' with your actual GitHub username.
if (typeof GitHubCalendar !== 'undefined') {
    GitHubCalendar(".calendar", "ERNEST-256", { responsive: true, tooltips: true });
}
