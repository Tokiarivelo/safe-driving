import dotenv from 'dotenv';
dotenv.config(); // charge .env avant tout

import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { sync as globSync } from 'glob';
import deepEqual from 'fast-deep-equal';

const LIBRE_URL = process.env.LIBRE_URL;
if (!LIBRE_URL) {
  console.error(' Erreur : La variable LIBRE_URL est manquante dans le fichier .env');
  process.exit(1);
}
const TARGET_LANGS = ['fr', 'en'];
const DELAY_MS = 1000;
const BASE_DIR = path.join(process.cwd(), 'public', 'locales');
const SOURCE_LANG = 'fr';

/**
 * Traduit un texte via l'API LibreTranslate
 * avec préservation des emojis et logs détaillés.
 */
async function translateText(text, source, target) {
  // Récupère tous les emojis dans la chaîne
  const emojiRegex = /\p{Emoji_Presentation}/gu;
  const emojis = (text.match(emojiRegex) || []).join('');
  // Enlève les emojis avant traduction
  const pureText = text.replace(emojiRegex, '').trim();

  const payload = { q: pureText, source, target, format: 'text' };
  console.debug(`→ Requête de traduction : ${source}→${target}`, payload);

  try {
    const start = Date.now();
    const response = await axios.post(LIBRE_URL, payload);
    const duration = Date.now() - start;

    // Texte traduit par l'API
    let translated = response.data.translatedText;
    // Réinsère les emojis en préfixe (ou suffixe si vous préférez)
    if (emojis) {
      translated = `${emojis} ${translated}`;
    }

    console.info(
      `√ Réponse ${source}→${target} [${response.status}] en ${duration} ms`,
      translated,
    );
    return translated;
  } catch (err) {
    if (err.response) {
      console.error(
        `✖ Erreur HTTP ${err.response.status} pour ${source}→${target}:`,
        err.response.data,
      );
    } else if (err.request) {
      console.error(`✖ Pas de réponse pour ${source}→${target}, payload:`, payload);
    } else {
      console.error(`✖ Erreur traduction "${text}" ${source}→${target}:`, err.message);
    }
    return null;
  }
}

// Traduit récursivement les valeurs d'un objet (strings seulement)
async function translateObject(obj, source, target) {
  if (typeof obj === 'string') {
    return (await translateText(obj, source, target)) || obj;
  }
  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, source, target)));
  }
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = await translateObject(value, source, target);
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
    return result;
  }
  return obj;
}

// Compare et écrit si nécessaire
async function writeIfChanged(outputPath, newData) {
  const exists = await fs.pathExists(outputPath);
  if (exists) {
    const oldData = await fs.readJson(outputPath);
    if (deepEqual(oldData, newData)) {
      console.log(`Pas de changement : ${outputPath}`);
      return false; // pas modifié
    }
  }
  await fs.writeJson(outputPath, newData, { spaces: 2 });
  console.log(`√ Écrit : ${outputPath}`);
  return true;
}

// Traitement principal
export async function processAllFiles() {
  const pattern = path.join(BASE_DIR, SOURCE_LANG, '**', '*.json');
  const files = globSync(pattern);

  for (const file of files) {
    const relPath = path.relative(path.join(BASE_DIR, SOURCE_LANG), file);
    const sourceData = await fs.readJson(file);

    for (const lang of TARGET_LANGS) {
      const outDir = path.join(BASE_DIR, lang, path.dirname(relPath));
      await fs.ensureDir(outDir);
      const outPath = path.join(outDir, path.basename(file));

      if (lang === SOURCE_LANG) {
        // Copier si différent
        await writeIfChanged(outPath, sourceData);
      } else {
        console.log(`Traduction : ${relPath} → ${lang}/${relPath}`);
        const translated = await translateObject(sourceData, SOURCE_LANG, lang);
        await writeIfChanged(outPath, translated);
      }
    }
  }
}
