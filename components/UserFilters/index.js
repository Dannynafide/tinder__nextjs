import {useRouter} from 'next/router';

import apiRoutes from '@/utils/apiRoutes';

const sexData = [
  {id: 1, name: 'Male', value: 'male'},
  {id: 2, name: 'Female', value: 'female'}
];

const UserFilters = ({currentUser}) => {
  const router = useRouter();

  const updateFilter = async (e) => {
    await apiRoutes.user.filter.update({
      [e.target.name]: e.target.value
    });

    router.push('/profiles/browse');
  };

  const updateFilterForNumber = async (e) => {
    await apiRoutes.user.filter.update({
      [e.target.name]: Number(e.target.value)
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
            <label htmlFor="sex" className="block text-gray-800 text-sm font-semibold mb-2">
              Sex
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full p-4 text-xs font-semibold leading-none bg-gray-50 rounded outline-none"
                id="sex"
                name="sex"
                onBlur={updateFilter}
                onChange={updateFilter}
                defaultValue={currentUser?.filter?.sex}>
                {sexData.map((sex) => (
                  <option key={sex.id} value={sex.value}>
                    {sex.name}
                  </option>
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
            <label htmlFor="ageFrom" className="block text-gray-800 text-sm font-semibold mb-2">
              Age from
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full p-4 text-xs font-semibold leading-none bg-gray-50 rounded outline-none"
                id="ageFrom"
                name="ageFrom"
                onBlur={updateFilterForNumber}
                onChange={updateFilterForNumber}
                defaultValue={currentUser?.filter?.ageFrom}>
                {[...Array(120)].map((name, id) => (
                  <option key={id}>{id + 1}</option>
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
            <label htmlFor="ageUpTo" className="block text-gray-800 text-sm font-semibold mb-2">
              Age up to
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full p-4 text-xs font-semibold leading-none bg-gray-50 rounded outline-none"
                id="ageUpTo"
                name="ageUpTo"
                onBlur={updateFilterForNumber}
                onChange={updateFilterForNumber}
                defaultValue={currentUser?.filter?.ageUpTo}>
                {[...Array(120)].map((name, id) => (
                  <option key={id}>{id + 1}</option>
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
