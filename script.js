const years = {
  label: document.getElementById("label-year"),
  input: document.getElementById("input-year"),
  error: document.getElementById("error-year"),
  result: document.getElementById("result-year"),
};

const months = {
  label: document.getElementById("label-month"),
  input: document.getElementById("input-month"),
  error: document.getElementById("error-month"),
  result: document.getElementById("result-month"),
};

const days = {
  label: document.getElementById("label-day"),
  input: document.getElementById("input-day"),
  error: document.getElementById("error-day"),
  result: document.getElementById("result-day"),
};

const elements = [years, months, days];

const button = document.getElementById("button");

button.addEventListener("click", (btn) => {
  btn.preventDefault();

  let birthday = new Date();
  birthday.setFullYear(
    years.input.value,
    months.input.value - 1,
    days.input.value
  );

  const currentDate = new Date();

  const differenceMS = new Date(currentDate - birthday);
  const ageYears = differenceMS / (365 * 24 * 3600 * 1000);
  const ageMonths = (ageYears - Math.floor(ageYears)) * 12;
  const ageDays = (ageMonths - Math.floor(ageMonths)) * 31;

  const invalidErrors = [
    !isValidYear(birthday),
    !isValidMonth(),
    !isValidDay(),
  ];

  for (let i = 0; i <= 2; i++) {
    if (isEmpty(elements[i])) {
      showRequireMessage(elements[i]);
    } else if (invalidErrors[i]) {
      showValidMessage(elements[i]);
    } else {
      hideError(elements[i]);
    }
  }

  const validData = isValidDay() && isValidMonth() && isValidYear(birthday);
  const empty = isEmpty(days) || isEmpty(months) || isEmpty(years);

  if (validData && !empty) {
    years.result.textContent = Math.floor(ageYears);
    months.result.textContent = Math.floor(ageMonths);
    days.result.textContent = Math.floor(ageDays);
  }
});

function isEmpty(obj) {
  if (obj.input.value.length === 0 || obj.input.value === "") {
    return true;
  } else {
    return false;
  }
}

function isValidDay() {
  if (days.input.value > 0 && days.input.value <= 31) {
    return true;
  } else {
    return false;
  }
}

function isValidMonth() {
  if (months.input.value > 0 && months.input.value <= 12) {
    return true;
  } else {
    return false;
  }
}

function isValidYear(birthday) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  const noInThePast =
    currentYear - birthday.getFullYear() > 0 ||
    (birthday.getFullYear() === currentYear &&
      birthday.getMonth() <= currentMonth &&
      birthday.getDate() <= currentDay);

  if (noInThePast) {
    return true;
  } else {
    return false;
  }
}

function showVisualError(obj) {
  obj.label.classList.add("color-red");
  obj.input.classList.add("border-red");
}

function showRequireMessage(obj) {
  showVisualError(obj);
  obj.error.textContent = "This field is required";
}

function showValidMessage(obj) {
  if (obj === days) {
    showVisualError(days);
    days.error.textContent = "Must be a valid day";
  } else if (obj === months) {
    showVisualError(months);
    months.error.textContent = "Must be a valid month";
  } else if (obj === years) {
    showVisualError(years);
    years.error.textContent = "Must be in the past";
  }
}

function hideError(obj) {
  obj.label.classList.remove("color-red");
  obj.input.classList.remove("border-red");
  obj.error.textContent = "";
}
