import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLabel from "./locales/en/label.json";
import zhLabel from "./locales/zh/label.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        label: enLabel,
      },
      zh: {
        label: zhLabel,
      }
    },
    lng: "en", // 🌐 default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
