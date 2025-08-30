'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInput = () => {
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;

    router.push(`room/${inputValue}`);

  };

  const createMeet = () => {
    const meetID = Math.floor(Math.random() * 999);
    router.push(`/room/${meetID}`);
    console.log('MEET ID: ', meetID);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border my-10 rounded-lg">
        <Button onClick={createMeet} variant="ghost">
          <Plus /> Start a meeting
        </Button>
      </div>
      <div className="flex w-[30%] gap-2">
        <Input ref={inputRef} type="text" placeholder="Enter a room ID" />
        <Button onClick={handleInput} variant="outline">
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default Page;
