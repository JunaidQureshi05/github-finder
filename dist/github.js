export class GitHub {
  constructor() {
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }
  async getUser(user) {
    let options = { headers: {} };
    if (sessionStorage.ACCESS_TOKEN) {
      options.headers = {
        Authorization: `token ${sessionStorage.getItem("ACCESS_TOKEN")}`,
      };
    }
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}`,
      options?.headers?.Authorization ? options : {}
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`,
      options?.headers?.Authorization ? options : {}
    );
    const profileData = await profileResponse.json();
    const profile = {
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
    const reposData: any[] | {} = await repoResponse.json();
    const repos = reposData?.map((repo) => ({
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
