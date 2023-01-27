window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName('form')) {
    form.reset();
  }
};

let portfolioWebsite = (function () {
  let form = document.querySelector('#contact-form');
  let firstNameInput = document.querySelector('#first-name');
  let firstNameErrorElement = document.querySelector('#first-name-error');
  let lastNameInput = document.querySelector('#last-name');
  let lastNameErrorElement = document.querySelector('#last-name-error');
  let emailInput = document.querySelector('#email');
  let emailErrorElement = document.querySelector('#email-error');
  let telephoneInput = document.querySelector('#telephone');
  let telephoneErrorElement = document.querySelector('#telephone-error');
  let messageInput = document.querySelector('#message');
  let messageErrorElement = document.querySelector('#message-error');

  function notEmpty(value) {
    return value.length !== 0;
  }

  function validEmailFormat(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
  }

  function onlyNumbersAndSpecialChars(value) {
    return /^$|^[0-9*#+\-\s]+$/.test(value);
  }

  function notLongerThan(value, charLimit) {
    return value.length <= charLimit;
  }

  function clearErrorMessage(errorElement) {
    errorElement.classList.remove('is-visible');
  }

  function showErrorMessage(errorElement, errorMessage) {
    console.log(errorMessage);
    errorElement.innerText = errorMessage;
    errorElement.classList.add('is-visible');
  }

  function validateFirstName() {
    clearErrorMessage(firstNameErrorElement);
    let value = firstNameInput.value;
    console.log(value);
    if (notEmpty(value)) {
      return true;
    } else {
      showErrorMessage(firstNameErrorElement, 'First name is required');
      return false;
    }
  }

  function validateLastName() {
    clearErrorMessage(lastNameErrorElement);
    let value = lastNameInput.value;
    if (notEmpty(value)) {
      return true;
    } else {
      showErrorMessage(lastNameErrorElement, 'Last name is required');
      return false;
    }
  }

  function validateEmail() {
    clearErrorMessage(emailErrorElement);
    let value = emailInput.value;
    if (!notEmpty(value)) {
      showErrorMessage(emailErrorElement, 'Email is required');
      return false;
    }
    if (!validEmailFormat(value)) {
      showErrorMessage(emailErrorElement, 'Email format is invalid');
      return false;
    }
    return true;
  }

  function validateTelephoneNumber() {
    clearErrorMessage(telephoneErrorElement);
    let value = telephoneInput.value;
    if (!onlyNumbersAndSpecialChars(value)) {
      showErrorMessage(
        telephoneErrorElement,
        'Only numbers, spaces or * # + -'
      );
      return false;
    }
    return true;
  }

  function validateMessage() {
    clearErrorMessage(messageErrorElement);
    let value = messageInput.value;
    if (!notEmpty(value)) {
      showErrorMessage(messageErrorElement, 'Message is required');
      return false;
    }
    if (!notLongerThan(value, 500)) {
      showErrorMessage(
        messageErrorElement,
        'Message should be no longer than 500 chars'
      );
    }
    return true;
  }

  function formIsValid() {
    let validFirstName = validateFirstName();
    let validLastName = validateLastName();
    let validEmail = validateEmail();
    let validTelephoneNumber = validateTelephoneNumber();
    let validMessage = validateMessage();
    return (
      validFirstName &&
      validLastName &&
      validEmail &&
      validTelephoneNumber &&
      validMessage
    );
  }

  firstNameInput.addEventListener('input', validateFirstName);
  lastNameInput.addEventListener('input', validateLastName);
  emailInput.addEventListener('input', validateEmail);
  telephoneInput.addEventListener('input', validateTelephoneNumber);
  messageInput.addEventListener('input', validateMessage);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (formIsValid()) {
      form.submit();
    }
  });
})();
