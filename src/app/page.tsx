import ModeToggle from '@/components/DarkMode/ModeToggle';
import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link'; 

const page = () => {
  return (
    <div>
      <ModeToggle />
      <Link href='/login'>
        <Button variant='outline'>Login</Button>
      </Link>
    </div>
  );
};

export default page;