import { RepoType, UserProfileType } from "./types/index.ts";
import { formatDate } from "./utils.ts";
interface UIInterface {
  profile: HTMLElement;
}

export class UI implements UIInterface {
  public profile: HTMLElement;
  constructor() {
    this.profile = document.getElementById("profile")!;
  }
  showProfile(user: UserProfileType) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3"> 
        <div class="row">
        <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatarUrl}"/>
                        <a href="${
                          user.htmlUrl
                        }" target="_blank" class="btn btn-primary d-block mb-4">View Profile</a>
                      </div>
                      <div class="col-md-9">
                            <span class="badge bg-primary ">Public Repos: ${
                              user.publicRepos
                            }</span>
                            <span class="badge bg-light">Public Gists: ${
                              user.publicGists
                            }</span>
                            <span class="badge bg-success">Followers: ${
                              user.followers
                            }</span>
                            <span class="badge bg-info">Following : ${
                              user.following
                            }</span>
                            <br><br>
                            <ul class="list-group">
                            <li class="list-group-item">
                                Name:
                                    ${user.name}
                                </li>
                                <li class="list-group-item">
                                Company:
                                    ${user?.company ?? "NA"}
                                </li>
                                <li class="list-group-item">
                                Location:
                                    ${user?.location ?? "NA"}
                                </li>
                                <li class="list-group-item">
                                Website/Blog:
                                    ${user?.blog ?? "NA"}
                                </li>

                                <li class="list-group-item">Member Since: ${formatDate(
                                  user.createdAt
                                )}</li>
                                <li class="list-group-item">About: ${
                                  user.bio
                                }</li>
                            </ul>
                    </div>        
                    
        </div>      
    </div>
    <h3 class="page-heading mb-3"> Latest Repos</h3>
    <div id="repos"></div>
    `;
  }
  clearProfile() {
    this.profile.innerHTML = "";
  }
  showAlert(message: string, className: string) {
    //   clear any reamining alerts
    this.clearAlert();
    const div = document.createElement("div");
    div.classList.add(className);
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".searchContainer")!;
    const search = document.querySelector(".search");
    container.insertBefore(div, search);
    // Timeout after 3sec
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  showRepos(repos: RepoType[]) {
    let output = "";
    repos.forEach(function (repo) {
      output += `
         <div class="card card-body mb-2">
         <div class="row">
         <div class="col-md-6">
         <a href="${repo.htmlUrl}" target="_blank">${repo.name}</a>
         </div>
         <div  class="col-md-6">
         <span class="badge bg-primary">Stars:${repo.stargazersCount}</span>
         <span class="badge bg-light">Watchers:${repo.watchersCount}</span>
         <span class="badge bg-success">Forks:${repo.forksCount}</span>
         </div>
         </div>
         </div>
         
         `;
    });

    document.getElementById("repos")!.innerHTML = output;
  }
}
