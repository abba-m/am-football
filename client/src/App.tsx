import Home from './pages/dashboard/dashboard';
import { Box, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/footer';

function App() {
  return (
    <Box h="100dvh">
      <Box>
        {/* Header */}
        <Text>Nav Bar</Text>
      </Box>
      <Box>
        {/* Content */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
