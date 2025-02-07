import { currentLanguage } from '../stores/languageStore';
import en from './en.json';
import es from './es.json';

type Languages = 'en' | 'es';
type Translations = typeof en;

const translations = { en, es };

export function getLangFromUrl(url: URL): Languages {
  const lang = currentLanguage.get() as Languages;
  return lang || 'en';
}

export function useTranslations(lang: Languages) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return the key if translation is not found
      }
    }
    
    return value || key;
  };
}