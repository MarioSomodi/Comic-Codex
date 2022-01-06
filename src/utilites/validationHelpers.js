const REGEXP_HAS_NUMBER = /\d/;
const REGEXP_HAS_LETTER = /[a-zA-Z]/;

const hasNumber = myString => {
  return REGEXP_HAS_NUMBER.test(myString);
};

const hasLetter = myString => {
  return REGEXP_HAS_LETTER.test(myString);
};

export {hasNumber, hasLetter};
