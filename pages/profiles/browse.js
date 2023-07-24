import {getServerSession} from 'next-auth/next';
import Head from 'next/head';

import BaseLayout from '@/components/BaseLayout';
import UserFilters from '@/components/UserFilters';
import {user} from '@/models';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {findMatch} from '@/services/profiles/findMatch';
import getAllSkills from '@/services/skills/getAll';
import getAllTimezones from '@/services/timezones/getAll';

export const getServerSideProps = async ({req, res}) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      notFound: true
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
          skill: true,
          timezone: true
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

  const skills = await getAllSkills();
  const timezones = await getAllTimezones();

  return {
    props: {skills, timezones, currentUser}
  };
};

const BrowseProfiles = ({skills, timezones, currentUser}) => {
  return (
    <BaseLayout>
      <Head>
        <title>Browse profiles</title>
      </Head>
      <UserFilters skills={skills} timezones={timezones} currentUser={currentUser} />
      <p className="text-center mt-10 text-2xl">
        Unfortunately we do not have more profiles at the moment. <br />
        Please change your filter and try again...
      </p>
    </BaseLayout>
  );
};

export default BrowseProfiles;
