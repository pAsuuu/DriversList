// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../src/theme'; // Ajustez le chemin selon la structure de votre projet

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr"> {/* Ajustez la langue si nécessaire */}
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
