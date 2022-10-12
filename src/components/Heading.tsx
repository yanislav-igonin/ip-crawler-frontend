import { ReactNode } from 'react';

export const Heading = ({ children }: { children: ReactNode }) =>
  <h1 className='text-2xl font-bold'>{children}</h1>;
