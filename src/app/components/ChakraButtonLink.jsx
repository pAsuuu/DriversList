import React from 'react';
import {
  Button,
  keyframes,
  useTheme,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';

/**
 * Pulse Animation for Glowing Effect
 */
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(230, 0, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(230, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(230, 0, 0, 0);
  }
`;

/**
 * ChakraButtonLink - A highly stylized red button with advanced animations.
 *
 * @param {string} href - The destination URL.
 * @param {React.ReactNode} children - The content of the button.
 * @param {object} props - Additional properties for the Button.
 * @returns {JSX.Element} - A beautifully animated button acting as a link.
 */
const ChakraButtonLink = ({ href, children, ...props }) => {
  const router = useRouter();
  const theme = useTheme();

  const handleClick = () => {
    router.push(href);
  };

  // Define colors based on the custom theme
  const gradientBg = 'linear(to-r, redF1.700, redF1.900)';
  const hoverGradientBg = 'linear(to-r, redF1.900, redF1.700)';
  const glowColor = theme.colors.redF1[900];

  return (
    <Button
      onClick={handleClick}
      {...props}
      // Base Styles
      bgGradient={gradientBg}
      color="white"
      fontWeight="bold"
      size={{ base: 'lg', md: 'xl', lg: '2xl' }} // Responsive button size
      px={{ base: 8, md: 10, lg: 12 }}  // Responsive padding for horizontal
      py={{ base: 6, md: 7, lg: 8 }}    // Responsive padding for vertical
      borderRadius="full"
      position="relative"
      overflow="hidden"
      // Pulse Animation for Glowing Effect
      animation={`${pulse} 3s infinite`}
      // Transition for smooth animations
      transition="all 0.3s ease"
      // Hover Styles
      _hover={{
        bgGradient: hoverGradientBg,
        transform: 'scale(1.05)',
        boxShadow: `0 0 20px ${glowColor}`,
        _before: {
          top: '100%',
          left: '100%',
        },
      }}
      // Active Styles
      _active={{
        transform: 'scale(0.95)',
        boxShadow: `0 0 10px ${glowColor}`,
        _before: {
          top: '100%',
          left: '100%',
        },
      }}
      // Focus Styles
      _focus={{
        boxShadow: `0 0 0 3px ${theme.colors.redF1[500]}`,
      }}
      // Icon Integration with Responsive Size
      leftIcon={<FiArrowRight size={24} />}
      rightIcon={<FiChevronDown size={24} />}
      // Custom Font
      fontFamily="'Orbitron', sans-serif"
      // Additional Styles for Sliding Overlay
      _before={{
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        bgGradient: 'linear(to-r, transparent, rgba(255,255,255,0.2), transparent)',
        transform: 'rotate(45deg)',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </Button>
  );
};

ChakraButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ChakraButtonLink;
