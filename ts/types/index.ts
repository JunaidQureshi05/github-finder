export interface API_Options {
  headers: {
    Authorization?: string;
  };
}

export interface Github {
  repos_count: number;
  repos_sort: string;
  getUser: (user: string) => Promise<{ profile: any; repos: any }>;
}

export type UserProfileType = {
  message?: string;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  name: string;
  company: string;
  location: string;
  blog: string;
  createdAt: Date;
  bio: string;
};

export type RepoType = {
  name: string;
  htmlUrl: string;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
};
