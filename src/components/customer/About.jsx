import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <CustomerNavbar />

      <header className="about-hero">
        <div className="about-hero-content">
          <p className="about-kicker">THE AQUAVOYAGE STORY</p>
          <h1>More than a boat ride. A way to see Kerala.</h1>
          <p>
            We connect curious travellers with the water, the people, and the
            slower rhythm that makes Kerala unforgettable.
          </p>
        </div>
        <div className="about-hero-art" aria-hidden="true">
          <span className="about-sun" />
          <span className="about-boat">⌁</span>
          <span className="about-wave about-wave-one" />
          <span className="about-wave about-wave-two" />
        </div>
      </header>

      <main>
        <section className="about-introduction">
          <div className="about-section-label">01 / OUR PURPOSE</div>
          <div className="about-introduction-copy">
            <h2>Travel at the pace of the water.</h2>
            <p>
              AquaVoyage was created for travellers who want to experience
              Kerala beyond a checklist. From quiet mornings on the backwaters
              to bright coastal afternoons, we make it simple to find a boat
              that fits your kind of adventure.
            </p>
            <p>
              Every experience is chosen with comfort, clarity, and local
              knowledge in mind, so you can spend less time planning and more
              time being present.
            </p>
          </div>
        </section>

        <section className="about-values-section">
          <div className="about-values-heading">
            <p className="about-kicker">WHAT GUIDES US</p>
            <h2>Small details make a memorable journey.</h2>
          </div>
          <div className="about-values-grid">
            <article className="about-value-card">
              <span className="about-value-number">01</span>
              <h3>Local by nature</h3>
              <p>
                We know the waterways, the best starting points, and the stories
                worth slowing down for.
              </p>
            </article>
            <article className="about-value-card">
              <span className="about-value-number">02</span>
              <h3>Comfort first</h3>
              <p>
                Clear information and carefully managed boats help every
                passenger feel at ease.
              </p>
            </article>
            <article className="about-value-card">
              <span className="about-value-number">03</span>
              <h3>Moments over miles</h3>
              <p>
                The best itinerary leaves room for a sunset, a conversation, or
                a view you did not expect.
              </p>
            </article>
          </div>
        </section>

        <section className="about-journey-section">
          <div className="about-section-label">02 / HOW IT WORKS</div>
          <div className="about-journey-content">
            <h2>From first idea to open water.</h2>
            <div className="about-journey-steps">
              <div className="about-journey-step">
                <span>01</span>
                <div>
                  <h3>Choose your experience</h3>
                  <p>
                    Browse boats by style, comfort, and the kind of day you
                    want.
                  </p>
                </div>
              </div>
              <div className="about-journey-step">
                <span>02</span>
                <div>
                  <h3>Make it yours</h3>
                  <p>
                    Pick your date and share the details that help us prepare
                    for you.
                  </p>
                </div>
              </div>
              <div className="about-journey-step">
                <span>03</span>
                <div>
                  <h3>Enjoy the view</h3>
                  <p>
                    Meet your boat, settle in, and let Kerala unfold around you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <p className="about-kicker">YOUR NEXT MEMORY IS OUT THERE</p>
          <h2>Find your way onto the water.</h2>
          <button type="button" onClick={() => navigate("/customer/boats")}>
            Explore our boats <span aria-hidden="true">→</span>
          </button>
        </section>
      </main>

      <footer className="about-footer">
        <strong>AquaVoyage</strong>
        <span>Discover. Explore. Experience.</span>
      </footer>
    </div>
  );
}
