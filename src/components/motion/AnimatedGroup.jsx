import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * AnimatedGroup Component — Motion Primitives
 * https://motion-primitives.com/docs/animated-group
 * Staggered entrance animation for lists, grids, and card groups.
 */
export function AnimatedGroup({
  children,
  className,
  style,
  as: Component = 'div',
  stagger = 0.08,
  delay = 0.05,
  viewport = { once: true, margin: '0px 0px -40px 0px' },
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Component className={className} style={style}>
        {children}
      </Component>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <Component ref={ref} className={className} style={style}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        style={{ display: 'contents' }}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          return (
            <motion.div
              variants={itemVariants}
              key={child.key || index}
              style={{ display: 'contents' }}
            >
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    </Component>
  );
}

export default AnimatedGroup;

