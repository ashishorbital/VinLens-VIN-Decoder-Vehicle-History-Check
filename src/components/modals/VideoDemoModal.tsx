import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Play, Pause, RotateCcw, CheckCircle, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Step 1: Reading 17-Digit Digital Check Digit',
      desc: 'Validating ISO 3779 mathematical check digit against manufacturer registry standards.',
      icon: Cpu,
      progress: 25
    },
    {
      title: 'Step 2: Cross-Referencing 50-State Title Records',
      desc: 'Querying NMVTIS database for salvage, junk, flood, and insurance total loss brands.',
      icon: ShieldAlert,
      progress: 55
    },
    {
      title: 'Step 3: Analyzing Odometer Progression Log',
      desc: 'Detecting digital tampering, rollbacks, and odometer reading inconsistencies across inspections.',
      icon: CheckCircle,
      progress: 80
    },
    {
      title: 'Step 4: Compiling Final Comprehensive Dossier',
      desc: 'Generating safety recall status, structural damage assessments, and ownership history report.',
      icon: Sparkles,
      progress: 100
    }
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, steps.length]);

  const activeStep = steps[currentStep];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How VinLens Vehicle Verification Works" maxWidth="3xl">
      <div className="space-y-6">
        {/* Animated Visual Inspection Simulation Screen */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-theme-subtle flex flex-col justify-between p-6 text-white shadow-2xl">
          {/* Background grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

          {/* Top telemetry bar */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-emerald-400 font-bold uppercase tracking-wider">
                LIVE DEMO SCAN SIMULATOR
              </span>
            </div>
            <span className="text-slate-400">FPS: 60 · LATENCY: 12ms</span>
          </div>

          {/* Center visual scanner */}
          <div className="relative z-10 text-center my-auto space-y-4">
            <div className="inline-flex p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10">
              {React.createElement(activeStep.icon, { className: 'w-10 h-10 animate-pulse' })}
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {activeStep.title}
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              {activeStep.desc}
            </p>
          </div>

          {/* Bottom progress bar & telemetry */}
          <div className="relative z-10 space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>SCAN PROGRESS</span>
              <span className="text-cyan-400 font-bold">{activeStep.progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${activeStep.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Playback Controls & Steps selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="gap-1.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(0)}
              className="gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart</span>
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentStep(i);
                  setIsPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  currentStep === i
                    ? 'w-6 bg-accent-primary'
                    : 'bg-theme-subtle hover:bg-theme-muted'
                }`}
                aria-label={`Jump to step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
