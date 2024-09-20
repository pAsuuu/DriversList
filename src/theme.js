import { extendTheme } from '@chakra-ui/react';

// Custom Theme with F1-Inspired Font (Orbitron)
const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // Toujours démarrer en mode sombre
    useSystemColorMode: false, // Ne pas utiliser le mode de couleur système
  },
  colors: {
    redF1: {
      50: '#ffe5e5',
      100: '#ffb3b3',
      200: '#ff8080',
      300: '#ff4d4d',
      400: '#ff1a1a',
      500: '#e60000',
      600: '#b30000',
      700: '#800000',
      800: '#4d0000',
      900: '#1a0000',
    },
    blackF1: {
      50: '#f2f2f2',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d', // Utilisé comme fond principal
    },
  },
  fonts: {
    heading: `'Orbitron', sans-serif`, // F1-Inspired Font
    body: `'Orbitron', sans-serif`,    // Applied to all text
  },
  styles: {
    global: (props) => ({
      body: {
        bg: 'blackF1.900', // Couleur de fond noir
        color: 'redF1.50',  // Texte en rouge clair pour contraste
        fontFamily: `'Orbitron', sans-serif`,
      },
      a: {
        color: 'redF1.400',  // Liens en rouge
        _hover: {
          textDecoration: 'underline',
        },
      },
    }),
  },
});

export default theme;
