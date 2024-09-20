// components/Footer.js

import React from 'react';
import {
  Box,
  Text,
  Flex,
  Link,
  Icon,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  const bgColor = useColorModeValue('gray.900', 'gray.800'); // Fond sombre
  const textColor = useColorModeValue('gray.200', 'gray.300'); // Texte clair

  return (
    <Box bg={bgColor} color={textColor} py={6} px={5}>
      <Flex
        direction={{ base: 'column', md: 'row' }} // Colonne sur mobile, rangée sur desktop
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="flex-start"
      >
        {/* À Propos */}
        <Box mb={{ base: 6, md: 0 }} w={{ base: '100%', md: '100%' }}>
          <Text fontSize="lg" fontWeight="bold" mb={3} color="red.400">
            Projet F1
          </Text>
          <Text fontSize="sm">
            Projet F1 est une plateforme dédiée aux passionnés de Formule 1, fournissant des informations actualisées, des classements, des calendriers de courses et bien plus encore.
          </Text>
        </Box>
      </Flex>

      <Divider my={6} borderColor={useColorModeValue('gray.700', 'gray.600')} />

      {/* Liens vers les pages Conditions d'Utilisation et Politique de Confidentialité */}
      <Flex
        direction={{ base: 'column', md: 'row' }} // Colonne sur mobile, rangée sur desktop
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
      >
        <Flex align="center" mb={{ base: 2, md: 0 }}>
          <Icon as={FaRegCopyright} w={4} h={4} mr={1} />
          <Text fontSize="sm">
            © {new Date().getFullYear()} Projet F1. Tous droits réservés.
          </Text>
        </Flex>

        {/* Ajout des liens */}
        <Flex>
          <Link href="/terms" color="red.200" _hover={{ color: 'red.400', textDecoration: 'underline' }} mr={4}>
            Conditions d'Utilisation
          </Link>
          <Link href="/privacy" color="red.200" _hover={{ color: 'red.400', textDecoration: 'underline' }}>
            Politique de Confidentialité
          </Link>
        </Flex>

        <Text fontSize="sm">
          Développé avec ❤️
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
