'use client';

import { motion } from 'framer-motion';

export default function IntroSection() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const fadeInVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const drawLineVariant = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
        },
    };

    return (
        <section
            style={{
                backgroundColor: '#0A0A0A',
                padding: '60px 60px 48px 60px',
            }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                style={{
                    maxWidth: '780px',
                    margin: '0 auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* ── Eyebrow Label ── */}
                <motion.div
                    variants={fadeInVariant}
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color: '#F15A22',
                        marginBottom: '24px',
                    }}
                >
                    Oracle Consulting · India · UAE · KSA · EMEA
                </motion.div>

                {/* ── Main Heading ── */}
                <motion.h2
                    variants={fadeUpVariant}
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: 'clamp(36px, 4vw, 60px)',
                        lineHeight: 1.1,
                        letterSpacing: '1px',
                        color: '#FFFFFF',
                        marginBottom: '20px',
                        margin: '0 0 20px 0',
                    }}
                >
                    Leading Your Business to
                    <br />
                    Success with Oracle Expertise.
                </motion.h2>

                {/* ── Subheading ── */}
                <motion.div
                    variants={fadeUpVariant}
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: '18px',
                        fontWeight: 500,
                        letterSpacing: '0.5px',
                        color: 'rgba(255,255,255,0.65)',
                        marginBottom: '24px',
                    }}
                >
                    Your Business Deserves More Than
                    <br />
                    a Standard Implementation.
                </motion.div>

                {/* ── Body Text ── */}
                <motion.p
                    variants={fadeUpVariant}
                    style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontWeight: 300,
                        fontSize: '15px',
                        lineHeight: 1.85,
                        color: 'rgba(255,255,255,0.4)',
                        maxWidth: '580px',
                        margin: '0 auto 36px auto',
                    }}
                >
                    At Altus, we don&apos;t configure Oracle around a template. We learn how your
                    business actually works — then build the system around it. Every
                    implementation is shaped by your workflows, your teams, and your goals. The
                    result is faster adoption, fewer disruptions, and an ERP system your people
                    actually want to use.
                </motion.p>

                {/* ── Orange Divider ── */}
                <motion.div
                    variants={drawLineVariant}
                    style={{
                        width: '48px',
                        height: '1px',
                        backgroundColor: '#F15A22',
                        margin: '0',
                        transformOrigin: 'left center',
                    }}
                />
            </motion.div>
        </section>
    );
}
