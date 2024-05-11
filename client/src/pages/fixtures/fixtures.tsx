import { Box, Card, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import LeagueMenu from '../../components/cards/leagueMenu';
import { useEffect, useState } from 'react';
import { pocketbase } from '../../pocketbase';
import { useLeagueStore } from '../../store/league';
import { FixtureAttr } from '../../interfaces';
import FixtureCard from '../../components/cards/fixtureCard';

export default function Fixtures() {
  const currentLeague = useLeagueStore((state) => state.currentLeague);
  const [fixtures, setFixtures] = useState<FixtureAttr[]>([]);

  const fetchFixtures = async () => {
    try {
      const fixtures = await pocketbase
        .collection<FixtureAttr>('fixtures')
        .getFullList({
          filter: `leagueId = "${currentLeague.id}"`,
          sort: '-created',
          expand: 'home,away',
        });
      setFixtures(fixtures);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, [currentLeague]);

  return (
    <Container background="gray.200" maxW="1440px" minH="80dvh">
      <Box h={4}></Box>
      {/* League */}
      <LeagueMenu />

      <Box h={4}></Box>
      <Card p={4} background="whitesmoke">
        {fixtures?.length ? (
          fixtures.map((fixture) => (
            <>
            <FixtureCard fixture={fixture} key={fixture.id} />
            <Divider my={2} />
            </>
          ))
        ) : (
          <Heading>No fixtures for {currentLeague?.title} yet</Heading>
        )}
      </Card>

      <Box h={4}></Box>
    </Container>
  );
}
