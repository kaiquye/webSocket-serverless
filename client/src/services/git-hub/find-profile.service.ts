import { GitHubBaseApi } from '@/clients/git-hub.client';

export interface GetProfileOutput {
  login: string;
  avatar_url: string;
  name: string;
  company: string;
  location: string;
  followers: number;
  following: number;
}

export async function GetProfile(): Promise<GetProfileOutput> {
  const { data } = await GitHubBaseApi.get('');

  return {
    login: data.login,
    avatar_url: data.avatar_url,
    name: data.name,
    company: data.company,
    location: data.location,
    followers: data.followers,
    following: data.following,
  };
}
