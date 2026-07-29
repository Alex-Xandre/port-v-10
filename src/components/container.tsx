"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Container({ children, className, delay = 0 }: ContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={cn(className, " h-[calc(100dvh-100px)] 2xl:px-60 w-screen max-w-[2000px] mx-auto ")}
    >
      {children}
    </motion.div>
  );
}
