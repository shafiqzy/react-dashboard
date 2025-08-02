import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import DrawerMenu from "src/components/Drawer/Drawer";
import Dropdown from "src/components/Dropdown/Dropdown";
import { ROUTES } from "src/constants/routes";

export default function Header() {
  const drawerId = "mobile-menu";
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const NAV_LINKS = [
    { href: ROUTES.dashboard, labelKey: "label:dashboard" },
    { href: ROUTES.button, labelKey: "label:button" },
    { href: ROUTES.logout, labelKey: "label:logout" },
  ];

  const LANG_ITEMS = [
    { labelKey: "label:change_lang_en", onClick: () => changeLanguage("en") },
    { labelKey: "label:change_lang_zh", onClick: () => changeLanguage("zh") },
  ];

  return (
    <div className="ds-drawer">
      <input id={drawerId} type="checkbox" className="ds-drawer-toggle" />

      <div className="ds-drawer-content">
        <header className="ds-navbar bg-base-100 shadow-md px-4 sm:px-6 sticky top-0 z-50">
          {/* ✅ Logo / Title */}
          <div className="flex-1">
            <Link
              href={ROUTES.dashboard}
              className="ds-btn ds-btn-ghost text-xl font-bold"
            >
              {t("label:dashboard")}
            </Link>
          </div>

          {/* ✅ Desktop Nav */}
          <nav className="hidden md:flex gap-4 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="ds-btn ds-btn-ghost"
              >
                {t(link.labelKey)}
              </Link>
            ))}

            <Dropdown
              buttonContent="🌐"
              items={LANG_ITEMS.map((item) => ({
                label: t(item.labelKey),
                onClick: item.onClick,
              }))}
            />
          </nav>

          {/* ✅ Mobile Nav (dropdown + hamburger) */}
          <div className="md:hidden flex items-center gap-2">
            <Dropdown
              buttonContent="🌐"
              items={LANG_ITEMS.map((item) => ({
                label: t(item.labelKey),
                onClick: item.onClick,
              }))}
            />

            <label htmlFor={drawerId} className="ds-btn ds-btn-ghost">
              ☰
            </label>
          </div>
        </header>
      </div>

      {/* ✅ Drawer Menu for Mobile */}
      <DrawerMenu drawerId={drawerId} />
    </div>
  );
}
