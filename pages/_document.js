// pages/_document.jsx

import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../src/theme';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Initialize color mode */}
          <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
