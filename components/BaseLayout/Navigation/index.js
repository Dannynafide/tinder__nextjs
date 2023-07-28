import classNames from 'classnames';
import {signOut} from 'next-auth/react';
import {useState} from 'react';

import NavigationBar from '@/components/BaseLayout/Navigation/NavigationBar';
import NavigationSidebar from '@/components/BaseLayout/Navigation/NavigationSidebar';

const Navigation = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({callbackUrl: '/'});
  };

  return (
    <section className="container mx-auto">
      <NavigationBar setNavOpen={setNavOpen} handleLogout={handleLogout} />

      <div className={classNames(['navbar-menu', 'relative', 'z-50'], {hidden: !isNavOpen})}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <NavigationSidebar setNavOpen={setNavOpen} handleLogout={handleLogout} />
      </div>
    </section>
  );
};

export default Navigation;
