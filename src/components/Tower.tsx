"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Building, PencilRuler, Users } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

const towerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 1.2 },
  },
};

interface TowerProps {
  id: number;
  name: string;
  height: string;
  color: string;
  floors: number;
  apartments: number;
  occupancy: string;
}

const Tower = ({
  id,
  name,
  height,
  color,
  floors,
  apartments,
  occupancy,
}: TowerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<
    "right" | "left" | "bottom"
  >("right");
  const floorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const calculateTooltipPosition = (floorIndex: number) => {
    const floorElement = floorRefs.current[floorIndex];
    const tooltipElement = tooltipRef.current;

    if (!floorElement || !tooltipElement) return "right";

    const floorRect = floorElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    const tooltipWidth = 220;
    const margin = 20;

    // Check if there's space on the right
    const spaceOnRight = viewportWidth - floorRect.right;
    if (spaceOnRight >= tooltipWidth + margin) {
      return "right";
    }

    // Check if there's space on the left
    const spaceOnLeft = floorRect.left;
    if (spaceOnLeft >= tooltipWidth + margin) {
      return "left";
    }

    // If no space on either side, position at bottom
    return "bottom";
  };

  const handleFloorHover = (floorIndex: number) => {
    setHoveredFloor(floorIndex);
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      const position = calculateTooltipPosition(floorIndex);
      setTooltipPosition(position);
    }, 10);
  };

  const getTooltipClasses = () => {
    const baseClasses =
      "pointer-events-none absolute z-[1000] transition-all duration-200";

    switch (tooltipPosition) {
      case "right":
        return `${baseClasses} top-1/2 left-full ml-2 -translate-y-1/2`;
      case "left":
        return `${baseClasses} top-1/2 right-full mr-2 -translate-y-1/2`;
      case "bottom":
        return `${baseClasses} top-full left-1/2 mt-2 -translate-x-1/2`;
      default:
        return `${baseClasses} top-1/2 left-full ml-2 -translate-y-1/2`;
    }
  };

  return (
    <Link href={`/towers/${name}`} passHref>
      <motion.div
        className="relative w-44 cursor-pointer my-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredFloor(null);
        }}
        whileHover={{ scale: 1.05, zIndex: 10 }}
      >
        {/* Tower Name above tower */}
        <div className="w-full flex justify-center mb-2">
          <span
            className="text-lg font-semibold text-white hover:text-primary hover:underline underline-offset-2 drop-shadow-sm"
            style={{ letterSpacing: 1 }}
          >
            {name}
          </span>
        </div>

        <div
          className="w-full flex flex-col-reverse rounded-t-lg relative z-20"
          style={{ height }}
        >
          {Array.from({ length: floors }, (_, i) => {
            const floorNum = `floor-${i + 1}`;
            return (
              <Link
                key={i + 1}
                href={`/towers/${name}/${floorNum}`}
                passHref
                scroll={false}
                legacyBehavior
              >
                <motion.div
                  ref={(el) => {
                    floorRefs.current[i] = el;
                  }}
                  className="group w-full last:rounded-t-lg relative cursor-pointer"
                  style={{
                    backgroundColor: color,
                    minHeight: `${100 / floors}%`,
                    opacity: 1 - i * 0.07,
                    zIndex: 2 + i,
                    transition: "opacity 0.2s",
                  }}
                  whileHover={{ opacity: 1, scale: 1.03, zIndex: 20 }}
                  onMouseEnter={() => handleFloorHover(i)}
                  onMouseLeave={() => setHoveredFloor(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/* Smart Tooltip */}
                  <AnimatePresence>
                    {hoveredFloor === i && (
                      <motion.div
                        ref={tooltipRef}
                        className={getTooltipClasses()}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="p-4 rounded-lg shadow-lg border border-primary bg-black/80 min-w-[180px] max-w-[220px] backdrop-blur-md flex flex-col gap-1">
                          <div className="flex flex-col items-start gap- mb-1">
                            <span className="text-6xl text-primary font-bold">
                              {i + 1}{" "}
                              <span className="text-base -ml-3">th</span>
                            </span>
                            <span className="text-xl text-white font-semibold">
                              Floor
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-primary text-sm">
                            <Building size={14} />
                            Apartments:{" "}
                            <span className="ml-1 font-medium text-white">
                              {apartments}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-primary text-sm">
                            <Users size={14} />
                            Occupancy:{" "}
                            <span className="ml-1 font-medium text-white">
                              {occupancy}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Floor number inside */}
                  <span className="absolute left-2 top-1 text-[10px] text-white/70 select-none">
                    #{i + 1}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <motion.div
          className="absolute"
          style={{
            width: "110%",
            left: "-5%",
            bottom: "-1rem",
            height: "3rem",
            borderRadius: "50%",
            boxShadow: "0 0 15px 8px var(--color-primary)",
            background: "transparent",
            transform: "perspective(50px) rotateX(70deg)",
            zIndex: 1,
          }}
          initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        />

        <motion.div
          className="absolute"
          style={{
            width: "130%",
            left: "-15%",
            bottom: "-1.5rem",
            height: "4rem",
            borderRadius: "50%",
            boxShadow: "0 0 20px 10px var(--foreground)",
            background: "transparent",
            transform: "perspective(50px) rotateX(70deg)",
            zIndex: 0,
          }}
          initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>
    </Link>
  );
};

export default Tower;
