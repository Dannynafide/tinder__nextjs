import {useSession} from 'next-auth/react';
import Link from 'next/link';

import QuantityUnreadMessages from '@/components/BaseLayout/Navigation/QuantityUnreadMessages';

export const NavigationBar = ({setNavOpen, handleLogout}) => {
  const {data: session, status} = useSession();
  const loading = status === 'loading';

  return (
    <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
      <div className="flex items-center mb-8">
        <Link className="mr-auto text-3xl font-bold leading-none" href="/">
          Tinder
        </Link>
        <button onClick={() => setNavOpen(false)} className="navbar-close">
          <svg
            className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div>
        <ul>
          <li className="mb-1">
            <Link
              href="/"
              className="block p-4 text-sm font-semibold text-gray-400 hover:bg-pink-50 hover:text-pink-600 rounded">
              Start
            </Link>
          </li>
          <li className="mb-1">
            <Link
              href="/profiles/browse"
              className="block p-4 text-sm font-semibold text-gray-400 hover:bg-pink-50 hover:text-pink-600 rounded">
              Browse
            </Link>
          </li>
          <li className="mb-1">
            <Link
              href="/connections"
              className="block p-4 text-sm font-semibold text-gray-400 hover:bg-pink-50 hover:text-pink-600 rounded">
              Connections
              <QuantityUnreadMessages isLoggedIn={session && !loading} />
            </Link>
          </li>
          {session && !loading && (
            <li className="mb-1">
              <Link
                href="/my-profile"
                className="block p-4 text-sm font-semibold text-gray-400 hover:bg-pink-50 hover:text-pink-600 rounded">
                My profile
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-auto">
        <div className="pt-6">
          {!session && !loading && (
            <Link
              href="/login"
              className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-pink-600 hover:bg-pink-700 rounded-l-xl rounded-t-xl">
              Sign In
            </Link>
          )}
          {session && !loading && (
            <button
              onClick={handleLogout}
              className="w-full block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-gray-500 hover:bg-pink-700 rounded-l-xl rounded-t-xl">
              Logout
            </button>
          )}
        </div>
        <p className="my-4 text-xs text-center text-gray-400">
          <span>&copy; 2023 All rights reserved.</span>
        </p>
      </div>
    </nav>
  );
};

export default NavigationBar;
