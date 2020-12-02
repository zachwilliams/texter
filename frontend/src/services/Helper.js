import store from "store";

const isLoggedIn = () => !!store.get("loggedIn");

export default isLoggedIn;
