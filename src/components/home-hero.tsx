'use client';
import { useState } from 'react';
import { Brand } from './brand';
import { ArrowIcon } from './arrow-icon';
import { HolographicBackdrop } from './holographic-backdrop';
import { SiteOverlay } from './site-overlay';

export function HomeHero() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  return <>
    <section className="ams-hero ams-hero-centered" id="ams-top" aria-labelledby="ams-hero-title">
      <HolographicBackdrop />
      <header className="ams-header">
        <a className="ams-logo-link" href="#ams-top" aria-label="AMS Iron Gate Contracting — Home"><Brand /></a>
        <nav className="ams-primary-nav" aria-label="Main navigation">
          <a href="#ams-top">Home</a>
          <a href="#ams-about">About</a>
          <a href="#ams-capabilities">Services</a>
          <button type="button" onClick={() => setEnquiryOpen(true)} aria-haspopup="dialog">Contact</button>
        </nav>
        <button className="ams-enquire-button" onClick={() => setEnquiryOpen(true)} aria-haspopup="dialog">Enquire Us <ArrowIcon /></button>
      </header>
      <div className="ams-hero-content">
        <p className="ams-kicker">VISION &bull; PRECISION &bull; EXECUTION</p>
        <h1 id="ams-hero-title">Building a timeless <em>legacy.</em></h1>
        <p className="ams-hero-description">Engineering discipline, uncompromising safety and craftsmanship, brought to every structure we build.</p>
        <div className="ams-hero-actions"><button className="ams-button ams-button-primary" onClick={() => setEnquiryOpen(true)}>Let’s Build Together <ArrowIcon /></button></div>
      </div>

    </section>
    <SiteOverlay mode={enquiryOpen ? 'contact' : null} onClose={() => setEnquiryOpen(false)} />
  </>;
}
