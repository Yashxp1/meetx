import ModeToggle from '@/components/DarkMode/ModeToggle';
import { LoginButton } from '@/components/LoginButton';
import React from 'react';

const page = () => {
  return (
    <div>
      <ModeToggle />
      <LoginButton/>
    </div>
  );
};

export default page;
