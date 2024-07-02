const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signInButton1 = document.getElementById("signin");

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

signInButton1.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "home.html";
});