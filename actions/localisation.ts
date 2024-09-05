import { useState, useEffect } from 'react';

export const useTranslations = (lang: string, key: string) => {
  const [translations, setTranslations] = useState<any | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const data = await import(`@/locales/${lang}.json`);
        setTranslations(data.default[key] || null);
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations(null);
      }
    };

    loadTranslations();
  }, [lang, key]);

  return translations;
};
