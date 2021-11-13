const validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password.trim()=== "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validLoginInput = (username,password) =>{
    const errors = {};
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }
    if (password.trim() === '') {
      errors.password = 'Password must not be empty';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
}

const validMovieInput = (title, desc, year, genre, duration, limit, isSeries) =>{
  const errors ={}
  if(title.trim() === ""){
    errors.title = "Title must not be empty"
  }
  if(desc.trim() === ""){
    errors.desc = "Description must not be empty"
  }
  if(year.trim() === ""){
    errors.year = "Year must not be empty"
  }
  if(genre.trim() === ""){
    errors.genre = "Genre must not be empty"
  }
  if(duration.trim() === ""){
    errors.duration = "Duration must not be empty"
  }
  if(limit.trim() === ""){
    errors.limit = "Limit must not be empty"
  }
  if(isSeries.trim() === ""){
    errors.isSeries = "Series field must not be empty"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
}
module.exports = { validateRegisterInput, validLoginInput, validMovieInput }
