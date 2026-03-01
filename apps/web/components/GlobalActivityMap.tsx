"use client";

import React from "react";
import { motion } from "framer-motion";

interface DotProps {
  x: string;
  y: string;
  colors: string[];
  delay: number;
}

const LEDDot = ({ x, y, colors, delay }: DotProps) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.4, 1, 0.4],
      backgroundColor: colors,
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      boxShadow: `0 0 10px ${colors[0]}`,
      zIndex: 10,
    }}
  />
);

interface MapProps {
  country: "india" | "brazil" | "dr";
  dots: Array<{ x: string; y: string; delay: number }>;
}

const MapVisual = ({ country, dots }: MapProps) => {
  const getFlagColors = () => {
    switch (country) {
      case "india":
        return ["#FF9933", "#FFFFFF", "#138808"];
      case "brazil":
        return ["#009739", "#FEDD00", "#012169"];
      case "dr":
        return ["#CE1126", "#FFFFFF", "#002D62"];
      default:
        return ["#7a6cff"];
    }
  };

  const getPath = () => {
    // Simplified paths for maps
    switch (country) {
      case "india":
        return "M50,10 L80,30 L90,60 L70,90 L30,90 L10,60 L20,30 Z";
      case "brazil":
        return "M20,20 L80,10 L95,50 L70,90 L30,85 L5,50 Z";
      case "dr":
        return "M10,40 L40,30 L90,35 L95,60 L60,80 L20,75 Z";
      default:
        return "";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      animate={{ 
        y: [0, -10, 0],
        filter: ["drop-shadow(0 0 5px rgba(122, 108, 255, 0.2))", "drop-shadow(0 0 15px rgba(122, 108, 255, 0.4))", "drop-shadow(0 0 5px rgba(122, 108, 255, 0.2))"]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "relative",
        width: "200px",
        height: "200px",
        margin: "20px",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.3,
          filter: "blur(1px)",
        }}
      >
        <path
          d={getPath()}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </svg>
      {dots.map((dot, index) => (
        <LEDDot
          key={index}
          x={dot.x}
          y={dot.y}
          colors={getFlagColors()}
          delay={dot.delay}
        />
      ))}
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        left: '0',
        right: '0',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        {country === 'dr' ? 'Dominican Republic' : country}
      </div>
    </motion.div>
  );
};

export const GlobalActivityMap = () => {
  const indiaDots = [
    { x: "50%", y: "30%", delay: 0.2 },
    { x: "40%", y: "50%", delay: 0.5 },
    { x: "60%", y: "60%", delay: 0.8 },
    { x: "50%", y: "80%", delay: 1.1 },
  ];

  const brazilDots = [
    { x: "30%", y: "40%", delay: 0.3 },
    { x: "70%", y: "30%", delay: 0.6 },
    { x: "50%", y: "60%", delay: 0.9 },
    { x: "40%", y: "80%", delay: 1.2 },
  ];

  const drDots = [
    { x: "20%", y: "50%", delay: 0.4 },
    { x: "50%", y: "40%", delay: 0.7 },
    { x: "80%", y: "50%", delay: 1.0 },
    { x: "50%", y: "70%", delay: 1.3 },
  ];

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "40px",
      margin: "60px 0",
      perspective: "1000px"
    }}>
      <MapVisual country="india" dots={indiaDots} />
      <MapVisual country="dr" dots={drDots} />
      <MapVisual country="brazil" dots={brazilDots} />
    </div>
  );
};
