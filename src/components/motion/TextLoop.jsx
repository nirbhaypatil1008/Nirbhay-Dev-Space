import { useEffect, useState, Children } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * TextLoop Component — Motion Primitives
 * https://motion-primitives.com/docs/text-loop
 * Seamlessly transitions through an array of phrases/roles with vertical slide & fade.
 */
export function TextLoop({
  children,
  className,
  style,
  interval = 3200,
  transition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  variants = {
    initial: { y: 14, opacity: 0, filter: 'blur(3px)' },
    animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
    exit: { y: -14, opacity: 0, filter: 'blur(3px)' },
  },
  onIndexChange,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (items.length <= 1 || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <span className={className} style={style}>
        {items[0]}
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        position: 'relative',
        overflow: 'hidden',
        verticalAlign: 'baseline',
        ...style,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants}
          style={{ display: 'inline-block' }}
        >
          {items[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default TextLoop;

