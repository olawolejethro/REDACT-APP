function startApp() {
  // Your entire app should not necessarily be coded inside this
  // single function (though there's no penalty for that),
  // so create and use/call additional functions from here

  // This function executes the extract function and also calculates the time taken to scrumble the words
  function redAct() {
    let validation = formValidation(
      main_text.value,
      scrambled_text.value,
      symbol.value
    );

    if (validation == false) {
      return;
    } else {
      extract();
    }
  }
  redAct();
}

const main_text = document.querySelector("#Text-input");
const scrambled_text = document.querySelector("#form_input");
const symbol = document.querySelector("#sym-bol");

// function getArraysIntersection(a1, a2) {
//   return a1.filter((n) => {
//     return a2.indexOf(n) !== -1;
//   });
// }

function extract() {
  let startTime = performance.now();

  let word = main_text.value;
  const words = word.match(/\w+/g);

  let symbols = symbol.value;

  const scrambler = scrambled_text.value;
  const replaces = scrambler.match(/\w+/g);

  // let intersectingWords = getArraysIntersection(words, replaces);

  let splitWord = word.split(" ");
  let splitScrambler = scrambler.split(" ");

  let lowerWords;
  let lowerScrambler;
  let matchedWords = [];
  // let replacer;

  splitScrambler.forEach((item) => {
    for (let i = 0; i < splitWord.length; i++) {
      let newWord = splitWord[i].replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
        ""
      );

      lowerWords = newWord.toLowerCase();
      lowerScrambler = item.toLowerCase();

      if (lowerScrambler === lowerWords) {
        matchedWords.push(lowerWords);
        // if (symbols) {
        //   replacer = symbols.repeat(item.length);
        //   splitWord[i] = replacer;
        // // } else {
        //   replacer = "*".repeat(item.length);
        //   splitWord[i] = replacer;
        // }
      }
    }
  });

  // let scrambledText = splitWord.join(" ");

  let splittedScrambler = new RegExp(`\\b(${replaces.join("|")})\\b`, "gi");
  console.log(matchedWords);
  console.log(words);
  console.log(word);
  console.log(replaces);

  if (symbols) {
    let scrambledWord = word.replace(splittedScrambler, `${symbols}`);
    word = scrambledWord;
  } else {
    let scrambledWord = word.replace(splittedScrambler, "***");
    word = scrambledWord;
  }

  let endTime = performance.now();
  let scrumTime = (endTime - startTime) / 1000;
  let scrumbleTime = scrumTime.toFixed(3);

  let characters = matchedWords.join("");

  // callback function for displaying results and stats
  resultStats(
    word,
    words.length,
    matchedWords.length,
    characters.length,
    scrumbleTime
  );
}

// This function validates the inputs.
// It ensures that the main text and words to scrumble inputs are not empty.
// It also ensures the symbol input does not contain more than one character

let item = document.createElement("span");
item.setAttribute("id", "err");
item.style.color = "red";

function formValidation(mainText, scrumWords, sym) {
  if (mainText == "" || scrumWords == "" || sym.length == 1) {
    if (mainText == "") {
      item.innerHTML = "Please type or paste your message in the main text";
      document.getElementsByClassName("input")[0].append(item);
    } else if (scrumWords == "") {
      item.innerHTML = "Please type or paste the words to be scrumbled";
      document.getElementsByClassName("input")[1].append(item);
    } else if (sym.length == 1) {
      item.innerHTML = "Please enter two or more characters";
      document.getElementsByClassName("input")[2].append(item);
    }
    return false;
  } else {
    const delItem = document.querySelector("#err");
    if (delItem == null) {
      return;
    } else {
      delItem.remove();
    }
  }
}

// this function creates a new div to display results and stats

function resultStats(
  scrumWords,
  scannedWords,
  matchedWords,
  scrumChar,
  scrumTime
) {
  let stats = `<div>
    <div class="input">
          <label for="result" class="user-txt"><h3>Scrambled Result</h3></label>
          
          <div class="form-input" id="results" style = "background-color: white"><p>${scrumWords}</p></div>
        </div>
        <div class="input">
          <p><span>Words scannned: </span>${scannedWords}</p>
          <p><span>Words matched: </span>${matchedWords}</p>
          <p><span>Characters scrumbled: </span>${scrumChar}</p>
          <p><span>Time taken to scrumble: </span>${scrumTime} secs</p>
        </div><br>
         <div style="border-top: solid ghostwhite">
          <p><h4>Are some of your texts not scrumbled? Do the following</h4></p>
          <ul style="margin-left: 10px">
            <li>Check the spelling of the word to scrumble</li>
            <li>Use space to separate the words to scrumble</li>
            <li>Do not use any special character to separate the words to scrumble</li>
          </ul>
        </div>
           <button type="button" onclick="document.querySelector('#result>div').remove()">
       Clear
        </button>
        </div>`;

  document.querySelector("#result").innerHTML = stats;
}

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //
