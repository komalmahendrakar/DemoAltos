'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Fade the entire overlay to 0 over the first 100vh of the 300vh scroll zone.
 * Beyond that the frame animation runs silently with no overlay.
 */
const FADE_DISTANCE_VH = 1; // 1 × innerHeight = 100vh of scroll to reach opacity 0

/** Shared easing for all entrance animations */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function HeroOverlay() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    /* ── Scroll-driven fade (direct DOM mutation — zero re-renders) ── */
    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current !== null) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                if (!wrapperRef.current) return;
                const progress = Math.min(
                    window.scrollY / (window.innerHeight * FADE_DISTANCE_VH),
                    1
                );
                const opacity = 1 - progress;
                wrapperRef.current.style.opacity = String(opacity);
                // Disable pointer events once invisible so underlying content can be interacted with
                wrapperRef.current.style.pointerEvents = opacity < 0.02 ? 'none' : 'auto';
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* ── Dark scrim ── */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.55)',
                    zIndex: 0,
                }}
            />

            {/* ── Hero content ── */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    padding: '0 clamp(20px, 5vw, 60px)',
                    maxWidth: '960px',
                    width: '100%',
                }}
            >
                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: EASE_OUT_EXPO }}
                    style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 'clamp(64px, 8vw, 120px)',
                        lineHeight: 1.05,
                        letterSpacing: '0.02em',
                        color: '#FFFFFF',
                        marginBottom: 'clamp(16px, 2vw, 28px)',
                    }}
                >
                    We Don&apos;t Just Implement Oracle.
                    <br />
                    We Make It{' '}
                    <span style={{ color: '#F15A22' }}>Come Alive.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: EASE_OUT_EXPO }}
                    style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontWeight: 300,
                        fontSize: 'clamp(15px, 1.6vw, 20px)',
                        lineHeight: 1.65,
                        color: 'rgba(255,255,255,0.55)',
                        maxWidth: '480px',
                        margin: '0 auto clamp(40px, 5vw, 64px)',
                    }}
                >
                    Altus connects every part of your business into one unified Oracle system.
                </motion.p>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.42, ease: EASE_OUT_EXPO }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontWeight: 400,
                            fontSize: '11px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.35)',
                        }}
                    >
                        Scroll to see how
                    </span>

                    {/* Pulsing arrow */}
                    <motion.div
                        animate={{ y: [0, 9, 0] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 1.2,
                        }}
                        style={{ color: '#F15A22', lineHeight: 0 }}
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 5v14M5 13l7 7 7-7"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
