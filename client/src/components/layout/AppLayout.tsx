import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import AIChatButton from "./AIChatButton";
import SupportButton from "./SupportButton";
import WhatsAppButton from "./WhatsAppButton";
import ScrollToTopButton from "./ScrollToTopButton";

import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="website-layout">
      {/* Header */}
      <Header />

      {/* Content */}
      <main className="website-content">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Actions */}
      <div className="website-floating-actions">
        <AIChatButton />
        <SupportButton />
        <WhatsAppButton />
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default AppLayout;
