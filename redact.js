const main_text = document.querySelector("#Text-input");
const scrambled_text = document.querySelector("#form_input");
const symbol = document.querySelector("#sym-bol");

function getArraysIntersection(a1, a2) {
  return a1.filter((n) => {
    return a2.indexOf(n) !== -1;
  });
}

function extract() {
  const words = main_text.value.match(/\w+/g);
  let newWord = words.join(" ");
  let symbols = symbol.value;

  const replaces = scrambled_text.value.match(/\w+/g);

  let intersectingWords = getArraysIntersection(words, replaces);
  console.log(`The number of words scanned is ${words.length}`);

  console.log(
    `the number of characters scrambled is ${intersectingWords.length}`
  );

  let uniqueWords = [...new Set(intersectingWords)];
  let totalWordsMatched = uniqueWords.length;

  console.log(`the total number of matched text is ${totalWordsMatched}`);

  let count = 0;

  if (symbols) {
    for (let replacer of intersectingWords) {
      count++;
      let replacers = symbols.repeat(replacer.length);
      newWord = newWord.replace(replacer, replacers);
    }
    console.log(`i used ${count} seconds to scramble the text`);
  } else {
    for (let replacer of intersectingWords) {
      count++;
      let replacers = "*".repeat(replacer.length);
      newWord = newWord.replace(replacer, replacers);
    }
    console.log(`i used ${count} seconds to scramble the text`);
  }
  main_text.value = newWord;
}

const button = document.querySelector("button"); //the REDACT button

button.addEventListener("click", extract());

// This function validates the inputs.
// It ensures that the main text and words to scrumble inputs are not empty.
// It also ensures the symbol input does not contain more than one character

let item = document.createElement("span");
item.style.color = "red";

function formValidation(mainText, scrumWords, sym) {
  if (mainText == "" || scrumWords == "" || sym.length > 1) {
    if (mainText == "") {
      item.innerHTML = "Please type or paste your message in the main text";
      document.getElementsByClassName("input")[0].append(item);
      // alert("Please type or paste your message in the main text");
      // return false;
    } else if (scrumWords == "") {
      item.innerHTML = "Please type or paste the words to be scrumbled";
      document.getElementsByClassName("input")[2].append(item);
      // alert("Please type or paste the words to be scrumbled");
      // return false;
    } else if (sym.length > 1) {
      item.innerHTML = "Please enter just a single character";
      document.getElementsByClassName("input")[1].append(item);
      // alert("Please enter just a single character")
      // return false;
    }
    return false;
  }
}

// This function executes the extract function and also calculates the time taken to scrumble the words
function redAct() {
  const main_text = document.querySelector("#Text-input").value;
  const scrambled_text = document.querySelector("#form_input").value;
  const symbol = document.querySelector("#sym-bol").value;

  let validation = formValidation(main_text, scrambled_text, symbol);

  if (validation == false) {
    return;
  } else {
    let startTime = performance.now();
    extract();

    let endTime = performance.now();
    let scrambleTime = (endTime - startTime) / 1000;

    console.log(`Time Taken to Scrumble words: ${scrambleTime} secs`);
  }
}
