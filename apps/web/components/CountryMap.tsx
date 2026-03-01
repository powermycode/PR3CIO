"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Dot {
  x: number;
  y: number;
  color: string;
  delay: number;
  duration: number;
}

interface CountryMapProps {
  country: "india" | "dominican" | "brazil" | "usa";
}

const LEDDot = ({ x, y, color, delay, duration }: Dot) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.2, 1],
      boxShadow: [
        `0 0 5px ${color}`,
        `0 0 15px ${color}`,
        `0 0 5px ${color}`,
      ],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      backgroundColor: color,
      zIndex: 2,
      transform: "translate(-50%, -50%)",
    }}
  />
);

export const CountryMap = ({ country }: CountryMapProps) => {
  const config = useMemo(() => {
    switch (country) {
      case "usa":
        return {
          viewBox: "0 0 200 120",
          path: "M10,20 L190,20 L185,100 L15,100 Z",
          colors: ["#ffffff"],
          dots: [
            { x: 30, y: 40 }, { x: 50, y: 50 }, { x: 70, y: 45 }, { x: 90, y: 60 },
            { x: 40, y: 70 }, { x: 60, y: 80 }, { x: 80, y: 30 }, { x: 20, y: 65 }
          ],
          label: "United States"
        };
      case "india":
        return {
          viewBox: "0 0 230 200",
          path: "M100,10 L110,15 L120,10 L130,15 L145,20 L150,30 L145,40 L150,50 L160,60 L175,65 L195,60 L210,70 L215,85 L210,100 L200,110 L185,105 L175,115 L175,135 L170,150 L155,165 L140,175 L125,190 L110,195 L100,180 L85,165 L70,150 L55,140 L40,135 L25,130 L15,115 L10,100 L15,85 L25,75 L40,70 L60,65 L75,55 L85,45 L85,30 L95,20 L100,10 Z",
          colors: ["#FF9933", "#FFFFFF", "#138808"],
          dots: [
            { x: 50, y: 30 }, { x: 45, y: 50 }, { x: 55, y: 65 }, { x: 50, y: 80 },
            { x: 35, y: 45 }, { x: 65, y: 55 }, { x: 40, y: 70 }, { x: 60, y: 40 }
          ],
          label: "India"
        };
      case "brazil":
        return {
          viewBox: "0 0 200 200",
          path: "M100,10 L130,15 L160,25 L180,45 L195,75 L190,110 L175,145 L150,175 L120,195 L80,190 L45,170 L20,135 L10,95 L15,55 L40,25 L70,15 L100,10 Z",
          colors: ["#009739", "#FEDD00", "#012169"],
          dots: [
            { x: 50, y: 40 }, { x: 70, y: 30 }, { x: 40, y: 60 }, { x: 60, y: 80 },
            { x: 30, y: 50 }, { x: 80, y: 50 }, { x: 50, y: 70 }, { x: 40, y: 30 }
          ],
          label: "Brazil"
        };
      case "dominican":
        return {
          viewBox: "0 0 200 200",
          path: "M10,90 L40,80 L80,75 L130,80 L170,90 L190,110 L180,135 L150,145 L110,145 L60,140 L25,130 L10,115 L10,90 Z",
          colors: ["#CE1126", "#002D62", "#FFFFFF"],
          dots: [
            { x: 30, y: 55 }, { x: 50, y: 50 }, { x: 70, y: 60 }, { x: 90, y: 70 },
            { x: 40, y: 70 }, { x: 60, y: 80 }, { x: 80, y: 50 }, { x: 20, y: 65 }
          ],
          label: "Dominican Republic"
        };
      default:
        return null;
    }
  }, [country]);

  if (!config) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
        <svg
          viewBox={config.viewBox}
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <motion.path
            d={config.path}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{ filter: 'drop-shadow(0 0 10px var(--accent))' }}
          />
        </svg>
        <div className="absolute inset-0 pointer-events-none">
          {config.dots.map((dot, i) => (
            <LEDDot
              key={i}
              x={dot.x}
              y={dot.y}
              color="var(--accent)"
              delay={Math.random() * 2}
              duration={2 + Math.random() * 2}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 text-xs font-bold uppercase tracking-[0.4em] text-white/40">
        {config.label}
      </div>
    </div>
  );
};
