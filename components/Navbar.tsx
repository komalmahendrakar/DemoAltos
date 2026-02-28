'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

const LINKS = ['Services', 'Solutions', 'Industries', 'About', 'Insights'];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    // Trigger glassmorphism state at 50px scroll depth
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={false}
            animate={{
                backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0)',
                backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
                WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)', // fallback for webkit
                borderColor: isScrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '68px',
                padding: '0 60px',
                borderRadius: '0 0 16px 16px',
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 50, // ensures it sits on top of everything
            }}
        >
            {/* ── LOGO (Left) ── */}
            <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <span
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: '26px',
                            letterSpacing: '4px',
                            color: 'var(--orange)',
                            lineHeight: 1,
                        }}
                    >
                        ALTUS.
                    </span>
                </div>
            </Link>

            {/* ── NAVIGATION LINKS (Center) ── */}
            <div style={{ display: 'flex', gap: '32px' }}>
                {LINKS.map((link) => (
                    <Link key={link} href={`#${link.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                        <motion.span
                            initial={{ color: 'rgba(255, 255, 255, 0.5)' }}
                            whileHover={{ color: '#FFFFFF' }}
                            transition={{ duration: 0.2 }}
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: '12px',
                                fontWeight: 500,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                display: 'block',
                            }}
                        >
                            {link}
                        </motion.span>
                    </Link>
                ))}
            </div>

            {/* ── CTA BUTTON (Right) ── */}
            <motion.button
                initial={{ backgroundColor: '#F15A22' }}
                whileHover={{ backgroundColor: '#FF7A45' }}
                transition={{ duration: 0.2 }}
                style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--black)',
                    padding: '10px 24px',
                    border: 'none',
                    borderRadius: 0, // Sharp edges
                    clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)', // Angled cut
                    cursor: 'pointer',
                    outline: 'none',
                }}
            >
                Get In Touch
            </motion.button>
        </motion.nav>
    );
}
