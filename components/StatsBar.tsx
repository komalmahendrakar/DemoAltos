'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(end: number, duration: number = 2000, startInView: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startInView) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const easeOutOut = (t: number) => 1 - Math.pow(1 - t, 3); // simple cubic ease-out

        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            const rawPhase = Math.min(progress / duration, 1);
            const easedPhase = easeOutOut(rawPhase);

            setCount(Math.round(easedPhase * end));

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(updateCount);
            } else {
                setCount(end); // ensure exact finish
            }
        };

        animationFrameId = requestAnimationFrame(updateCount);

        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration, startInView]);

    return count;
}

function StatItem({
    num,
    suffix,
    label,
    index,
    isInView
}: {
    num: number;
    suffix: string;
    label: string;
    index: number;
    isInView: boolean;
}) {
    const count = useCountUp(num, 2000, isInView);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
            style={{
                padding: '52px 40px',
                borderRight: index < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '80px',
                    color: '#FFFFFF',
                    lineHeight: 1,
                }}
            >
                {count}
                <span style={{ color: '#F15A22' }}>{suffix}</span>
            </div>

            <div
                style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    marginTop: '10px',
                }}
            >
                {label}
            </div>
        </motion.div>
    );
}

export default function StatsBar() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 }); // 30% threshold

    const stats = [
        { num: 45, suffix: '+', label: 'Enterprise Clients' },
        { num: 150, suffix: '+', label: 'Oracle Experts' },
        { num: 100, suffix: 'K+', label: 'Support Hours' },
        { num: 10, suffix: '+', label: 'Geographies Served' },
    ];

    return (
        <section
            style={{
                backgroundColor: '#111111',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '0 60px',
            }}
        >
            <div
                ref={ref}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                }}
            >
                {stats.map((stat, i) => (
                    <StatItem
                        key={i}
                        index={i}
                        num={stat.num}
                        suffix={stat.suffix}
                        label={stat.label}
                        isInView={isInView}
                    />
                ))}
            </div>
        </section>
    );
}
