"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animate?: boolean;
}

export function Container({
  children,
  className,
  delay = 0,
  animate = true,
}: ContainerProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={cn("mx-auto flex w-full max-w-5xl px-4 sm:px-6", className)}
    >
      {children}
    </motion.div>
  );
}
