// components/Sidebar.js

import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Spinner,
  Center,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  Image,
  Tooltip,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { FaCalendarAlt, FaExternalLinkAlt, FaNewspaper } from 'react-icons/fa';

const Sidebar = () => {
  // États pour les données
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [f1News, setF1News] = useState([]);

  // États pour le contrôle de l'interface
  const [isLoadingStandings, setIsLoadingStandings] = useState(true);
  const [isLoadingRaces, setIsLoadingRaces] = useState(true);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Couleurs fixes adaptées à votre design
  const bgColor = 'gray.800'; // Couleur de fond sombre
  const cardBgColor = 'gray.700'; // Couleur de fond des cartes
  const hoverBgColor = 'gray.600'; // Couleur de fond au survol
  const textColor = 'white'; // Couleur du texte

  // Taille responsive pour le Sidebar
  const sidebarWidth = useBreakpointValue({ base: '100%', md: '350px' });

  // Années disponibles pour la sélection du classement
  const years = useMemo(
    () =>
      Array.from(
        { length: new Date().getFullYear() - 1950 + 1 },
        (_, i) => new Date().getFullYear() - i
      ),
    []
  );

  // Fonction pour formater les données de l'API ERGAST
  const formatStandings = (data, type) => {
    if (type === 'driver') {
      return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
    } else if (type === 'constructor') {
      return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
    }
    return [];
  };

  const formatRaces = (data) => {
    return data.MRData.RaceTable.Races || [];
  };

  // Fetch des classements des pilotes et des équipes
  useEffect(() => {
    const fetchStandings = async () => {
      setIsLoadingStandings(true);
      try {
        const [driversRes, constructorsRes] = await Promise.all([
          axios.get(`https://ergast.com/api/f1/${selectedYear}/driverStandings.json`),
          axios.get(`https://ergast.com/api/f1/${selectedYear}/constructorStandings.json`),
        ]);
        setDriverStandings(formatStandings(driversRes.data, 'driver'));
        setConstructorStandings(formatStandings(constructorsRes.data, 'constructor'));
      } catch (error) {
        console.error('Erreur lors de la récupération des classements', error);
      } finally {
        setIsLoadingStandings(false);
      }
    };

    fetchStandings();
  }, [selectedYear]);

  // Fetch des courses à venir (prochaines courses)
  useEffect(() => {
    const fetchRaces = async () => {
      setIsLoadingRaces(true);
      try {
        const racesRes = await axios.get(`https://ergast.com/api/f1/${selectedYear}.json`);
        setUpcomingRaces(formatRaces(racesRes.data));
      } catch (error) {
        console.error('Erreur lors de la récupération des courses', error);
      } finally {
        setIsLoadingRaces(false);
      }
    };

    fetchRaces();
  }, [selectedYear]);

  // Fetch des actualités F1
  useEffect(() => {
    const fetchF1News = async () => {
      setIsNewsLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
        const newsRes = await axios.get(
          `https://newsapi.org/v2/everything?q=Formula%201&language=fr&sortBy=publishedAt&apiKey=${apiKey}`
        );
        setF1News(newsRes.data.articles);
      } catch (error) {
        console.error('Erreur lors de la récupération des actualités F1', error);
      } finally {
        setIsNewsLoading(false);
      }
    };

    fetchF1News();
  }, []);

  // Filtrer les pilotes et les équipes en fonction du terme de recherche
  const filteredDrivers = useMemo(() => {
    return searchTerm
      ? driverStandings.filter((driver) =>
          `${driver.Driver.givenName} ${driver.Driver.familyName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : driverStandings;
  }, [driverStandings, searchTerm]);

  const filteredConstructors = useMemo(() => {
    return searchTerm
      ? constructorStandings.filter((team) =>
          team.Constructor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : constructorStandings;
  }, [constructorStandings, searchTerm]);

  // Fonction pour gérer le changement d'année
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
  };

  return (
    <Box
      bg={bgColor}
      color={textColor}
      p={6}
      shadow="xl"
      h="100%" // Hauteur adaptée au conteneur parent
      overflowY="auto" // Scroll vertical
      w={sidebarWidth}
      borderRightWidth="1px"
      borderRightColor="gray.700"
      overflowX="hidden" // Empêche le débordement horizontal
      display="flex"
      flexDirection="column"
    >
      {/* Header avec le titre */}
      <HStack justifyContent="space-between" mb={6} alignItems="center">
        <HStack>
          <Avatar src="/icons/f1-logo.svg" size="sm" bg="transparent" />
          <Text fontSize="2xl" fontWeight="bold" color="red.500">
            F1 Dashboard
          </Text>
        </HStack>
      </HStack>

      {/* Barre de recherche */}
      <InputGroup mb={6}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Rechercher Pilote/Équipe"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg={cardBgColor}
          borderColor="gray.500"
          _hover={{ borderColor: 'gray.400' }}
          focusBorderColor="teal.500"
          borderRadius="md"
          size="sm"
          color={textColor}
        />
      </InputGroup>

      {/* Accordion pour les différentes sections */}
      <Accordion allowToggle flex="1">
        {/* Actualités F1 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="semibold">
              <HStack spacing={2}>
                <FaNewspaper />
                <Text>Actualités F1</Text>
              </HStack>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={6}>
            {isNewsLoading ? (
              <Center>
                <Spinner color="teal.500" />
              </Center>
            ) : f1News.length === 0 ? (
              <Text>Aucune actualité disponible.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {f1News.slice(0, 5).map((article, index) => (
                  <HStack
                    key={index}
                    p={3}
                    bg={cardBgColor}
                    borderRadius="md"
                    _hover={{ bg: hoverBgColor }}
                    align="start"
                    spacing={3}
                  >
                    {article.urlToImage && (
                      <Image
                        src={article.urlToImage}
                        alt={article.title}
                        boxSize="60px"
                        objectFit="cover"
                        borderRadius="md"
                        flexShrink={0}
                      />
                    )}
                    <VStack align="start" spacing={1} flex="1">
                      <Link href={article.url} isExternal>
                        <Text fontWeight="medium" noOfLines={2}>
                          {article.title}
                        </Text>
                      </Link>
                      <Text fontSize="sm" color="gray.400">
                        {new Date(article.publishedAt).toLocaleDateString()} - {article.source.name}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            )}
          </AccordionPanel>
        </AccordionItem>

        <Divider />

        {/* Classement Pilotes */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="semibold">
              <HStack spacing={2}>
                <Avatar src="/icons/drivers.svg" size="sm" bg="transparent" />
                <Text>Classement Pilotes</Text>
              </HStack>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={6}>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              mb={4}
              bg={cardBgColor}
              borderColor="gray.500"
              _hover={{ borderColor: 'gray.400' }}
              focusBorderColor="teal.500"
              borderRadius="md"
              size="sm"
              color={textColor}
            >
              {years.map((year) => (
                <option key={year} value={year} style={{ color: textColor }}>
                  {year}
                </option>
              ))}
            </Select>

            {isLoadingStandings ? (
              <Center>
                <Spinner color="teal.500" />
              </Center>
            ) : filteredDrivers.length === 0 ? (
              <Text>Aucun pilote trouvé.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {filteredDrivers.map((driver) => (
                  <HStack
                    key={driver.Driver.driverId} // Utiliser une clé unique
                    p={3}
                    bg={cardBgColor}
                    borderRadius="md"
                    _hover={{ bg: hoverBgColor }}
                    justifyContent="space-between"
                  >
                    <HStack spacing={3}>
                      <Avatar
                        name={`${driver.Driver.givenName} ${driver.Driver.familyName}`}
                        src={
                          driver.Driver.imageUrl
                            ? driver.Driver.imageUrl
                            : `/avatars/drivers/${driver.Driver.driverId}.png` // Utiliser une image locale ou une autre source
                        }
                        size="sm"
                        bg="gray.600"
                        onError={(e) => {
                          e.target.onerror = null; // Empêche une boucle infinie
                          e.target.src = '/avatars/drivers/default-driver.png'; // Image par défaut
                        }}
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">
                          {driver.position}. {driver.Driver.givenName} {driver.Driver.familyName}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          {driver.Driver.nationality}
                        </Text>
                      </VStack>
                    </HStack>
                    <Tooltip label={`${driver.points} points`} aria-label="Points">
                      <Badge colorScheme="teal" fontSize="md">
                        {driver.points} pts
                      </Badge>
                    </Tooltip>
                  </HStack>
                ))}
              </VStack>
            )}
          </AccordionPanel>
        </AccordionItem>

        <Divider />

        {/* Classement Équipes */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="semibold">
              <HStack spacing={2}>
                <Avatar src="/icons/constructors.svg" size="sm" bg="transparent" />
                <Text>Classement Équipes</Text>
              </HStack>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={6}>
            {isLoadingStandings ? (
              <Center>
                <Spinner color="teal.500" />
              </Center>
            ) : filteredConstructors.length === 0 ? (
              <Text>Aucune équipe trouvée.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {filteredConstructors.map((team) => (
                  <HStack
                    key={team.Constructor.constructorId} // Utiliser une clé unique
                    p={3}
                    bg={cardBgColor}
                    borderRadius="md"
                    _hover={{ bg: hoverBgColor }}
                    justifyContent="space-between"
                  >
                    <HStack spacing={3}>
                      <Avatar
                        name={team.Constructor.name}
                        src={
                          team.Constructor.imageUrl
                            ? team.Constructor.imageUrl
                            : `/avatars/constructors/${team.Constructor.constructorId}.png` // Utiliser une image locale ou une autre source
                        }
                        size="sm"
                        bg="gray.600"
                        onError={(e) => {
                          e.target.onerror = null; // Empêche une boucle infinie
                          e.target.src = '/avatars/constructors/default-team.png'; // Image par défaut
                        }}
                      />
                      <Text fontWeight="medium">
                        {team.position}. {team.Constructor.name}
                      </Text>
                    </HStack>
                    <Tooltip label={`${team.points} points`} aria-label="Points">
                      <Badge colorScheme="teal" fontSize="md">
                        {team.points} pts
                      </Badge>
                    </Tooltip>
                  </HStack>
                ))}
              </VStack>
            )}
          </AccordionPanel>
        </AccordionItem>

        <Divider />

        {/* Calendrier des Courses */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="semibold">
              <HStack spacing={2}>
                <FaCalendarAlt />
                <Text>Calendrier</Text>
              </HStack>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={6}>
            {isLoadingRaces ? (
              <Center>
                <Spinner color="teal.500" />
              </Center>
            ) : upcomingRaces.length === 0 ? (
              <Text>Aucune course à venir.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {upcomingRaces.map((race) => (
                  <HStack
                    key={race.round}
                    p={3}
                    bg={cardBgColor}
                    borderRadius="md"
                    _hover={{ bg: hoverBgColor }}
                    justifyContent="space-between"
                    spacing={3}
                  >
                    <HStack spacing={3}>
                      <FaCalendarAlt color="teal" />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">{race.raceName}</Text>
                        <Text fontSize="sm" color="gray.400">
                          {new Date(race.date).toLocaleDateString()} -{' '}
                          {race.Circuit?.Location?.country || 'Pays inconnu'}
                        </Text>
                      </VStack>
                    </HStack>
                    <Link
                      href={`https://www.formula1.com/en/results.html/${race.season}/${race.round}/races/${encodeURIComponent(
                        race.raceName
                      )}.html`}
                      isExternal
                    >
                      <FaExternalLinkAlt color="teal" />
                    </Link>
                  </HStack>
                ))}
              </VStack>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default React.memo(Sidebar);
