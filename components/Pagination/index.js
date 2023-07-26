import classNames from 'classnames';
import Link from 'next/link';
import {useEffect, useState} from 'react';

const Pagination = ({pagesCount, href, currentPage = '1', filters = []}) => {
  const [pages, setPages] = useState([]);

  const paginationUrl = (page) => {
    let url = `${href}?page=${page}`;
    filters.forEach((fil) => (url = `${url}&${fil}`));

    return url;
  };

  useEffect(() => {
    const tmpPages = [];
    for (let i = 0; i < pagesCount; i++) {
      tmpPages.push(i + 1);
    }
    setPages(tmpPages);
  }, [pagesCount]);

  return (
    <ul className="flex mt-5 justify-center">
      {pages.map((page) => {
        return (
          <li
            key={page}
            className={classNames(
              'mx-1 px-3 py-2 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg',
              {
                'bg-gray-200': currentPage !== page,
                'bg-gray-400': currentPage === page
              }
            )}>
            <Link href={paginationUrl(page)} className="font-bold">
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
