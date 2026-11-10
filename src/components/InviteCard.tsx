import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  CalendarPlus,
  RotateCcw,
} from 'lucide-react';
import {
  inviteConfig,
  buildGoogleCalendarUrl,
  downloadIcsCalendarFile,
} from '../config/inviteConfig';
import { MiniPizzaSliceBadge } from './ArtisanPizzaSvg';

interface InviteCardProps {
  onReplayTeaser: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.09,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const InviteCard: React.FC<InviteCardProps> = ({ onReplayTeaser }) => {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg mx-auto px-4 py-6 sm:py-10"
    >
      {/* Card Principal estilo Menu de Pizzaria Artesanal Minimalista */}
      <div className="relative bg-dough/95 backdrop-blur-sm border-2 border-charcoal/15 rounded-3xl p-6 sm:p-9 shadow-artisan overflow-hidden">
        {/* Moldura interna tracejada sutil (detalhe artesanal) */}
        <div className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-dashed border-crust/55" />

        <div className="relative z-10 space-y-6">
          {/* Topo: Emblema + Cabeçalho */}
          <motion.header variants={itemVariants} className="text-center space-y-3">
            <div className="flex justify-center">
              <MiniPizzaSliceBadge onReplay={onReplayTeaser} />
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight leading-[1.12] pt-1">
              Pedro Henrique{' '}
              <span className="inline-block text-tomato underline decoration-crust/70 decoration-wavy decoration-2 underline-offset-4">
                faz 24!
              </span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal/75 font-medium">
              {inviteConfig.subheadline}
            </p>
          </motion.header>

          {/* Divisor minimalista */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-charcoal/10" />
            <span className="text-xs uppercase tracking-[0.2em] text-crust font-bold">
              Save the Date
            </span>
            <span className="h-px flex-1 bg-charcoal/10" />
          </motion.div>

          {/* Data e Hora */}
          <motion.section
            variants={itemVariants}
            aria-label="Data e Horário"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 border border-charcoal/10">
              <div className="p-2.5 rounded-xl bg-tomato/10 text-tomato shrink-0">
                <Calendar className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55">
                  Dia
                </span>
                <p className="font-display font-bold text-charcoal text-base sm:text-[15px] leading-snug mt-0.5">
                  {inviteConfig.dateDisplay}
                </p>
                <span className="inline-block text-xs font-medium text-tomato mt-0.5">
                  ({inviteConfig.dayOfWeek})
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 border border-charcoal/10">
              <div className="p-2.5 rounded-xl bg-crust/25 text-charcoal shrink-0">
                <Clock className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55">
                  Horário
                </span>
                <p className="font-display font-bold text-charcoal text-base sm:text-[15px] leading-snug mt-0.5">
                  {inviteConfig.timeDisplay}
                </p>
                <span className="inline-block text-xs text-charcoal/60 mt-0.5">
                  Forno aquecido & música boa
                </span>
              </div>
            </div>
          </motion.section>

          {/* A Regra de Ouro */}
          <motion.section
            variants={itemVariants}
            aria-label="Regra de Ouro da Festa"
            className="relative rounded-2xl bg-gradient-to-br from-tomato/[0.08] via-crust/[0.15] to-tomato/[0.06] border-2 border-tomato/30 p-5"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-tomato text-dough flex items-center justify-center shrink-0 shadow-sm text-xl">
                🍕
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-tomato">
                    A Regra de Ouro • {inviteConfig.goldenRuleTitle}
                  </span>
                </div>
                <p className="text-sm sm:text-[15px] text-charcoal font-medium leading-relaxed">
                  {inviteConfig.goldenRuleDescription}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Adicionar à Agenda */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
          >
            <a
              href={buildGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-charcoal/80 hover:text-tomato bg-charcoal/[0.04] hover:bg-tomato/10 border border-charcoal/10 transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              Salvar no Google Agenda
            </a>

            <button
              type="button"
              onClick={downloadIcsCalendarFile}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-charcoal/80 hover:text-tomato bg-charcoal/[0.04] hover:bg-tomato/10 border border-charcoal/10 transition-colors cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              Apple Calendar / .ICS
            </button>
          </motion.div>

          {/* Rodapé com opção de rever a animação da pizza */}
          <motion.footer
            variants={itemVariants}
            className="pt-1 flex flex-col items-center justify-center gap-2 text-center"
          >
            <button
              type="button"
              onClick={onReplayTeaser}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal/55 hover:text-tomato transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-charcoal/5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Voltar para a pizza interativa
            </button>
          </motion.footer>
        </div>
      </div>
    </motion.main>
  );
};
