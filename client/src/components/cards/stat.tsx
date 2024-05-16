import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Stack, Text, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
  label: string;
  value: string;
  to: string;
  tip: string;
}

export default function StatCard(props: Props) {
  const { label, value, to, tip, ...boxProps } = props;
  return (
    <Box
      px={{ base: '4', md: '6' }}
      py={{ base: '5', md: '6' }}
      bg="whitesmoke"
      borderRadius="lg"
      boxShadow="sm"
      {...boxProps}
    >
      <Stack>
        <Flex justifyContent="space-between">
          <Text textStyle="sm" color="fg.muted">
            {label}
          </Text>

          <Link to={to}>
            <Tooltip label={tip} aria-label={tip}>
            <SettingsIcon cursor="pointer" color="secondary" />
            </Tooltip>
          </Link>
        </Flex>
        <Heading size={{ base: 'sm', md: 'md' }}>{value}</Heading>
      </Stack>
    </Box>
  );
}
