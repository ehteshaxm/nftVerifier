import React from 'react';
import { Image, Card } from '@chakra-ui/react';

const Aadhaar = () => {
  return (
    <Card
      elevated
      className='flex flex-col justify-center items-center p-5 rounded-xl mr-10'
    >
      <div className='rounded-full m-1 mb-5 w-28'>
        <Image src='/aadhaar.svg' />
      </div>
      <span className='bg-teal-200 text-sm rounded-full p-2 px-4 flex items-center justify-between'>
        Verified NFT Document{' '}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-6 h-6 ml-3 text-green-800'
        >
          <path
            fillRule='evenodd'
            d='M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
            clipRule='evenodd'
          />
        </svg>
      </span>{' '}
    </Card>
  );
};

export default Aadhaar;
