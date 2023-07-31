import {useSession} from 'next-auth/react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import BaseLayout from '@/components/BaseLayout';
import MatchModal from '@/components/MatchModal';
import UserFilters from '@/components/UserFilters';
import {user} from '@/models';
import apiRoutes from '@/utils/apiRoutes';

export const getStaticPaths = async () => {
  const profiles = await user.findMany();

  return {
    paths: profiles.map((user) => ({params: {id: String(user.id)}})),
    fallback: true
  };
};

export const getStaticProps = async ({params}) => {
  const profile = await user.findUnique({
    where: {
      id: String(params.id)
    },
    select: {
      id: true,
      name: true,
      age: true,
      sex: true,
      image: true
    }
  });

  return {
    props: {
      profile
    }
  };
};

export default function ProfilePage({profile, skills, timezones}) {
  const {data: session, status} = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [nextId, setNextId] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: {user}
      } = await apiRoutes.user.profile.get();
      setCurrentUser(user);
    };

    if (session && !loading) {
      fetchUser();
    }
  }, [session, loading]);

  const handleSkip = async () => {
    const {
      data: {nextProfile}
    } = await apiRoutes.profiles.skip({targetUserId: profile.id});

    redirectNextStep(nextProfile);
  };

  const handleLike = async () => {
    const {
      data: {nextProfile, hasMatch}
    } = await apiRoutes.profiles.like({targetUserId: profile.id});

    if (hasMatch) {
      setNextId(nextProfile.id);
      setIsOpen(true);
    } else {
      redirectNextStep(nextProfile);
    }
  };

  const redirectNextStep = (nextProfile) => {
    if (nextProfile) {
      router.push(`/profiles/${nextProfile.id}`);
    } else {
      window.location.replace('/profiles/browse');
    }
  };

  if (!profile) {
    return (
      <BaseLayout>
        <p>Loading...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Head>
        <title>
          {profile.name} ({profile.skill})
        </title>
      </Head>
      <MatchModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          redirectNextStep({id: nextId});
        }}
      />
      <UserFilters skills={skills} timezones={timezones} currentUser={currentUser} />
      <section>
        <div className="skew skew-top mr-for-radius">
          <svg
            className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
            viewBox="0 0 10 10"
            preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 0 10 10 0 10"></polygon>
          </svg>
        </div>
        <div className="skew skew-top ml-for-radius">
          <svg
            className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
            viewBox="0 0 10 10"
            preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
          </svg>
        </div>

        <div className="py-10 bg-gray-50 radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 p-6 flex flex-wrap items-center bg-white rounded-lg shadow">
                <div className="w-full lg:w-1/3">
                  <picture>
                    <img
                      className="mb-5 lg:mb-0 w-full rounded-lg object-cover"
                      style={{maxHeight: '350px'}}
                      src={profile.image}
                      alt=""
                    />
                  </picture>
                </div>
                <div className="w-full lg:w-2/3">
                  <div className="max-w-lg mx-auto">
                    <p className="mb-8 text-2xl text-gray-500">
                      What I like?
                      <br />
                      🧑🏼‍💻 I like programming in React.
                      <br />
                      🔗 Help with open source projects.
                      <br />
                      📺 I like watching news podcasts.
                      <br />
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold font-heading">{profile.name}</h4>
                        <p className="text-blueGrey-500">Sex: {profile.sex}</p>
                        <p className="text-blueGrey-500">Age: {profile.age}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 flex-auto flex space-x-3">
            <button
              className="w-1/2 h-16 flex items-center justify-center rounded-md border-gray-300 border"
              onClick={handleSkip}>
              <span className="text-2xl mr-4" aria-label="thumb down emoji" role="img">
                ❌
              </span>
              Skip
            </button>
            <button
              className="w-1/2 h-16 flex items-center justify-center rounded-md border bg-purple-500 text-white border-gray-300"
              type="button"
              onClick={handleLike}>
              Connect
              <span className="text-2xl ml-4" aria-label="excited emoji" role="img">
                🤩
              </span>
            </button>
          </div>
        </div>
        <div className="skew skew-bottom mr-for-radius">
          <svg
            className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
            viewBox="0 0 10 10"
            preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
          </svg>
        </div>
        <div className="skew skew-bottom ml-for-radius">
          <svg
            className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
            viewBox="0 0 10 10"
            preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
          </svg>
        </div>
      </section>
    </BaseLayout>
  );
}
