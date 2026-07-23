"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

// Small reusable scroll-reveal wrapper built on motion for subtle entrance animations.
export function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
