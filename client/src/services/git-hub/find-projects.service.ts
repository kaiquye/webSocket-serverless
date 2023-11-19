import { GitHubBaseApi } from '@/clients/git-hub.client';

export interface GetProjectsOutput {
  id: number;
  name: string;
  owner: {
    id: number;
    avatar_url: string;
    gravatar_id: string;
    starred_url: string;
  };
  description: string;
  url: string;
  forks_url: string;
  stargazers_count: number;
  html_url: string;
}

export async function GetProjects(): Promise<Array<GetProjectsOutput>> {
  const { data } = await GitHubBaseApi.get('/repos?direction=DESC');

  return data.map((item: GetProjectsOutput) => {
    return {
      id: item.id,
      name: item.name,
      owner: {
        id: item.id,
        avatar_url: item.owner.avatar_url,
        gravatar_id: item.owner.gravatar_id,
        starred_url: item.owner.starred_url,
      },
      description: item.description,
      url: item.url,
      forks_url: item.forks_url,
      stargazers_count: item.stargazers_count,
      html_url: item.html_url,
    };
  });
}
