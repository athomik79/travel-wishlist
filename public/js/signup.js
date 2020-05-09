$(document).ready(function() {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked,
  //  we validate the email and password are not blank
  signUpForm.on('submit', function(event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  /**
 * loginUser does a post to our "api/login" route and if successful,
 * redirects us the the members page
 *
 * @param {string} email - The user's login email address
 * @param {string} password - The user's login password
 *
 * @example
 *
 *     loginUser('example@gmail.com', secretpassword')
 */
  function signUpUser(email, password) {
    $.post('/api/signup', {
      email: email,
      password: password,
    })
        .then(function(data) {
          window.location.replace('/members');
        // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
  }

  /**
 * loginUser does a post to our "api/login" route and if successful,
 * redirects us the the members page
 *
 * @param {string} err - The user's login email address)
 */
  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});
