'use client';
import { GetProfile } from '@/services/git-hub/find-profile.service';
import React from 'react';
import { useQuery } from 'react-query';

interface ProfileContextProvider {
  children: React.ReactNode;
}
export interface IProfileContext {
  profile: IProfile;
}

export interface IProfile {
  name: string;
  avatar_id: string;
}

export const ProfileContext = React.createContext<IProfileContext | null>(null);

export function ProfileContextProvider({ children }: ProfileContextProvider) {
  const { data, isLoading, isError } = useQuery('getProfile', GetProfile, {
    staleTime: 6000,
  });
  const [profile, setProfile] = React.useState<IProfile>({} as IProfile);

  React.useEffect(() => {
    if (data) {
      setProfile({
        name: data?.name as string,
        avatar_id: data?.avatar_url as string,
      });
    }
  }, [data]);

  return <ProfileContext.Provider value={{ profile }}>{children}</ProfileContext.Provider>;
}

export const useProfileContext = () => React.useContext(ProfileContext);
