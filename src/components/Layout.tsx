import { ReactNode } from 'react';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: ReactNode }) =>
  <div className='flex flex-col'>
    {children}
    <Footer />
  </div>;
