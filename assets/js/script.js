// !declare variables
const template = document.querySelector("[data-js-template]"),
  main = document.querySelector("[data-js-main]"),
  form = document.querySelector("[data-js-form]");


const validateForm = (event) => {
  event.preventDefault();

  const formInputs = document.querySelectorAll(".form__input");
  const isValid = form.checkValidity();

  if (isValid) {
    main.insertAdjacentHTML("beforebegin", template.innerHTML);
  }

  form.reportValidity();

  formInputs.forEach((input) => {
    if (!input.validity.valid) {
      showError(input, "This field is required");
    } else {
      hideError(input);
      showSuccess(input);
    }

    if (input.type === "email" && !validateEmail(input.value)) {
      showError(input, "Please enter a valid email address");
    }

  });

  handleRadioInputs();
  handleTextarea();
  handleCheckbox();

  formInputs.forEach((input) => (input.value = ""));
};


form.addEventListener("submit", validateForm);


// !validate email function using regex
const validateEmail = email =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    .test(String(email).toLowerCase());


// ! Show Error Function
const showError = (inputElement, errorMessage) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add("invalid");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("invalid");
}


// ! Hide Error Function
const hideError = (inputElement) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove("invalid");
  errorElement.classList.remove("invalid");
  errorElement.textContent = "";
}


// !handle radio inputs function
const handleRadioInputs = () => {
  const formLabel = document.querySelectorAll("[data-js-label]"),
    radioInputs = document.querySelectorAll("[data-js-radio]"),
    queryTypeError = document.querySelector("#query-type-error"),
    isRadioChecked = Array.from(radioInputs).some(input => input.checked);

  if (!isRadioChecked) {
    formLabel.forEach(label => label.classList.add("invalid"));
    queryTypeError.classList.add("invalid");
    queryTypeError.textContent = "Please select a query type";
    radioInputs.forEach(input => input.setAttribute("aria-checked", "false"));


  } else {
    formLabel.forEach(label => label.classList.remove("invalid"));
    queryTypeError.classList.remove("invalid");
    queryTypeError.textContent = "";
    radioInputs.forEach(input => input.checked = false);
    radioInputs.forEach(input => input.setAttribute("aria-checked", "true"));

  }



}

// !handle textarea function
const handleTextarea = () => {
  const formTextarea = document.querySelector(".form__textarea");
  if (!formTextarea.validity.valid) {
    showError(formTextarea, "This field is required");
    formTextarea.style.border = "1px solid var(--clr-error)";
  } else {
    hideError(formTextarea);
    showSuccess(formTextarea);
    formTextarea.style.border = "1px solid var(--accent-color)";

  }

  formTextarea.value = "";
}


// !checkbox function
const handleCheckbox = () => {
  const checkboxGroup = document.querySelector(".form__group-checkbox"),
    checkboxError = checkboxGroup.querySelector(".form__error"),
    checkbox = document.querySelector(".form__checkbox-input");

  if (!checkbox.checked) {
    checkbox.classList.add("invalid");
    checkboxError.textContent = "To submit this form, please consent to being contacted";
    checkboxError.classList.add("invalid");
    checkbox.setAttribute("aria-checked", "false");
  } else {
    checkbox.classList.remove("invalid");
    checkboxError.classList.remove("invalid");
    checkboxError.textContent = "";
    checkbox.setAttribute("aria-checked", "true");
  }

  checkbox.checked = false;
}

// !show success function
const showSuccess = (element) => {
  const isSuccess = element.nextElementSibling;
  element.classList.add("valid");
  isSuccess.classList.add("valid");
}


