//signup
const signUpForm = document.querySelector('#main-content__signup-form');
signUpForm.addEventListener('click', event => {
  event.preventDefault();

  //get user info
  const email = signUpForm['signup-email'].value;
  const password = signUpForm['signup-password'].value;
  console.log(email, password);
});
