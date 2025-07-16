document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  let password = document.getElementById("Password").value;
  let confirmed = document.getElementById("ConfirmPassword").value;

  let isRobot = document.getElementById("checkRobot").checked;
  let isAgree = document.getElementById("Check1").checked;
  let isTrue = document.getElementById("Check2").checked;

  if (!isRobot || !isAgree || !isTrue) {
    alert("⚠️ You must:\n- Accept the terms\n- Tell the truth\n- Confirm you are not a robot");
    return;
  }

  if (!password || !confirmed) {
    alert("❗ Password and Confirm-Password cannot be left blank.");
    return;
  }

  if (password.length < 6) {
    alert("❗ The password must be at least 6 characters long.");
    return;
  }

  if (password !== confirmed) {
    alert("❗ Password and Confirm-Password do not match.");
    return;
  }

  // All checks passed
  window.location.href = "thanks.html";
});
