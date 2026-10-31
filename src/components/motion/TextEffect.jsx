import { motion, useReducedMotion } from 'framer-motion';

/**
 * TextEffect Component — Motion Primitives
 * https://motion-primitives.com/docs/text-effect
 * Smooth staggered reveal for words, characters, or phrases.
 */
export function TextEffect({
  children,
  per = 'word', // 'word' | 'char' | 'line'
  as: Component = 'span',
  variants,
  className,
  style,
  delay = 0,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (typeof children !== 'string' || shouldReduceMotion) {
    return (
      <Component className={className} style={style} {...props}>
        {children}
      </Component>
    );
  }

  const containerVariants = variants?.container || {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: per === 'char' ? 0.025 : 0.06,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = variants?.item || {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  let segments = [];
  if (per === 'word') {
    segments = children.split(' ');
  } else if (per === 'char') {
    segments = children.split('');
  } else {
    segments = children.split('\n');
  }

  return (
    <Component className={className} style={{ display: 'inline', ...style }} {...props}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ display: 'inline' }}
      >
        {segments.map((segment, index) => (
          <span key={index} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            <motion.span variants={itemVariants} style={{ display: 'inline-block' }}>
              {segment}
            </motion.span>
            {per === 'word' && index < segments.length - 1 ? ' ' : null}
          </span>
        ))}
      </motion.span>
    </Component>
  );
}

export default TextEffect;

