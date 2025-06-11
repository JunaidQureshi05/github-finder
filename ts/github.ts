import { API_Options, Github, RepoType, UserProfileType } from "./types";

export type RepType = {};

export class GitHub implements Github {
  public repos_count: number;
  public repos_sort: string;
  constructor() {
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }
  async getUser(
    user: string
  ): Promise<{ profile: UserProfileType; repos: RepoType[] }> {
    let options: API_Options = { headers: {} };
    if (sessionStorage.ACCESS_TOKEN) {
      options.headers = {
        Authorization: `token ${sessionStorage.getItem("ACCESS_TOKEN")}`,
      };
    }
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}`,
      options?.headers?.Authorization ? options : {}
    );
    const repoResponse: any = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`,
      options?.headers?.Authorization ? options : {}
    );
    const profileData: any = await profileResponse.json();
    const profile: UserProfileType = {
      avatarUrl: profileData.avatar_url,
      htmlUrl: profileData.html_url,
      publicRepos: profileData.public_repos,
      publicGists: profileData.public_gists,
      followers: profileData.followers,
      following: profileData.following,
      name: profileData.name,
      company: profileData.company,
      location: profileData.location,
      blog: profileData.blog,
      createdAt: profileData.created_at,
      bio: profileData.bio,
    };
    const reposData = await repoResponse.json();
    const repos: RepoType[] = reposData.map((repo: any) => ({
      name: repo?.name,
      htmlUrl: repo?.html_url,
      stargazersCount: repo?.stargazers_count,
      watchersCount: repo?.watchers_count,
      forksCount: repo?.forks_count,
    }));

    return {
      profile,
      repos,
    };
  }
}
