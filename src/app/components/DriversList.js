// components/DriversList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Flex,
  Heading,
  Spinner,
  Center,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  Avatar,
  Tooltip,
  useColorModeValue,
  Badge,
  Button,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { FaTwitter, FaWikipediaW, FaGlobe, FaInstagram } from 'react-icons/fa';

// Déplacer MotionBox en dehors du composant pour éviter les problèmes de Hooks
const MotionBox = motion(Box);

const DriversList = ({ driversData }) => { // Utilisation de driversData passé en props
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('Toutes');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Fonction pour récupérer l'image du pilote depuis Wikipédia
  const fetchDriverImage = async (wikiUrl) => {
    try {
      if (!wikiUrl) {
        return '/default-image.png';
      }
      const wikiTitle = wikiUrl.split('/').pop();
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${wikiTitle}&pithumbsize=400&origin=*`
      );
      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const imageUrl = pages[pageId]?.thumbnail?.source || '/default-image.png';
      console.log(`Image URL for ${wikiTitle}:`, imageUrl); // Ajouté pour le débogage
      return imageUrl;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image :", error);
      return '/default-image.png'; // Image par défaut en cas d'erreur
    }
  };

  // Fonction pour récupérer les pilotes via les données passées en props
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Filtrer les pilotes ayant les champs essentiels
        const validDrivers = driversData.filter(
          (driver) =>
            driver.forename &&
            driver.surname &&
            driver.nationality &&
            driver.driverId &&
            driver.url
        );

        // Traiter les pilotes valides
        const driversWithImages = await Promise.all(
          validDrivers.map(async (driver, index) => {
            const imageUrl = await fetchDriverImage(driver.url); // Récupérer l'image du pilote via Wikipédia
            return { ...driver, imageUrl, id: index }; // Ajouter un identifiant unique
          })
        );
        setDrivers(driversWithImages);
        setFilteredDrivers(driversWithImages);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des pilotes:', error);
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, [driversData]);

  // Fonction pour obtenir le drapeau en fonction du code pays
  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return null;
    return (
      <Image
        src={`https://flagcdn.com/h40/${countryCode.toLowerCase()}.png`}
        alt={countryCode}
        width="24px"
        height="16px"
        style={{ display: 'inline', marginLeft: '5px', maxWidth: '100%' }} // Ajout de maxWidth
      />
    );
  };

  // Mapping nationalité vers code pays
  const nationalityToCountryCode = {
    British: 'gb',
    Spanish: 'es',
    French: 'fr',
    German: 'de',
    Mexican: 'mx',
    Australian: 'au',
    Finnish: 'fi',
    Dutch: 'nl',
    Canadian: 'ca',
    Monegasque: 'mc',
    Thai: 'th',
    Japanese: 'jp',
    Chinese: 'cn',
    American: 'us',
    Danish: 'dk',
    Italian: 'it',
    Brazilian: 'br',
    Russian: 'ru',
    Swedish: 'se',
    Belgian: 'be',
    // Ajouter d'autres nationalités si nécessaire
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterDrivers(term, nationalityFilter);
  };

  const handleNationalityFilter = (e) => {
    const nationality = e.target.value;
    setNationalityFilter(nationality);
    filterDrivers(searchTerm, nationality);
  };

  const filterDrivers = (searchTerm, nationality) => {
    let filtered = drivers.filter((driver) =>
      (`${driver.forename} ${driver.surname}`).toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (nationality !== 'Toutes') {
      filtered = filtered.filter((driver) => driver.nationality === nationality);
    }

    setFilteredDrivers(filtered);
  };

  const openDriverDetails = (driver) => {
    setSelectedDriver(driver);
    onOpen();
  };

  // Variables de style
  const bgColor = useColorModeValue('gray.800', 'gray.800');
  const cardBgColor = useColorModeValue('gray.700', 'gray.700');
  const textColor = useColorModeValue('white', 'white');
  const inputBgColor = useColorModeValue('gray.700', 'gray.700');
  const placeholderColor = useColorModeValue('gray.400', 'gray.400');
  const modalBgColor = useColorModeValue('gray.700', 'gray.700');

  return (
    <Box py={8} px={4} maxW="1200px" mx="auto" minH="100vh" bg={bgColor} color={textColor} overflowX="hidden">
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="brand.500">
        Liste des Pilotes de Formule 1
      </Heading>

      <Flex mb={8} justify="center" direction={{ base: 'column', md: 'row' }} gap={4}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color={placeholderColor} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Rechercher un pilote"
            value={searchTerm}
            onChange={handleSearch}
            bg={inputBgColor}
            color={textColor}
            _placeholder={{ color: placeholderColor }}
            borderRadius="full"
          />
        </InputGroup>

        <Select
          value={nationalityFilter}
          onChange={handleNationalityFilter}
          maxW="200px"
          bg={inputBgColor}
          color={textColor}
          borderRadius="full"
        >
          <option key="Toutes" value="Toutes">
            Toutes les nationalités
          </option>
          {Array.from(new Set(drivers.map((d) => d.nationality)))
            .sort()
            .map((nationality, index) => (
              <option key={`nationality-${index}`} value={nationality}>
                {nationality}
              </option>
            ))}
        </Select>
      </Flex>

      {isLoading ? (
        <Center>
          <Spinner size="xl" color="brand.500" />
        </Center>
      ) : filteredDrivers.length > 0 ? (
        <Flex wrap="wrap" justify="center" gap={6}>
          {filteredDrivers.map((driver) => (
            <MotionBox
              key={driver.id} // Utiliser un identifiant unique
              whileHover={{ y: -5 }}
              bg={cardBgColor}
              borderRadius="lg"
              overflow="hidden"
              shadow="md"
              cursor="pointer"
              onClick={() => openDriverDetails(driver)}
              width={{ base: '100%', sm: '45%', md: '30%' }}
              transition="0.3s"
              _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
            >
              <Center mt={4}>
                <Avatar
                  size={{ base: 'xl', md: '2xl' }}
                  name={`${driver.forename} ${driver.surname}`}
                  src={driver.imageUrl || '/default-image.png'}
                  bg="gray.600"
                  onError={(e) => { e.target.src = '/default-image.png'; }}
                />
              </Center>
              <Box p={4} textAlign="center">
                <Tooltip label={`${driver.forename} ${driver.surname}`} hasArrow>
                  <Heading as="h3" size="md" mb={2} color={textColor} isTruncated>
                    {driver.forename} {driver.surname}{' '}
                    {getFlagEmoji(nationalityToCountryCode[driver.nationality])}
                  </Heading>
                </Tooltip>
                <Text fontSize="sm" color="gray.300">
                  Nationalité : {driver.nationality}
                </Text>
                <Text fontSize="sm" color="gray.300">
                  Numéro : {driver.number || 'N/A'}
                </Text>
              </Box>
            </MotionBox>
          ))}
        </Flex>
      ) : (
        <Center>
          <Text>Aucun pilote ne correspond à votre recherche.</Text>
        </Center>
      )}

      {selectedDriver && (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered motionPreset="scale">
          <ModalOverlay />
          <ModalContent
            borderRadius="lg"
            overflow="hidden"
            bg={modalBgColor}
            color={textColor}
            maxW="90vw" // Limiter la largeur à 90% de la vue
            width={{ base: '90vw', md: '80vw', lg: '60vw' }} // Largeur réactive
          >
            {/* Section de couverture avec le logo de l'équipe */}
            <Box bgColor="blackAlpha.700" p={4}>
              {selectedDriver.teamLogo && (
                <Image
                  src={selectedDriver.teamLogo}
                  alt={`${selectedDriver.team} Logo`}
                  boxSize="100px"
                  objectFit="contain"
                  mx="auto"
                />
              )}
            </Box>

            <Flex direction={{ base: 'column', md: 'row' }} p={6}>
              {/* Avatar du pilote */}
              <Avatar
                size={{ base: '2xl', md: '2xl' }}
                name={`${selectedDriver.forename} ${selectedDriver.surname}`}
                src={selectedDriver.imageUrl || '/default-image.png'}
                bg="gray.600"
                mr={{ md: 6 }}
                mb={{ base: 6, md: 0 }}
                onError={(e) => { e.target.src = '/default-image.png'; }}
              />

              {/* Informations détaillées */}
              <Box flex="1">
                <Heading as="h2" size="lg" mb={4}>
                  {selectedDriver.forename} {selectedDriver.surname}{' '}
                  {getFlagEmoji(nationalityToCountryCode[selectedDriver.nationality])}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                  <Box>
                    <Text fontWeight="bold">Nationalité :</Text>
                    <Text>{selectedDriver.nationality}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Date de naissance :</Text>
                    <Text>
                      {selectedDriver.dob
                        ? new Date(selectedDriver.dob).toLocaleDateString()
                        : 'N/A'}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Code Pilote :</Text>
                    <Text>{selectedDriver.code || 'N/A'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Numéro :</Text>
                    <Text>{selectedDriver.number || 'N/A'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Équipe :</Text>
                    <Text>{selectedDriver.team || 'N/A'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Championnats :</Text>
                    <Text>{selectedDriver.championships || '0'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Victoires :</Text>
                    <Text>{selectedDriver.wins || '0'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Podiums :</Text>
                    <Text>{selectedDriver.podiums || '0'}</Text>
                  </Box>
                </SimpleGrid>

                {/* Description du pilote */}
                <Text mb={4}>
                  {selectedDriver.description ||
                    "Informations détaillées sur le pilote seront bientôt disponibles."}
                </Text>

                {/* Boutons de réseaux sociaux */}
                <Stack direction="row" spacing={4} justify="center">
                  {selectedDriver.socialMedia && selectedDriver.socialMedia.includes('twitter') && (
                    <Link href={selectedDriver.socialMedia.split(',')[0]} isExternal>
                      <Button leftIcon={<FaTwitter />} colorScheme="twitter">
                        Twitter
                      </Button>
                    </Link>
                  )}
                  {selectedDriver.socialMedia && selectedDriver.socialMedia.includes('wikipedia') && (
                    <Link href={selectedDriver.url} isExternal>
                      <Button leftIcon={<FaWikipediaW />} colorScheme="gray">
                        Wikipédia
                      </Button>
                    </Link>
                  )}
                  {selectedDriver.socialMedia && selectedDriver.socialMedia.includes('instagram') && (
                    <Link href={selectedDriver.socialMedia.split(',')[1]} isExternal>
                      <Button leftIcon={<FaInstagram />} colorScheme="pink">
                        Instagram
                      </Button>
                    </Link>
                  )}
                  {selectedDriver.socialMedia && selectedDriver.socialMedia.includes('website') && (
                    <Link href={selectedDriver.socialMedia.split(',')[2]} isExternal>
                      <Button leftIcon={<FaGlobe />} colorScheme="blue">
                        Site Web
                      </Button>
                    </Link>
                  )}
                </Stack>
              </Box>
            </Flex>

            {/* Statistiques de Carrière */}
            <Box px={6} pb={6}>
              <Heading as="h3" size="md" mb={4} textAlign="center">
                Statistiques de Carrière
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                <Flex
                  align="center"
                  justify="center"
                  direction="column"
                  p={4}
                  bg={useColorModeValue('gray.600', 'gray.600')}
                  borderRadius="md"
                >
                  <Badge colorScheme="green" mb={2}>
                    Victoires
                  </Badge>
                  <Text fontSize="2xl" fontWeight="bold">
                    {selectedDriver.wins || '0'}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  direction="column"
                  p={4}
                  bg={useColorModeValue('gray.600', 'gray.600')}
                  borderRadius="md"
                >
                  <Badge colorScheme="orange" mb={2}>
                    Podiums
                  </Badge>
                  <Text fontSize="2xl" fontWeight="bold">
                    {selectedDriver.podiums || '0'}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  direction="column"
                  p={4}
                  bg={useColorModeValue('gray.600', 'gray.600')}
                  borderRadius="md"
                >
                  <Badge colorScheme="purple" mb={2}>
                    Championnats
                  </Badge>
                  <Text fontSize="2xl" fontWeight="bold">
                    {selectedDriver.championships || '0'}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  direction="column"
                  p={4}
                  bg={useColorModeValue('gray.600', 'gray.600')}
                  borderRadius="md"
                >
                  <Badge colorScheme="blue" mb={2}>
                    Courses
                  </Badge>
                  <Text fontSize="2xl" fontWeight="bold">
                    {selectedDriver.races || 'N/A'}
                  </Text>
                </Flex>
              </SimpleGrid>
            </Box>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default DriversList;
