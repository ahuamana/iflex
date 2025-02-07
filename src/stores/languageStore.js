import { atom } from 'nanostores';

export const currentLanguage = atom('es');

export function setLanguage(lang) {
  currentLanguage.set(lang);
}

export function getTranslation(translations, lang) {
  return translations[lang] || translations['es'];
}