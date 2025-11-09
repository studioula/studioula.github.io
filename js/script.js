document.addEventListener('DOMContentLoaded', function() {
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

    // Internationalization
    let currentTranslations = {};

    // Function to load translations from JSON file
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`translations/${lang}.json`);
            const translations = await response.json();
            return translations;
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            return {};
        }
    }

    // Function to update all text elements based on selected language
    function updateLanguage(translations) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    // Language switcher functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', async function() {
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load and update language
            const lang = this.getAttribute('data-lang');
            const translations = await loadTranslations(lang);
            currentTranslations = translations;
            updateLanguage(translations);
            
            // Update HTML lang attribute
            document.documentElement.lang = lang;
        });
    });

    // Set initial language to German
    loadTranslations('de').then(translations => {
        currentTranslations = translations;
        updateLanguage(translations);
    });
});