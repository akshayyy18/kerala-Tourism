import React, { useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

export default function Contact() {

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const token = localStorage.getItem("token")
    if(!token){
        navigate("/login")
        return
    }
    setSubmitted(true);
    event.target.reset();
  };

  return (
    <div className="contact-page">
      <CustomerNavbar />

      <header className="contact-hero">
        <div className="contact-hero-content">
          <p className="contact-kicker">WE ARE HERE TO HELP</p>
          <h1>Let&apos;s plan your next adventure.</h1>
          <p>
            Have a question about a boat, a booking, or the best way to explore
            Kerala&apos;s beautiful backwaters? Our team would love to hear from
            you.
          </p>
        </div>
        <div className="contact-hero-stamp" aria-hidden="true">
          <span>KT</span>
          <small>
            Travel well
            <br />
            Travel Kerala
          </small>
        </div>
      </header>

      <main>
        <section
          className="contact-main-section"
          aria-label="Contact information and form"
        >
          <div className="contact-details">
            <p className="contact-kicker">GET IN TOUCH</p>
            <h2>We&apos;re only a message away.</h2>
            <p className="contact-intro">
              Tell us what you need and our local team will get back to you as
              soon as possible.
            </p>

            <div className="contact-info-list">
              <a
                href="mailto:hello@aquavoyage.in"
                className="contact-info-item"
              >
                <span className="contact-icon" aria-hidden="true">
                  @
                </span>
                <span>
                  <strong>Email us</strong>hello@aquavoyage.in
                </span>
              </a>
              <a href="tel:+914772345678" className="contact-info-item">
                <span className="contact-icon" aria-hidden="true">
                  +
                </span>
                <span>
                  <strong>Call us</strong>+91 477 234 5678
                </span>
              </a>
              <div className="contact-info-item">
                <span className="contact-icon" aria-hidden="true">
                  ⌂
                </span>
                <span>
                  <strong>Visit us</strong>Finishing Point, Alappuzha, Kerala
                </span>
              </div>
            </div>

            <div className="contact-hours">
              <strong>Support hours</strong>
              <span>Monday to Saturday · 9:00 AM to 6:00 PM IST</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <span>01</span>
              <h2>Send us a note</h2>
            </div>

            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="How should we call you?"
              required
            />

            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="contact-subject">What can we help with?</label>
            <select id="contact-subject" name="subject" defaultValue="booking">
              <option value="booking">A booking question</option>
              <option value="boat">Choosing a boat</option>
              <option value="partnership">A partnership enquiry</option>
              <option value="other">Something else</option>
            </select>

            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              placeholder="Tell us a little more..."
              required
            />

            <button className="contact-submit" type="submit">
              Send message <span aria-hidden="true">→</span>
            </button>
            {submitted && (
              <p className="contact-success" role="status">
                Thanks, we&apos;ll be in touch shortly.
              </p>
            )}
          </form>
        </section>

        <section
          className="contact-questions"
          aria-label="Frequently asked questions"
        >
          <div>
            <p className="contact-kicker">GOOD TO KNOW</p>
            <h2>Questions, answered.</h2>
          </div>
          <div className="contact-question-grid">
            <article>
              <h3>How quickly do you reply?</h3>
              <p>
                Usually within one business day. Urgent booking questions are
                best handled by phone.
              </p>
            </article>
            <article>
              <h3>Can I change my booking?</h3>
              <p>
                Yes. Send us your booking details and we&apos;ll help find the
                best option for your plans.
              </p>
            </article>
            <article>
              <h3>Where do trips begin?</h3>
              <p>
                Most of our experiences depart from Alappuzha. Your confirmation
                will include the exact meeting point.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="contact-footer">
        <strong>AquaVoyage</strong>
        <span>Discover. Explore. Experience.</span>
      </footer>
    </div>
  );
}
