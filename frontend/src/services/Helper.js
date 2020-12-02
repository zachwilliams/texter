import store from "store";

export function isLoggedIn() {
  return !!store.get("loggedIn");
}

export function openGit() {
  window.open("https://github.com/zachwilliams/saasjaz", "_blank");
}
