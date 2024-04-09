'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface IUserProfile {
  avatar: string;
  email: string;
  favourite_list_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  recent_list_id: string;
  username: string;
}

interface ISessionHook {
  user: IUserProfile | null;
  isAuthorized: boolean;
  getToken: () => string | null;
  setSession: (newToken: string) => void;
  clearSession: () => void;
}

const useSession = (): ISessionHook => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const getToken = (): string | null => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('auth_token') || "";
    }
    return null;
  };

  const setSession = (newToken: string): void => {
    localStorage.setItem('auth_token', newToken);
  };

  const clearSession = (): void => {
    localStorage.removeItem('auth_token');
    setIsAuthorized(false)
    setUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (token) {
          const response = await axios.get('https://timkaqwerty.pythonanywhere.com/api/uprofile/', {
            headers: {
              'Authorization': `Token ${token}`,
            },
          });
          if (response.status === 200) {
            setIsAuthorized(true);
            setUser(response.data.results);
          }
        }
      } catch (error) {
        console.error('Ошибка при запросе пользователя:', error);
      }
    };

    fetchData();
  }, []); 

  return {
    user,
    getToken,
    setSession,
    clearSession,
    isAuthorized
  };
};

export default useSession;