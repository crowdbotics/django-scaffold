import * as actions from "./constants";

export const signUp = user => ({
  type: actions.EMAIL_AUTH_SIGNUP_REQUEST,
  user,
});

export const login = user => ({
  type: actions.EMAIL_AUTH_LOGIN_REQUEST,
  user,
});

export const logout = _ => ({
  type: actions.EMAIL_AUTH_LOGOUT,
});

export const resetPassword = email => ({
  type: actions.EMAIL_AUTH_PASSWORD_RECOVER_REQUEST,
  email,
});
