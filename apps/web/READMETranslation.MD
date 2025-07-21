1. Pour lancer l'extraction:
    pnpm i18n:extract [dans la racine du projet: safe-driving/apps/web]

2. Pour lancer la traduction, il faut avoir libretranslate(le mieux en docker sur le port 5000):
    docker pull libretranslate/libretranslate

3. Pour lancer la traduction automatique:
    node translate.js [dans la racine du projet: safe-driving/apps/web]

4. N.B: pour qu'un texte soit pris en compte lors de l'extraction, il faut utiliser :
    t('le texte ici')
dans le cas contraire, le texte ne serai pas pris en compte par l'extracteur donc ne sera pas traduis

5. Pour le choix de la langue, voici deux boutons exemple, qui prends en compte le changement de langue:
        <button 
          onClick={() => i18n.changeLanguage('fr')} 
          style={{ marginRight: 10, padding: '8px 16px' }}
        >
          {t('french button')}
        </button>
        <button 
          onClick={() => i18n.changeLanguage('en')} 
          style={{ padding: '8px 16px' }}
        >
          {t('english button')}
        </button>

6. Importation de l'extracteur dans la page:
. Pour qu'une page puisse utiliser l'extracteur ainsi que la traduction, il faut l'importer comme cela:
    import { useTranslation } from 'react-i18next';
    import '@/app/i18n';
    export default function ExemplePage(){
        const { t, i18n } = useTranslation();
        /* le reste du code */
    }