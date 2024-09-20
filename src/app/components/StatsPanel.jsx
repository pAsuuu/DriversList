// src/app/components/StatsPanel.jsx

import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Badge,
  IconButton,
  Link,
  useColorModeValue,
  Tooltip,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWikipediaW,
  FaGlobe,
  FaBirthdayCake,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

// Définir MotionBox en dehors du composant pour éviter les problèmes de Hooks
const MotionBox = motion(Box);

const StatsPanel = () => {
  // Données des statistiques de Max Verstappen
  const driverStats = {
    totalRaces: 100,
    totalWins: 35,
    polePositions: 25,
    totalPoints: 700,
    podiums: 50,
    fastestLaps: 20,
  };

  // Données pour les graphiques
  const pointsPerSeason = [
    { season: '2016', points: 0 },
    { season: '2017', points: 54 },
    { season: '2018', points: 62 },
    { season: '2019', points: 240 },
    { season: '2020', points: 214 },
    { season: '2021', points: 395.5 },
    { season: '2022', points: 454 },
    { season: '2023', points: 620 },
    { season: '2024', points: 700 },
  ];

  const winsPerSeason = [
    { season: '2016', wins: 0 },
    { season: '2017', wins: 0 },
    { season: '2018', wins: 0 },
    { season: '2019', wins: 3 },
    { season: '2020', wins: 2 },
    { season: '2021', wins: 10 },
    { season: '2022', wins: 15 },
    { season: '2023', wins: 20 },
    { season: '2024', wins: 35 },
  ];

  const podiumsPerSeason = [
    { season: '2016', podiums: 0 },
    { season: '2017', podiums: 0 },
    { season: '2018', podiums: 0 },
    { season: '2019', podiums: 3 },
    { season: '2020', podiums: 2 },
    { season: '2021', podiums: 10 },
    { season: '2022', podiums: 15 },
    { season: '2023', podiums: 20 },
    { season: '2024', podiums: 35 },
  ];

  // Couleurs basées sur le mode de couleur
  const cardBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const badgeColors = {
    wins: 'teal',
    podiums: 'orange',
    poles: 'purple',
    points: 'blue',
    fastestLaps: 'green',
  };
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const titleColor = 'yellow.400'; // Couleur jaune pour le titre "Le pilote à la une"

  return (
    <MotionBox
      bg={cardBg}
      p={8}
      rounded="2xl"
      shadow="xl"
      maxW="900px"
      w="100%"
      mx="auto"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Titre "Le pilote à la une" */}
      <Heading
        as="h1"
        size="lg"
        color={titleColor}
        mb={6}
        textAlign="center"
        fontFamily="Montserrat, sans-serif"
      >
        Le pilote à la une
      </Heading>

      {/* En-tête avec image et informations de base */}
      <Flex direction={{ base: 'column', md: 'row' }} align="center" mb={8}>
        <Image
          boxSize={{ base: '150px', md: '180px' }}
          src="/verstappen.jpg" // Assurez-vous que le chemin est correct
          alt="Max Verstappen"
          borderRadius="full"
          mr={{ base: 0, md: 12 }}
          mb={{ base: 6, md: 0 }}
          objectFit="cover"
        />
        <VStack align="start" spacing={4} w="100%">
          <Heading
            as="h2"
            size="xl"
            color={headingColor}
            fontFamily="Montserrat, sans-serif"
            textAlign={{ base: 'center', md: 'left' }}
            w="100%"
          >
            Max Verstappen
          </Heading>
          <HStack spacing={3} flexWrap="wrap" justify={{ base: 'center', md: 'flex-start' }}>
            <Badge colorScheme={badgeColors.wins} px={3} py={1} borderRadius="md">
              {driverStats.totalWins} Victoires
            </Badge>
            <Badge colorScheme={badgeColors.podiums} px={3} py={1} borderRadius="md">
              {driverStats.podiums} Podiums
            </Badge>
            <Badge colorScheme={badgeColors.poles} px={3} py={1} borderRadius="md">
              {driverStats.polePositions} Pole Positions
            </Badge>
            <Badge colorScheme={badgeColors.points} px={3} py={1} borderRadius="md">
              {driverStats.totalPoints} Points
            </Badge>
            <Badge colorScheme={badgeColors.fastestLaps} px={3} py={1} borderRadius="md">
              {driverStats.fastestLaps} Tours Rapides
            </Badge>
          </HStack>

          {/* Informations détaillées */}
          <Box fontSize="md" color={textColor} textAlign={{ base: 'center', md: 'left' }}>
            <Text>
              <strong>Équipe :</strong> Red Bull Racing
            </Text>
            <Flex align="center" justify={{ base: 'center', md: 'flex-start' }}>
              <Text mb={0}>
                <strong>Date de naissance :</strong>&nbsp;30 Septembre 1997
              </Text>
              <FaBirthdayCake color="yellow.500" style={{ marginLeft: '8px' }} />
            </Flex>
            <Text>
              <strong>Âge :</strong> 26
            </Text>
            <Text>
              <strong>Nationalité :</strong> Pays-Bas
            </Text>
          </Box>

          {/* Liens vers les réseaux sociaux */}
          <HStack spacing={4} mt={4} justify={{ base: 'center', md: 'flex-start' }}>
            <Tooltip label="Instagram" aria-label="Instagram">
              <IconButton
                as={Link}
                href="https://www.instagram.com/maxverstappen1/"
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="ghost"
                size="lg"
                isExternal
                color="teal.500"
                _hover={{ bg: 'teal.100' }}
              />
            </Tooltip>
            <Tooltip label="Facebook" aria-label="Facebook">
              <IconButton
                as={Link}
                href="https://www.facebook.com/MaxVerstappen/"
                aria-label="Facebook"
                icon={<FaFacebook />}
                variant="ghost"
                size="lg"
                isExternal
                color="teal.500"
                _hover={{ bg: 'teal.100' }}
              />
            </Tooltip>
            <Tooltip label="Twitter" aria-label="Twitter">
              <IconButton
                as={Link}
                href="https://twitter.com/Max33Verstappen"
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                size="lg"
                isExternal
                color="teal.500"
                _hover={{ bg: 'teal.100' }}
              />
            </Tooltip>
            <Tooltip label="Wikipedia" aria-label="Wikipedia">
              <IconButton
                as={Link}
                href="http://fr.wikipedia.org/wiki/Max_Verstappen"
                aria-label="Wikipedia"
                icon={<FaWikipediaW />}
                variant="ghost"
                size="lg"
                isExternal
                color="teal.500"
                _hover={{ bg: 'teal.100' }}
              />
            </Tooltip>
            <Tooltip label="Site Officiel" aria-label="Site Officiel">
              <IconButton
                as={Link}
                href="http://www.verstappen.nl/"
                aria-label="Site Officiel"
                icon={<FaGlobe />}
                variant="ghost"
                size="lg"
                isExternal
                color="teal.500"
                _hover={{ bg: 'teal.100' }}
              />
            </Tooltip>
          </HStack>
        </VStack>
      </Flex>

      {/* Statistiques Clés */}
      <Box mb={8}>
        <Heading as="h3" size="md" mb={6} color={headingColor} fontFamily="Montserrat, sans-serif">
          Statistiques Clés
        </Heading>
        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }}
          gap={6}
        >
          {/* Victoires */}
          <GridItem>
            <Box
              h="150px"
              p={6}
              bg={useColorModeValue('gray.50', 'gray.700')}
              rounded="lg"
              shadow="md"
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
            >
              <Text fontSize="3xl" fontWeight="bold" color={badgeColors.wins}>
                {driverStats.totalWins}
              </Text>
              <Text fontSize="md" color="gray.500">
                Victoires
              </Text>
            </Box>
          </GridItem>
          {/* Podiums */}
          <GridItem>
            <Box
              h="150px"
              p={6}
              bg={useColorModeValue('gray.50', 'gray.700')}
              rounded="lg"
              shadow="md"
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
            >
              <Text fontSize="3xl" fontWeight="bold" color={badgeColors.podiums}>
                {driverStats.podiums}
              </Text>
              <Text fontSize="md" color="gray.500">
                Podiums
              </Text>
            </Box>
          </GridItem>
          {/* Pole Positions */}
          <GridItem>
            <Box
              h="150px"
              p={6}
              bg={useColorModeValue('gray.50', 'gray.700')}
              rounded="lg"
              shadow="md"
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
            >
              <Text fontSize="3xl" fontWeight="bold" color={badgeColors.poles}>
                {driverStats.polePositions}
              </Text>
              <Text fontSize="md" color="gray.500">
                Pole Positions
              </Text>
            </Box>
          </GridItem>
          {/* Points Totaux */}
          <GridItem>
            <Box
              h="150px"
              p={6}
              bg={useColorModeValue('gray.50', 'gray.700')}
              rounded="lg"
              shadow="md"
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
            >
              <Text fontSize="3xl" fontWeight="bold" color={badgeColors.points}>
                {driverStats.totalPoints}
              </Text>
              <Text fontSize="md" color="gray.500">
                Points Totaux
              </Text>
            </Box>
          </GridItem>
          {/* Tours Rapides */}
          <GridItem>
            <Box
              h="150px"
              p={6}
              bg={useColorModeValue('gray.50', 'gray.700')}
              rounded="lg"
              shadow="md"
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
            >
              <Text fontSize="3xl" fontWeight="bold" color={badgeColors.fastestLaps}>
                {driverStats.fastestLaps}
              </Text>
              <Text fontSize="md" color="gray.500">
                Tours Rapides
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      {/* Graphiques */}
      <Box>
        <Heading as="h3" size="md" mb={6} color={headingColor} fontFamily="Montserrat, sans-serif">
          Performances par Saison
        </Heading>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
          {/* Graphique des Points par Saison */}
          <Box
            flex="1"
            bg={useColorModeValue('gray.50', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <Text
              fontSize="lg"
              mb={4}
              color={textColor}
              textAlign="center"
              fontFamily="Roboto, sans-serif"
            >
              Points par Saison
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={pointsPerSeason}>
                <XAxis dataKey="season" stroke={textColor} />
                <YAxis stroke={textColor} />
                <RechartsTooltip />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="points" stroke="#3182ce" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          {/* Graphique des Victoires par Saison */}
          <Box
            flex="1"
            bg={useColorModeValue('gray.50', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <Text
              fontSize="lg"
              mb={4}
              color={textColor}
              textAlign="center"
              fontFamily="Roboto, sans-serif"
            >
              Victoires par Saison
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={winsPerSeason}>
                <XAxis dataKey="season" stroke={textColor} />
                <YAxis stroke={textColor} allowDecimals={false} />
                <RechartsTooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="wins" fill="#d69e2e" name="Victoires" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          {/* Graphique des Podiums par Saison */}
          <Box
            flex="1"
            bg={useColorModeValue('gray.50', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <Text
              fontSize="lg"
              mb={4}
              color={textColor}
              textAlign="center"
              fontFamily="Roboto, sans-serif"
            >
              Podiums par Saison
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={podiumsPerSeason}>
                <XAxis dataKey="season" stroke={textColor} />
                <YAxis stroke={textColor} allowDecimals={false} />
                <RechartsTooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="podiums" fill="#9F7AEA" name="Podiums" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default React.memo(StatsPanel);