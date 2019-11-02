import axios from "axios";
import { removeTodo } from "./constant";
export default {
  [removeTodo]({ commit }, id) {
    let flag = false;
    console.log("action执行成功");
    axios
      .get(`/api/deletedata?uid=${id}`)
      .then(function(response) {
        if (response.data.result == "ok") {
          flag = true;
          commit(removeTodo, {
            flag
          });
        }
      })
      .catch(function(error) {
        commit(removeTodo, {
          flag
        });
      });
  }
};
