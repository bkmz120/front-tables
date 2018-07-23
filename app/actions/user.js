import axios from "axios";
import {API_PATH} from "../constants/api.js";
import * as constants from "../constants/user";

export function changeLoginForm(key,value) {
  return {
    type:constants.CHANGE_FORM_FIELD,
    payload:{key,value}
  }
}

export function login(username,password) {
  return function(dispatch) {
    let valid = true;
    let validProps = {
      username:true,
      password:true,
    }

    if (username === undefined || username === "") {
      validProps.username = false;
      valid = false;
    }
    if (password === undefined || password === "") {
      validProps.password = false;
      valid = false;
    }

    if (!valid) {
      dispatch({
        type:constants.VALIDATION_ERROR,
        payload:{validProps}
      });
    }
    else {
      axios.post(API_PATH + '/user/login',{username,password})
        .then(function (response) {
          let status = response.data.status;
          if (status) {
            localStorage.setItem('isAuthenticated',true);
          }

          dispatch({
            type:constants.LOGIN_SUCCESS,
            payload:{
              status,
              message:response.data.message
            }
          });
        })
        .catch(function (error) {
          //TODO: add error processing
          console.log(error);
        });
    }
  }
}

export function logout() {
  localStorage.setItem('isAuthenticated',false);
  return {
    type:constants.LOGOUT,
  }
}

export function initForm() {
  return {
    type:constants.INIT_FORM,
  }
}