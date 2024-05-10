import { extendTheme, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const PRIMARY = '#1D222B';
const SECONDARY = '#285E61';

const primary = defineStyle({
  background: PRIMARY,
  color: 'white',
  _hover: {
    background: '#4A5568',
    outline: 'none',
    borderColor: 'transparent',
  },
});
const secondary = defineStyle({
  background: SECONDARY,
  color: 'white',
  _hover: {
    borderColor: 'transparent',
    background: '#0BC5EA',
    outline: 'none',
  },
});

const outline = defineStyle({
  background: 'transparent',
  border: '1px solid',
  color: PRIMARY,
  _hover: {
    boxShadow: 'md',
    borderColor: PRIMARY,
    // transform: 'scale(1.05)',
  },
});

const ButtonTheme = defineStyleConfig({
  variants: {
    primary,
    secondary,
    outline,
  },
});

export const theme = extendTheme({
  colors: {
    primary: PRIMARY,
    secondary: SECONDARY,
  },
  components: {
    Button: ButtonTheme,
  },
});
