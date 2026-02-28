'use client';


const CLIENT_LOGOS = [
    '/logos/logo1.png',
    '/logos/logo2.png',
    '/logos/logo3.png',
    '/logos/logo4.jpg',
    '/logos/logo5.png',
    '/logos/logo6.png',
];

// Duplicate the list multiple times to ensure the marquee fills the screen 
// and loops seamlessly regardless of viewport width. We use 4 copies to ensure
// the track is very long, since we only have 6 logos.
const MARQUEE_ITEMS = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function ClientMarquee() {
    return (
        <section
            style={{
                backgroundColor: '#111111',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '56px 0',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* ── Eyebrow Label ── */}
            <h3
                style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '18px',
                    fontWeight: 500,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    textAlign: 'center',
                    margin: '0 0 40px 0',
                }}
            >
                Trusted by Industry Leaders
            </h3>

            {/* ── Marquee Container with Fade Mask ── */}
            <div
                style={{
                    display: 'flex',
                    overflow: 'hidden',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                    maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                }}
            >
                <style>{`
          @keyframes borderScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            align-items: center;
            will-change: transform;
            white-space: nowrap;
            width: fit-content;
            animation: borderScroll 35s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

                <div className="marquee-track">
                    {MARQUEE_ITEMS.map((logo, index) => (
                        <div
                            key={`${logo}-${index}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {/* Client Logo */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo}
                                alt="Client Logo"
                                style={{
                                    height: logo.includes('logo1') ? '140px' : '84px',
                                    objectFit: 'contain',
                                    cursor: 'default',
                                }}
                            />

                            {/* Separator Diamond */}
                            <span
                                style={{
                                    color: '#F15A22',
                                    opacity: 0.4,
                                    margin: logo.includes('logo2') ? '0 240px 0 120px' : '0 120px',
                                    fontSize: '12px',
                                    userSelect: 'none',
                                }}
                            >
                                ✦
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
