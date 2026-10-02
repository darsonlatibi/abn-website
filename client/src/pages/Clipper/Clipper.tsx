import React from "react";
import { ArrowRight, BarChart3, Megaphone, Video } from "lucide-react";
import { Link } from "react-router-dom";

import "./Clipper.css";

const Clipper: React.FC = () => {
  return (
    <main className="clipper-page">
      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="clipper-hero">
        <div className="clipper-container">
          <div className="clipper-eyebrow">
            <Megaphone size={16} aria-hidden="true" />
            <span>ABN CREATOR CAMPAIGN</span>
          </div>

          <h1>
            Grow ABN Through <span>Creator Campaigns.</span>
          </h1>

          <p>
            Platform campaign ABN untuk menghubungkan brand, content creator,
            video, audience, dan digital marketing dalam satu ekosistem.
          </p>

          <div className="clipper-actions">
            <Link to="/" className="clipper-btn clipper-btn-primary">
              Explore ABN
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAMPAIGN FEATURES
          ===================================================== */}
      <section className="clipper-section">
        <div className="clipper-container">
          <div className="clipper-grid">
            <article className="clipper-card">
              <Video size={28} aria-hidden="true" />

              <h2>Creator Content</h2>

              <p>
                Kampanye video pendek untuk memperkenalkan solusi dan teknologi
                ABN kepada audience.
              </p>
            </article>

            <article className="clipper-card">
              <BarChart3 size={28} aria-hidden="true" />

              <h2>Campaign Performance</h2>

              <p>
                Memantau performa konten dan engagement campaign secara terukur.
              </p>
            </article>

            <article className="clipper-card">
              <Megaphone size={28} aria-hidden="true" />

              <h2>Brand Awareness</h2>

              <p>
                Memperluas awareness ABN melalui creator dan distributed
                content.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Clipper;
