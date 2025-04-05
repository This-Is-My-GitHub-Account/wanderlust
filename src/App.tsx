import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Destinations } from './pages/Destinations';
import { Compare } from './pages/Compare';
import { DestinationDetail } from './pages/DestinationDetail';
 import Subscription from './pages/Subscription';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/compare" element={<Compare />} />
            {/* Changed from /destination/:id to /destination/:slug */}
            <Route path="/destination/:slug" element={<DestinationDetail />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route
              path="/creator-dashboard"
              element={
                <ProtectedRoute>
                  <CreatorDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;