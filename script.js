const search = document.getElementById("search");
search.addEventListener("click", fetchUser);

function fetchUser() {
  let inputValue = document.getElementById("input_value").value;
  let suggestion = document.getElementById("suggestion");
  let profileCard = document.getElementById("profile_card");
  let loading = document.getElementById("loading");
  let url = `https://api.github.com/users/${inputValue}`;
  if (inputValue === "") {
    suggestion.style.display = "block";
  } else {
    suggestion.style.display = "none";
    loading.style.display = "block";

    // console.log(inputValue);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        loading.style.display = "none";
        if (data.message === "Not Found") {
          //   console.log("User Not Found");
          profileCard.innerHTML = `User Not Found`;
          profileCard.style.display = "flex";
        } else {
          profileCard.innerHTML = `<div>
          <img src=${data.avatar_url} alt="github_avatar"/>
        </div>
        <div class="profile_details">
          <h4>${data.name}</h4>
          <p>
            ${data.bio}
          </p>

          <div class="profile_counts">
            <div>
              <p>${data.public_repos}</p>
              <p>Repository</p>
            </div>

            <div>
              <p>${data.followers}</p>
              <p>Followers</p>
            </div>

            <div>
              <p>${data.following}</p>
              <p>Following</p>
            </div>
          </div>

          <button class="profile_btn" id="profile_btn">
            <a href=${data.html_url} target="_blank">Github User Profile</a>
          </button>
        </div>`;

          profileCard.style.display = "flex";
          document.getElementById("input_value").value = "";
        }
      })
      .catch((error) => {
        console.error("Something Went Wrong", error);
        profileCard.innerHTML = `Something Went Wrong Please Try Again`;
        profileCard.style.display = "flex";
      });
  }
}
