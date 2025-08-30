'use client';
import GetSession from '@/components/GetSession';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();



  return (
    <div className='flex justify-center items-center flex-col gap-8'>
      <div>roomID: {id}</div>
      <div>
        <Button onClick={() => router.push('/home')} variant="destructive">
          Go back
        </Button>
      </div>
      <GetSession />
    </div>
  );
};

export default Page;
