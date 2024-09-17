// src/theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#fff8e5',
      100: '#fdebb8',
      200: '#fbdc8a',
      300: '#f9cc5c',
      400: '#f7bd2e',
      500: '#d4a017',
      600: '#a68012',
      700: '#79590d',
      800: '#4d3908',
      900: '#211903',
    },
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Roboto, sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      },
    }),
  },
});

export default theme;
