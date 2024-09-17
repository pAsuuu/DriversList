import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'; // Ajoutez useColorModeValue ici
import dynamic from 'next/dynamic';
import Header from '../src/app/components/Header';
// Importer Sidebar dynamiquement sans SSR
const Sidebar = dynamic(() => import('../src/app/components/Sidebar'), { ssr: false });
import MainContent from '../src/app/components/MainContent';
import StatsPanel from '../src/app/components/StatsPanel';
import Footer from '../src/app/components/Footer';
import DriversList from '../src/app/components/DriversList';
import axios from 'axios'; // N'oubliez pas d'importer axios

const Home = ({ driverStandings, constructorStandings, upcomingRaces, f1News }) => {
  return (
    <>
      <Header />
      <Flex minH="calc(100vh - 64px)" direction={{ base: 'column', md: 'row' }}>
        {/* Sidebar */}
        <Box
          w={{ base: '100%', md: '350px' }}
          position={{ base: 'relative', md: 'sticky' }}
          top="0"
          bg={useColorModeValue('white', 'gray.900')} // Utilisation correcte
          zIndex="1000"
        >
          <Sidebar
            driverStandings={driverStandings}
            constructorStandings={constructorStandings}
            upcomingRaces={upcomingRaces}
            f1News={f1News}
          />
        </Box>

        {/* Main Content */}
        <Box flex="1" p={4} bg={useColorModeValue('gray.50', 'gray.800')}>
          <MainContent />

          <Box mt={8}>
            <DriversList />
          </Box>

          <Box mt={8}>
            <StatsPanel />
          </Box>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

// Utilisation de getStaticProps pour permettre l'exportation statique
export async function getStaticProps() {
  try {
    const [driversResponse, constructorsResponse, racesResponse, newsResponse] = await Promise.all([
      axios.get(`http://localhost:8000/api/driver-standings?year=${new Date().getFullYear()}`),
      axios.get(`http://localhost:8000/api/constructor-standings?year=${new Date().getFullYear()}`),
      axios.get('http://localhost:8000/api/upcoming-races'),
      axios.get(`https://newsapi.org/v2/everything?q=Formula%201&language=fr&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`),
    ]);

    return {
      props: {
        driverStandings: driversResponse.data,
        constructorStandings: constructorsResponse.data,
        upcomingRaces: racesResponse.data,
        f1News: newsResponse.data.articles,
      },
      revalidate: 60, // Optionnel : Regénère la page tous les 60 secondes
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    return {
      props: {
        driverStandings: [],
        constructorStandings: [],
        upcomingRaces: [],
        f1News: [],
      },
    };
  }
}

export default Home;
