// pages/index.js

import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Header from '../src/app/components/Header';
import MainContent from '../src/app/components/MainContent';
import StatsPanel from '../src/app/components/StatsPanel';
import Footer from '../src/app/components/Footer';
import DriversList from '../src/app/components/DriversList';
import axios from 'axios';

// Charger Sidebar de manière dynamique sans SSR pour éviter les problèmes de rendu
const Sidebar = dynamic(() => import('../src/app/components/Sidebar'), { ssr: false });

const Home = ({ driverStandings, constructorStandings, upcomingRaces, f1News, driversData }) => {
  return (
    <Flex direction="column" minH="100vh" overflowX="hidden">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <Flex direction={{ base: 'column', md: 'row' }} flex="1">
        {/* Sidebar */}
        <Box
          w={{ base: '90%', md: '350px' }} // Limiter la largeur à 90% sur mobile
          mx={{ base: 'auto', md: '0' }} // Centrer la Sidebar sur mobile
          bg={useColorModeValue('white', 'gray.900')}
          overflowY="auto"
          position={{ base: 'relative', md: 'sticky' }}
          top="0"
          p={4}
        >
          <Sidebar
            driverStandings={driverStandings}
            constructorStandings={constructorStandings}
            upcomingRaces={upcomingRaces}
            f1News={f1News}
          />
        </Box>

        {/* Main Content */}
        <Box
          flex="1"
          p={{ base: 4, md: 6 }}
          bg={useColorModeValue('gray.50', 'gray.800')}
          overflowY="auto"
        >
          <MainContent />

          <Box mt={8}>
            <DriversList driversData={driversData} />
          </Box>

          <Box mt={8}>
            <StatsPanel />
          </Box>
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export async function getStaticProps() {
  try {
    const currentYear = new Date().getFullYear();

    const [driversResponse, constructorsResponse, racesResponse, newsResponse] = await Promise.all([
      axios.get(`https://ergast.com/api/f1/${currentYear}/driverStandings.json`),
      axios.get(`https://ergast.com/api/f1/${currentYear}/constructorStandings.json`),
      axios.get('https://ergast.com/api/f1/current.json'),
      axios.get(
        `https://newsapi.org/v2/everything?q=Formula%201&language=fr&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`
      ),
    ]);

    // Traitement des données pour correspondre à vos composants
    const driverStandings =
      driversResponse.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
    const constructorStandings =
      constructorsResponse.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
    const races = racesResponse.data.MRData.RaceTable.Races || [];
    const f1News = newsResponse.data.articles || [];

    // Filtrer les courses à venir
    const isFutureRace = (raceDate) => {
      const today = new Date();
      const race = new Date(`${raceDate}T00:00:00`);
      return race >= today;
    };
    const futureRaces = races.filter((race) => isFutureRace(race.date));
    const upcomingRaces = futureRaces.slice(0, 6).map((race) => ({
      raceName: race.raceName,
      date: race.date,
      time: race.time,
      circuitName: race.Circuit.circuitName,
      location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
    }));

    // Charger le fichier CSV des pilotes
    const fs = require('fs');
    const path = require('path');
    const Papa = require('papaparse');

    const csvFilePath = path.join(process.cwd(), 'public', 'data', 'drivers.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf8');
    const { data: driversData } = Papa.parse(fileContent, { header: true });

    return {
      props: {
        driverStandings,
        constructorStandings,
        upcomingRaces,
        f1News,
        driversData, // Ajout de driversData aux props
      },
      // Suppression de 'revalidate' car ISR n'est pas supporté avec 'output: export'
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    return {
      props: {
        driverStandings: [],
        constructorStandings: [],
        upcomingRaces: [],
        f1News: [],
        driversData: [],
      },
    };
  }
}

export default Home;
