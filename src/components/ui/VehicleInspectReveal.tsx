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

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
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

  // 0.1 lerp loop in requestAnimationFrame with cleanup on unmount (Desktop only)
  useEffect(() => {
    if (!isDesktop) return;

    let animId: number;

    const animate = () => {
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

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isDesktop]);

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
      className={`relative select-none lg:cursor-crosshair lg:group overflow-visible ${className}`}
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

        {/* RevealLayer Spotlight: Desktop only */}
        {isDesktop && (
          <RevealLayer
            image={damagedSrc}
            cursorX={easedCursor.x}
            cursorY={easedCursor.y}
            spotlightRadius={160}
          />
        )}
      </div>
    </div>
  );
};
