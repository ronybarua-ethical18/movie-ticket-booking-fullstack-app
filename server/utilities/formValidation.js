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

const validMovieInput = (title, desc, year, imgTitle, genre) =>{
  const errors ={}
  if(title.trim() === ""){
    errors.title = "title must not be empty"
  }
  if(desc.trim() === ""){
    errors.desc = "description must not be empty"
  }
  if(year.trim() === ""){
    errors.year = "year must not be empty"
  }
  if(imgTitle.trim() === ""){
    errors.imgTitle = "Image title must not be empty"
  }
  if(genre.trim() === ""){
    errors.genre = "genre must not be empty"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
}
module.exports = { validateRegisterInput, validLoginInput, validMovieInput }
