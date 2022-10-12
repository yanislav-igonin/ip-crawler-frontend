import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from '@lib/trpc';
import { Heading, Layout, Spinner } from '@components';

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
    <main className='w-screen p-4'>
      <div className="text-center">
        <Heading>Live IPs</Heading>
      </div>
      <table className='table-fixed mb-4 w-full'>
        <thead>
          <tr>
            <th className='px-4 py-2'>IP</th>
            <th className='px-4 py-2'>Check Date</th>
          </tr>
        </thead>

        <tbody>
          {!data
            ? <div className="flex justify-center items-center w-screen h-screen">
              <Spinner />
            </div>
            : data.ips.map((ip) => <tr key={ip.address}>
              <td className='border px-4 py-2 text-center'>
                <a className='text-lg hover:text-rose-500 visited:text-rose-700'
                  href={`http://${ip.address}`} target='_blank' rel='noreferrer'>
                  {ip.address}
                </a>
              </td>
              <td className='text-lg border px-4 py-2 text-center'>
                {ip.checkedAt.toLocaleDateString()}
              </td>
            </tr>)}
        </tbody>
      </table>

      <ul className='flex justify-center items-center gap-2 flex-wrap'>
        {pages.map((page) => <li key={page}>
          <p onClick={() => onPaginationChange(page)}
            className={`${page === activePage ? 'text-xl' : 'text-lg'} cursor-pointer`}
            style={{
              color: page === activePage ? 'rgb(244 63 94)' : 'inherit',
              fontWeight: page === activePage ? 'bold' : 'inherit',
            }}>
            {page}
          </p>
        </li>)}
      </ul>
    </main>
  </Layout>;
};

export default Users;
