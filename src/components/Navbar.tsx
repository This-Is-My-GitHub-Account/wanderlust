import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Globe } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isCreator } = useAuth();

  return (
    <nav className="bg-blue-900 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Globe className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">WanderLust Canvas</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/search" className="text-white hover:bg-blue-800 px-3 py-2 rounded-md">
                <Search className="h-5 w-5" />
              </Link>
              <Link to="/explore" className="text-white hover:bg-blue-800 px-3 py-2 rounded-md">
                Explore
              </Link>
              {isCreator && (
                <Link to="/create" className="text-white hover:bg-blue-800 px-3 py-2 rounded-md">
                  Create
                </Link>
              )}
              {user ? (
                <Link to="/profile" className="text-white hover:bg-blue-800 px-3 py-2 rounded-md">
                  Profile
                </Link>
              ) : (
                <Link to="/login" className="text-white hover:bg-blue-800 px-3 py-2 rounded-md">
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/search"
              className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md"
            >
              Search
            </Link>
            <Link
              to="/explore"
              className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md"
            >
              Explore
            </Link>
            {isCreator && (
              <Link
                to="/create"
                className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md"
              >
                Create
              </Link>
            )}
            {user ? (
              <Link
                to="/profile"
                className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}