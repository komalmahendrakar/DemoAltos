'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll zones — expressed as fractions of the total 300vh scroll space
 *
 *  0%  – 20%  → Text fades out (0 to 60vh)
 *  0%  – 20%  → skyy.png slides up by -100vh, effectively clearing the screen
 */
const SCROLL_PHASE_END = 0.20; // 20% of 300vh

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
});

const HEADLINE_LINES = [
    { text: "We Don\u2019t Just", delay: 0.50, orange: false },
    { text: 'Implement Oracle.', delay: 0.62, orange: false },
    { text: 'We Make It', delay: 0.74, orange: false },
    { text: 'Come Alive.', delay: 0.86, orange: true },
];

export default function HeroSection() {
    const imgRef = useRef<HTMLImageElement>(null);
    const textWrapRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current !== null) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;

                const scrollY = window.scrollY;
                const totalDist = window.innerHeight * 3; // 300vh
                const norm = scrollY / totalDist;    // 0 → 1

                const phaseParam = Math.min(norm / SCROLL_PHASE_END, 1); // 0 → 1 over 0-20%

                /* ── Image slides up seamlessly ── */
                if (imgRef.current) {
                    imgRef.current.style.transform = `translateY(-${phaseParam * 100}vh)`;
                }

                /* ── Text remains fixed but fades out ── */
                if (textWrapRef.current) {
                    const fade = 1 - phaseParam;
                    textWrapRef.current.style.opacity = String(fade);
                    textWrapRef.current.style.pointerEvents = fade < 0.02 ? 'none' : 'auto';
                }
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
            {/* ── Background image (slides up on scroll) ── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                ref={imgRef}
                src="/skyy2.png"
                alt=""
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    willChange: 'transform',
                    transform: 'translateY(0vh)',
                }}
            />

            {/* ══════════════ Hero content (stays fixed, fades out) ══════════════ */}
            <div
                ref={textWrapRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 clamp(20px, 5vw, 60px)',
                    pointerEvents: 'auto',
                }}
            >
                {/* ── Top label with side lines ── */}
                <motion.div
                    {...fadeUp(0.3)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        marginBottom: 'clamp(28px, 3.5vw, 48px)',
                    }}
                >
                    <div style={{ height: '1px', width: '36px', background: 'rgba(255,255,255,0.22)' }} />
                    <span
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 500,
                            fontSize: '11px',
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.45)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Oracle Platinum Partner · Est. 2018
                    </span>
                    <div style={{ height: '1px', width: '36px', background: 'rgba(255,255,255,0.22)' }} />
                </motion.div>

                {/* ── Headline — one line per motion div ── */}
                <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
                    {HEADLINE_LINES.map(({ text, delay, orange }) => (
                        <motion.div
                            key={text}
                            {...fadeUp(delay)}
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 'clamp(42px, 5.5vw, 88px)',
                                fontWeight: 300,
                                letterSpacing: '2px',
                                lineHeight: 1.1,
                                color: orange ? '#F15A22' : '#FFFFFF',
                                display: 'block',
                            }}
                        >
                            {text}
                        </motion.div>
                    ))}
                </div>

                {/* ── Subtext ── */}
                <motion.p
                    {...fadeUp(0.9)}
                    style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontWeight: 300,
                        fontSize: '14px',
                        lineHeight: 1.75,
                        color: 'rgba(255,255,255,0.4)',
                        maxWidth: '380px',
                        textAlign: 'center',
                        marginTop: '24px',
                    }}
                >
                    Altus unifies every function of your business into one powerful Oracle system.
                </motion.p>
            </div>

            {/* ── Scroll hint — pinned to bottom ── */}
            <motion.div
                {...fadeUp(1.2)}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    pointerEvents: 'none',
                }}
            >
                <span
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: '10px',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.30)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    scroll to explore
                </span>

                {/* Animated vertical line */}
                <motion.div
                    animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                    style={{
                        width: '1px',
                        height: '32px',
                        background: 'rgba(255,255,255,0.45)',
                        transformOrigin: 'top center',
                    }}
                />
            </motion.div>
        </div>
    );
}
