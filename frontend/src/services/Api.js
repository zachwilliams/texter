import axios from "axios";
import store from "store";

export function CallLogin(form, callback) {
  axios
    .post("/api/login", {
      username: form.username,
      password: form.password,
    })
    .then((res) => {
      if (res.status == 200) {
        _setAuthToken(res.results.data);
        callback();
      }
    })
    .catch((err) => {
      //_handleError(err, type);
    });
}

function _setAuthToken(data) {
  data.get("token");
  store.set("authToken", token);
}
