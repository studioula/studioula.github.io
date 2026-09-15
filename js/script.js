document.addEventListener('DOMContentLoaded', function() {
    const DEFAULT_LANGUAGE = 'de';
    const LANGUAGE_STORAGE_KEY = 'ulamove-language';
    const SUPPORTED_LANGUAGES = new Set(['de', 'en', 'ru']);

    // Content switching
    const physioBtn = document.getElementById('physio-btn');
    const trainingBtn = document.getElementById('training-btn');
    const physioContent = document.getElementById('physio-content');
    const trainingContent = document.getElementById('training-content');

    // Initial state - ensure only physio content is visible
    physioContent.style.display = 'flex';
    trainingContent.style.display = 'none';

    physioBtn.addEventListener('click', function() {
        // Update button states
        physioBtn.classList.add('active');
        trainingBtn.classList.remove('active');
        
        // Show physio content, hide training content
        physioContent.style.display = 'flex';
        trainingContent.style.display = 'none';
    });

    trainingBtn.addEventListener('click', function() {
        // Update button states
        trainingBtn.classList.add('active');
        physioBtn.classList.remove('active');
        
        // Show training content, hide physio content
        trainingContent.style.display = 'flex';
        physioContent.style.display = 'none';
    });

    const langButtons = document.querySelectorAll('.lang-btn');
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
        const response = await fetch(`translations/${lang}.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} while loading translations/${lang}.json`);
        }

        const translations = await response.json();
        if (!translations || typeof translations !== 'object' || Array.isArray(translations)) {
            throw new Error(`Invalid translation data in translations/${lang}.json`);
        }

        return translations;
    }

    function updateLanguage(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (typeof translations[key] === 'string') {
                element.textContent = translations[key];
            }
        });
    }

    function updateLanguageControls(lang) {
        langButtons.forEach(button => {
            const isActive = button.getAttribute('data-lang') === lang;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    async function selectLanguage(requestedLanguage) {
        const requestId = ++languageRequestId;
        let lang = normalizeLanguage(requestedLanguage);
        let translations;

        try {
            translations = await loadTranslations(lang);
        } catch (error) {
            console.error(`Unable to load ${lang} translations. Falling back to German.`, error);

            if (lang === DEFAULT_LANGUAGE) {
                return;
            }

            lang = DEFAULT_LANGUAGE;
            try {
                translations = await loadTranslations(lang);
            } catch (fallbackError) {
                console.error('Unable to load the German fallback translations. Existing page content was retained.', fallbackError);
                return;
            }
        }

        if (requestId !== languageRequestId) {
            return;
        }

        updateLanguage(translations);
        updateLanguageControls(lang);
        document.documentElement.lang = lang;
        storeLanguage(lang);
    }

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectLanguage(this.getAttribute('data-lang'));
        });
    });

    selectLanguage(getStoredLanguage());
});
