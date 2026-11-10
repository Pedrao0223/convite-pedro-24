import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ArtisanPizzaSvgProps {
  isOpening: boolean;
  onActivate: () => void;
}

interface SliceConfig {
  index: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  pepperoni: Array<{ r: number; angleOffset: number; radius: number }>;
  hasBasil: boolean;
  basilPos: { r: number; angleOffset: number; rot: number };
  hasOlive: boolean;
  olivePos: { r: number; angleOffset: number };
}

const CENTER = 200;
const OUTER_CRUST_R = 162;
const SAUCE_R = 136;
const CHEESE_R = 122;

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function createWedgePath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M',
    cx,
    cy,
    'L',
    start.x.toFixed(2),
    start.y.toFixed(2),
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x.toFixed(2),
    end.y.toFixed(2),
    'Z',
  ].join(' ');
}

const SLICES: SliceConfig[] = Array.from({ length: 8 }, (_, index) => {
  const startAngle = index * 45;
  const endAngle = startAngle + 45;
  const midAngle = startAngle + 22.5;

  return {
    index,
    startAngle,
    endAngle,
    midAngle,
    pepperoni: [
      { r: 84, angleOffset: -8, radius: 13.5 },
      { r: 52, angleOffset: 6, radius: 11.5 },
    ],
    hasBasil: index % 2 === 0,
    basilPos: { r: 94, angleOffset: 9, rot: index * 45 + 25 },
    hasOlive: index % 2 === 1,
    olivePos: { r: 74, angleOffset: 10 },
  };
});

export const ArtisanPizzaSvg: React.FC<ArtisanPizzaSvgProps> = ({ isOpening, onActivate }) => {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Subtle warm radial glow behind the pizza */}
      <motion.div
        className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-crust/20 blur-3xl pointer-events-none"
        animate={
          isOpening
            ? { scale: 1.8, opacity: 0 }
            : { scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }
        }
        transition={{ duration: 4, repeat: isOpening ? 0 : Infinity, ease: 'easeInOut' }}
      />

      {/* Interactive SVG Container */}
      <motion.button
        type="button"
        onClick={onActivate}
        aria-label="Toque na pizza para abrir seu convite dos 24 anos do Pedro Henrique"
        className="relative z-10 group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato/40 rounded-full p-2 transition-transform active:scale-95"
        animate={
          isOpening
            ? { scale: 1.06 }
            : {
                y: [0, -8, 0],
                rotate: [0, 3, 0, -3, 0],
              }
        }
        transition={
          isOpening
            ? { duration: 0.4 }
            : {
                y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
              }
        }
      >
        <svg
          viewBox="0 0 400 400"
          className="w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 drop-shadow-[0_22px_32px_rgba(43,41,39,0.12)] overflow-visible"
        >
          {/* Wooden / Minimalist Dotted Platter Ring */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={182}
            fill="none"
            stroke="#E6A15C"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            animate={
              isOpening
                ? { scale: 1.35, opacity: 0 }
                : { rotate: 360 }
            }
            transition={
              isOpening
                ? { duration: 0.55, ease: 'easeOut' }
                : { duration: 60, repeat: Infinity, ease: 'linear' }
            }
            style={{ originX: '200px', originY: '200px' }}
          />

          {/* 8 Individual Slices */}
          {SLICES.map((slice) => {
            const rad = ((slice.midAngle - 90) * Math.PI) / 180;
            const dirX = Math.cos(rad);
            const dirY = Math.sin(rad);

            // Slice #1 (top-right) gently tugs out in idle state to invite the user to click
            const isFeaturedSlice = slice.index === 1;
            const isHovered = hoveredSlice === slice.index;

            // Calculate outward displacement
            const openDistance = slice.index === 1 ? 155 : 120 + (slice.index % 2) * 20;
            const hoverDistance = isHovered ? 14 : isFeaturedSlice ? 9 : 0;

            const crustPath = createWedgePath(
              CENTER,
              CENTER,
              OUTER_CRUST_R,
              slice.startAngle,
              slice.endAngle
            );
            const saucePath = createWedgePath(
              CENTER,
              CENTER,
              SAUCE_R,
              slice.startAngle,
              slice.endAngle
            );
            const cheesePath = createWedgePath(
              CENTER,
              CENTER,
              CHEESE_R,
              slice.startAngle,
              slice.endAngle
            );

            // Crust char blister mark position
            const blisterPos = polarToCartesian(
              CENTER,
              CENTER,
              (OUTER_CRUST_R + SAUCE_R) / 2,
              slice.midAngle - 6
            );

            return (
              <motion.g
                key={slice.index}
                onMouseEnter={() => setHoveredSlice(slice.index)}
                onMouseLeave={() => setHoveredSlice(null)}
                initial={false}
                animate={
                  isOpening
                    ? {
                        x: dirX * openDistance,
                        y: dirY * openDistance,
                        rotate: (slice.index % 2 === 0 ? 1 : -1) * 14,
                        scale: 0.88,
                        opacity: 0,
                      }
                    : isFeaturedSlice && hoveredSlice === null
                    ? {
                        x: [dirX * 3, dirX * 12, dirX * 3],
                        y: [dirY * 3, dirY * 12, dirY * 3],
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                      }
                    : {
                        x: dirX * hoverDistance,
                        y: dirY * hoverDistance,
                        rotate: 0,
                        scale: isHovered ? 1.03 : 1,
                        opacity: 1,
                      }
                }
                transition={
                  isOpening
                    ? {
                        duration: 0.68,
                        delay: slice.index * 0.025,
                        ease: [0.22, 1, 0.36, 1],
                      }
                    : isFeaturedSlice && hoveredSlice === null
                    ? {
                        duration: 2.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }
                }
                style={{ originX: '200px', originY: '200px' }}
              >
                {/* 1. Golden Baked Crust Wedge */}
                <path
                  d={crustPath}
                  fill="#E6A15C"
                  stroke="#2B2927"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />

                {/* Subtle Artisan Wood-Fired Blister on Crust */}
                <circle
                  cx={blisterPos.x}
                  cy={blisterPos.y}
                  r="3.2"
                  fill="#2B2927"
                  fillOpacity="0.22"
                />

                {/* 2. Rustic Tomato Sauce Layer */}
                <path
                  d={saucePath}
                  fill="#D9381E"
                  stroke="#2B2927"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* 3. Fresh Mozzarella Layer */}
                <path
                  d={cheesePath}
                  fill="#FAF6F0"
                  stroke="#2B2927"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                {/* 4. Toppings: Pepperoni / Rustic Tomato Rounds */}
                {slice.pepperoni.map((pep, pIdx) => {
                  const pos = polarToCartesian(
                    CENTER,
                    CENTER,
                    pep.r,
                    slice.midAngle + pep.angleOffset
                  );
                  return (
                    <g key={pIdx}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={pep.radius}
                        fill="#D9381E"
                        stroke="#2B2927"
                        strokeWidth="2"
                      />
                      {/* Inner marbling dots */}
                      <circle
                        cx={pos.x - 3}
                        cy={pos.y - 2}
                        r="1.6"
                        fill="#FAF6F0"
                        fillOpacity="0.75"
                      />
                      <circle
                        cx={pos.x + 3.5}
                        cy={pos.y + 2.5}
                        r="1.3"
                        fill="#FAF6F0"
                        fillOpacity="0.75"
                      />
                    </g>
                  );
                })}

                {/* 5. Topping: Fresh Basil Leaf (#3B7A57) */}
                {slice.hasBasil && (() => {
                  const pos = polarToCartesian(
                    CENTER,
                    CENTER,
                    slice.basilPos.r,
                    slice.midAngle + slice.basilPos.angleOffset
                  );
                  return (
                    <g
                      transform={`translate(${pos.x}, ${pos.y}) rotate(${slice.basilPos.rot})`}
                    >
                      <path
                        d="M -11 0 C -8 -8, 8 -8, 11 0 C 8 8, -8 8, -11 0 Z"
                        fill="#3B7A57"
                        stroke="#2B2927"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="-7"
                        y1="0"
                        x2="7"
                        y2="0"
                        stroke="#FAF6F0"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeOpacity="0.6"
                      />
                    </g>
                  );
                })()}

                {/* 6. Topping: Artisan Black Olive Ring */}
                {slice.hasOlive && (() => {
                  const pos = polarToCartesian(
                    CENTER,
                    CENTER,
                    slice.olivePos.r,
                    slice.midAngle + slice.olivePos.angleOffset
                  );
                  return (
                    <g>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="6.8"
                        fill="#2B2927"
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="2.6"
                        fill="#FAF6F0"
                      />
                    </g>
                  );
                })()}
              </motion.g>
            );
          })}

          {/* Center Fresh Basil Crown (fades & scales on click) */}
          <motion.g
            animate={
              isOpening
                ? { scale: 0, opacity: 0, rotate: 90 }
                : { scale: 1, opacity: 1, rotate: 0 }
            }
            transition={{ duration: 0.4 }}
            style={{ originX: '200px', originY: '200px' }}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r="14"
              fill="#FAF6F0"
              stroke="#2B2927"
              strokeWidth="2.2"
            />
            <circle cx={CENTER} cy={CENTER} r="6" fill="#3B7A57" />
          </motion.g>
        </svg>

        {/* Floating "24" Stamp Badge on Corner of Pizza */}
        <motion.div
          animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-tomato text-dough font-display font-extrabold text-xs sm:text-sm px-3 py-1.5 rounded-full border-2 border-charcoal shadow-artisan-sm rotate-12 pointer-events-none"
        >
          24 ANOS
        </motion.div>
      </motion.button>
    </div>
  );
};

/**
 * Emblema minimalista de fatia de pizza exibido no topo do convite aberto
 */
export const MiniPizzaSliceBadge: React.FC<{ onReplay?: () => void }> = ({ onReplay }) => {
  return (
    <motion.button
      type="button"
      onClick={onReplay}
      title="Toque para rever a animação da pizza"
      whileHover={{ scale: 1.06, rotate: -6 }}
      whileTap={{ scale: 0.95 }}
      className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crust/20 border border-crust/50 text-charcoal text-xs font-medium transition-colors hover:bg-crust/30 cursor-pointer"
    >
      <svg viewBox="0 0 36 36" className="w-5 h-5">
        <path
          d="M7 7C14 3.5 23 4.5 29 10.5L10 29.5L7 7Z"
          fill="#E6A15C"
          stroke="#2B2927"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 11C14 8.5 21 9.5 25.5 14L10 29.5L8.5 11Z"
          fill="#D9381E"
          stroke="#2B2927"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="15" cy="17" r="2.4" fill="#FAF6F0" />
        <circle cx="19" cy="20" r="2" fill="#3B7A57" />
      </svg>
      <span className="tracking-wider uppercase font-semibold text-[11px] text-charcoal/80 group-hover:text-charcoal">
        Pizzaria do Pedro • Edição 24 Anos
      </span>
    </motion.button>
  );
};
