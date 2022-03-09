// variables

let moneyInTheMachine = 0;
let balance = 2000;
let change = 0;
let selectedPlace = "";
let error = "";
let success = "";

// selectors

const displayMoney = document.querySelector(".moneyInTheMachine");
const twoHundred = document.querySelector(".twoHundred");
const hundred = document.querySelector(".hundred");
const fifty = document.querySelector(".fifty");
const cancel = document.querySelector(".cancelButton");
const numbers = document.querySelectorAll(".pinButton");
const placeDeleter = document.querySelector(".delete");
const placeSubmitter = document.querySelector(".add");
const slots = document.querySelectorAll(".slotNumber");

// functions

const deployProduct = (name) => {
  const selectedProduct = document.querySelector(`.${name}Bought`);
  selectedProduct.style.display = "block";
  setTimeout(() => {
    selectedProduct.style.display = "none";
  }, 3000);
};

const addToPlace = (number) => {
  selectedPlace = selectedPlace + `${number}`;
  console.log(selectedPlace);
};

const refreshDisplay = (amount) => {
  displayMoney.innerHTML = amount;
};

const addMoney = (amount) => {
  moneyInTheMachine = moneyInTheMachine + amount;
  refreshDisplay(moneyInTheMachine);
};

const detractMoney = (amount) => {
  balance = balance - amount;
  console.log(balance);
};

const giveChange = (amount, price) => {
  let moneyBack = amount - price;
  change = change + moneyBack;
  console.log(change);
};
// listeners

numbers.forEach((el, i) => {
  if (i + 1 === 10) {
    el.addEventListener("click", function () {
      addToPlace(0);
    });
  } else {
    el.addEventListener("click", function () {
      addToPlace(i + 1);
    });
  }
});

// slots.forEach((el) => {
//   if (el.innerHTML === selectedPlace) {
//     console.log("ittem found");
//   }
//   console.log(el.parentElement.previousElementSibling.lastElementChild);
// });

placeDeleter.addEventListener("click", function () {
  selectedPlace = "";
});

placeSubmitter.addEventListener("click", function () {
  let found = false;
  slots.forEach((el) => {
    if (el.innerHTML === selectedPlace) {
      if (
        el.parentElement.previousElementSibling.lastElementChild.alt === "bomba"
      ) {
        if (el.parentElement.previousElementSibling.children.length === 0) {
          console.log("out");
        } else if (moneyInTheMachine < 315) {
          console.log("not enough money");
          found = true;
        } else {
          found = true;
          el.parentElement.previousElementSibling.lastElementChild.remove();
          deployProduct(
            el.parentElement.previousElementSibling.lastElementChild.alt
          );
          giveChange(moneyInTheMachine, 315);
          moneyInTheMachine = 0;
          refreshDisplay(moneyInTheMachine);
        }
      } else if (
        el.parentElement.previousElementSibling.lastElementChild.alt ===
        "snickers"
      ) {
        if (el.parentElement.previousElementSibling.children.length === 0) {
          console.log("out");
        } else if (moneyInTheMachine < 220) {
          console.log("not enough money");
          found = true;
        } else {
          found = true;
          el.parentElement.previousElementSibling.lastElementChild.remove();
          deployProduct(
            el.parentElement.previousElementSibling.lastElementChild.alt
          );
          giveChange(moneyInTheMachine, 220);
          moneyInTheMachine = 0;
          refreshDisplay(moneyInTheMachine);
        }
      } else if (
        el.parentElement.previousElementSibling.lastElementChild.alt === "mars"
      ) {
        if (el.parentElement.previousElementSibling.children.length === 0) {
          console.log("out");
        } else if (moneyInTheMachine < 190) {
          console.log("not enough money");
          found = true;
        } else {
          found = true;
          el.parentElement.previousElementSibling.lastElementChild.remove();
          deployProduct(
            el.parentElement.previousElementSibling.lastElementChild.alt
          );
          giveChange(moneyInTheMachine, 190);
          moneyInTheMachine = 0;
          refreshDisplay(moneyInTheMachine);
        }
      }
    }
  });
  if (!found) {
    console.log("invalid number!");
  }
  selectedPlace = "";
});

twoHundred.addEventListener("click", function () {
  if (balance < 200) {
    console.log("not enough balance");
  } else {
    addMoney(200);
    detractMoney(200);
  }
});

hundred.addEventListener("click", function () {
  if (balance < 100) {
    console.log("not enough balance");
  } else {
    addMoney(100);
    detractMoney(100);
  }
});

fifty.addEventListener("click", function () {
  if (balance < 50) {
    console.log("not enough balance");
  } else {
    addMoney(50);
    detractMoney(50);
  }
});

cancel.addEventListener("click", function () {
  if (moneyInTheMachine === 0) {
    console.log("no money inside");
  } else {
    balance = balance + Number(displayMoney.innerHTML);
    moneyInTheMachine = 0;
    displayMoney.innerHTML = 0;
    selectedPlace = "";
  }
});

// cancel.addEventListener("click", functi);
