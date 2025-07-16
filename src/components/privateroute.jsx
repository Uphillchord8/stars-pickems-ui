import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/cuthcontext';
import PrivateRoute from './components/privateoute';
import LoginPage from './pages/loginpage';
import PicksPage from './pages/pickspage';
import DashboardPage from './pages/dashboardpage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/picks"
            element={
              <PrivateRoute>
                <PicksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
