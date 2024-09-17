// pages/_app.js

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/theme'; // Assurez-vous que ce chemin est correct
import '@fontsource/montserrat'; // Import de la police Montserrat
import '@fontsource/roboto';     // Import de la police Roboto
import '../src/app/globals.css';  // Assurez-vous que ce chemin est correct

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
