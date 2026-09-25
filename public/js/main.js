// Custom Cursor & Main Site Interactions
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia("(pointer: fine)").matches) {
        // Create cursor elements if they don't exist
        if (!document.querySelector('.custom-cursor-dot')) {
            const dot = document.createElement('div');
            dot.className = 'custom-cursor-dot';
            document.body.appendChild(dot);

            const outline = document.createElement('div');
            outline.className = 'custom-cursor-outline';
            document.body.appendChild(outline);
        }

        const cursorDot = document.querySelector('.custom-cursor-dot');
        const cursorOutline = document.querySelector('.custom-cursor-outline');

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            if (cursorDot) {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
            }

            if (cursorOutline) {
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 150, fill: "forwards" });
            }
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .cursor-pointer, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorOutline) cursorOutline.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                if (cursorOutline) cursorOutline.classList.remove('hovering');
            });
        });
    }

    // Initialize Lucide icons globally
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Render Contact Popup
    renderContactPopup();

    // Initialize Swipers
    initSwipers();

    // Initialize Product Tabs if present
    initProductTabs();

    // Enable Mouse Click & Drag to Scroll on overflow containers
    enableDragToScroll();
});

function enableDragToScroll() {
    const containers = document.querySelectorAll('.overflow-x-auto');
    containers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;

        container.style.cursor = 'grab';

        container.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            isDown = true;
            isDragging = false;
            container.style.cursor = 'grabbing';
            container.style.userSelect = 'none';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            if (!isDown) return;
            isDown = false;
            container.style.cursor = 'grab';
            container.style.removeProperty('user-select');
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            container.style.cursor = 'grab';
            container.style.removeProperty('user-select');
            setTimeout(() => { isDragging = false; }, 50);
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.8;
            if (Math.abs(walk) > 6) {
                isDragging = true;
            }
            container.scrollLeft = scrollLeft - walk;
        });

        // Prevent button/link click if user was dragging
        container.querySelectorAll('button, a').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (isDragging) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            }, true);
        });
    });
}

function initSwipers() {
    if (typeof Swiper === 'undefined') return;

    if (document.querySelector(".clientLogosSwiper")) {
        new Swiper(".clientLogosSwiper", {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
            },
        });
    }

    if (document.querySelector(".capabilitiesSwiper")) {
        new Swiper(".capabilitiesSwiper", {
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: {
                el: ".capabilities-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".capabilities-next",
                prevEl: ".capabilities-prev",
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    if (document.querySelector(".testimonialsSwiper")) {
        new Swiper(".testimonialsSwiper", {
            slidesPerView: 1,
            spaceBetween: 24,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".testimonials-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".testimonials-next",
                prevEl: ".testimonials-prev",
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
            },
        });
    }

    if (document.querySelector(".productSwiper")) {
        new Swiper('.productSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '#product-next',
                prevEl: '#product-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    if (document.querySelector(".historySwiper")) {
        window.historySwiper = new Swiper(".historySwiper", {
            slidesPerView: 1,
            spaceBetween: 24,
            observer: true,
            observeParents: true,
            pagination: {
                el: ".history-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".history-next",
                prevEl: ".history-prev",
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }
}

function initProductTabs() {
    const firstTab = document.querySelector('.product-tab.active');
    if (firstTab) {
        const indicator = document.getElementById('tab-indicator');
        if (indicator) {
            indicator.style.width = `${firstTab.offsetWidth}px`;
            indicator.style.left = `${firstTab.offsetLeft}px`;
        }
        firstTab.classList.add('text-white');
        firstTab.classList.remove('text-primary');
    }
}

function filterEra(era) {
    const buttons = document.querySelectorAll('.era-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#002045]', 'text-white', 'shadow-lg');
        btn.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
    });

    if (window.event && window.event.target) {
        const targetBtn = window.event.target.closest('.era-btn') || window.event.target;
        targetBtn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
        targetBtn.classList.add('bg-[#002045]', 'text-white', 'shadow-lg');
    }

    const slides = document.querySelectorAll('.historySwiper .swiper-slide');
    if (slides.length > 0) {
        slides.forEach(slide => {
            const card = slide.querySelector('.era-card') || slide;
            const matches = era === 'all' || slide.classList.contains('era-' + era) || card.classList.contains('era-' + era);
            if (matches) {
                slide.style.setProperty('display', 'flex', 'important');
                slide.classList.remove('!hidden');
            } else {
                slide.style.setProperty('display', 'none', 'important');
                slide.classList.add('!hidden');
            }
        });

        if (window.historySwiper) {
            window.historySwiper.update();
            window.historySwiper.slideTo(0);
        }
    } else {
        const cards = document.querySelectorAll('.era-card');
        cards.forEach(card => {
            const matches = era === 'all' || card.classList.contains('era-' + era);
            if (matches) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function switchTab(index, btn) {
    const tabs = document.querySelectorAll('.product-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active', 'text-white');
        tab.classList.add('text-slate-400');
    });
    btn.classList.add('active', 'text-white');
    btn.classList.remove('text-slate-400');

    const indicator = document.getElementById('tab-indicator');
    if (indicator) {
        indicator.style.width = `${btn.offsetWidth}px`;
        indicator.style.left = `${btn.offsetLeft}px`;
    }

    const panels = document.querySelectorAll('.product-panel');
    const targetId = btn.getAttribute('data-target');

    panels.forEach(panel => {
        panel.classList.add('opacity-0', 'invisible', 'translate-y-10', 'absolute');
        panel.classList.remove('opacity-100', 'visible', 'translate-y-0', 'relative');
    });

    const activePanel = document.getElementById(targetId);
    if (activePanel) {
        activePanel.classList.remove('opacity-0', 'invisible', 'translate-y-10', 'absolute');
        activePanel.classList.add('opacity-100', 'visible', 'translate-y-0', 'relative');
    }

    btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function toggleFaq(btn) {
    if (!btn) return;
    const answer = btn.nextElementSibling;
    const isActive = btn.parentElement ? btn.parentElement.classList.contains('active') : false;

    document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

    if (!isActive && btn.parentElement) {
        if (answer) answer.classList.remove('hidden');
        btn.parentElement.classList.add('active');
    } else if (btn.parentElement) {
        if (answer) answer.classList.add('hidden');
        btn.parentElement.classList.remove('active');
    }
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderHeader() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function toggleMobileMenu(show) {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-backdrop');
    if (!drawer || !backdrop) return;
    if (show) {
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('translate-x-0');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'auto';
    }
}

function renderContactPopup() {
    if (document.getElementById('contact-popup-root')) return;
    const popupRoot = document.createElement('div');
    popupRoot.id = 'contact-popup-root';
    document.body.appendChild(popupRoot);

    popupRoot.innerHTML = `
    <div id="contact-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-500">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onclick="toggleContactModal(false)"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden transform scale-95 transition-all duration-500 group">
            <div class="absolute top-0 right-0 p-8 z-10">
                <button onclick="toggleContactModal(false)" class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            
            <div class="p-10 md:p-14">
                <div class="mb-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-[0.625rem] font-black tracking-widest mb-4 border border-amber-500/10">
                        Connect With Us
                    </div>
                    <h2 class="text-4xl font-black text-slate-900 tracking-tighter leading-none">Get A <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Technical Quote</span></h2>
                </div>
                
                <form class="space-y-6" onsubmit="event.preventDefault(); alert('Inquiry sent successfully!'); toggleContactModal(false);">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-xs font-black text-slate-400 ml-1">Full Name</label>
                            <input type="text" required placeholder="John Doe" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-primary/20 focus:bg-white transition-all">
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-black text-slate-400 ml-1">Email Address</label>
                            <input type="email" required placeholder="john@company.com" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-primary/20 focus:bg-white transition-all">
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="text-xs font-black text-slate-400 ml-1">Requirement Type</label>
                        <div class="relative">
                            <select class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-primary/20 focus:bg-white appearance-none cursor-pointer">
                                <option>Spur Gears</option>
                                <option>Helical Gears</option>
                                <option>Worm Gears</option>
                                <option>Custom Engineering</option>
                            </select>
                            <i data-lucide="chevron-down" class="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="text-xs font-black text-slate-400 ml-1">Your Message</label>
                        <textarea rows="4" required placeholder="Describe your technical specifications..." class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none"></textarea>
                    </div>
                    
                    <button type="submit" class="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Send Inquiry
                    </button>
                </form>
            </div>
        </div>
    </div>
    `;

    // Re-initialize icons for popup
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function toggleContactModal(show) {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;
    const content = modal.querySelector('.relative');
    if (show) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        if (content) {
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('opacity-0', 'pointer-events-none');
        if (content) {
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
        }
        document.body.style.overflow = 'auto';
    }
}

function toggleMobileSubmenu(button) {
    if (!button) return;
    const submenu = button.nextElementSibling;
    const icon = button.querySelector('[data-lucide="chevron-down"]');
    
    document.querySelectorAll('.mobile-submenu').forEach(el => {
        if (el !== submenu) {
            el.classList.add('hidden');
            const otherBtn = el.previousElementSibling;
            if (otherBtn) {
                const otherIcon = otherBtn.querySelector('[data-lucide="chevron-down"]');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
        }
    });

    if (submenu && submenu.classList.contains('hidden')) {
        submenu.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
    } else if (submenu) {
        submenu.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
    }
}
