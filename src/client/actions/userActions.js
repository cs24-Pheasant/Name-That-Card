import * as types from '../constants/actionTypes';

export const updateSignUpUsername = event => ({
  type: types.UPDATE_SIGNUP_USERNAME,
  payload: event,
});

export const updateSignUpPassword = event => ({
  type: types.UPDATE_SIGNUP_PASSWORD,
  payload: event,
});

export const updateSignUpEmail = event => ({
  type: types.UPDATE_SIGNUP_EMAIL,
  payload: event,
});

export const successfulSignUp = () => ({
  type: types.SUCCESSFUL_SIGNUP,
});

export const failedSignUp = message => ({
  type: types.FAILED_SIGNUP,
  payload: message,
});

export const submitSignUp = (signUpInfoObj) => {
  return (dispatch) => {
    return fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(signUpInfoObj),
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.signupSuccess) {
          dispatch(successfulSignUp());
          ga('send', {
            hitType: 'event',
            eventCategory: 'Auth',
            eventAction: 'Successful SignUp',
          });
        } else {
          dispatch(failedSignUp(data.msg));
          ga('send', {
            hitType: 'event',
            eventCategory: 'Auth',
            eventAction: 'Failed SignUp',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateLoginEmail = event => ({
  type: types.UPDATE_LOGIN_EMAIL,
  payload: event,
});

export const updateLoginPassword = event => ({
  type: types.UPDATE_LOGIN_PASSWORD,
  payload: event,
});

export const successfulLogin = username => ({
  type: types.SUCCESSFUL_LOGIN,
  payload: username,
});

export const failedLogin = message => ({
  type: types.FAILED_LOGIN,
  payload: message,
});

export const resetLoginInfo = () => ({
  type: types.RESET_LOGIN_INFO,
});

export const resetSignUpInfo = () => ({
  type: types.RESET_SIGNUP_INFO,
});

export const submitLogin = (loginInfoObj) => {
  return (dispatch) => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(loginInfoObj),
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loginSuccess) {
          dispatch(successfulLogin(data.username));
          ga('send', {
            hitType: 'event',
            eventCategory: 'Auth',
            eventAction: 'Successful Login',
          });
        } else {
          dispatch(failedLogin(data.msg));
          ga('send', {
            hitType: 'event',
            eventCategory: 'Auth',
            eventAction: 'Failed Login',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const successfulAuthVerification = data => ({
  type: types.SUCCESSFUL_AUTH_VERIFICATION,
  payload: data,
});

export const failedAuthVerification = data => ({
  type: types.FAILED_AUTH_VERIFICATION,
  payload: data,
});

export const checkAuth = () => {
  return (dispatch) => {
    return fetch('/rootPage')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loginSuccess) {
          dispatch(successfulAuthVerification(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});

export const logout = () => {
  return (dispatch) => {
    return fetch('/api/logout', {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.logoutSuccess) {
          dispatch(logoutUser());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setSignUpCredentialErrors = () => ({
  type: types.SET_SIGNUP_CREDENTIAL_ERRORS,
});

export const updateForgotInputEmail = event => ({
  type: types.UPDATE_FORGOT_INPUT_EMAIL,
  payload: event,
});

export const emailSuccessfullySent = data => ({
  type: types.EMAIL_SUCCESSFULLY_SENT,
  payload: data,
});

export const emailFailedToSend = message => ({
  type: types.EMAIL_FAILED_TO_SEND,
  payload: message,
});

export const sendResetPwEmail = (emailObj) => {
  return (dispatch) => {
    return fetch('/api/forgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(emailObj),
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.emailSuccess) {
          dispatch(emailSuccessfullySent(data));
        } else {
          dispatch(emailFailedToSend(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateFirstNewPassword = event => ({
  type: types.UPDATE_FIRST_NEW_PASSWORD,
  payload: event,
});

export const updateSecondNewPassword = event => ({
  type: types.UPDATE_SECOND_NEW_PASSWORD,
  payload: event,
});

export const setNewPasswordErrors = () => ({
  type: types.SET_NEW_PASSWORD_ERRORS,
});

export const passwordSuccessfullyReset = () => ({
  type: types.PASSWORD_SUCCESSFULLY_RESET,
});

export const failedPasswordReset = message => ({
  type: types.FAILED_PASSWORD_RESET,
  payload: message,
});

export const resetPassword = (newPasswordObj) => {
  return (dispatch) => {
    return fetch('/api/reset/' + newPasswordObj.user_token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(newPasswordObj),
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.successfulReset) {
          dispatch(passwordSuccessfullyReset());
        } else {
          dispatch(failedPasswordReset(data.msg));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const resetNewPasswordInputs = () => ({
  type: types.RESET_NEW_PASSWORD_INPUTS,
});

export const resetNewPasswordEmailInputs = () => ({
  type: types.RESET_NEW_PASSWORD_EMAIL_INPUTS,
});
