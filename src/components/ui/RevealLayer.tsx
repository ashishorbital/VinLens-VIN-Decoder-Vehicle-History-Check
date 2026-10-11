import React, { useEffect, useRef, useState } from 'react';

export interface RevealLayerProps {
  image: string;
  cursorX: number | null;
  cursorY: number | null;
  spotlightRadius?: number;
  className?: string;
}

export const RevealLayer: React.FC<RevealLayerProps> = ({
  image,
  cursorX,
  cursorY,
  spotlightRadius = 150,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealDivRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ width: 800, height: 600 });
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 400, y: 300 });

  const isHovered = cursorX !== null && cursorY !== null;
  if (isHovered) {
    lastPosRef.current = { x: cursorX, y: cursorY };
  }

  const renderX = isHovered ? cursorX : lastPosRef.current.x;
  const renderY = isHovered ? cursorY : lastPosRef.current.y;

  // Update canvas size on mount and window resize
  useEffect(() => {
    const updateSize = () => {
      if (revealDivRef.current) {
        const rect = revealDivRef.current.getBoundingClientRect();
        const w = Math.round(rect.width) || window.innerWidth;
        const h = Math.round(rect.height) || window.innerHeight;
        setDims({ width: w, height: h });
        if (canvasRef.current) {
          canvasRef.current.width = w;
          canvasRef.current.height = h;
        }
      } else {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setDims({ width: w, height: h });
        if (canvasRef.current) {
          canvasRef.current.width = w;
          canvasRef.current.height = h;
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Update mask: draws radial gradient onto hidden canvas and updates GPU CSS mask
  useEffect(() => {
    const canvas = canvasRef.current;
    const revealDiv = revealDivRef.current;
    if (!canvas || !revealDiv) return;

    const ctx = canvas.getContext('2d');
    const SPOTLIGHT_R = spotlightRadius;

    if (isHovered && renderX !== null && renderY !== null) {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createRadialGradient(
          renderX,
          renderY,
          0,
          renderX,
          renderY,
          SPOTLIGHT_R
        );

        // Exact color stops
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.75)');
        gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(0.88, 'rgba(255, 255, 255, 0.12)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(renderX, renderY, SPOTLIGHT_R, 0, Math.PI * 2);
        ctx.fill();
      }

      const maskCss = `radial-gradient(circle ${SPOTLIGHT_R}px at ${renderX}px ${renderY}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.75) 60%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.12) 88%, rgba(0, 0, 0, 0) 100%)`;
      revealDiv.style.maskImage = maskCss;
      revealDiv.style.webkitMaskImage = maskCss;
      revealDiv.style.maskRepeat = 'no-repeat';
      revealDiv.style.webkitMaskRepeat = 'no-repeat';
      revealDiv.style.opacity = '1';
    } else {
      // Smooth fade-out preserves last mask position while opacity smoothly fades to 0
      revealDiv.style.opacity = '0';
    }
  });

  return (
    <>
      {/* Hidden canvas sized on mount + resize */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
        width={dims.width}
        height={dims.height}
      />

      {/* Reveal div with smooth opacity entry and exit */}
      <div
        ref={revealDivRef}
        style={{
          backgroundImage: `url(${image})`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`absolute inset-0 bg-center bg-contain bg-no-repeat z-30 pointer-events-none ${className}`}
      />

      {/* Full glowing inspection circle with silky-smooth entry and exit transitions */}
      <div
        style={{
          left: `${renderX}px`,
          top: `${renderY}px`,
          width: `${spotlightRadius * 2}px`,
          height: `${spotlightRadius * 2}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.88})`,
          opacity: isHovered ? 1 : 0,
          willChange: 'left, top, transform, opacity',
          transition: 'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1), transform 280ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="absolute z-40 pointer-events-none rounded-full border-2 border-rose-500/80 shadow-[0_0_35px_rgba(244,63,94,0.45)] flex items-center justify-center"
      >
        {/* Subtle rotating dash accent */}
        <div className="absolute inset-1 rounded-full border border-dashed border-rose-400/35 animate-[spin_16s_linear_infinite]" />

        {/* Precision center reticle point */}
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.9)] opacity-70" />
      </div>
    </>
  );
};
