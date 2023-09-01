import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // язык по умолчанию
    fallbackLng: 'en', // язык, который будет использован, если перевод для текущего языка не найден
    resources: {
      en: {
        translation: {
          sentence: 'This is a sentence in English.',
        },
      },
      ru: {
        translation: {
          sentence: 'Это предложение на русском.',
        },
      },
    },
  });

export default i18n;