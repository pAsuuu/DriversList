// components/Header.js

import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box position="relative" height="100vh" overflow="hidden">
      <Box
        as="video"
        src="/f1.mp4"
        autoPlay
        loop
        muted
        playsInline
        objectFit="cover"
        width="100%"
        height="100%"
        position="absolute"
        top="0"
        left="0"
        zIndex="-1"
      />
      <Box
        position="relative"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="white"
        bg="rgba(0, 0, 0, 0.5)"
        textAlign="center"
        px={4}
      >
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Bienvenue sur le Dashboard F1
          </Heading>
          <Text fontSize="xl" mb={6}>
            Plongez au cœur de la Formule 1 avec les dernières informations, statistiques et analyses.
          </Text>
          <Button
            colorScheme="brand"
            size="lg"
            borderRadius="full"
            onClick={() => document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' })}
          >
            Découvrir
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
