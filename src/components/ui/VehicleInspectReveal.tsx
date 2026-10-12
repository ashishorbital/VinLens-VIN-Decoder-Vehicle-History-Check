import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RevealLayer } from './RevealLayer';

export interface VehicleInspectRevealProps {
  cleanSrc: string;
  damagedSrc: string;
  alt: string;
  isInspecting?: boolean;
  onInspectChange?: (inspecting: boolean) => void;
  className?: string;
}

export const VehicleInspectReveal: React.FC<VehicleInspectRevealProps> = ({
  cleanSrc,
  damagedSrc,
  alt,
  isInspecting = false,
  onInspectChange,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [spotlightRadius, setSpotlightRadius] = useState(160);

  useEffect(() => {
    const checkViewport = () => {
      const desktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setSpotlightRadius(160);
      } else {
        const w = containerRef.current?.getBoundingClientRect().width || window.innerWidth;
        setSpotlightRadius(Math.max(68, Math.min(Math.round(w * 0.22), 92)));
      }
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Target coordinates from mouse / touch
  const targetRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null
  });

  // Current eased coordinates
  const currentRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null
  });

  // State to trigger React render on each eased frame
  const [easedCursor, setEasedCursor] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null
  });

  // Mobile touch interaction refs
  const touchTargetRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null
  });
  const isUserTouchingRef = useRef(false);
  const touchResumeTimeoutRef = useRef<number | null>(null);

  // Unified animation loop: Desktop mouse lerp (untouched) + Mobile autonomous sweep & touch drag
  useEffect(() => {
    let animId: number;

    const animate = () => {
      if (isDesktop) {
        // Desktop: Exactly as before (untouched)
        const target = targetRef.current;
        const current = currentRef.current;

        if (target.x !== null && target.y !== null) {
          if (current.x === null || current.y === null) {
            current.x = target.x;
            current.y = target.y;
            setEasedCursor({ x: current.x, y: current.y });
          } else {
            // Smooth 0.1 lerp
            const dx = target.x - current.x;
            const dy = target.y - current.y;
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
              current.x += dx * 0.1;
              current.y += dy * 0.1;
              setEasedCursor({ x: current.x, y: current.y });
            }
          }
        } else {
          if (current.x !== null || current.y !== null) {
            current.x = null;
            current.y = null;
            setEasedCursor({ x: null, y: null });
          }
        }
      } else {
        // Mobile & Touch: Option 1 - Autonomous Cinematic Scanner Sweep + Touch Drag
        const current = currentRef.current;
        const rect = containerRef.current?.getBoundingClientRect();

        if (rect && rect.width > 0) {
          let desiredX: number;
          let desiredY: number;

          if (isUserTouchingRef.current && touchTargetRef.current.x !== null && touchTargetRef.current.y !== null) {
            // User direct finger drag
            desiredX = touchTargetRef.current.x;
            desiredY = touchTargetRef.current.y;

            // Damage zone is front-right impact quadrant
            const isNearDamage = desiredX > rect.width * 0.55 && desiredY > rect.height * 0.40;
            onInspectChange?.(isNearDamage);
          } else {
            // Autonomous Cinematic Scanner Loop (4.8s cycle)
            const now = performance.now();
            const cycleDuration = 4800;
            const t = (now % cycleDuration) / cycleDuration;
            // Smooth sinusoidal ease: 0 -> 1 -> 0
            const ease = (1 - Math.cos(t * Math.PI * 2)) / 2;

            const startX = rect.width * 0.32;
            const endX = rect.width * 0.74;
            const startY = rect.height * 0.48;
            const endY = rect.height * 0.60;

            desiredX = startX + (endX - startX) * ease;
            desiredY = startY + (endY - startY) * ease;

            // Trigger severe accident notification when scanning front-right impact zone
            const isNearDamage = ease > 0.62;
            onInspectChange?.(isNearDamage);
          }

          if (current.x === null || current.y === null) {
            current.x = desiredX;
            current.y = desiredY;
            setEasedCursor({ x: current.x, y: current.y });
          } else {
            // Smooth lerp: 0.18 for finger responsiveness, 0.08 for autonomous gliding
            const lerpSpeed = isUserTouchingRef.current ? 0.18 : 0.08;
            current.x += (desiredX - current.x) * lerpSpeed;
            current.y += (desiredY - current.y) * lerpSpeed;
            setEasedCursor({ x: current.x, y: current.y });
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      if (touchResumeTimeoutRef.current) {
        clearTimeout(touchResumeTimeoutRef.current);
      }
    };
  }, [isDesktop, onInspectChange]);

  // Desktop mouse handlers (untouched)
  const updateTarget = useCallback((clientX: number, clientY: number) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

    targetRef.current = { x, y };
    onInspectChange?.(true);
  }, [isDesktop, onInspectChange]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDesktop) updateTarget(e.clientX, e.clientY);
  }, [isDesktop, updateTarget]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDesktop) updateTarget(e.clientX, e.clientY);
  }, [isDesktop, updateTarget]);

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop) return;
    targetRef.current = { x: null, y: null };
    onInspectChange?.(false);
  }, [isDesktop, onInspectChange]);

  // Mobile touch handlers
  const updateTouchTarget = useCallback((clientX: number, clientY: number) => {
    if (isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    touchTargetRef.current = { x, y };
  }, [isDesktop]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isDesktop) return;
    isUserTouchingRef.current = true;
    if (touchResumeTimeoutRef.current) {
      clearTimeout(touchResumeTimeoutRef.current);
      touchResumeTimeoutRef.current = null;
    }
    const touch = e.touches[0];
    updateTouchTarget(touch.clientX, touch.clientY);
  }, [isDesktop, updateTouchTarget]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isDesktop) return;
    const touch = e.touches[0];
    updateTouchTarget(touch.clientX, touch.clientY);
  }, [isDesktop, updateTouchTarget]);

  const handleTouchEnd = useCallback(() => {
    if (isDesktop) return;
    // Delay resuming autonomous scan by 1s for tactile release
    touchResumeTimeoutRef.current = window.setTimeout(() => {
      isUserTouchingRef.current = false;
    }, 1000);
  }, [isDesktop]);

  // Sync external inspection trigger (Desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    if (isInspecting && targetRef.current.x === null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      targetRef.current = {
        x: rect.width * 0.72,
        y: rect.height * 0.58
      };
    } else if (!isInspecting && targetRef.current.x !== null && currentRef.current.x !== null) {
      if (!containerRef.current?.matches(':hover')) {
        targetRef.current = { x: null, y: null };
      }
    }
  }, [isDesktop, isInspecting]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`relative select-none lg:cursor-crosshair lg:group overflow-visible touch-pan-y ${className}`}
    >
      {/* Main Image Container: Floating hover effect only on desktop (lg:animate-float-car) */}
      <div className="relative w-full overflow-visible drop-shadow-xl lg:drop-shadow-2xl rounded-2xl bg-transparent min-h-0 lg:min-h-[320px] flex items-center justify-center lg:animate-float-car">
        {/* Base Clean Car (Transparent PNG) */}
        <img
          src={cleanSrc}
          alt={alt}
          className="w-full h-auto object-contain block transition-transform duration-500 lg:group-hover:scale-[1.01] drop-shadow-xl"
          loading="eager"
        />

        {/* RevealLayer Spotlight: Desktop (160px) + Mobile Responsive Autonomous/Touch Spotlight */}
        <RevealLayer
          image={damagedSrc}
          cursorX={easedCursor.x}
          cursorY={easedCursor.y}
          spotlightRadius={spotlightRadius}
        />
      </div>
    </div>
  );
};
