// pages/probability-dashboard.jsx

import React from 'react';
import {
  Box,
  Heading,
  Center,
  VStack,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiExternalLink, FiMonitor } from 'react-icons/fi';
import ChakraButtonLink from '../src/app/components/ChakraButtonLink'; // Assurez-vous que le chemin est correct

const ProbabilityDashboard = () => {
  const router = useRouter();

  // Couleurs inspirées de la F1
  const bgGradient = 'linear(to-r, blackF1.900, blackF1.800)';
  const cardBg = 'blackF1.800';
  const textColor = 'redF1.50';
  const headingColor = 'redF1.400';

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      color={textColor}
      p={{ base: 4, md: 8 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={cardBg}
        p={{ base: 6, md: 12 }}
        rounded="2xl"
        shadow="2xl"
        maxW="800px"
        width="100%"
        border="2px solid"
        borderColor="redF1.600"
        position="relative"
        overflow="hidden"
      >
        {/* Header de la Page */}
        <Center mb={6}> {/* Réduit la marge inférieure */}
          <Heading
            as="h1"
            size="2xl"
            color={headingColor}
            textAlign="center"
            fontFamily="'Orbitron', sans-serif"
            textShadow="2px 2px #e60000"
          >
            Dashboard des Probabilités de Victoire
          </Heading>
        </Center>

        {/* Contenu du Dashboard */}
        <VStack spacing={6} align="stretch"> {/* Réduit le spacing */}
          {/* Bouton Ouvrir le Dashboard Streamlit */}
          <Center>
            <ChakraButtonLink href="https://csv-final-oernyjitv7trqtlrtzdwpb.streamlit.app/">
              Ouvrir le Dashboard Streamlit
            </ChakraButtonLink>
          </Center>

          {/* Bouton Retour au Dashboard Principal */}
          <Center>
            <ChakraButtonLink href="/">
              <FiArrowLeft /> Retour au Dashboard Principal
            </ChakraButtonLink>
          </Center>
        </VStack>

        {/* Footer */}
        <Divider borderColor="redF1.600" my={6} /> {/* Réduit le margin vertical */}
        <Center>
          <Text fontSize="sm" color="gray.400">
            © {new Date().getFullYear()} F1. Tous droits réservés.
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

export default ProbabilityDashboard;
