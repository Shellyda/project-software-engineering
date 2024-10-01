import { motion } from 'framer-motion';

import { IconButtonProps } from './interfaces';

const IconButton = ({
  isActive,
  outlineIcon: OutlineIcon,
  solidIcon: SolidIcon,
  onClick,
  width = 32,
  height = 32
}: IconButtonProps) => {
  const MotionIcon = motion.div;
  const iconVariants = {
    initial: { scale: 1, opacity: 0.5 },
    active: { scale: 1.2, opacity: 1 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  };

  return (
    <MotionIcon
      initial="initial"
      animate={isActive ? 'active' : 'initial'}
      variants={iconVariants}
      onClick={onClick}
    >
      {isActive ? (
        <SolidIcon data-testid="solid-icon" width={width} height={height} cursor="pointer" />
      ) : (
        <OutlineIcon data-testid="outline-icon" width={width} height={height} cursor="pointer" />
      )}
    </MotionIcon>
  );
};

export default IconButton;
