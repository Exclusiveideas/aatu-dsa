'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AutoRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to another page after the component mounts
    router.push('/portal/auth'); // 
  }, [router]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p>Redirecting to another page...</p>
    </div>
  );
};

export default AutoRedirect;
