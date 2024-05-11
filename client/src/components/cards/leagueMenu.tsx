import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { LeagueAttr } from '../../interfaces';
import { useLeagueStore } from '../../store/league';
import { pocketbase } from '../../pocketbase';

export default function LeagueMenu() {
  const toast = useToast();
  const { leagues, currentLeague, setCurrentLeague, setLeagues } =
    useLeagueStore();

  const fetchLeagues = async () => {
    try {
      const leagues = await pocketbase
        .collection<LeagueAttr>('league')
        .getFullList();
      setLeagues(leagues);
      if (leagues.length) setCurrentLeague(leagues[0]);
    } catch (error: any) {
      if (error?.data?.code)
        toast({
          position: 'bottom',
          title: 'Failed to Fetch leagues',
          description: error?.data?.message,
          status: 'error',
          isClosable: true,
        });
    }
  };

  useEffect(() => {
    if (!leagues.length) {
      fetchLeagues();
    }
  }, []);

  const leagueYear = (date?: string) =>
    (date ? new Date(date) : new Date()).getFullYear();

  const handleLeagueChange = (league: LeagueAttr) => {
    setCurrentLeague(league);
  };

  return (
    <Flex
      w="100%"
      alignItems="flex-start"
      gap={2}
      p={4}
      background="whitesmoke"
    >
      <Menu>
        <MenuButton>
          <Flex direction="column" textAlign="left">
            <Text fontWeight="bold" color="GrayText">
              AM Football
            </Text>

            {/* League title */}
            <Flex>
              <ChevronDownIcon style={{ marginRight: '.7rem' }} />
              <Heading size="md">{`${leagueYear(currentLeague?.created)} - ${
                currentLeague?.title
              }`}</Heading>
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList>
          {leagues.map((league) => (
            <MenuItem
              key={league.id}
              onClick={() => handleLeagueChange(league)}
            >
              {`${leagueYear(league.created)} - ${league.title}`}
            </MenuItem>
          ))}
          <MenuDivider />
        </MenuList>
      </Menu>
    </Flex>
  );
}
