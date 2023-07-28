import BaseLayout from 'components/BaseLayout';
import {getServerSession} from 'next-auth/next';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRef} from 'react';

import Pagination from '@/components/Pagination';
import {user} from '@/models';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {getAll} from '@/services/conversations/getAll';
import {totalCount} from '@/services/conversations/totalCount';

export const getServerSideProps = async ({req, res, query}) => {
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
    }
  });

  const perPage = 7;
  const searchTerm = query.searchTerm;
  const count = await totalCount({userId: currentUser.id, searchTerm});
  const pagesCount = Math.ceil(count / perPage);
  const page = Number(query.page || 1);
  const conversations = await getAll({
    searchTerm,
    userId: currentUser.id,
    perPage,
    page: page - 1
  });
  const filters = [];
  if (searchTerm) {
    filters.push(`searchTerm=${searchTerm}`);
  }

  return {
    props: {conversations, pagesCount, page, filters}
  };
};

const Search = () => {
  const router = useRouter();
  const searchRef = useRef();

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const term = searchRef.current.value;
      router.push(`/connections?searchTerm=${term}`);
    }
  };

  return (
    <div className="w-full flex px-2 mt-2 mb-2">
      <div className="w-full sm:w-64 inline-block relative ">
        <input
          onKeyDown={handleKey}
          ref={searchRef}
          name="searchBox"
          className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-2 px-4 pl-8 rounded-lg"
          placeholder="Search"
        />

        <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">
          <svg
            className="fill-current h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 511.999 511.999">
            <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function Connections({conversations, pagesCount, page, filters}) {
  return (
    <BaseLayout>
      <Head>
        <title>Your connections</title>
      </Head>
      <Search />
      <div className="border-t-2">
        {conversations.length === 0 && <div className="mt-2 text-center">No conversations</div>}
        {conversations.map((item) => {
          return (
            <Link key={`conversation-${item.id}`} href={`/connections/${item.id}`}>
              <div className="cursor-pointer flex flex-row py-4 px-2 justify-center items-center border-b-2">
                <div className="w-1/4">
                  {item.users.map(({user}) => (
                    <picture key={user.id}>
                      <img
                        src={user.image}
                        className="inline-block m-0.5 object-cover h-12 w-12 rounded-full"
                        alt="avatar"
                      />
                    </picture>
                  ))}
                </div>
                <div className="w-full">
                  {item.messages.length === 0 && (
                    <div className="text-center">No messages yet. You can start conversation!</div>
                  )}
                  <div className="text-lg font-semibold">
                    {item.messages[item.messages.length - 1]?.user?.name}
                  </div>
                  <span className="text-gray-500">
                    {item.messages[item.messages.length - 1]?.content}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination
        currentPage={page}
        href="/connections"
        pagesCount={pagesCount}
        filters={filters}
      />
    </BaseLayout>
  );
}
