// components/Header.js

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  const handleScroll = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box position="relative" height="100vh" overflow="hidden">
      <Box
        as="video"
        src="/f1.mp4" // Ensure this video exists in the public folder
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
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            textShadow="2px 2px #e60000"
          >
            Bienvenue sur le Dashboard F1
          </Heading>
          <Text fontSize="xl" mb={6}>
            Plongez au cœur de la Formule 1 avec les dernières informations, statistiques et analyses.
          </Text>
          <Center>
            <Button
              colorScheme="redF1"
              size="lg"
              borderRadius="full"
              bgGradient="linear(to-r, redF1.500, redF1.700)"
              color="white"
              leftIcon={<FiArrowRight />}
              rightIcon={<FiChevronDown />}
              onClick={handleScroll}
              _hover={{
                bgGradient: 'linear(to-r, redF1.700, redF1.900)',
                transform: 'scale(1.05)',
                boxShadow: 'xl',
              }}
              transition="background-color 0.3s, transform 0.3s, box-shadow 0.3s"
            >
              Découvrir
            </Button>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
