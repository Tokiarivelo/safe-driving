#!/usr/bin/env node
import 'dotenv/config';
import { processAllFiles } from '../src/translate.js';

processAllFiles().catch(err => {
  console.error('Échec du traitement :', err);
  process.exit(1);
});
