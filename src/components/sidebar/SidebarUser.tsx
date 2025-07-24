'use client';

import { useEffect } from 'react';

import { useLogout } from '@/hooks/auth/useLogout';
import { useUser } from '@/hooks/auth/useUser';
import { useUserStore } from '@/store/userStore';

export default function SidebarUser() {
  const { user, setUser } = useUserStore();
  const logout = useLogout();
  const { data } = useUser();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <div className="flex flex-col gap-12">
      <span className="text-head-20 sm:text-head-16 md:text-head-20 mb-12 text-black">
        {user?.name}님,
        <br />
        오늘도 목표를 달성해봐요!
      </span>
      <span className="text-text-03 text-body-m-16">{user?.email}</span>
      <button
        onClick={logout}
        className="text-text-04 text-body-m-12 hover:text-primary-01 h-22 w-42 cursor-pointer whitespace-nowrap"
      >
        로그아웃
      </button>
    </div>
  );
}
