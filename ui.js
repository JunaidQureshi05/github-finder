class UI {
  constructor() {
    this.profile = document.getElementById("profile");
  }
  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3"> 
        <div class="row">
        <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}"/>
                        <a href="${
                          user.html_url
                        }" target="_blank" class="btn btn-primary d-block mb-4">View Profile</a>
                      </div>
                      <div class="col-md-9">
                            <span class="badge bg-primary ">Public Repos: ${
                              user.public_repos
                            }</span>
                            <span class="badge bg-light">Public Gists: ${
                              user.public_gists
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
                                  user.created_at
                                )}</li>
                                
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
  showAlert(message, className) {
    //   clear any reamining alerts
    this.clearAlert();
    const div = document.createElement("div");
    div.classList = className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".searchContainer");
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

  showRepos(repos) {
    let output = "";
    repos.forEach(function (repo) {
      output += `
         <div class="card card-body mb-2">
         <div class="row">
         <div class="col-md-6">
         <a href="${repo.html_url}" target="_blank">${repo.name}</a>
         </div>
         <div  class="col-md-6">
         <span class="badge bg-primary">Stars:${repo.stargazers_count}</span>
         <span class="badge bg-light">Watchers:${repo.watchers_count}</span>
         <span class="badge bg-success">Forks:${repo.forks_count}</span>
         </div>
         </div>
         </div>
         
         `;
    });

    document.getElementById("repos").innerHTML = output;
  }
}
