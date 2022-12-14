import { ReactNode } from 'react';
import { DarkModeButton } from './DarkModeButton';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: ReactNode }) =>
  <div className='flex flex-col dark:bg-slate-700'>
    <div className='absolute top-4 right-4'>
      <DarkModeButton />
    </div>
    {children}
    <Footer />
  </div>;
