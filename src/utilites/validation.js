import {hasNumber, hasLetter} from './validationHelpers';

const REGEXP_VALID_EMAIL =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailValidator = email => {
  if (email === undefined || email.trim().length === 0) {
    return {status: false, errorMessage: 'Email is required'};
  } else if (!REGEXP_VALID_EMAIL.test(email)) {
    return {status: false, errorMessage: 'Email is not valid'};
  }
  return {
    status: true,
    errorMessage: null,
  };
};

const passwordValidator = password => {
  if (password === undefined || password.trim().length === 0) {
    return {status: false, errorMessage: 'Password is required'};
  } else if (password.length < 6) {
    return {status: false, errorMessage: 'Password is too short'};
  } else if (!hasNumber(password)) {
    return {
      status: false,
      errorMessage: 'Password has to have atleast one numeric character',
    };
  } else if (!hasLetter(password)) {
    return {
      status: false,
      errorMessage: 'Password has to contain atleast one letter',
    };
  }
  return {
    status: true,
    errorMessage: null,
  };
};

const passwordControlValidator = (password, passwordControl) => {
  if (password !== passwordControl) {
    return {
      status: false,
      errorMessage: 'Passwords have to match',
    };
  }
  return {
    status: true,
    errorMessage: null,
  };
};

export {emailValidator, passwordValidator, passwordControlValidator};
