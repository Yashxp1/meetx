'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { Button } from '../ui/button';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button onClick={handleTheme} className="transition-all">
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ModeToggle;
