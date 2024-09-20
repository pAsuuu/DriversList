import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  SimpleGrid,
  Image,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiSunrise,
  FiSunset,
  FiWind,
  FiDroplet,
  FiThermometer,
  FiCompass,
  FiCloudRain,
} from 'react-icons/fi';
import ChakraButtonLink from './ChakraButtonLink'; // Importer le composant personnalisé

const MainContent = () => {
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  // Fonction pour comparer les dates
  const isFutureRace = (raceDate) => {
    const today = new Date();
    const race = new Date(`${raceDate}T00:00:00`);
    return race >= today;
  };

  // Récupérer les données des prochaines courses depuis l'API Ergast
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        // Endpoint de l'API Ergast pour la saison en cours
        const response = await axios.get('https://ergast.com/api/f1/current.json');
        const races = response.data.MRData.RaceTable.Races;

        // Filtrer les courses à venir
        const futureRaces = races.filter((race) => isFutureRace(race.date));

        // Limiter aux 6 prochains GP
        const limitedRaces = futureRaces.slice(0, 6);

        // Mapper les données nécessaires
        const mappedRaces = limitedRaces.map((race) => ({
          raceName: race.raceName,
          date: race.date,
          time: race.time, // Vous pouvez formater l'heure si nécessaire
          circuitName: race.Circuit.circuitName,
          location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
          circuitImage: getCircuitImage(race.Circuit.circuitName),
        }));

        setUpcomingRaces(mappedRaces);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des courses', error);
        setIsLoading(false);
      }
    };

    fetchRaces();
  }, []);

  // Récupérer les données météo
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
        const location = 'Singapore'; // Exemple de localisation, vous pouvez le rendre dynamique
        const weatherResponse = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&lang=fr&days=1`
        );
        setWeatherData(weatherResponse.data);
        setIsWeatherLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo', error);
        setIsWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Fonction pour obtenir le chemin de l'image du circuit
  const getCircuitImage = (circuitName) => {
    const circuitImages = {
      'Autódromo José Carlos Pace': '/brasil.jpg',
      'Circuit of the Americas': '/cota.jpg',
      'Las Vegas Strip Street Circuit': '/lasvegas.png',
      'Autódromo Hermanos Rodríguez': '/mexico.jpg',
      'Las Vegas Street Circuit': '/lasvegas.png',
      'Losail International Circuit': '/qatar.jpg',
      'Marina Bay Street Circuit': '/singapour.jpg',
      // Ajoutez d'autres circuits ici si nécessaire
    };

    // Retourne le chemin de l'image ou une image par défaut
    return circuitImages[circuitName] || '/states.jpg';
  };

  // Couleurs pour le thème clair et sombre
  const bgColor = useColorModeValue('gray.800', 'gray.800');
  const cardBgColor = useColorModeValue('gray.700', 'gray.700');
  const textColor = useColorModeValue('white', 'white');

  return (
    <Box as="section" py={8} px={4} id="main-content" bg={bgColor} color={textColor} flex="1">
      {/* Prochaines Courses */}
      <Heading as="h1" size="xl" mb={8} textAlign="center" color="brand.500">
        Prochaines Courses de Formule 1
      </Heading>

      {isLoading ? (
        <Center>
          <Spinner size="xl" color="brand.500" />
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {upcomingRaces.map((race, index) => (
            <Box
              key={index}
              bg={cardBgColor}
              p={6}
              rounded="md"
              shadow="md"
              position="relative"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.05)' }}
            >
              <Image
                src={race.circuitImage}
                alt={race.circuitName}
                borderRadius="md"
                mb={4}
                objectFit="cover"
                width="100%"
                height="150px"
                fallbackSrc="/states.jpg" // Image de repli si l'image principale ne charge pas
              />
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {race.raceName}
              </Text>
              <Text color="gray.400">{race.date}</Text>
              <Text mt={2} color="gray.300">
                Circuit : {race.circuitName}
              </Text>
              <Text color="gray.300">Lieu : {race.location}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Météo en direct de Singapour */}
      <Box py={12}>
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="brand.500">
          Météo en Direct de Singapour
        </Heading>

        {isWeatherLoading ? (
          <Center>
            <Spinner size="xl" color="brand.500" />
          </Center>
        ) : weatherData ? (
          <Center>
            <Box
              bg={cardBgColor}
              p={8}
              rounded="md"
              shadow="md"
              width={{ base: '100%', md: '80%', lg: '60%' }}
            >
              <Flex alignItems="center" justifyContent="center" mb={6}>
                <Image
                  src={`https:${weatherData.current.condition.icon}`}
                  alt={weatherData.current.condition.text}
                  boxSize="80px"
                  fallbackSrc="/default-weather-icon.png" // Assurez-vous que cette image existe dans le dossier public
                />
                <Text fontSize="4xl" fontWeight="bold" ml={4}>
                  {weatherData.current.temp_c}°C
                </Text>
              </Flex>
              <Text fontSize="xl" textAlign="center" mb={4}>
                {weatherData.current.condition.text}
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Flex align="center">
                  <Icon as={FiThermometer} boxSize={6} mr={2} />
                  <Text fontSize="lg">Ressenti : {weatherData.current.feelslike_c}°C</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FiDroplet} boxSize={6} mr={2} />
                  <Text fontSize="lg">Humidité : {weatherData.current.humidity}%</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FiWind} boxSize={6} mr={2} />
                  <Text fontSize="lg">
                    Vent : {weatherData.current.wind_kph} km/h ({weatherData.current.wind_dir})
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FiCloudRain} boxSize={6} mr={2} />
                  <Text fontSize="lg">Précipitations : {weatherData.current.precip_mm} mm</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FiSunrise} boxSize={6} mr={2} />
                  <Text fontSize="lg">
                    Lever du soleil : {weatherData.forecast.forecastday[0].astro.sunrise}
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FiSunset} boxSize={6} mr={2} />
                  <Text fontSize="lg">
                    Coucher du soleil : {weatherData.forecast.forecastday[0].astro.sunset}
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FiCompass} boxSize={6} mr={2} />
                  <Text fontSize="lg">Pression : {weatherData.current.pressure_mb} hPa</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FiThermometer} boxSize={6} mr={2} />
                  <Text fontSize="lg">Indice UV : {weatherData.current.uv}</Text>
                </Flex>
              </SimpleGrid>
            </Box>
          </Center>
        ) : (
          <Text color="gray.400" textAlign="center">
            Impossible de récupérer les données météorologiques.
          </Text>
        )}
      </Box>

      {/* Section des probabilités de victoire */}
      <Box py={8} textAlign="center">
        <Heading as="h2" size="lg" mb={6} color="brand.500">
          Probabilités de Victoire
        </Heading>

        <ChakraButtonLink
          href="/probability-dashboard"
          colorScheme="teal"
          size={{ base: 'md', md: 'lg', lg: 'xl' }}  // Taille responsive pour différents écrans
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}  // Taille du texte ajustée
          px={{ base: 6, md: 8, lg: 12 }}  // Padding horizontal responsive
          py={{ base: 4, md: 6, lg: 8 }}  // Padding vertical responsive
          leftIcon={<FiCompass />}
          _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
        >
          Dashboard Techniques de Probabilités de Victoires
        </ChakraButtonLink>

      </Box>
    </Box>
  );
};

export default MainContent;
