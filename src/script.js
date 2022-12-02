// Variable declaration

let fact, userInput;
const factElement = document.getElementById("factElement");
const numberElement = document.getElementById("numberElement");
const submitBtn = document.getElementById("submit");
const numberField = document.getElementById("numberField");
const text = document.getElementById("text");
const languageBtn = document.getElementById("languageBtn");
const key = config.RAPID_API_KEY;
let language = "en";

$('[lang="fr"]').hide();

// Language Toggling

languageBtn.addEventListener("click", function () {
  $('[lang="fr"]').toggle();
  $('[lang="en"]').toggle();

  if (language == "en") {
    language = "fr";
  } else if (language == "fr") {
    language = "en";
  }
  if (factElement != null && language == "fr") {
    translateText(factElement.innerHTML, "fr");
  }
  if (factElement != null && language == "en") {
    translateText(factElement.innerHTML, "en");
  }
  languageBtn.blur();
});

// Event listeners on main button

submitBtn.addEventListener("click", onSubmit);

document.addEventListener("keydown", function (enter) {
  if (enter.key === "Enter" && numberField.value != "") {
    submitBtn.click();
  }
});

// Main function

function onSubmit() {
  if (Number(numberField.value) > 1000 || Number(numberField.value) < 1) {
    language == "fr"
      ? alert("Entrez un nombre entre 1 et 1000.")
      : alert("Enter a number between 1 and 1000.");
    return false;
  }
  userInput = numberField.value;

  fetch(`/.netlify/functions/fetch-fact?number=${userInput}`)
    .then((response) => response.json())
    .then((response) => printText(response));

  text.classList.remove("d-none");
}

// Translation function

function printText(textInput) {
  if (language == "fr") {
    translateText(textInput, "fr");
  } else {
    factElement.innerHTML = textInput;
  }
}

function translateText(toTranslate, lang) {
  const params = { headers: { text: `${toTranslate}`, lang: `${lang}` } };
  fetch(`/.netlify/functions/translate`, params)
    .then((response) => response.json())
    .then(
      (response) => (factElement.innerHTML = response[0].translations[0].text)
    );
}

// To translate

const params = { headers: { text: "Hello", lang: "fr" } };
fetch(`/.netlify/functions/translate`, params)
  .then((response) => response.json())
  .then((response) => console.log(response[0].translations[0].text));
