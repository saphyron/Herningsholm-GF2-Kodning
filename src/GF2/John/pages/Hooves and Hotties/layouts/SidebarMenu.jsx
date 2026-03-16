// src/components/SidebarMenu.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarMenu({ sidebarOpen, setSidebarOpen, returnFocusToToggle, toggleBtnRef }) {
  const navigate = useNavigate();

  // Track om vi er i mobil-viewport (match Tailwind md-breakpoint: 768px)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", onChange);
    // Safari fallback
    mq.addListener?.(onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      mq.removeListener?.(onChange);
    };
  }, []);

  const asideRef = useRef(null);

  // Menu struktur
  const menu = useMemo(() => ([
    { name: "John's Side", path: "/John_Main", show: () => true },
    { name: "Hooves and Hotties", path: "/hooves-and-hotties", show: () => true },
    { name: "Forsiden", path: "/", show: () => true },
  ]), []);

  function handleNavigate(path) {
    navigate(path);
    // Luk altid efter klik (på desktop ignoreres transform alligevel)
    if (isMobile) {
      setSidebarOpen(false);
      // Flyt fokus tilbage til toggle for at forhindre fokus i skjult menu
      if (returnFocusToToggle) returnFocusToToggle();
    }
  }

  // Luk på Escape (kun relevant når mobil-menu er åben)
  useEffect(() => {
    if (!(isMobile && sidebarOpen)) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        if (returnFocusToToggle) returnFocusToToggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile, sidebarOpen, setSidebarOpen, returnFocusToToggle]);

  // Når mobil-menu åbnes: fokusér første fokusérbare element i menuen
  useEffect(() => {
    if (isMobile && sidebarOpen && asideRef.current) {
      // prøv at fokusere første knap/link i menuen
      const firstFocusable = asideRef.current.querySelector("button, a, [tabindex]:not([tabindex='-1'])");
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [isMobile, sidebarOpen]);

  // Skjul for fokus og AT når mobil-menu er lukket
  const isHiddenMobile = isMobile && !sidebarOpen;

  return (
    <>
      {/* Mørk overlay KUN på mobil når åben */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          // Klik på overlay lukker og returnerer fokus
          onClick={() => {
            setSidebarOpen(false);
            if (returnFocusToToggle) returnFocusToToggle();
          }}
        />
      )}

      {/* Selve sidenmenuen */}
      <aside
        ref={asideRef}
        id="mobile-menu"
        className={[
          "fixed top-0 left-0 h-full w-56 min-h-screen bg-white border-r shadow-md",
          "flex flex-col py-4 px-3 z-50",
          // Mobil: glid ind/ud
          "transform transition-transform duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          // Tablet/desktop: altid synlig og uden transform
          "md:translate-x-0",
        ].join(" ")}
        style={{ minWidth: 220 }}
        // VIGTIGT: kun skjul for AT på mobil, ikke på desktop
        aria-hidden={isHiddenMobile ? true : undefined}
        // Forhindrer fokus/tab når skjult på mobil
        inert={isHiddenMobile ? true : undefined}
        // Dialog-semantik når åben på mobil
        role={isMobile ? "dialog" : undefined}
        aria-modal={isMobile && sidebarOpen ? true : undefined}
        aria-label="Hovedmenu"
      >
        {/* Logo + luk-knap (luk-knap kun synlig på mobil) */}
        <div className="mb-4 flex items-center justify-between">
          <div
            className="text-xl font-bold text-blue-800 cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
          </div>
          <button
            type="button"
            className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring"
            aria-label="Luk menu"
            onClick={() => {
              setSidebarOpen(false);
              if (returnFocusToToggle) returnFocusToToggle();
            }}
          >
            {/* X-ikon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="currentColor" className="w-5 h-5">
              <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.41 6.3 6.3-6.3 6.3 1.4 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z"/>
            </svg>
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto mb-2">
          <ul className="space-y-1 list-none p-0 m-0">
            {menu.filter(m => m.show()).map((m, idx) => (
              <li key={idx}>
                <button
                  className="w-full text-left py-2 px-3 rounded hover:bg-blue-50 text-gray-800 font-medium"
                  onClick={() => handleNavigate(m.path)}
                >
                  {m.name}
                </button>
              </li>
            ))}

            
          </ul>
        </nav>
      </aside>
    </>
  );
}