import Image from 'next/image';
import { DarkModeButton } from './DarkModeButton';
import { GithubIcon } from './GithubIcon';

export const Footer = () => <footer className="flex flex-col justify-center items-center w-full bottom-0 mb-4">
  <a className="mb-4 flex justify-center items-center" href="https://github.com/yanislav-igonin/ip-crawler-frontend" target='_blank' rel='noreferrer'>
    <GithubIcon />
  </a>
  <a className='animate-spin' href='https://h0b0.dev' target='_blank' rel='noreferrer'>
    <Image src='/eblo.ico' alt='h0b0.dev' width={40} height={40} />
  </a>
</footer>;
