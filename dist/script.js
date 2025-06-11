import { GitHub } from "./github.js";
import { UI } from "./ui.js";
import { debouncedFunction } from "./utils.js";
const getSecrets = async () => {
    const response = await fetch("https://github-finder-backend-8g12.vercel.app/api/token");
    const data = await response.json();
    let token = data.token;
    if (token) {
        sessionStorage.setItem("ACCESS_TOKEN", token);
    }
};
getSecrets();
// Init github
let github = new GitHub();
// Init UI
const ui = new UI();
// Search input
const searchUser = document.getElementById("searchUser");
// handle User search
function handleUserSearch(userText) {
    if (userText != "") {
        // make http call
        github.getUser(userText).then((data) => {
            if (data.profile.message === "Not Found") {
                //   Show Alert
                ui.showAlert("User not found!", "alert alert-danger");
            }
            else {
                //   Show Profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    }
    else {
        //   clear profile
        ui.clearProfile();
    }
}
let doubouncedHandleUserSearch = debouncedFunction(handleUserSearch, 200);
// search input event listener
searchUser.addEventListener("keyup", (e) => doubouncedHandleUserSearch(e.target.value));
