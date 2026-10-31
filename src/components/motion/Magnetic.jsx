import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnetic Component — Motion Primitives
 * https://motion-primitives.com/docs/magnetic
 * Smooth cursor attraction for desktop buttons using spring physics.
 * Disables automatically on touch devices and for reduced motion.
 */
export function Magnetic({
  children,
  intensity = 0.2, // Subtle, restrained magnetic pull
  range = 70,      // Detection range in px
  springOptions = { damping: 18, stiffness: 220, mass: 0.2 },
  className,
  style,
  as: Component = 'div',
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    // Only enable magnetic pull if primary pointer is fine (mouse/trackpad, not touch)
    if (typeof window !== 'undefined') {
      const match = window.matchMedia('(hover: hover) and (pointer: fine)');
      setCanHover(match.matches);

      const handler = (e) => setCanHover(e.matches);
      match.addEventListener('change', handler);
      return () => match.removeEventListener('change', handler);
    }
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  if (shouldReduceMotion || !canHover) {
    return (
      <Component className={className} style={style}>
        {children}
      </Component>
    );
  }

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      x.set(distanceX * intensity);
      y.set(distanceY * intensity);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-block', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;

