const nav = document.querySelector(".efs-nav");
const navTrigger = nav?.querySelector(".efs-nav-trigger");
const navTriggerLabel = nav?.querySelector(".efs-nav-trigger-label");
const fullscreenMenu = document.querySelector(".efs-menu");
const menuPanel = fullscreenMenu?.querySelector(".efs-menu-panel");
const menuLinks = fullscreenMenu?.querySelectorAll("[data-efs-menu-link]");

if (nav && navTrigger && navTriggerLabel && fullscreenMenu && menuPanel && menuLinks?.length) {
    const initialBodyOverflow = document.body.style.overflow;
    const initialDocumentOverflow = document.documentElement.style.overflow;
    const initialBodyPaddingRight = document.body.style.paddingRight;

    const closeMenu = (restoreFocus = false) => {
        nav.classList.remove("is-open");
        nav.append(navTrigger);
        navTrigger.setAttribute("aria-expanded", "false");
        navTrigger.setAttribute("aria-label", "Ouvrir le menu");
        navTriggerLabel.textContent = "MENU";
        fullscreenMenu.classList.remove("is-open");
        fullscreenMenu.setAttribute("aria-hidden", "true");
        fullscreenMenu.inert = true;
        document.body.style.overflow = initialBodyOverflow;
        document.documentElement.style.overflow = initialDocumentOverflow;
        document.body.style.paddingRight = initialBodyPaddingRight;

        if (restoreFocus) {
            navTrigger.focus();
        }
    };

    const openMenu = () => {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        nav.classList.add("is-open");
        navTrigger.setAttribute("aria-expanded", "true");
        navTrigger.setAttribute("aria-label", "Fermer le menu");
        navTriggerLabel.textContent = "FERMER";
        fullscreenMenu.inert = false;
        fullscreenMenu.setAttribute("aria-hidden", "false");
        fullscreenMenu.classList.add("is-open");
        menuPanel.append(navTrigger);
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            const bodyPadding = Number.parseFloat(
                window.getComputedStyle(document.body).paddingRight
            );
            document.body.style.paddingRight =
                `${bodyPadding + scrollbarWidth}px`;
        }

        window.setTimeout(() => {
            if (
                fullscreenMenu.classList.contains("is-open") &&
                menuPanel.contains(navTrigger)
            ) {
                navTrigger.focus();
            }
        }, 80);
    };

    navTrigger.addEventListener("click", () => {
        if (navTrigger.getAttribute("aria-expanded") === "true") {
            closeMenu(true);
        } else {
            openMenu();
        }
    });

    fullscreenMenu.addEventListener("click", (event) => {
        if (event.target === fullscreenMenu) {
            closeMenu(true);
        }
    });

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
        if (!fullscreenMenu.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu(true);
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        const focusableElements = menuPanel.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!menuPanel.contains(document.activeElement)) {
            event.preventDefault();
            (event.shiftKey ? lastElement : firstElement).focus();
        } else if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    });
}

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!reducedMotion && "IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(
        "main > section:not(.hero) .wrap > :is(.section-heading, .intro-content, .visual-showcase, .grid, .faq-list, .content-grid, .swatches, .status-note)"
    );
    const revealMedia = document.querySelectorAll(
        "main .visual-main, main .visual-small, main .card-image, main .poster"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: "0px 0px -8% 0px",
            threshold: 0.12
        }
    );

    [...revealElements].forEach((element) => {
        element.classList.add("efs-reveal");
        revealObserver.observe(element);
    });

    [...revealMedia].forEach((element) => {
        element.classList.add("efs-reveal-media");
        revealObserver.observe(element);
    });
}

const form = document.getElementById("f");

if (form) {
    const params = new URLSearchParams(window.location.search);
    const requestedType = params.get("type");

    if (
        requestedType &&
        form.type &&
        Array.from(form.type.options).some(
            (option) => option.value === requestedType
        )
    ) {
        form.type.value = requestedType;
    }

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const successMessage = document.getElementById("ok");
            const subject =
                formData.get("objet") ||
                "Nouveau projet — Extra Focus Studio";
            const body = [
                "Bonjour Extra Focus Studio,",
                "",
                `Nom et prénom : ${formData.get("nom")}`,
                `Adresse email : ${formData.get("email")}`,
                `Téléphone : ${formData.get("tel") || "Non renseigné"}`,
                `Type de projet : ${formData.get("type")}`,
                `Projet : ${formData.get("objet") || "Non renseigné"}`,
                "",
                "Présentation :",
                formData.get("msg"),
                "",
                "Message préparé depuis le site Extra Focus Studio."
            ].join("\n");

            window.location.href =
                `mailto:extrafocusstudio0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            if (successMessage) {
                successMessage.hidden = false;
                successMessage.textContent =
                    "Votre demande est prête. Envoyez le message depuis votre messagerie pour finaliser l'envoi.";
            }
        }
    );
}