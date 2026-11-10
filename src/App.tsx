import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArtisanPizzaSvg } from './components/ArtisanPizzaSvg';
import { InviteCard } from './components/InviteCard';

type InviteStage = 'teaser' | 'opening' | 'revealed';

export const App: React.FC = () => {
  const [stage, setStage] = useState<InviteStage>('teaser');

  const handleOpenPizza = () => {
    if (stage !== 'teaser') return;

    setStage('opening');

    // Microinteração de partículas artesanais ao abrir a pizza
    try {
      confetti({
        particleCount: 40,
        spread: 75,
        origin: { y: 0.52 },
        colors: ['#D9381E', '#E6A15C', '#3B7A57', '#2B2927'],
        scalar: 0.9,
      });
    } catch {
      // Ignora caso o navegador restrinja canvas
    }

    // Aguarda as fatias se separarem suavemente antes de revelar o card
    setTimeout(() => {
      setStage('revealed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 640);
  };

  const handleReplayTeaser = () => {
    setStage('teaser');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden py-6 px-3">
      {/* Detalhes decorativos minimalistas nos cantos (Estética Pizzaria Artesanal) */}
      <div
        className="pointer-events-none fixed inset-3 sm:inset-5 border border-charcoal/[0.07] rounded-3xl z-0"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {stage !== 'revealed' ? (
          <motion.div
            key="teaser-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.28 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto py-8 px-4 space-y-6"
          >
            {/* Selo Minimalista Superior */}
            <motion.div
              animate={
                stage === 'opening'
                  ? { opacity: 0, y: -12 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crust/20 border border-crust/45 text-charcoal/80 text-xs font-semibold tracking-[0.16em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tomato animate-ping" />
              Convite Especial • Pedro 24
            </motion.div>

            {/* Ilustração Vetorial Interativa da Pizza [RF01] */}
            <ArtisanPizzaSvg
              isOpening={stage === 'opening'}
              onActivate={handleOpenPizza}
            />

            {/* Texto discreto e pulsante abaixo da pizza */}
            <motion.div
              animate={
                stage === 'opening'
                  ? { opacity: 0, y: 12 }
                  : { opacity: [0.65, 1, 0.65], y: [0, -3, 0] }
              }
              transition={
                stage === 'opening'
                  ? { duration: 0.25 }
                  : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              }
              className="space-y-2"
            >
              <button
                type="button"
                onClick={handleOpenPizza}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 hover:bg-white border border-charcoal/15 shadow-artisan-sm text-sm sm:text-base font-medium text-charcoal cursor-pointer transition-all hover:border-tomato/40"
              >
                <span>Toque na pizza para abrir seu convite</span>
                <span className="text-lg" role="img" aria-label="Pizza">
                  🍕
                </span>
              </button>
              <p className="text-xs text-charcoal/50 font-medium">
                Uma fatia especial está esperando por você
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="invite-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full"
          >
            <InviteCard onReplayTeaser={handleReplayTeaser} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
