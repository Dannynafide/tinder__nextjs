import {useRouter} from 'next/router';

import apiRoutes from '@/utils/apiRoutes';

const UserFilters = ({skills, timezones, currentUser}) => {
  const router = useRouter();

  const updateFilter = async (e) => {
    await apiRoutes.user.filter.update({
      [e.target.name]: e.target.value
    });
    router.push('/profiles/browse');
  };

  if (!currentUser) {
    return <p>Loading</p>;
  }

  return (
    <form action="#" method="post">
      <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
          <div className="mb-6">
            <label htmlFor="skill" className="block text-gray-800 text-sm font-semibold mb-2">
              Skill
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full p-4 text-xs font-semibold leading-none bg-gray-50 rounded outline-none"
                name="skill"
                onBlur={updateFilter}
                onChange={updateFilter}
                defaultValue={currentUser?.filter.skill}>
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
        </div>
        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
          <div className="mb-6">
            <label htmlFor="timezone" className="block text-gray-800 text-sm font-semibold mb-2">
              Timezone
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full p-4 text-xs font-semibold leading-none bg-gray-50 rounded outline-none"
                name="timezone"
                onBlur={updateFilter}
                onChange={updateFilter}
                defaultValue={currentUser?.filter.timezone}>
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
        </div>
      </div>
    </form>
  );
};

export default UserFilters;
