import { Box, Card, Divider, Heading } from '@chakra-ui/react';
import LeagueMenu from '../../components/cards/leagueMenu';
import { useLeagueStore } from '../../store/league';
import { useEffect, useState } from 'react';
import { FixtureAttr } from '../../interfaces';
import { pocketbase } from '../../pocketbase';
import FixtureCard from '../../components/cards/fixtureCard';

export default function AdminFixtures() {
  const currentLeague = useLeagueStore((state) => state.currentLeague);
  const [fixtures, setFixtures] = useState<FixtureAttr[]>([]);
  const [manageFixture, setManageFixture] = useState<FixtureAttr | null>(null);

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
    <Box flex={1}>
      <LeagueMenu />

      <Box h={4}></Box>
      <Card p={4} background="whitesmoke">
        {fixtures?.length ? (
          fixtures.map((fixture) => (
            <Box key={fixture.id}>
              <FixtureCard admin={true} fixture={fixture} />
              <Divider my={2} />
            </Box>
          ))
        ) : (
          <Heading>No fixtures for {currentLeague?.title} yet</Heading>
        )}
      </Card>
    </Box>
  );
}
