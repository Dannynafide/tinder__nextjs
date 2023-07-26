import {getServerSession} from 'next-auth/next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';

import {user} from '@/models';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import getAllSkills from '@/services/skills/getAll';
import getAllTimezones from '@/services/timezones/getAll';
import apiRoutes from '@/utils/apiRoutes';

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
      skill: true,
      timezone: true
    }
  });

  const skills = await getAllSkills();
  const timezones = await getAllTimezones();

  return {
    props: {skills, timezones, currentUser}
  };
};

export default function MyProfile({currentUser, skills, timezones}) {
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const payload = {
      skill: event.target.skill.value,
      timezone: event.target.timezone.value
    };
    await apiRoutes.user.profile.update(payload);
    router.push('/');
  };

  return (
    <div>
      <section className="h-screen py-10 lg:py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="mb-10 text-center ">
              <Link href="/" className="text-white text-3xl font-bold leading-none">
                MakersMatch
              </Link>
            </div>
            <div className="p-6 lg:p-12 bg-white shadow-md rounded">
              <div className="mb-6 px-3 text-center">
                <h3 className="text-2xl font-bold">Tell us a bit about yourself</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="text-center">
                  <div className="mb-6">
                    <label
                      htmlFor="skill"
                      className="block text-gray-800 text-sm font-semibold mb-2">
                      What is your main skill?
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full p-4 text-xs font-semibold leading-none bg-gray-50 rounded outline-none"
                        name="skill"
                        defaultValue={currentUser?.skill}>
                        {skills.map((skill) => (
                          <option key={skill.id}>{skill.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="timezone"
                      className="block text-gray-800 text-sm font-semibold mb-2">
                      Which timezone are your located?
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full p-4 text-xs font-semibold leading-none bg-gray-50 rounded outline-none"
                        name="timezone"
                        defaultValue={currentUser?.timezone}>
                        {timezones.map(({id, name}) => (
                          <option key={id}>{name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button
                    className="mt-8 mb-4 p-4 w-full flex justify-center items-center border rounded hover:bg-gray-50 bg-green-50"
                    type="submit">
                    <span className="text-xs text-gray-500 font-bold">
                      {updating && `Updating profile...`}
                      {!updating && `Update your profile`}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
