import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { trpc } from '@lib/trpc';
import { Heading, Layout, Spinner } from '@components';

// This hack needed to disable static optimization
// so we can use `useRouter` in this page on the 1st render
// properly, otherwise `query` will be empty.
export const getServerSideProps = () => ({ props: {} });

const Index: NextPage = () => {
  const router = useRouter();
  const pageFromQuery = Number(router.query.page) || 1;
  const [activePage, setActivePage] = useState(pageFromQuery);

  const onPaginationChange = (page: number) => {
    setActivePage(page);
  };

  useEffect(() => {
    router.push(`/?page=${activePage}`, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const { data: ipsData } = trpc.ips.list.useQuery({ page: activePage });
  const { data: countAllData } = trpc.ips.countAll.useQuery();
  const { data: countLiveData } = trpc.ips.countLive.useQuery();
  const pagesCount = ipsData ? ipsData.pagesCount : 0;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return <Layout>
    <main className='w-screen p-4'>
      <div className="text-center">
        <Heading>Checked IPs: {countAllData ? countAllData.count : 'loading...'}</Heading>
        <Heading>Live IPs: {countLiveData ? countLiveData.count : 'loading...'}</Heading>
      </div>

      {!ipsData
        ? <div className="flex justify-center items-center w-screen h-screen">
          <Spinner />
        </div>
        : <>
          <table className='table-fixed mb-4 w-full dark:text-slate-200'>
            <thead>
              <tr>
                <th className='px-4 py-2'>IP</th>
                <th className='px-4 py-2'>Check Date</th>
              </tr>
            </thead>
            <tbody>
              {ipsData.ips.map((ip) => <tr key={ip.address}>
                <td className='border border-slate-300 dark:border-slate-400 px-4 py-2 text-center'>
                  <a className='text-lg hover:text-rose-500 visited:text-rose-700'
                    href={`http://${ip.address}`} target='_blank' rel='noreferrer'>
                    {ip.address}
                  </a>
                </td>
                <td className='text-lg border border-slate-300 dark:border-slate-400 px-4 py-2 text-center'>
                  {ip.checkedAt.toLocaleDateString()}
                </td>
              </tr>)}
            </tbody>
          </table>

          <ul className='flex justify-center items-center gap-2 flex-wrap dark:text-slate-200'>
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
        </>}
    </main>
  </Layout>;
};

export default Index;
