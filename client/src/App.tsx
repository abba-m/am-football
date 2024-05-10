import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/dashboard/dashboard';
import LeagueStandingPage from './pages/standing/standing';
import FixturesPage from './pages/fixtures/fixtures';
import ResultsPage from './pages/result/result';
import TeamsPage from './pages/teams/teams';
import Footer from './components/footer/footer';
import NavBar from './components/nav/nav';

import { getUsers } from './pocketbase';
import { useEffect } from 'react';
import NotFound from './components/notFound';

/*
TASKS
• League Standing
• Fixtures
• Results
• Teams
*/

function App() {

  useEffect(() => {
    getUsers();
}, [])

  return (
    <Router>
      <Box h="100dvh">
        <NavBar />

        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/standing" element={<LeagueStandingPage />} />
            <Route path="/fixtures" element={<FixturesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/teams" element={<TeamsPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  );
}

export default App;
