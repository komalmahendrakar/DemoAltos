'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
    {
        num: '01',
        name: 'Implementation',
        short: 'Full-cycle Oracle ERP deployment configured to how your business works.',
        extended: 'On time, within budget, no surprises. We involve your teams throughout so the final system matches how you actually work. 95% user adoption within first month.',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
        )
    },
    {
        num: '02',
        name: 'Upgrade',
        short: 'Seamless migration to the latest Oracle version without breaking anything.',
        extended: 'Preserving your configurations, customizations, and operational continuity throughout the entire migration process.',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
        )
    },
    {
        num: '03',
        name: 'Support Services',
        short: 'Dedicated Oracle support that goes beyond standard coverage.',
        extended: 'Customized packages so you only pay for what you need. Real consultants, fast resolution, no call centers.',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
        )
    },
    {
        num: '04',
        name: 'Managed Services',
        short: 'We run your Oracle environment so your teams focus on business.',
        extended: '99.8% uptime guaranteed. We take complete ownership of ERP administration, monitoring and maintenance.',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
        )
    },
    {
        num: '05',
        name: 'Advisory',
        short: 'System health checks and strategic guidance to maximize your Oracle investment.',
        extended: 'Over $3M worth of opportunities identified via ERP maturity assessments across our client base.',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
            </svg>
        )
    },
    {
        num: '06',
        name: 'Elevate',
        short: 'Role-based Oracle training that builds lasting capability inside your organization.',
        extended: 'Practical, role-based training delivered onsite, remote or hybrid. Knowledge stays inside your organization.',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
        )
    }
];

export default function ServicesSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
    };

    const getCardStyle = (index: number) => {
        const isHovered = hoveredIndex === index;
        const isSomethingHovered = hoveredIndex !== null;

        // Determine if this card is in the same row as the hovered card
        const thisRow = index < 3 ? 0 : 1;
        const hoveredRow = hoveredIndex !== null ? (hoveredIndex < 3 ? 0 : 1) : null;

        // If hovered, span 3 flex units roughly giving it ~60% of width (3 / (3+1+1)).
        // Otherwise 1 flex unit. Only active if something in the SAME ROW is hovered.
        let flexValue = 1;
        if (thisRow === hoveredRow) {
            flexValue = isHovered ? 3 : 1;
        }

        return {
            flex: flexValue,
            backgroundColor: isHovered ? '#F15A22' : (isSomethingHovered ? '#0D0D0D' : '#111111'),
            opacity: (!isHovered && isSomethingHovered) ? 0.5 : 1, borderColor: isHovered ? '#F15A22' : 'rgba(255,255,255,0.06)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        };
    };

    return (
        <section style={{ backgroundColor: '#0A0A0A', padding: '100px 60px' }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

                {/* ── Section Header ── */}
                <div style={{ marginBottom: '56px', textAlign: 'center' }}>
                    <div
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: '14px',
                            fontWeight: 600,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: '#F15A22',
                            marginBottom: '16px',
                        }}
                    >
                        What We Deliver
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(36px, 4vw, 60px)',
                            fontWeight: 300,
                            color: '#FFFFFF',
                            margin: 0,
                        }}
                    >
                        Our Services
                    </h2>
                </div>

                {/* ── Bento Grid Wrapper ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                    {/* Top Row */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        height: (hoveredIndex !== null && hoveredIndex < 3) ? '440px' : '280px',
                        transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}>
                        {SERVICES.slice(0, 3).map((service, i) => {
                            const globalIndex = i;
                            const isHovered = hoveredIndex === globalIndex;
                            const isSomethingHovered = hoveredIndex !== null;

                            // Text Opacity dimming if unhovered when grid active
                            const textOpacityMultiplier = (!isHovered && isSomethingHovered) ? 0.6 : 1;

                            return (
                                <motion.div
                                    key={globalIndex}
                                    variants={cardVariants}
                                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        ...getCardStyle(globalIndex),
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderRadius: '4px',
                                        padding: '36px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        willChange: 'transform',
                                    }}
                                >
                                    {/* ── ENHANCEMENT 1 — Faint orange corner glow ── */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            bottom: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'radial-gradient(circle at 0% 100%, rgba(241,90,34,0.12) 0%, rgba(241,90,34,0.04) 40%, transparent 70%)',
                                            pointerEvents: 'none',
                                            opacity: isHovered ? 0 : 1,
                                            transition: 'opacity 0.4s ease',
                                            zIndex: 0,
                                        }}
                                    />

                                    {/* ── ENHANCEMENT 2 — Large faint card number ── */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '-20px',
                                            right: '16px',
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: '140px',
                                            color: 'rgba(255,255,255,0.03)',
                                            pointerEvents: 'none',
                                            lineHeight: 1,
                                            opacity: isHovered ? 0 : 1,
                                            transition: 'opacity 0.4s ease',
                                            zIndex: 0,
                                        }}
                                    >
                                        {service.num}
                                    </div>

                                    <div
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: '12px',
                                            letterSpacing: '3px',
                                            color: isHovered ? '#0A0A0A' : '#F15A22',
                                            opacity: isHovered ? 0.4 : (0.6 * textOpacityMultiplier),
                                            transition: 'all 0.4s ease',
                                        }}
                                    >
                                        {service.num}
                                    </div>

                                    <div
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            marginTop: '24px',
                                            color: isHovered ? '#0A0A0A' : '#F15A22',
                                            opacity: textOpacityMultiplier,
                                            transition: 'all 0.4s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {/* ── ENHANCEMENT 3 — Icon glow ── */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '50%',
                                                background: isHovered
                                                    ? 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)'
                                                    : 'radial-gradient(circle, rgba(241,90,34,0.15) 0%, transparent 70%)',
                                                filter: 'blur(8px)',
                                                pointerEvents: 'none',
                                                transition: 'background 0.4s ease',
                                                zIndex: -1,
                                            }}
                                        />
                                        {service.icon}
                                    </div>

                                    <h3
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: '20px',
                                            fontWeight: 700,
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            color: isHovered ? '#0A0A0A' : '#FFFFFF',
                                            marginTop: '16px',
                                            opacity: textOpacityMultiplier,
                                            transition: 'all 0.4s ease',
                                        }}
                                    >
                                        {service.name}
                                    </h3>

                                    <p
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            fontFamily: "'Barlow', sans-serif",
                                            fontWeight: 300,
                                            fontSize: '13px',
                                            lineHeight: 1.7,
                                            color: isHovered ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
                                            marginTop: '10px',
                                            opacity: textOpacityMultiplier,
                                            transition: 'all 0.4s ease',
                                            maxWidth: '300px', // constrain to visual block 
                                        }}
                                    >
                                        {service.short}
                                    </p>

                                    <p
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            fontFamily: "'Barlow', sans-serif",
                                            fontWeight: 300,
                                            fontSize: isHovered ? '15px' : '13px',
                                            lineHeight: isHovered ? 1.6 : 1.7,
                                            color: 'rgba(0,0,0,0.7)',
                                            marginTop: '14px',
                                            opacity: isHovered ? 1 : 0,
                                            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            maxWidth: '440px',
                                        }}
                                    >
                                        {service.extended}
                                    </p>

                                    <div
                                        style={{
                                            position: 'absolute', zIndex: 1,
                                            bottom: '36px',
                                            right: '36px',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            color: isHovered ? '#0A0A0A' : 'rgba(255,255,255,0.15)',
                                            opacity: isHovered ? 1 : textOpacityMultiplier,
                                            transform: isHovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        ↗
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom Row */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        height: (hoveredIndex !== null && hoveredIndex >= 3) ? '440px' : '280px',
                        transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}>
                        {SERVICES.slice(3, 6).map((service, i) => {
                            const globalIndex = i + 3;
                            const isHovered = hoveredIndex === globalIndex;
                            const isSomethingHovered = hoveredIndex !== null;

                            const textOpacityMultiplier = (!isHovered && isSomethingHovered) ? 0.6 : 1;

                            return (
                                <motion.div
                                    key={globalIndex}
                                    variants={cardVariants}
                                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        ...getCardStyle(globalIndex),
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderRadius: '4px',
                                        padding: '36px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        willChange: 'transform',
                                    }}
                                >
                                    {/* ── ENHANCEMENT 1 — Faint orange corner glow ── */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            bottom: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'radial-gradient(circle at 0% 100%, rgba(241,90,34,0.12) 0%, rgba(241,90,34,0.04) 40%, transparent 70%)',
                                            pointerEvents: 'none',
                                            opacity: isHovered ? 0 : 1,
                                            transition: 'opacity 0.4s ease',
                                            zIndex: 0,
                                        }}
                                    />

                                    {/* ── ENHANCEMENT 2 — Large faint card number ── */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '-20px',
                                            right: '16px',
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: '140px',
                                            color: 'rgba(255,255,255,0.03)',
                                            pointerEvents: 'none',
                                            lineHeight: 1,
                                            opacity: isHovered ? 0 : 1,
                                            transition: 'opacity 0.4s ease',
                                            zIndex: 0,
                                        }}
                                    >
                                        {service.num}
                                    </div>

                                    <div
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: '12px',
                                            letterSpacing: '3px',
                                            color: isHovered ? '#0A0A0A' : '#F15A22',
                                            opacity: isHovered ? 0.4 : (0.6 * textOpacityMultiplier),
                                            transition: 'all 0.4s ease',
                                        }}
                                    >
                                        {service.num}
                                    </div>

                                    <div
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            marginTop: '24px',
                                            color: isHovered ? '#0A0A0A' : '#F15A22',
                                            opacity: textOpacityMultiplier,
                                            transition: 'all 0.4s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {/* ── ENHANCEMENT 3 — Icon glow ── */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '50%',
                                                background: isHovered
                                                    ? 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)'
                                                    : 'radial-gradient(circle, rgba(241,90,34,0.15) 0%, transparent 70%)',
                                                filter: 'blur(8px)',
                                                pointerEvents: 'none',
                                                transition: 'background 0.4s ease',
                                                zIndex: -1,
                                            }}
                                        />
                                        {service.icon}
                                    </div>

                                    <h3
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: '20px',
                                            fontWeight: 700,
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            color: isHovered ? '#0A0A0A' : '#FFFFFF',
                                            marginTop: '16px',
                                            opacity: textOpacityMultiplier,
                                            transition: 'all 0.4s ease',
                                        }}
                                    >
                                        {service.name}
                                    </h3>

                                    <p
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            fontFamily: "'Barlow', sans-serif",
                                            fontWeight: 300,
                                            fontSize: '13px',
                                            lineHeight: 1.7,
                                            color: isHovered ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
                                            marginTop: '10px',
                                            opacity: textOpacityMultiplier,
                                            transition: 'all 0.4s ease',
                                            maxWidth: '300px', // constrain to visual block 
                                        }}
                                    >
                                        {service.short}
                                    </p>

                                    <p
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            fontFamily: "'Barlow', sans-serif",
                                            fontWeight: 300,
                                            fontSize: isHovered ? '15px' : '13px',
                                            lineHeight: isHovered ? 1.6 : 1.7,
                                            color: 'rgba(0,0,0,0.7)',
                                            marginTop: '14px',
                                            opacity: isHovered ? 1 : 0,
                                            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            maxWidth: '440px',
                                        }}
                                    >
                                        {service.extended}
                                    </p>

                                    <div
                                        style={{
                                            position: 'absolute', zIndex: 1,
                                            bottom: '36px',
                                            right: '36px',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            color: isHovered ? '#0A0A0A' : 'rgba(255,255,255,0.15)',
                                            opacity: isHovered ? 1 : textOpacityMultiplier,
                                            transform: isHovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        ↗
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
