const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

const LIBRE_URL = 'http://localhost:5000';
const TARGET_LANGS = ['fr', 'en'];
const DELAY_MS = 1000;

async function translate(text, sourceLang, targetLang) {
  try {
    const res = await axios.post(`${LIBRE_URL}/translate`, {
      q: text,
      source: sourceLang,
      target: targetLang
    }, {
      timeout: 3000
    });
    return res.data.translatedText;
  } catch (error) {
    console.error(`Échec ${sourceLang}→${targetLang}:`, error.message);
    return null;
  }
}

async function processTranslations() {
  const basePath = path.join('public', 'locales');
  const allTexts = await fs.readJson(path.join(basePath, 'all', 'translation.json'));
  const existing = {};

  for (const lang of TARGET_LANGS) {
    existing[lang] = await fs.readJson(
      path.join(basePath, lang, 'translation.json')
    ).catch(() => ({}));
  }

  for (const [key, text] of Object.entries(allTexts)) {
    console.log(`\n Traitement: "${key}"`);
    
    const sourceLang = text.match(/[àâçéèêëîïôûùüÿ]/) ? 'fr' : 'en';
    
    if (!existing[sourceLang][key]) {
      existing[sourceLang][key] = text;
      console.log(`√ Ajouté à ${sourceLang}`);
    }

    for (const targetLang of TARGET_LANGS) {
      if (targetLang === sourceLang || existing[targetLang][key]) continue;
      
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      const translated = await translate(text, sourceLang, targetLang);
      if (translated) {
        existing[targetLang][key] = translated;
        console.log(`√ ${sourceLang}→${targetLang}: ${translated}`);
      }
    }
  }

  for (const lang of TARGET_LANGS) {
    await fs.outputJson(
      path.join(basePath, lang, 'translation.json'),
      existing[lang],
      { spaces: 2 }
    );
  }

  console.log('\n Traductions fr/en complétées avec succès !');
}

processTranslations();