import React, { useMemo, useState } from "react";

/**
 * VenCha Tours – One‑page marketing site (EN/ES)
 * - Vintage badge/emblem vibe using Mexican flag palette + adventure tones
 * - Hero, Tours (Food Tour – Local Side | Valladolid & Ek' Balam | Accessible), About, FAQ, Contact
 * - Sticky nav, smooth scroll, WhatsApp CTA, email capture, simple booking/payments placeholders
 */

// --- Palette (Mexican flag + adventure neutrals)
const colors = {
  green: "#156D3F",
  red: "#C4302B",
  white: "#FAF7F2",
  sand: "#E7DCCF",
  deep: "#0E1E1A",
};

const flagRibbon = `bg-[linear-gradient(90deg,${colors.green}33_0%,${colors.green}33_33%,${colors.white}CC_33%,${colors.white}CC_66%,${colors.red}33_66%,${colors.red}33_100%)]`;

// --- Simple site config (edit these values only)
// If you have live links, paste them here. If left blank, buttons will still show but use placeholders.
const LOGO_URL = ""; // e.g., "https://your-cdn.com/vencha-logo.png" or "https://.../logo.svg"
const BOOKING_URL = ""; // e.g., Calendly/Checkfront/FareHarbor booking page
const PAYMENT_URL = ""; // e.g., Stripe Payment Link for deposits

// Optional photo URLs — dropbox/direct links work. Swap these when you have real photos.
const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format&fit=crop",
};

const sections = [
  { id: "tours", label_en: "Tours", label_es: "Tours" },
  { id: "booking", label_en: "Booking", label_es: "Reservas" },
  { id: "accessible", label_en: "Accessible", label_es: "Accesible" },
  { id: "about", label_en: "About", label_es: "Acerca" },
  { id: "faq", label_en: "FAQ", label_es: "Preguntas" },
  { id: "contact", label_en: "Contact", label_es: "Contacto" },
];

const i18n = {
  en: {
    tagline: "Your Next Adventure Starts Here",
    subhero:
      "Small‑group, story‑rich experiences across Mexico. Food, culture, archaeology – designed with care.",
    cta_primary: "Book a Tour",
    cta_secondary: "Message us on WhatsApp",
    banner: "Now piloting: Local Food Tour (PDC) & Valladolid + Ek’ Balam Day Trip",
    ribbon: "Crafted by locals • Small groups • Bilingual guides (EN/ES)",
    tours_title: "Signature Tours",
    food_title: "Local Side Food Tour (PDC)",
    food_desc:
      "A progressive street‑to‑table tasting on the local side of the highway. Tortillas pressed to order, family recipes, market stops.",
    food_bullets: [
      "~3.5 hours • afternoon/evening",
      "6–10 tastings + aguas frescas",
      "AC tour van • minimal walking",
    ],
    valladolid_title: "Valladolid + Ek’ Balam Day Trip",
    valladolid_desc:
      "Colonial plazas, artisanal treats, and the majestic Acropolis of Ek’ Balam. Optional cenote stop.",
    valladolid_bullets: [
      "Full day • 10–11 hours",
      "Guided history walk • curated eateries",
      "Flexible pace • shaded stops",
    ],
    accessible_title: "Accessible Adventures (Easy Explorer)",
    accessible_desc:
      "Inclusive, limited‑mobility‑friendly itineraries: scenic drives, view‑only cenotes, accessible eateries & cultural stops.",
    accessible_bullets: [
      "Wheelchair‑friendly vehicles (by partner)",
      "Seating & shade prioritized",
      "Custom pace • private or small groups",
    ],
    about_title: "Why VenCha",
    about_body:
      "We’re Venny + Chad – curious hosts who design tours the way we travel: unrushed, joyful, and real. We keep groups small, stories rich, and logistics tight so you can relax and experience Mexico with confidence.",
    faq_title: "Good to Know",
    faq: [
      {
        q: "How do I book?",
        a: "Tap ‘Book a Tour’ to send preferred dates, or message us on WhatsApp. We confirm fast.",
      },
      {
        q: "Do you run private tours?",
        a: "Yes. All tours are available privately. We can tailor pace, pickups, and menus.",
      },
      {
        q: "What about dietary needs?",
        a: "We accommodate common preferences (vegetarian, no pork, mild spice) with advance notice.",
      },
      {
        q: "Accessible options?",
        a: "Ask about Easy Explorer – limited‑mobility friendly routes with accessible transport partners.",
      },
    ],
    contact_title: "Contact",
    contact_blurb:
      "Questions, dates, partnerships? Reach out — we’re friendly.",
    form_name: "Name",
    form_email: "Email",
    form_message: "Message",
    form_submit: "Send",
    legal: "© " + new Date().getFullYear() + " VenCha Tours. All rights reserved.",
  },
  es: {
    tagline: "Tu próxima aventura comienza aquí",
    subhero:
      "Experiencias en grupos pequeños por México. Comida, cultura y arqueología — diseñadas con cariño.",
    cta_primary: "Reservar",
    cta_secondary: "Escríbenos por WhatsApp",
    banner: "Pilotos: Tour Gastronómico Local (PDC) y Día Valladolid + Ek’ Balam",
    ribbon: "Hecho por locales • Grupos pequeños • Guías bilingües (ES/EN)",
    tours_title: "Tours Destacados",
    food_title: "Tour Gastronómico Lado Local (PDC)",
    food_desc:
      "Cata progresiva del mercado a la mesa del lado local de la carretera. Tortillas al momento, recetas familiares, paradas en mercados.",
    food_bullets: [
      "~3.5 horas • tarde/noche",
      "6–10 degustaciones + aguas frescas",
      "Camioneta con AC • poca caminata",
    ],
    valladolid_title: "Valladolid + Ek’ Balam (Día Completo)",
    valladolid_desc:
      "Plazas coloniales, delicias artesanales y la majestuosa Acrópolis de Ek’ Balam. Parada opcional en cenote.",
    valladolid_bullets: [
      "Día completo • 10–11 horas",
      "Caminata histórica guiada • paradas culinarias",
      "Ritmo flexible • lugares con sombra",
    ],
    accessible_title: "Aventuras Accesibles (Easy Explorer)",
    accessible_desc:
      "Itinerarios inclusivos y amigables con movilidad limitada: recorridos escénicos, cenotes para ver, restaurantes accesibles y paradas culturales.",
    accessible_bullets: [
      "Vehículos con acceso para silla de ruedas (con socio)",
      "Asientos y sombra priorizados",
      "Ritmo a medida • privado o grupos pequeños",
    ],
    about_title: "Por qué VenCha",
    about_body:
      "Somos Venny y Chad — anfitriones curiosos que diseñan tours como viajamos: sin prisas, alegres y reales. Grupos pequeños, buenas historias y logística afinada para disfrutar México con confianza.",
    faq_title: "Info Útil",
    faq: [
      { q: "¿Cómo reservo?", a: "Pulsa ‘Reservar’ para enviar fechas o escríbenos por WhatsApp. Confirmamos rápido." },
      { q: "¿Hacen tours privados?", a: "Sí. Todos los tours pueden ser privados. Ajustamos ritmo, pickups y menús." },
      { q: "¿Y restricciones alimentarias?", a: "Podemos adaptarnos (vegetariano, sin cerdo, poco picante) si avisas con tiempo." },
      { q: "¿Opciones accesibles?", a: "Pregunta por Easy Explorer — rutas amigables con movilidad limitada con transporte accesible." },
    ],
    contact_title: "Contacto",
    contact_blurb:
      "¿Dudas, fechas, alianzas? Escríbenos — nos encantará ayudarte.",
    form_name: "Nombre",
    form_email: "Correo",
    form_message: "Mensaje",
    form_submit: "Enviar",
    legal: "© " + new Date().getFullYear() + " VenCha Tours. Derechos reservados.",
  },
};

function Nav({ lng, setLng }) {
  const t = i18n[lng];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b`} style={{borderColor: colors.sand}}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <LogoSmall />
        <nav className="ml-auto hidden md:flex gap-6">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-sm font-medium hover:opacity-80">
              {lng === "en" ? s.label_en : s.label_es}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setLng(lng === "en" ? "es" : "en")}
          className="ml-2 rounded-full border px-3 py-1 text-xs"
          aria-label="language toggle"
        >
          {lng === "en" ? "ES" : "EN"}
        </button>
        <a
          href="#contact"
          className="hidden md:inline-block ml-2 rounded-full px-4 py-2 text-white"
          style={{ backgroundColor: colors.green }}
        >
          {t.cta_primary}
        </a>
      </div>
    </header>
  );
}

function LogoSmall() {
  // If LOGO_URL is set, show uploaded logo; fallback to text+compass lockup
  if (LOGO_URL) {
    return (
      <img src={LOGO_URL} alt="VenCha Tours" className="h-9 w-auto rounded" />
    );
  }
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: colors.deep }}>
        <CompassIcon />
      </div>
      <div className="leading-4">
        <div className="font-extrabold tracking-wide" style={{ color: colors.deep }}>VenCha</div>
        <div className="text-[10px] uppercase" style={{ color: colors.red }}>Tours</div>
      </div>
    </div>
  );
}

function Hero({ lng }) {
  const t = i18n[lng];
  return (
    <section className={`pt-24 md:pt-28 ${flagRibbon}`}>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-3" style={{ color: colors.deep }}>
              VenCha Tours
            </h1>
            <p className="text-lg md:text-xl" style={{ color: colors.deep }}>
              {t.tagline}
            </p>
            <p className="mt-4 text-sm md:text-base max-w-prose" style={{ color: colors.deep }}>
              {t.subhero}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={BOOKING_URL || "#booking"} className="rounded-full px-5 py-3 text-white font-semibold" style={{ backgroundColor: colors.green }}>
                {t.cta_primary}
              </a>
              <a
                href="https://wa.me/5210000000000" target="_blank" rel="noreferrer"
                className="rounded-full px-5 py-3 font-semibold border"
                style={{ borderColor: colors.green, color: colors.green }}
              >
                {t.cta_secondary}
              </a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-xs px-3 py-2 rounded-full" style={{ backgroundColor: colors.white, color: colors.deep, border: `1px solid ${colors.sand}` }}>
              <span className="font-semibold">NEW</span> {t.banner}
            </div>
          </div>
          <div className="flex justify-center">
            <BadgeLogo />
          </div>
        </div>
        <div className="mt-10 text-center text-xs uppercase tracking-widest" style={{ color: colors.deep }}>
          {t.ribbon}
        </div>
      </div>
    </section>
  );
}

function BadgeLogo() {
  // Swap in your final logo by setting LOGO_URL above
  if (LOGO_URL) {
    return (
      <div className="relative w-56 h-56 md:w-72 md:h-72 select-none flex items-center justify-center">
        <img src={LOGO_URL} alt="VenCha Tours" className="max-w-full max-h-full object-contain" />
      </div>
    );
  }
  // Fallback badge
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 select-none">
      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow" aria-hidden>
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
            <feBlend in2="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
        <circle cx="150" cy="150" r="140" fill={colors.white} stroke={colors.deep} strokeWidth="6" />
        <circle cx="150" cy="150" r="122" fill="none" stroke={colors.green} strokeWidth="18" />
        <circle cx="150" cy="150" r="100" fill="none" stroke={colors.red} strokeWidth="18" />
        {/* Compass */}
        <g transform="translate(150,110)">
          <polygon points="0,-32 7,0 0,32 -7,0" fill={colors.green} />
          <polygon points="-32,0 0,7 32,0 0,-7" fill={colors.red} />
          <circle r="4" fill={colors.deep} />
        </g>
        {/* Text */}
        <text x="150" y="180" textAnchor="middle" fontSize="44" fontWeight="900" fill={colors.deep} fontFamily="ui-sans-serif,system-ui">VenCha</text>
        <text x="150" y="205" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.red} letterSpacing="2" fontFamily="ui-sans-serif,system-ui">TOURS</text>
        {/* Footprints */}
        <g transform="translate(150,225) scale(0.9)" fill={colors.deep} opacity="0.9">
          <path d="M-12,0 c-6,-10 8,-14 10,-5 c2,7 -3,9 -10,5 z" />
          <circle cx="-15" cy="-7" r="1.6" />
          <circle cx="-10" cy="-10" r="1.6" />
          <circle cx="-6" cy="-7" r="1.4" />
          <path d="M12,0 c6,-10 -8,-14 -10,-5 c-2,7 3,9 10,5 z" />
          <circle cx="15" cy="-7" r="1.6" />
          <circle cx="10" cy="-10" r="1.6" />
          <circle cx="6" cy="-7" r="1.4" />
        </g>
        <g opacity="0.25" filter="url(#grain)">
          <rect x="0" y="0" width="300" height="300" fill={colors.sand} opacity="0.15" />
        </g>
      </svg>
    </div>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="none" stroke={colors.deep} strokeWidth="1.5" />
      <path d="M12 4 L14 12 L12 20 L10 12 Z" fill={colors.red} />
      <path d="M4 12 L12 14 L20 12 L12 10 Z" fill={colors.green} />
      <circle cx="12" cy="12" r="1" fill={colors.deep} />
    </svg>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs border" style={{ borderColor: colors.sand }}>
      {children}
    </span>
  );
}

function TourCard({ title, desc, bullets, badge }) {
  return (
    <div className="rounded-2xl p-5 md:p-6 shadow-sm bg-white border" style={{ borderColor: colors.sand }}>
      {badge && (
        <div className="mb-3 text-[11px] uppercase tracking-wider inline-block px-2 py-1 rounded" style={{ background: colors.sand, color: colors.deep }}>
          {badge}
        </div>
      )}
      <h3 className="text-xl font-extrabold" style={{ color: colors.deep }}>{title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {bullets.map((b, i) => (
          <Pill key={i}>{b}</Pill>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <a href="#contact" className="rounded-full px-4 py-2 text-white text-sm" style={{ backgroundColor: colors.green }}>
          Book / Consult
        </a>
        <a
          href="https://wa.me/5210000000000" target="_blank" rel="noreferrer"
          className="rounded-full px-4 py-2 text-sm border"
          style={{ borderColor: colors.green, color: colors.green }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function Tours({ lng }) {
  const t = i18n[lng];
  return (
    <section id="tours" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ color: colors.deep }}>
          {t.tours_title}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TourCard title={t.food_title} desc={t.food_desc} bullets={t.food_bullets} badge="Pilot" />
          <TourCard title={t.valladolid_title} desc={t.valladolid_desc} bullets={t.valladolid_bullets} badge="Coming Soon" />
          <TourCard title={t.accessible_title} desc={t.accessible_desc} bullets={t.accessible_bullets} badge="Easy Explorer" />
        </div>
      </div>
    </section>
  );
}

function Accessible({ lng }) {
  const t = i18n[lng];
  return (
    <section id="accessible" className="py-16 md:py-20" style={{ backgroundColor: colors.sand }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black" style={{ color: colors.deep }}>{t.accessible_title}</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-800">{t.accessible_desc}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {t.accessible_bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full" style={{ background: colors.green }} />{b}</li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="#contact" className="rounded-full px-4 py-2 text-white text-sm" style={{ backgroundColor: colors.green }}>
                Plan an Accessible Tour
              </a>
              <a href="mailto:hello@venchatours.mx" className="rounded-full px-4 py-2 text-sm border" style={{ borderColor: colors.green, color: colors.green }}>
                Email us
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <BadgeLogo />
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ lng }) {
  const t = i18n[lng];
  return (
    <section id="about" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-black" style={{ color: colors.deep }}>{t.about_title}</h2>
          <p className="mt-3 text-neutral-800 text-sm md:text-base">{t.about_body}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>Small groups</Pill>
            <Pill>Bilingual EN/ES</Pill>
            <Pill>Hotel pickups</Pill>
            <Pill>Fully insured</Pill>
          </div>
        </div>
        <div className="rounded-2xl border p-6 bg-cover bg-center min-h-[220px]" style={{ borderColor: colors.sand, backgroundImage: `url('${PHOTOS.about}')` }}>
          <div className="backdrop-brightness-75 rounded-xl p-4 text-white max-w-sm">
            <div className="text-lg font-bold">Trusted, human, joyful.</div>
            <div className="text-sm opacity-90 mt-1">We obsess over the details so you can savor the moment.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ({ lng }) {
  const t = i18n[lng];
  return (
    <section id="faq" className="py-16 md:py-20" style={{ backgroundColor: colors.white }}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ color: colors.deep }}>{t.faq_title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.faq.map((f, i) => (
            <div key={i} className="rounded-xl p-5 border bg-white" style={{ borderColor: colors.sand }}>
              <div className="font-bold" style={{ color: colors.deep }}>{f.q}</div>
              <div className="mt-2 text-sm text-neutral-700">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking({ lng }) {
  const t = i18n[lng];
  return (
    <section id="booking" className="py-16 md:py-20" style={{ backgroundColor: colors.white }}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: colors.deep }}>
          {lng === 'en' ? 'Booking & Payments' : 'Reservas y Pagos'}
        </h2>
        <p className="text-sm text-neutral-700 mb-5">
          {lng === 'en'
            ? 'Choose a date and confirm with a secure deposit. You can also message us if you prefer to book privately.'
            : 'Elige una fecha y confirma con un depósito seguro. También puedes escribirnos si prefieres reservar en privado.'}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-5 border" style={{ borderColor: colors.sand }}>
            <div className="text-sm font-semibold mb-2" style={{ color: colors.deep }}>
              {lng === 'en' ? 'Step 1 — Pick a date' : 'Paso 1 — Elige fecha'}
            </div>
            <a href={BOOKING_URL || '#contact'} className="rounded-xl px-4 py-3 text-white inline-block" style={{ backgroundColor: colors.green }}>
              {BOOKING_URL ? (lng === 'en' ? 'Open Booking' : 'Abrir Reservas') : (lng === 'en' ? 'Request Dates' : 'Solicitar Fechas')}
            </a>
            <div className="mt-3 text-xs text-neutral-600">
              {BOOKING_URL ? (lng === 'en' ? 'Opens our booking page in a new tab.' : 'Abre nuestra página de reservas en una nueva pestaña.') : (lng === 'en' ? 'No booking link yet — use the contact form.' : 'Aún sin enlace — usa el formulario de contacto.')}
            </div>
          </div>
          <div className="rounded-2xl p-5 border" style={{ borderColor: colors.sand }}>
            <div className="text-sm font-semibold mb-2" style={{ color: colors.deep }}>
              {lng === 'en' ? 'Step 2 — Pay deposit' : 'Paso 2 — Paga el depósito'}
            </div>
            <a href={PAYMENT_URL || '#contact'} className="rounded-xl px-4 py-3 text-white inline-block" style={{ backgroundColor: colors.red }}>
              {PAYMENT_URL ? (lng === 'en' ? 'Pay Securely' : 'Pagar Seguro') : (lng === 'en' ? 'Request Invoice' : 'Solicitar Factura')}
            </a>
            <div className="mt-3 text-xs text-neutral-600">
              {PAYMENT_URL ? (lng === 'en' ? 'Powered by Stripe Payment Links.' : 'Con Stripe Payment Links.') : (lng === 'en' ? 'We’ll send a secure payment link.' : 'Te enviaremos un enlace de pago seguro.')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ lng }) {
  const t = i18n[lng];
  return (
    <section id="contact" className="py-16 md:py-20" style={{ backgroundColor: colors.sand }}>
      <div className="max-w-6xl mx:auto px-4"></div>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black" style={{ color: colors.deep }}>{t.contact_title}</h2>
        <p className="mt-2 text-sm text-neutral-800 max-w-prose">{t.contact_blurb}</p>
        <form onSubmit={(e) => {
    e.preventDefault();
    alert("Thanks! We'll be in touch shortly.");
  }}
  className="mt-6 grid md:grid-cols-3 gap-4">
          <input required placeholder={t.form_name} className="rounded-xl px-4 py-3 border bg-white" style={{ borderColor: colors.sand }} />
          <input required type="email" placeholder={t.form_email} className="rounded-xl px-4 py-3 border bg-white" style={{ borderColor: colors.sand }} />
          <button className="rounded-xl px-4 py-3 text-white font-semibold" style={{ backgroundColor: colors.green }}>{t.form_submit}</button>
          <textarea required placeholder={t.form_message} className="md:col-span-3 rounded-xl px-4 py-3 border bg-white h-32" style={{ borderColor: colors.sand }} />
        </form>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a href="mailto:hello@venchatours.mx" className="underline">hello@venchatours.mx</a>
          <span>•</span>
          <a href="https://wa.me/5210000000000" target="_blank" rel="noreferrer" className="underline">WhatsApp</a>
          <span>•</span>
          <a href="#" className="underline">Instagram</a>
        </div>
        <div className="mt-6 text-xs text-neutral-600">
          <div><strong>How to swap the logo/photos:</strong> set <code>LOGO_URL</code> and <code>PHOTOS</code> at the top of this file. The badge auto-switches to your uploaded logo.</div>
          <div className="mt-1"><strong>How to enable booking/payments:</strong> paste your links into <code>BOOKING_URL</code> and <code>PAYMENT_URL</code>.</div>
        </div>
      </div>
    </section>
  );
}

function Footer({ lng }) {
  const t = i18n[lng];
  return (
    <footer className="py-10 text-center text-xs" style={{ backgroundColor: colors.deep, color: colors.white }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-2">VenCha Tours – {i18n.en.tagline}</div>
        <div className="opacity-80">{t.legal}</div>
      </div>
      <a
        href="https://wa.me/5210000000000"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 px-4 py-3 rounded-full text-white shadow-lg"
        style={{ backgroundColor: colors.green }}
      >
        WhatsApp
      </a>
    </footer>
  );
}

export default function App() {
  const [lng, setLng] = useState("en");
  useMemo(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <main className="font-sans" style={{ backgroundColor: colors.white }}>
      <Nav lng={lng} setLng={setLng} />
      <Hero lng={lng} />
      <Tours lng={lng} />
      <Booking lng={lng} />
      <Accessible lng={lng} />
      <About lng={lng} />
      <FAQ lng={lng} />
      <Contact lng={lng} />
      <Footer lng={lng} />
    </main>
  );
}
