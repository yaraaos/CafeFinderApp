//app/index.tsx

import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/onboarding');
    }, 0);

    return () => clearTimeout(timeout);
  }, [router]);

  return null;
}
