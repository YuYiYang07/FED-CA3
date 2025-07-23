document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // get DOM elements
  const passwordInput = document.getElementById("Password");
  const confirmInput = document.getElementById("ConfirmPassword");
  const emailInput = document.getElementById("emailInput");

  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");
  const checkboxError = document.getElementById("checkboxError");
  const emailError = document.getElementById("emailError");

  // clear
  passwordError.textContent = "";
  confirmError.textContent = "";
  checkboxError.textContent = "";
  emailError.textContent = "";

  passwordError.style.display = "none";
  confirmError.style.display = "none";
  checkboxError.style.display = "none";
  emailError.style.display = "none";

  let isValid = true;

  // verification
  let isRobot = document.getElementById("checkRobot").checked;
  let isAgree = document.getElementById("Check1").checked;
  let isTrue = document.getElementById("Check2").checked;

  if (!isRobot || !isAgree || !isTrue) {
    checkboxError.textContent = "⚠️ You must: Accept the terms, tell the truth, and confirm you're not a robot.";
    checkboxError.style.display = "block";
    isValid = false;
  }

  const password = passwordInput.value.trim();
  const confirmed = confirmInput.value.trim();

  // ! password 
  if (!password || !confirmed) {
    passwordError.textContent = "❗ Password and Confirm Password cannot be left blank.";
    passwordError.style.display = "block";
    isValid = false;
  }

  // password length
  if (password.length > 0 && password.length < 6) {
    passwordError.textContent = "❗ The password must be at least 6 characters long.";
    passwordError.style.display = "block";
    isValid = false;
  }

  // password consistency
  if (password && confirmed && password !== confirmed) {
    confirmError.textContent = "❗ Password and Confirm Password do not match.";
    confirmError.style.display = "block";
    isValid = false;
  }

  // email format
  if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    emailError.textContent = "❗ Please enter a valid email address.";
    emailError.style.display = "block";
    isValid = false;
  }

  // final jump to js
  if (isValid) {
    window.location.href = "thanks.html";
  }
});

// 密码强度检测与进度条
const passwordInput = document.getElementById("Password");
const strengthBar = document.getElementById("passwordStrengthBar");
const strengthLabel = document.getElementById("passwordStrengthLabel");

function getPasswordStrength(password) {
  if (password.length < 6) return {level: 'none', percent: 0, text: '', color: ''};
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  if ((hasLower || hasUpper) && hasSpecial && password.length > 6) {
    return {level: 'high', percent: 100, text: 'high', color: 'linear-gradient(90deg, #ff3e3e 0%, #ffe066 30%, #4ade80 100%)'};
  } else if ((hasLower && hasUpper && !hasSpecial && password.length > 6) || (hasSpecial && !(hasLower && hasUpper) && password.length > 6)) {
    return {level: 'mid', percent: 66, text: 'mid', color: 'linear-gradient(90deg, #ff3e3e 0%, #ffe066 100%)'};
  } else if (password.length > 6) {
    return {level: 'low', percent: 33, text: 'low', color: 'linear-gradient(90deg, #ff3e3e 70%, #ffe066 100%)'};
  }
  return {level: 'none', percent: 0, text: '❗ The password must be at least 6 characters long.', color: 'linear-gradient(90deg, #ff3e3e 100%, #ffe066 100%)'};
}

passwordInput.addEventListener('input', function() {
  const val = passwordInput.value;
  const strength = getPasswordStrength(val);
  if (strength.level === 'none') {
    strengthBar.style.width = '0%';
    strengthBar.style.background = '';
    strengthLabel.textContent = '';
  } else {
    strengthBar.style.width = strength.percent + '%';
    strengthBar.style.background = strength.color;
    strengthLabel.textContent = strength.text;
  }
});
