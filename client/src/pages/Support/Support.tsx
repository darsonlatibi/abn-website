import React from "react";
import {
  ArrowRight,
  Check,
  Coffee,
  Heart,
  LifeBuoy,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Code2,
  Cloud,
  Factory,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./Support.css";

const Support: React.FC = () => {
  return (
    <main className="support-page">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="support-hero">
        <div className="support-container support-hero-grid">
          <div className="support-hero-content">
            <div className="support-eyebrow">
              <span className="support-eyebrow-line" />
              <span>ABN SUPPORT</span>
            </div>

            <h1>
              Support <span>ABN</span>
              <br />
              Build the Ecosystem
            </h1>

            <p className="support-hero-description">
              Dukung pengembangan ABN dan ekosistem teknologi yang sedang kami
              bangun — mulai dari software, cloud infrastructure, industrial
              IoT, automation, hingga ABN Enterprise Management System.
            </p>

            <div className="support-hero-actions">
              <a
                href="#support-options"
                className="support-btn support-btn-primary"
              >
                <Coffee size={18} />
                Support ABN
                <ArrowRight size={17} />
              </a>

              <NavLink
                to="/ems/sewa"
                className="support-btn support-btn-secondary"
              >
                Explore ABN EMS
              </NavLink>
            </div>

            <div className="support-hero-points">
              <div>
                <Check size={15} />
                Secure payment
              </div>

              <div>
                <Check size={15} />
                Direct support
              </div>

              <div>
                <Check size={15} />
                Support development
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="support-hero-visual">
            <div className="support-orbit support-orbit-one" />
            <div className="support-orbit support-orbit-two" />

            <div className="support-core">
              <Coffee size={58} strokeWidth={1.4} />
              <span>ABN</span>
              <small>SUPPORT</small>
            </div>

            <div className="support-node support-node-top">
              <Code2 size={17} />
              <span>R&amp;D</span>
            </div>

            <div className="support-node support-node-right">
              <Cloud size={17} />
              <span>CLOUD</span>
            </div>

            <div className="support-node support-node-bottom">
              <Users size={17} />
              <span>COMMUNITY</span>
            </div>

            <div className="support-node support-node-left">
              <Factory size={17} />
              <span>INDUSTRIAL</span>
            </div>

            <div className="support-visual-footer">
              <div>
                <strong>24/7</strong>
                <span>Development</span>
              </div>

              <div>
                <strong>ABN</strong>
                <span>Technology</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="support-intro">
        <div className="support-container">
          <div className="support-section-heading">
            <div className="support-eyebrow">
              <span className="support-eyebrow-line" />
              <span>WHY SUPPORT ABN?</span>
            </div>

            <h2>
              Your support becomes part of
              <span> the technology ecosystem.</span>
            </h2>

            <p>
              Setiap dukungan membantu kami menjaga infrastructure, melakukan
              research &amp; development, dan terus membangun solusi teknologi
              yang dapat digunakan oleh individu maupun perusahaan.
            </p>
          </div>

          <div className="support-intro-grid">
            <div className="support-main-card">
              <div className="support-main-card-icon">
                <Coffee size={30} />
              </div>

              <h3>Buy ABN a Coffee</h3>

              <p>
                Secangkir kopi mungkin sederhana, tetapi dukungan kecil yang
                terkumpul membantu menjaga proses development tetap berjalan.
              </p>

              <p>
                Support digunakan untuk kebutuhan development, server, domain,
                cloud infrastructure, testing hardware, research, dan
                pengembangan produk ABN.
              </p>

              <a href="#support-options" className="support-inline-link">
                Support ABN
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="support-stat-grid">
              <div className="support-stat-card">
                <Code2 size={23} />
                <strong>R&amp;D</strong>
                <span>Software &amp; technology research</span>
              </div>

              <div className="support-stat-card">
                <Server size={23} />
                <strong>Infrastructure</strong>
                <span>Server, cloud &amp; deployment</span>
              </div>

              <div className="support-stat-card">
                <Sparkles size={23} />
                <strong>Innovation</strong>
                <span>New products &amp; solutions</span>
              </div>

              <div className="support-stat-card">
                <Users size={23} />
                <strong>Community</strong>
                <span>Technology ecosystem</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUPPORT OPTIONS
      ========================================================= */}
      <section id="support-options" className="support-options">
        <div className="support-container">
          <div className="support-section-heading support-heading-center">
            <div className="support-eyebrow">
              <span className="support-eyebrow-line" />
              <span>SUPPORT ABN</span>
            </div>

            <h2>
              Choose how you want to
              <span> support ABN.</span>
            </h2>

            <p>
              Pilih bentuk dukungan yang paling sesuai. Semua dukungan membantu
              keberlanjutan ekosistem ABN.
            </p>
          </div>

          <div className="support-options-grid">
            <div className="support-option-card support-option-featured">
              <div className="support-option-icon">
                <Coffee size={28} />
              </div>

              <div className="support-option-label">MOST SIMPLE</div>

              <h3>Buy Me a Coffee</h3>

              <p>
                Berikan dukungan sederhana untuk membantu ABN terus melakukan
                development dan experimentation.
              </p>

              <ul>
                <li>
                  <Check size={15} />
                  Support developer
                </li>
                <li>
                  <Check size={15} />
                  Support infrastructure
                </li>
                <li>
                  <Check size={15} />
                  Support R&amp;D
                </li>
              </ul>

              <a href="#support-options" className="support-card-link">
                Support ABN
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="support-option-card">
              <div className="support-option-icon">
                <Code2 size={28} />
              </div>

              <div className="support-option-label">DEVELOPMENT</div>

              <h3>Support Development</h3>

              <p>
                Dukung pengembangan software, platform ABN EMS, API, automation,
                dan teknologi baru.
              </p>

              <ul>
                <li>
                  <Check size={15} />
                  Software development
                </li>
                <li>
                  <Check size={15} />
                  Product R&amp;D
                </li>
                <li>
                  <Check size={15} />
                  New technology
                </li>
              </ul>

              <NavLink to="/ems/sewa" className="support-card-link">
                Explore ABN EMS
                <ArrowRight size={16} />
              </NavLink>
            </div>

            <div className="support-option-card">
              <div className="support-option-icon">
                <Server size={28} />
              </div>

              <div className="support-option-label">INFRASTRUCTURE</div>

              <h3>Support Infrastructure</h3>

              <p>
                Membantu biaya server, domain, cloud, monitoring, storage,
                deployment, dan operational infrastructure.
              </p>

              <ul>
                <li>
                  <Check size={15} />
                  Cloud infrastructure
                </li>
                <li>
                  <Check size={15} />
                  Server &amp; hosting
                </li>
                <li>
                  <Check size={15} />
                  Deployment
                </li>
              </ul>

              <a href="#support-options" className="support-card-link">
                Support Infrastructure
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="support-option-card">
              <div className="support-option-icon">
                <Heart size={28} />
              </div>

              <div className="support-option-label">ECOSYSTEM</div>

              <h3>Support ABN Ecosystem</h3>

              <p>
                Dukung visi jangka panjang ABN untuk membangun ecosystem
                technology yang terintegrasi.
              </p>

              <ul>
                <li>
                  <Check size={15} />
                  Technology ecosystem
                </li>
                <li>
                  <Check size={15} />
                  Industrial technology
                </li>
                <li>
                  <Check size={15} />
                  Long-term innovation
                </li>
              </ul>

              <a href="#support-options" className="support-card-link">
                Become a Supporter
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ECOSYSTEM
      ========================================================= */}
      <section className="support-ecosystem">
        <div className="support-container">
          <div className="support-ecosystem-grid">
            <div className="support-ecosystem-content">
              <div className="support-eyebrow support-eyebrow-light">
                <span className="support-eyebrow-line" />
                <span>ABN ECOSYSTEM</span>
              </div>

              <h2>
                Every support becomes
                <span> infrastructure.</span>
              </h2>

              <p>
                Dukungan dari komunitas tidak berhenti sebagai transaksi.
                Sebagian dari ekosistem tersebut digunakan kembali untuk menjaga
                dan mengembangkan teknologi ABN.
              </p>

              <div className="support-ecosystem-points">
                <div>
                  <ShieldCheck size={20} />
                  <span>Reliable infrastructure</span>
                </div>

                <div>
                  <Sparkles size={20} />
                  <span>Continuous innovation</span>
                </div>

                <div>
                  <ShieldCheck size={20} />
                  <span>Long-term development</span>
                </div>
              </div>
            </div>

            <div className="support-ecosystem-cards">
              <div className="support-ecosystem-card">
                <Code2 size={22} />
                <h3>Software R&amp;D</h3>
                <p>
                  Pengembangan platform, API, dashboard, automation dan
                  enterprise software.
                </p>
              </div>

              <div className="support-ecosystem-card">
                <Cloud size={22} />
                <h3>Cloud &amp; Server</h3>
                <p>
                  Hosting, deployment, monitoring, database dan operational
                  infrastructure.
                </p>
              </div>

              <div className="support-ecosystem-card">
                <Network size={22} />
                <h3>Industrial IoT</h3>
                <p>
                  Connectivity, sensor, telemetry, SCADA dan industrial
                  intelligence.
                </p>
              </div>

              <div className="support-ecosystem-card">
                <Users size={22} />
                <h3>Community</h3>
                <p>
                  Membangun ekosistem yang dapat berkembang bersama developer,
                  user dan business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}
      <section className="support-values">
        <div className="support-container">
          <div className="support-section-heading support-heading-center">
            <div className="support-eyebrow">
              <span className="support-eyebrow-line" />
              <span>OUR PRINCIPLES</span>
            </div>

            <h2>
              Built with purpose.
              <span> Sustained by community.</span>
            </h2>
          </div>

          <div className="support-values-grid">
            <div className="support-value-card">
              <ShieldCheck size={26} />
              <h3>Transparency</h3>
              <p>
                Dukungan diarahkan untuk kebutuhan development dan ecosystem ABN
                secara berkelanjutan.
              </p>
            </div>

            <div className="support-value-card">
              <ShieldCheck size={26} />
              <h3>Continuity</h3>
              <p>
                Menjaga agar platform dan infrastructure dapat terus
                dikembangkan dalam jangka panjang.
              </p>
            </div>

            <div className="support-value-card">
              <Sparkles size={26} />
              <h3>Innovation</h3>
              <p>
                Memberikan ruang untuk research, experimentation dan
                pengembangan teknologi baru.
              </p>
            </div>

            <div className="support-value-card">
              <Heart size={26} />
              <h3>Impact</h3>
              <p>
                Membangun solusi yang memiliki manfaat nyata untuk pengguna dan
                perusahaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TECHNOLOGY
      ========================================================= */}
      <section className="support-technology">
        <div className="support-container">
          <div className="support-technology-inner">
            <div>
              <div className="support-eyebrow">
                <span className="support-eyebrow-line" />
                <span>ABN TECHNOLOGY</span>
              </div>

              <h2>
                Supporting the technology
                <span> behind ABN.</span>
              </h2>

              <p>
                Ekosistem ABN dibangun menggunakan berbagai teknologi modern
                untuk software development, enterprise systems, IoT, industrial
                monitoring dan data infrastructure.
              </p>
            </div>

            <div className="support-tech-tags">
              <span>React</span>
              <span>Node.js</span>
              <span>Express</span>
              <span>MySQL</span>
              <span>IoT</span>
              <span>SCADA</span>
              <span>Cloud</span>
              <span>Automation</span>
              <span>Data</span>
              <span>Industrial AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="support-final">
        <div className="support-container">
          <div className="support-final-card">
            <div className="support-final-icon">
              <Coffee size={38} />
            </div>

            <div className="support-final-content">
              <div className="support-eyebrow">
                <span className="support-eyebrow-line" />
                <span>KEEP BUILDING</span>
              </div>

              <h2>
                Help ABN
                <span> keep building.</span>
              </h2>

              <p>
                Setiap dukungan, sekecil apa pun, membantu kami menjaga
                development, infrastructure dan inovasi ABN tetap berjalan.
              </p>

              <div className="support-final-actions">
                <a
                  href="#support-options"
                  className="support-btn support-btn-primary"
                >
                  <Coffee size={18} />
                  Support ABN
                  <ArrowRight size={17} />
                </a>

                <NavLink
                  to="/contact"
                  className="support-btn support-btn-secondary"
                >
                  Contact ABN
                  <LifeBuoy size={17} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Support;
