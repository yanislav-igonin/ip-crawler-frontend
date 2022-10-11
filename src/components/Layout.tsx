import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) =>
  <div className='flex flex-row'>
    {children}
  </div>;
