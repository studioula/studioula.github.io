document.addEventListener('DOMContentLoaded', function() {
    const DEFAULT_LANGUAGE = 'de';
    const LANGUAGE_STORAGE_KEY = 'ulamove-language';
    const SUPPORTED_LANGUAGES = new Set(['de', 'en', 'ru']);
    const langButtons = document.querySelectorAll('.lang-btn');
    const textElements = Array.from(document.querySelectorAll('[data-i18n]'));
    const attributeBindings = [
        { elements: Array.from(document.querySelectorAll('[data-i18n-alt]')), keyAttribute: 'data-i18n-alt', targetAttribute: 'alt' },
        { elements: Array.from(document.querySelectorAll('[data-i18n-aria-label]')), keyAttribute: 'data-i18n-aria-label', targetAttribute: 'aria-label' },
        { elements: Array.from(document.querySelectorAll('[data-i18n-content]')), keyAttribute: 'data-i18n-content', targetAttribute: 'content' }
    ];
    const germanText = new Map(textElements.map(element => [element, element.textContent]));
    const germanAttributes = attributeBindings.flatMap(binding =>
        binding.elements.map(element => ({
            element,
            attribute: binding.targetAttribute,
            value: element.getAttribute(binding.targetAttribute)
        }))
    );
    let languageRequestId = 0;

    function normalizeLanguage(lang) {
        return SUPPORTED_LANGUAGES.has(lang) ? lang : DEFAULT_LANGUAGE;
    }

    function getStoredLanguage() {
        try {
            return normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
        } catch (error) {
            console.warn('Unable to read the saved ULA MOVE language; using German.', error);
            return DEFAULT_LANGUAGE;
        }
    }

    function storeLanguage(lang) {
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        } catch (error) {
            console.warn('Unable to save the selected ULA MOVE language.', error);
        }
    }

    async function loadTranslations(lang) {
        const response = await fetch(`../translations/${lang}.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} while loading ../translations/${lang}.json`);
        }

        const translations = await response.json();
        if (!translations || typeof translations !== 'object' || Array.isArray(translations)) {
            throw new Error(`Invalid translation data in ../translations/${lang}.json`);
        }

        return translations;
    }

    function restoreGermanFallback() {
        germanText.forEach((value, element) => {
            element.textContent = value;
        });
        germanAttributes.forEach(({ element, attribute, value }) => {
            element.setAttribute(attribute, value);
        });
    }

    function applyTranslations(translations) {
        restoreGermanFallback();

        textElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (typeof translations[key] === 'string') {
                element.textContent = translations[key];
            }
        });

        attributeBindings.forEach(binding => {
            binding.elements.forEach(element => {
                const key = element.getAttribute(binding.keyAttribute);
                if (typeof translations[key] === 'string') {
                    element.setAttribute(binding.targetAttribute, translations[key]);
                }
            });
        });
    }

    function updateLanguageControls(lang) {
        langButtons.forEach(button => {
            const isActive = button.getAttribute('data-lang') === lang;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function useGermanFallback() {
        restoreGermanFallback();
        updateLanguageControls(DEFAULT_LANGUAGE);
        document.documentElement.lang = DEFAULT_LANGUAGE;
        storeLanguage(DEFAULT_LANGUAGE);
    }

    async function selectLanguage(requestedLanguage) {
        const requestId = ++languageRequestId;
        const lang = normalizeLanguage(requestedLanguage);

        try {
            const translations = await loadTranslations(lang);
            if (requestId !== languageRequestId) {
                return;
            }

            applyTranslations(translations);
            updateLanguageControls(lang);
            document.documentElement.lang = lang;
            storeLanguage(lang);
        } catch (error) {
            if (requestId !== languageRequestId) {
                return;
            }

            console.error(`Unable to load ${lang} translations. The German fallback content was retained.`, error);
            useGermanFallback();
        }
    }

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectLanguage(this.getAttribute('data-lang'));
        });
    });

    selectLanguage(getStoredLanguage());
});
