"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion";

export type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** Seconds to wait before the first child. */
  delayChildren?: number;
};

/** Container that reveals its `StaggerItem` children one after another on scroll-in. */
export function Stagger({ children, className, stagger, delayChildren }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -48px 0px" }}
    >
      {children}
    </motion.div>
  );
}

export type StaggerItemProps = { children: ReactNode; className?: string };

/** A single child of `Stagger` — rises and fades in on its turn. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
