import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * InView Component — Motion Primitives
 * https://motion-primitives.com/docs/in-view
 * Triggers entrance animation when the element enters the viewport.
 * Automatically respects prefers-reduced-motion.
 */
export function InView({
  children,
  variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  transition = { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  viewOptions = { once: true, margin: '0px 0px -40px 0px' },
  as: Component = 'div',
  className,
  style,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Component ref={ref} className={className} style={style} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component ref={ref} className={className} style={style} {...props}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.div>
    </Component>
  );
}

export default InView;

