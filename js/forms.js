const contactTypes = {
    projet: {
        label: "Projet créatif",
        description: "Présenter une idée ou un projet à développer.",
        domain: true,
        attachment: true,
        fields: [
            {
                name: "titre",
                label: "Titre ou nom du projet",
                type: "text",
                required: false,
                placeholder: "Facultatif"
            },
            {
                name: "message",
                label: "Présentez votre idée",
                type: "textarea",
                required: true,
                placeholder: "Quelle est l’intention du projet et qu’aimeriez-vous développer ?"
            }
        ]
    },
    prestation: {
        label: "Prestation",
        description: "Décrire un besoin créatif ou de production.",
        domain: true,
        attachment: true,
        fields: [
            {
                name: "titre",
                label: "Objet de la demande",
                type: "text",
                required: false,
                placeholder: "Facultatif"
            },
            {
                name: "message",
                label: "Décrivez votre besoin",
                type: "textarea",
                required: true,
                placeholder: "Précisez le contexte et les éléments utiles à votre demande."
            }
        ]
    },
    collaboration: {
        label: "Collaboration",
        description: "Proposer de contribuer à un projet du studio.",
        domain: true,
        attachment: true,
        fields: [
            {
                name: "profil",
                label: "Votre profil ou rôle",
                type: "text",
                required: false,
                placeholder: "Facultatif"
            },
            {
                name: "portfolio",
                label: "Lien vers un portfolio ou des réalisations",
                type: "url",
                required: false,
                placeholder: "https://"
            },
            {
                name: "message",
                label: "Votre proposition",
                type: "textarea",
                required: true,
                placeholder: "Présentez votre approche et la manière dont vous aimeriez collaborer."
            }
        ]
    },
    candidature: {
        label: "Candidature",
        description: "Présenter un profil et ses domaines de compétence.",
        domain: true,
        attachment: true,
        fields: [
            {
                name: "profil",
                label: "Domaine ou métier",
                type: "text",
                required: true,
                placeholder: "Votre domaine ou métier"
            },
            {
                name: "portfolio",
                label: "Lien vers un portfolio ou des réalisations",
                type: "url",
                required: false,
                placeholder: "https://"
            },
            {
                name: "experience",
                label: "Expérience et compétences",
                type: "textarea",
                required: false,
                placeholder: "Quelques repères sur votre parcours et vos compétences."
            },
            {
                name: "message",
                label: "Projets recherchés",
                type: "textarea",
                required: true,
                placeholder: "Quels types de projets ou de collaborations vous intéressent ?"
            }
        ]
    },
    partenariat: {
        label: "Partenariat",
        description: "Échanger au nom d’une structure intéressée.",
        domain: false,
        attachment: false,
        fields: [
            {
                name: "structure",
                label: "Structure représentée",
                type: "text",
                required: false,
                placeholder: "Facultatif"
            },
            {
                name: "message",
                label: "Votre proposition",
                type: "textarea",
                required: true,
                placeholder: "Présentez votre structure et l’objet de votre prise de contact."
            }
        ]
    },
    presse: {
        label: "Presse / Média",
        description: "Adresser une demande journalistique ou média.",
        domain: false,
        attachment: false,
        fields: [
            {
                name: "media",
                label: "Média ou publication",
                type: "text",
                required: false,
                placeholder: "Facultatif"
            },
            {
                name: "titre",
                label: "Objet de la demande",
                type: "text",
                required: false,
                placeholder: "Facultatif"
            },
            {
                name: "message",
                label: "Votre demande",
                type: "textarea",
                required: true,
                placeholder: "Précisez le sujet et les informations souhaitées."
            }
        ]
    },
    question: {
        label: "Question générale",
        description: "Poser une question au studio.",
        domain: false,
        attachment: false,
        fields: [
            {
                name: "message",
                label: "Votre question",
                type: "textarea",
                required: true,
                placeholder: "Écrivez votre question."
            }
        ]
    },
    autre: {
        label: "Autre",
        description: "Préciser toute autre demande.",
        domain: false,
        attachment: false,
        fields: [
            {
                name: "titre",
                label: "Objet de votre demande",
                type: "text",
                required: false,
                placeholder: "Facultatif"
            },
            {
                name: "message",
                label: "Votre message",
                type: "textarea",
                required: true,
                placeholder: "Décrivez votre demande."
            }
        ]
    }
};

const contactDomainOptions = [
    "Cinéma",
    "Audiovisuel",
    "Photographie",
    "Direction artistique",
    "Jeux vidéo & création numérique",
    "Publicité / communication de marque",
    "Transversal / plusieurs domaines",
    "Je ne sais pas encore"
];

const contactForm = document.getElementById("efs-contact-form");

if (contactForm) {
    const typeSelect = document.getElementById("efs-contact-type");
    const commonFields = document.getElementById("efs-contact-common");
    const domainWrap = document.getElementById("efs-contact-domain-wrap");
    const domainSelect = document.getElementById("efs-contact-domain");
    const specificFields = document.getElementById("efs-contact-specific");
    const consentWrap = document.getElementById("efs-contact-consent-wrap");
    const consentInput = document.getElementById("efs-contact-consent");
    const submitWrap = document.getElementById("efs-contact-submit-wrap");
    const confirmation = document.getElementById("efs-contact-confirmation");
    const summary = document.getElementById("efs-contact-summary");
    const typeChoices = document.querySelectorAll("[data-efs-contact-choice]");

    const normaliseType = (value) => value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

    const typeAliases = {
        "projet creatif": "projet",
        project: "projet",
        film: "projet",
        audiovisuel: "projet",
        photographie: "projet",
        publicite: "projet",
        "publicite communication de marque": "projet",
        "direction artistique": "projet",
        "film audiovisuel": "projet",
        media: "presse",
        "presse media": "presse",
        "question generale": "question"
    };

    const resolveType = (value) => {
        const normalised = normaliseType(value || "");
        const key = typeAliases[normalised] || normalised.replaceAll(" ", "");
        return Object.hasOwn(contactTypes, key) ? key : "";
    };

    Object.entries(contactTypes).forEach(([value, details]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = details.label;
        typeSelect.append(option);
    });

    contactDomainOptions.forEach((domain) => {
        const option = document.createElement("option");
        option.value = domain;
        option.textContent = domain;
        domainSelect.append(option);
    });

    typeChoices.forEach((choice, index) => {
        const details = contactTypes[choice.dataset.efsContactChoice];
        if (!details) {
            return;
        }

        choice.querySelector("[data-efs-contact-type-label]").textContent =
            details.label;
        choice.querySelector("[data-efs-contact-type-description]").textContent =
            details.description;
        choice.querySelector(".efs-contact-type-index").textContent =
            String(index + 1).padStart(2, "0");
    });

    const createField = (definition) => {
        const label = document.createElement("label");
        label.htmlFor = `efs-contact-${definition.name}`;
        label.textContent = definition.label;

        const control = document.createElement(
            definition.type === "textarea" ? "textarea" : "input"
        );

        control.id = `efs-contact-${definition.name}`;
        control.name = definition.name;
        control.required = definition.required;
        control.autocomplete = "off";

        if (definition.type === "textarea") {
            control.rows = 5;
        } else {
            control.type = definition.type;
        }

        if (definition.placeholder) {
            control.placeholder = definition.placeholder;
        }

        label.append(control);
        return label;
    };

    const createAttachmentField = () => {
        const label = document.createElement("label");
        label.htmlFor = "efs-contact-files";
        label.textContent = "Pièce(s) jointe(s) (facultatif)";

        const input = document.createElement("input");
        input.id = "efs-contact-files";
        input.name = "fichiers";
        input.type = "file";
        input.multiple = true;
        input.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp";

        label.append(input);
        return label;
    };

    const updateUrl = (type) => {
        const url = new URL(window.location.href);
        url.searchParams.set("type", type);
        window.history.replaceState({}, "", url);
    };

    const renderTypeFields = (type) => {
        const details = contactTypes[type];
        const showTypeFields = Boolean(details);

        commonFields.hidden = !showTypeFields;
        commonFields.querySelectorAll("input").forEach((input) => {
            input.disabled = !showTypeFields;
        });

        domainWrap.hidden = !details?.domain;
        domainSelect.disabled = !details?.domain;
        domainSelect.required = false;
        if (!details?.domain) {
            domainSelect.value = "";
        }

        specificFields.replaceChildren();
        specificFields.hidden = !showTypeFields;

        if (details) {
            const fieldsGrid = document.createElement("div");
            fieldsGrid.className = "efs-contact-specific-grid";
            details.fields.forEach((field) => {
                const fieldElement = createField(field);
                if (field.type === "textarea") {
                    fieldElement.classList.add("efs-contact-wide");
                }
                fieldsGrid.append(fieldElement);
            });
            specificFields.append(fieldsGrid);

            if (details.attachment) {
                specificFields.append(createAttachmentField());
            }
        }

        consentWrap.hidden = !showTypeFields;
        consentInput.disabled = !showTypeFields;
        consentInput.required = showTypeFields;
        if (!showTypeFields) {
            consentInput.checked = false;
        }
        submitWrap.hidden = !showTypeFields;

        typeChoices.forEach((choice) => {
            const isSelected = choice.dataset.efsContactChoice === type;
            if (isSelected) {
                choice.setAttribute("aria-current", "true");
            } else {
                choice.removeAttribute("aria-current");
            }
        });
    };

    const initialType = resolveType(
        new URLSearchParams(window.location.search).get("type")
    );
    typeSelect.value = initialType;
    renderTypeFields(initialType);

    typeSelect.addEventListener("change", () => {
        const type = resolveType(typeSelect.value);
        typeSelect.value = type;
        renderTypeFields(type);
        if (type) {
            updateUrl(type);
        } else {
            const url = new URL(window.location.href);
            url.searchParams.delete("type");
            window.history.replaceState({}, "", url);
        }
    });

    typeChoices.forEach((choice) => {
        choice.addEventListener("click", () => {
            const type = resolveType(choice.dataset.efsContactChoice);
            typeSelect.value = type;
            renderTypeFields(type);
            updateUrl(type);
        });
    });

    const addSummaryItem = (label, value) => {
        if (!value) {
            return;
        }

        const item = document.createElement("div");
        const term = document.createElement("dt");
        const description = document.createElement("dd");
        term.textContent = label;
        description.textContent = value;
        item.append(term, description);
        summary.append(item);
    };

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);
        const type = formData.get("type");
        const details = contactTypes[type];
        if (!details) {
            typeSelect.focus();
            return;
        }

        const specificValues = {};
        details.fields.forEach((field) => {
            if (field.name !== "message") {
                specificValues[field.name] = String(formData.get(field.name) || "").trim();
            }
        });

        const filesInput = contactForm.querySelector('input[name="fichiers"]');
        // Keep a backend-ready request shape without storing or transmitting it yet.
        const request = {
            type,
            domaine: details.domain ? String(formData.get("domaine") || "") : "",
            nom: String(formData.get("nom") || "").trim(),
            prenom: String(formData.get("prenom") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            telephone: String(formData.get("telephone") || "").trim(),
            message: String(formData.get("message") || "").trim(),
            champsSpecifiques: specificValues,
            fichiers: filesInput ? Array.from(filesInput.files) : []
        };

        summary.replaceChildren();
        addSummaryItem("Motif", details.label);
        addSummaryItem("Domaine", request.domaine);
        addSummaryItem("Nom", `${request.prenom} ${request.nom}`.trim());
        addSummaryItem("Email", request.email);
        addSummaryItem(
            "Objet / message",
            specificValues.titre || request.message
        );

        contactForm.hidden = true;
        confirmation.hidden = false;
        confirmation.focus();
    });
}
