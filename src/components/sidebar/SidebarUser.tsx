'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/routes';
import { useUserStore } from '@/store/userStore';

export default function SidebarUser() {
  const { user, setUser } = useUserStore();

  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.push(ROUTES.HOME);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/user');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [setUser]);

  return (
    <div className="flex flex-col gap-12">
      <span className="text-head-20 mb-12 text-black">
        {user?.name}님,
        <br />
        오늘도 목표를 달성해봐요!
      </span>
      <span className="text-text-03 text-body-m-16">{user?.email}</span>
      <button
        onClick={handleLogout}
        className="text-text-04 text-body-m-12 hover:text-primary-01 h-22 w-42 cursor-pointer whitespace-nowrap"
      >
        로그아웃
      </button>
    </div>
  );
}
