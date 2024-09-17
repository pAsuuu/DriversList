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
  IconButton,
  useColorMode,
  useColorModeValue,
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
import { SearchIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
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

  const { colorMode, toggleColorMode } = useColorMode();

  // Couleurs basées sur le mode de couleur
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');

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

  return (
    <Box
      bg={bgColor}
      color={textColor}
      p={6}
      shadow="xl"
      h="100vh"
      overflowY="auto"
      w={sidebarWidth}
      position={{ base: 'relative', md: 'sticky' }}
      top="0"
      zIndex="1000"
      borderRightWidth={{ base: '0', md: '1px' }}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    >
      {/* Header avec le titre et le toggle du mode sombre */}
      <HStack justifyContent="space-between" mb={6}>
        <Text fontSize="3xl" fontWeight="bold" color="teal.500">
          F1 Dashboard
        </Text>
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          size="lg"
        />
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
          borderColor="gray.300"
          _hover={{ borderColor: 'gray.400' }}
          focusBorderColor="teal.500"
        />
      </InputGroup>

      {/* Accordion pour les différentes sections */}
      <Accordion allowToggle defaultIndex={[0]}>
        {/* Actualités F1 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="semibold">
              <HStack>
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
                  >
                    {article.urlToImage && (
                      <Image
                        src={article.urlToImage}
                        alt={article.title}
                        boxSize="60px"
                        objectFit="cover"
                        borderRadius="md"
                        mr={3}
                      />
                    )}
                    <VStack align="start" spacing={1} flex="1">
                      <Link href={article.url} isExternal>
                        <Text fontWeight="medium" noOfLines={2}>
                          {article.title}
                        </Text>
                      </Link>
                      <Text fontSize="sm" color="gray.500">
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
              <HStack>
                <Avatar src="/icons/drivers.svg" size="sm" />
                <Text>Classement Pilotes</Text>
              </HStack>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={6}>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              mb={4}
              bg={cardBgColor}
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
              focusBorderColor="teal.500"
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
                {filteredDrivers.map((driver, index) => (
                  <HStack
                    key={index}
                    p={3}
                    bg={cardBgColor}
                    borderRadius="md"
                    _hover={{ bg: hoverBgColor }}
                    justifyContent="space-between"
                  >
                    <HStack>
                      <Avatar
                        name={`${driver.Driver.givenName} ${driver.Driver.familyName}`}
                        src={`https://www.gravatar.com/avatar/${driver.Driver.driverId}?d=identicon`}
                        size="sm"
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">
                          {driver.position}. {driver.Driver.givenName} {driver.Driver.familyName}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
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
              <HStack>
                <Avatar src="/icons/constructors.svg" size="sm" />
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
                {filteredConstructors.map((team, index) => (
                  <HStack
                    key={index}
                    p={3}
                    bg={cardBgColor}
                    borderRadius="md"
                    _hover={{ bg: hoverBgColor }}
                    justifyContent="space-between"
                  >
                    <HStack>
                      <Avatar
                        name={team.Constructor.name}
                        src={`https://www.gravatar.com/avatar/${team.Constructor.constructorId}?d=identicon`}
                        size="sm"
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
              <HStack>
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
                  >
                    <HStack>
                      <FaCalendarAlt color="teal" />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">{race.raceName}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {new Date(race.date).toLocaleDateString()} - {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                        </Text>
                      </VStack>
                    </HStack>
                    <Link href={`https://www.formula1.com/en/results.html/${race.season}/${race.round}/races/${race.raceName}.html`} isExternal>
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
