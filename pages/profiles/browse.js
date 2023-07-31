import {getServerSession} from 'next-auth/next';
import Head from 'next/head';

import BaseLayout from '@/components/BaseLayout';
import UserFilters from '@/components/UserFilters';
import {user} from '@/models';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {findMatch} from '@/services/profiles/findMatch';

export const getServerSideProps = async ({req, res}) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false
      }
    };
  }

  const currentUser = await user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true,
      email: true,
      filter: {
        select: {
          sex: true,
          ageFrom: true,
          ageUpTo: true
        }
      }
    }
  });
  const profile = await findMatch({userId: currentUser.id});

  if (profile) {
    return {
      redirect: {
        destination: `/profiles/${profile.id}`,
        permanent: false
      }
    };
  }

  return {
    props: {currentUser}
  };
};

const BrowseProfiles = ({currentUser}) => {
  return (
    <BaseLayout>
      <Head>
        <title>Browse profiles</title>
      </Head>
      <UserFilters currentUser={currentUser} />
      <p className="text-center mt-10 text-2xl">
        Unfortunately we do not have more profiles at the moment. <br />
        Please change your filter and try again...
      </p>
    </BaseLayout>
  );
};

export default BrowseProfiles;
