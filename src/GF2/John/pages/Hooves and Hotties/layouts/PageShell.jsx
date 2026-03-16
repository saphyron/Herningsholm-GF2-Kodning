// src/layouts/PageShell.jsx
import React, { useEffect, useRef, useState } from "react";
import SidebarMenu from "./SidebarMenu";

export default function PageShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleBtnRef = useRef(null);

  // Lås scroll på små skærme når menuen er åben
  useEffect(() => {
    const el = document.documentElement;
    if (sidebarOpen) el.style.overflow = "hidden";
    else el.style.overflow = "";
    return () => { el.style.overflow = ""; };
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen(v => !v);

  const closeSidebarAndReturnFocus = () => {
    setSidebarOpen(false);
    // Giv fokus tilbage til burger-knappen for at undgå fokus i skjult menu
    if (toggleBtnRef.current) toggleBtnRef.current.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar KUN på mobil */}
      <header className="sticky top-0 z-50 bg-white border-b md:hidden">
        <div className="h-12 px-3 flex items-center justify-between">
          <button
            ref={toggleBtnRef}
            type="button"
            aria-label="Åbn/luk menu"
            aria-controls="mobile-menu"
            aria-expanded={sidebarOpen}
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring"
          >
            {/* Burger ikon */}
            <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="currentColor" className="w-6 h-6"
            >
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </button>

          {/* Spacer for symmetri */}
          <div className="w-8" />
        </div>
      </header>

      {/* Sidebar (styrer selv overlay på mobil) */}
      <SidebarMenu
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        returnFocusToToggle={closeSidebarAndReturnFocus}
        toggleBtnRef={toggleBtnRef}
      />

      {/* Indhold */}
      <main className="px-4 md:px-6 py-6 pt-12 md:pt-6 transition-[margin] duration-200 md:ml-56">
        {children}
      </main>
    </div>
  );
}