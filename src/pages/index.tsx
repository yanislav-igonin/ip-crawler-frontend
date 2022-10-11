import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from '@lib/trpc';
import { Layout } from '@components';

const Users: NextPage = () => {
  const router = useRouter();
  const pageFromQuery = Number(router.query.page) || 1;
  const [activePage, setActivePage] = useState(pageFromQuery);

  const onPaginationChange = async (page: number) => {
    setActivePage(page);
    router.push(`/?page=${page}`, undefined, { shallow: true });
  };

  const { data } = trpc.ips.list.useQuery({ page: activePage });
  const pagesCount = data ? Math.ceil(data?.count / 20) : 0;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return <Layout>
    <main className='p-4'>
      <h1>Live IPs</h1>
      <ul>
        {!data
          ? 'loading...'
          : data.ips.map((ip) => <li key={ip.address}>
            <a href={`http://${ip.address}`} target='_blank' rel='noreferrer'>{ip.address}</a>
          </li>)}
      </ul>
      <ul className='flex justify-center items-center gap-2 flex-wrap'>
        {pages.map((page) => <li key={page}>
          <p onClick={() => onPaginationChange(page)}
            className='text-lg cursor-pointer'
            style={{ color: page === activePage ? 'blue' : 'inherit' }}>
            {page}
          </p>
        </li>)}
      </ul>
    </main>
  </Layout>;
};

export default Users;
