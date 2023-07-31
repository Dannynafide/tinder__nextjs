import {useSession} from 'next-auth/react';
import Link from 'next/link';

import QuantityUnreadMessages from '@/components/BaseLayout/Navigation/QuantityUnreadMessages';

export const NavigationBar = ({setNavOpen, handleLogout}) => {
  const {data: session, status} = useSession();
  const loading = status === 'loading';

  return (
    <nav className="relative px-6 py-6 flex justify-between items-center bg-white">
      <Link href="/" className="text-3xl font-bold leading-none">
        Tinder
      </Link>

      <div className="lg:hidden">
        <button
          onClick={() => setNavOpen(true)}
          className="navbar-burger flex items-center text-pink-600 p-3">
          <svg
            className="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>

      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-500">
            Start
          </Link>
        </li>
        <li>
          <Link href="/profiles/browse" className="text-sm text-gray-400 hover:text-gray-500">
            Browse
          </Link>
        </li>
        <li>
          <Link href="/connections" className="text-sm text-gray-400 hover:text-gray-500">
            Connections
            <QuantityUnreadMessages isLoggedIn={session && !loading} />
          </Link>
        </li>
        {session && !loading && (
          <li>
            <Link href="/my-profile" className="text-sm text-gray-400 hover:text-gray-500">
              My profile
            </Link>
          </li>
        )}
        {session && !loading && (
          <li>
            <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-gray-500">
              Logout
            </button>
          </li>
        )}
      </ul>
      {!session && !loading && (
        <Link
          href="/login"
          className="hidden lg:inline-block py-2 px-6 bg-pink-500 hover:bg-pink-600 text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200">
          Sign in
        </Link>
      )}
      {session && !loading && (
        <Link
          href="/"
          className="hidden lg:inline-block py-2 px-6 bg-pink-500 hover:bg-pink-600 text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200">
          {session.user.email}
        </Link>
      )}
    </nav>
  );
};

export default NavigationBar;
