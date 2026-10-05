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
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }


    // Initialize Global Image Zoom Lightbox
    initImageZoomListeners();

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

    if (document.querySelector(".qualityWorkflowSwiper")) {
        new Swiper(".qualityWorkflowSwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".quality-workflow-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".quality-workflow-next",
                prevEl: ".quality-workflow-prev",
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
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

function toggleContactModal(show) {
    if (show !== false) {
        window.location.href = 'contact.html';
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

/* ==========================================
   Global Image Zoom Lightbox Modal
   ========================================== */

function renderImageZoomModal() {
    if (document.getElementById('image-zoom-root')) return;
    const root = document.createElement('div');
    root.id = 'image-zoom-root';
    document.body.appendChild(root);

    root.innerHTML = `
    <div id="image-zoom-modal" class="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 opacity-0 pointer-events-none transition-all duration-300">
        <!-- Dark Blur Backdrop -->
        <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onclick="closeImageZoom()"></div>
        
        <!-- Modal Container -->
        <div class="relative max-w-5xl max-h-[92vh] w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col transform scale-95 transition-all duration-300 z-10">
            
            <!-- Top Header Bar -->
            <div class="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                        <i data-lucide="zoom-in" class="w-4.5 h-4.5"></i>
                    </div>
                    <div>
                        <h3 id="image-zoom-title" class="text-sm sm:text-base font-black text-white tracking-tight">Product Preview</h3>
                        <p id="image-zoom-subtitle" class="text-xs text-slate-400 font-medium">National Gears Precision Metrology</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-2">
                    <a id="image-zoom-external" href="#" target="_blank" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer" title="Open Full Size Image">
                        <i data-lucide="external-link" class="w-4 h-4"></i>
                    </a>
                    <button onclick="closeImageZoom()" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 flex items-center justify-center transition-all cursor-pointer" title="Close (ESC)">
                        <i data-lucide="x" class="w-4.5 h-4.5"></i>
                    </button>
                </div>
            </div>
            
            <!-- Image Viewing Area -->
            <div class="relative flex-1 bg-slate-950 flex items-center justify-center p-4 sm:p-8 overflow-hidden min-h-[250px] sm:min-h-[350px]">
                <img id="image-zoom-img" src="" alt="Zoomed View" class="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800 transition-all duration-300">
            </div>

            <!-- Footer Caption Bar -->
            <div class="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
                <span id="image-zoom-caption" class="font-bold text-slate-200 truncate max-w-md"></span>
                <span class="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium bg-slate-800 px-3 py-1 rounded-full">
                    <i data-lucide="info" class="w-3 h-3 text-amber-500"></i> Click outside or press ESC to exit
                </span>
            </div>
        </div>
    </div>
    `;

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function openImageZoom(src, title, subtitle) {
    renderImageZoomModal();
    const modal = document.getElementById('image-zoom-modal');
    const img = document.getElementById('image-zoom-img');
    const titleEl = document.getElementById('image-zoom-title');
    const subTitleEl = document.getElementById('image-zoom-subtitle');
    const captionEl = document.getElementById('image-zoom-caption');
    const externalBtn = document.getElementById('image-zoom-external');

    if (!modal || !img) return;

    img.src = src;
    if (externalBtn) externalBtn.href = src;
    
    if (titleEl) titleEl.innerText = title || 'Product Detail View';
    if (subTitleEl) subTitleEl.innerText = subtitle || 'National Gears Precision Product';
    if (captionEl) captionEl.innerText = title || 'High Resolution Gear Image';

    const content = modal.querySelector('.relative');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    if (content) {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }
    document.body.style.overflow = 'hidden';
}

function closeImageZoom() {
    const modal = document.getElementById('image-zoom-modal');
    if (!modal) return;
    const content = modal.querySelector('.relative');
    modal.classList.add('opacity-0', 'pointer-events-none');
    if (content) {
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
    }
    document.body.style.overflow = 'auto';
}

function initImageZoomListeners() {
    renderImageZoomModal();

    // Attach click handlers to all main content images
    document.addEventListener('click', (e) => {
        const targetImg = e.target.closest('img');
        if (!targetImg) return;

        // Skip header logos, footer logos, or tiny icons
        if (targetImg.closest('header') || targetImg.closest('footer') || targetImg.closest('#top-bar') || targetImg.getAttribute('alt')?.toLowerCase().includes('logo') || targetImg.src.includes('Logo') || targetImg.classList.contains('no-zoom')) {
            return;
        }

        // Only zoom if inside main content, product cards, gallery, plant photos, etc.
        if (targetImg.closest('main') || targetImg.closest('.product-card') || targetImg.closest('.gallery-item') || targetImg.closest('section')) {
            e.preventDefault();
            e.stopPropagation();

            const src = targetImg.getAttribute('src');
            let title = targetImg.getAttribute('alt') || targetImg.getAttribute('title');

            // If alt is generic or empty, look for parent headings
            const card = targetImg.closest('.bg-white, .bg-slate-900, .group, div');
            if (card && (!title || title.length < 3)) {
                const heading = card.querySelector('h1, h2, h3, h4');
                if (heading) title = heading.innerText.trim();
            }

            if (!title) title = 'Precision Gear Component';

            openImageZoom(src, title, 'National Gears High-Precision Manufacturing');
        }
    });

    // Add cursor pointer and zoom hover hints to zoomable images in main content
    const updateZoomableStyles = () => {
        const contentImages = document.querySelectorAll('main img:not(.no-zoom)');
        contentImages.forEach(img => {
            if (!img.closest('header') && !img.closest('footer') && !img.getAttribute('alt')?.toLowerCase().includes('logo')) {
                img.classList.add('cursor-pointer');
                if (!img.getAttribute('title')) {
                    img.setAttribute('title', 'Click to zoom image');
                }
            }
        });
    };

    updateZoomableStyles();
    // Re-check after 500ms in case DOM rendered dynamically
    setTimeout(updateZoomableStyles, 500);

    // ESC Key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImageZoom();
        }
    });
}



/* ==========================================================================
   Specialized Product Spotlight Showcase Interactive Logic (Image Only Right)
   ========================================================================== */
window.specProductsData = [
    {
        num: "#01",
        tag: "High Pressure",
        title: "Hydraulic Pump Gears",
        img: "./public/images/industrialPumpGear.webp"
    },
    {
        num: "#02",
        tag: "Precision Ground",
        title: "Spur Gears",
        img: "./public/images/spurGears.webp"
    },
    {
        num: "#03",
        tag: "Low Noise",
        title: "Helical Gears",
        img: "./public/images/healicalGears.webp"
    },
    {
        num: "#04",
        tag: "Planetary Internal",
        title: "Ring Gears",
        img: "./public/images/ringGear.webp"
    },
    {
        num: "#05",
        tag: "Involute & Straight",
        title: "Spline Shafts",
        img: "./public/images/splineShaft.webp"
    },
    {
        num: "#06",
        tag: "Precision Angular",
        title: "Helical Gear Sets",
        img: "./public/images/helicalGearsShaft.webp"
    },
    {
        num: "#07",
        tag: "Bronze Alloy",
        title: "Worm Wheels",
        img: "./public/images/wormShaft.webp"
    },
    {
        num: "#08",
        tag: "Heavy Duty",
        title: "Bull Gears",
        img: "./public/images/bullGears.webp"
    },
    {
        num: "#09",
        tag: "Thread Ground",
        title: "Worm Shafts",
        img: "./public/images/pinionShaft.webp"
    }
];

window.selectSpecProduct = function(idx) {
    const data = window.specProductsData[idx];
    if (!data) return;

    const tagEl = document.getElementById('spec-tag');
    const titleBadgeEl = document.getElementById('spec-title-badge');
    const imgEl = document.getElementById('spec-img');

    if (tagEl) tagEl.innerText = data.tag;
    if (titleBadgeEl) titleBadgeEl.innerText = data.title;
    if (imgEl) {
        imgEl.src = data.img;
        imgEl.alt = data.title;
    }

    const btns = document.querySelectorAll('.spec-tab-btn');
    btns.forEach((btn, i) => {
        if (i === idx) {
            btn.className = 'spec-tab-btn active cursor-pointer p-4 rounded-2xl border border-amber-500 bg-amber-50/60 transition-all flex items-center justify-between group shadow-sm';
            const numSpan = btn.querySelector('.w-8.h-8');
            if (numSpan) numSpan.className = 'w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0';
            const icon = btn.querySelector('i');
            if (icon) icon.className = 'w-5 h-5 text-amber-600';
        } else {
            btn.className = 'spec-tab-btn cursor-pointer p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-amber-400 hover:bg-slate-50 transition-all flex items-center justify-between group';
            const numSpan = btn.querySelector('.w-8.h-8');
            if (numSpan) numSpan.className = 'w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors';
            const icon = btn.querySelector('i');
            if (icon) icon.className = 'w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors';
        }
    });
};

window.zoomActiveSpecImage = function() {
    const img = document.getElementById('spec-img');
    const titleBadge = document.getElementById('spec-title-badge');
    if (img && typeof openImageZoom === 'function') {
        const title = titleBadge ? titleBadge.innerText : 'Product Showcase';
        openImageZoom(img.src, title, 'National Gears Specialized Line');
    }
};
