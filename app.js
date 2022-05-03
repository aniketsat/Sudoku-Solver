// require("dotenv").config();

const puzzleBoard = document.getElementById("puzzle");
const solveButton = document.getElementById("solve");
const generateButton = document.getElementById("generate");

// const API_KEY = process.env.RAPID_API_KEY;

let submission = [];
let data = "";

for (var i = 0; i < 81; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", 1);
  inputElement.setAttribute("max", 9);

  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElement.classList.add("input-group");
  }

  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputElements = document.querySelectorAll("input");
  inputElements.forEach((inputElement) => {
    if (inputElement.value) {
      submission.push(inputElement.value);
    } else {
      submission.push(".");
    }
  });
  data = submission.join("");
};

const populateValues = (isSolvable, answer) => {
  const inputs = document.querySelectorAll("input");

  if (isSolvable) {
    inputs.forEach((input, i) => {
      if (answer[i] === 0) {
        input.value = "";
      } else {
        input.value = answer[i];
      }
    });
  }
};

// Solve
const solve = () => {
  joinValues();

  const options = {
    method: "GET",
    url: "https://sudoku-board.p.rapidapi.com/solve-board",
    params: {
      sudo: data,
      stype: "list",
    },
    headers: {
      "X-RapidAPI-Host": "sudoku-board.p.rapidapi.com",
      "X-RapidAPI-Key": "cd58d079ebmsheee0f0388b71445p1a3531jsn96f209b7241c",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      d = response.data.response.solution;
      arr = [].concat(...d);
      populateValues(response.data.response.solvable, arr);
    })
    .catch(function (error) {
      console.error(error);
    });
};

// Generate
const generate = () => {
  const options = {
    method: "GET",
    url: "https://sudoku-board.p.rapidapi.com/new-board",
    params: { diff: "2", stype: "list", solu: "true" },
    headers: {
      "X-RapidAPI-Host": "sudoku-board.p.rapidapi.com",
      "X-RapidAPI-Key": "cd58d079ebmsheee0f0388b71445p1a3531jsn96f209b7241c",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      d = response.data.response;
      d = d["unsolved-sudoku"];
      console.log(d);
      arr = [].concat(...d);
      console.log(arr);
      populateValues(true, arr);
    })
    .catch(function (error) {
      console.error(error);
    });
};

solveButton.addEventListener("click", solve);
generateButton.addEventListener("click", generate);
