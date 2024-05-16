import { Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/dashboard/dashboard';
import LeagueStandingPage from './pages/standing/standing';
import FixturesPage from './pages/fixtures/fixtures';
import ResultsPage from './pages/result/result';
import TeamsPage from './pages/teams/teams';
import Footer from './components/footer/footer';
import NavBar from './components/nav/nav';

import NotFound from './components/notFound';
import AdminLogin from './pages/admin/login.admin';
import ProtectedRoute from './pages/admin/protected.admin';
import AdminHome from './pages/admin/dashboard.admin';
import AdminLeagues from './pages/admin/leagues.admin';
import AdminTeams from './pages/admin/teams.admin';
import AdminUsers from './pages/admin/users.admin';
import AdminFixtures from './pages/admin/fixtures.admin';

/*
TASKS
• League Standing
• Fixtures
• Results
• Teams
*/

const privateRoutes = [
  { element: AdminHome, path: '/admin-home' },
  { element: AdminLeagues, path: '/admin-leagues' },
  { element: AdminTeams, path: '/admin-teams' },
  { element: AdminUsers, path: '/admin-users' },
  { element: AdminFixtures, path: '/admin-fixtures' },
];

function App() {
  return (
    <Router>
      <Flex direction="column" flex="1" minW="375px">
        <NavBar />

        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/standing" element={<LeagueStandingPage />} />
            <Route path="/fixtures" element={<FixturesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/teams" element={<TeamsPage />} />

            <Route path="/admin-login" element={<AdminLogin />} />

            {privateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute>{route.element()}</ProtectedRoute>}
              />
            ))}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>

        <Footer />
      </Flex>
    </Router>
  );
}

export default App;
