import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";

import "./Header.css";

/* =========================================================
   ABN CORPORATE WEBSITE
   PUBLIC COMPANY HEADER
   LIGHT / DARK THEME
   ========================================================= */

const navigation = [
  // {
  //   label: "Home",
  //   path: "/home",
  // },
  // {
  //   label: "Tentang Kami",
  //   path: "/tentang-kami",
  // },
  // {
  //   label: "Layanan",
  //   path: "/layanan",
  //   children: [],
  // },
  // {
  //   label: "Portofolio",
  //   path: "/portofolio",
  // },
  // {
  //   label: "Blog",
  //   path: "/blog",
  // },
  // {
  //   label: "Kontak",
  //   path: "/kontank",
  // },
  {
    label: "Solutions",
    path: "/solutions",
  },
  {
    label: "Industries",
    path: "/industries",
  },
  {
    label: "Catalog",
    path: "/catalog",
  },
  {
    label: "Products",
    path: "/products",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Technology",
    path: "/technology",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Insights",
    path: "/insights",
  },
];

/* =========================================================
   THEME TYPE
   ========================================================= */

type Theme = "light" | "dark";

/* =========================================================
   THEME STORAGE KEY
   ========================================================= */

const THEME_STORAGE_KEY = "abn-theme";

/* =========================================================
   GET INITIAL THEME
   ========================================================= */

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
};

/* =========================================================
   HEADER
   ========================================================= */

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  /* =======================================================
     APPLY THEME
     ======================================================= */

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileOpen((current) => !current);
  };

  /* =======================================================
     THEME
     ======================================================= */

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const isLightTheme = theme === "light";

  return (
    <header className="website-header">
      <div className="website-header-inner">
        {/* =================================================
            BRAND
            ================================================= */}

        <NavLink
          to="/"
          className="website-brand"
          onClick={closeMobileMenu}
          aria-label="ABN Home"
        >
          <div className="website-brand-mark">
            <img
              src={logo}
              alt="PT. Agro Berkah Nusantara"
              className="website-brand-logo"
            />
          </div>

          <div className="website-brand-text">
            <strong>PT. AGRO BERKAH NUSANTARA</strong>

            <span>ABN EMS & INDUSTRIAL INTELLIGENCE</span>
          </div>
        </NavLink>

        {/* =================================================
            DESKTOP NAVIGATION
            ================================================= */}

        <nav className="website-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `website-nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* =================================================
            HEADER ACTIONS
            ================================================= */}

        <div className="website-header-actions">
          {/* THEME */}

          <button
            type="button"
            className="website-theme-button"
            onClick={toggleTheme}
            aria-label={
              isLightTheme ? "Switch to dark mode" : "Switch to light mode"
            }
            title={isLightTheme ? "Dark mode" : "Light mode"}
          >
            {isLightTheme ? (
              <Moon size={18} strokeWidth={2} />
            ) : (
              <Sun size={18} strokeWidth={2} />
            )}
          </button>

          {/* CONTACT */}

          <NavLink
            to="/contact"
            className="website-header-cta"
            onClick={closeMobileMenu}
          >
            <span>Contact ABN</span>

            <ArrowRight size={16} strokeWidth={2} />
          </NavLink>

          {/* MOBILE */}

          <button
            type="button"
            className="website-mobile-button"
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="website-mobile-navigation"
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={2} />
            ) : (
              <Menu size={22} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* ===================================================
          MOBILE NAVIGATION
          =================================================== */}

      <div
        id="website-mobile-navigation"
        className={`website-mobile-navigation ${mobileOpen ? "open" : ""}`}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `website-mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMobileMenu}
            >
              <span>{item.label}</span>

              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className="mobile-nav-arrow"
              />
            </NavLink>
          ))}

          {/* ===============================================
              MOBILE THEME
              =============================================== */}

          <button
            type="button"
            className="website-mobile-theme"
            onClick={toggleTheme}
            aria-label={
              isLightTheme ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {isLightTheme ? (
              <Moon size={17} strokeWidth={2} />
            ) : (
              <Sun size={17} strokeWidth={2} />
            )}

            <span>{isLightTheme ? "Dark Mode" : "Light Mode"}</span>
          </button>

          {/* ===============================================
              MOBILE CTA
              =============================================== */}

          <NavLink
            to="/contact"
            className="website-mobile-cta"
            onClick={closeMobileMenu}
          >
            <span>Contact ABN</span>

            <ArrowRight size={16} strokeWidth={2} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
