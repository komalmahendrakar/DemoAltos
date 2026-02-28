'use client';

import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 85;
const FRAME_BASE = '/frames/ezgif-frame-';

/**
 * PHASE 2: 0 - 20%
 * Canvas slides up from bottom (translateY 100vh -> 0vh)
 * 
 * PHASE 3: 20 - 100%
 * Canvas is fixed at translateY(0). Frame 1 to 85 plays.
 * 
 * Total scroll distance: 300vh (window.innerHeight × 3)
 */
const CANVAS_SLIDE_END = 0.20;

const frameSrc = (index: number): string =>
    `${FRAME_BASE}${String(index).padStart(3, '0')}.png`;

export default function ScrollVideo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);

    /* ── Cover-fit draw ── */
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const img = framesRef.current[index];
        if (!canvas || !img || !img.complete) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cw = canvas.width, ch = canvas.height;
        const iw = img.naturalWidth, ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const sw = iw * scale, sh = ih * scale;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }, []);

    /* ── Resize canvas ── */
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(currentFrameRef.current);
    }, [drawFrame]);

    /* ── Scroll handler ── */
    const handleScroll = useCallback(() => {
        if (rafRef.current !== null) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;

            const scrollY = window.scrollY;
            const totalDist = window.innerHeight * 3;   // 300vh
            const norm = scrollY / totalDist;      // 0 → 1

            /* Element sliding logic: 0% → 20% */
            const slideParam = Math.min(norm / CANVAS_SLIDE_END, 1);

            const canvas = canvasRef.current;
            if (canvas) {
                // Start 100vh below, rise up to 0:
                canvas.style.transform = `translateY(${(1 - slideParam) * 100}vh)`;
            }

            /* Frame logic: 20% → 100% maps to frames 0 → 84 */
            if (norm < CANVAS_SLIDE_END) {
                // Still sliding up — hold on frame 0
                if (currentFrameRef.current !== 0) {
                    currentFrameRef.current = 0;
                    drawFrame(0);
                }
                return;
            }

            const animProgress = (norm - CANVAS_SLIDE_END) / (1 - CANVAS_SLIDE_END);
            const frameIndex = Math.min(
                Math.round(animProgress * (TOTAL_FRAMES - 1)),
                TOTAL_FRAMES - 1
            );

            if (frameIndex === currentFrameRef.current) return;
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
        });
    }, [drawFrame]);

    /* ── Preload all frames ── */
    useEffect(() => {
        framesRef.current = [];
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = frameSrc(i);
            img.onload = () => { if (i === 1) drawFrame(0); };
            framesRef.current.push(img);
        }
    }, [drawFrame]);

    /* ── Canvas size + event listeners ── */
    useEffect(() => {
        resizeCanvas();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', resizeCanvas);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [handleScroll, resizeCanvas]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'block',
                willChange: 'transform',
                transform: 'translateY(100vh)', /* Starts hidden below */
                zIndex: 4,           /* sits just below HeroSection (z-index 5) */
            }}
            aria-hidden="true"
        />
    );
}
