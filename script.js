// variables

let moneyInTheMachine = 0;
let balance = 2000;
let change = 0;
let selectedPlace = "";

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
const error = document.querySelector(".error");
const success = document.querySelector(".success");
const displayBalance = document.querySelector(".balance");
const displayChange = document.querySelector(".exchAmount");
const exchangeBtn = document.querySelector(".exchange");

// functions

// missing pressing button image change

const deployProduct = (name) => {
  const selectedProduct = document.querySelector(`.${name}Bought`);
  selectedProduct.style.display = "block";
  setTimeout(() => {
    selectedProduct.style.display = "none";
  }, 3000);
};

const setErrorMessage = (message) => {
  error.innerHTML = message;
  setTimeout(() => {
    error.innerHTML = "";
  }, 3000);
};

const setSuccessMessage = (message) => {
  success.innerHTML = message;
  setTimeout(() => {
    success.innerHTML = "";
  }, 3000);
};

const addToPlace = (number) => {
  selectedPlace = selectedPlace + `${number}`;
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
  displayBalance.innerHTML = `Balance: ${balance} Ft`;
};

const giveChange = (amount, price) => {
  let moneyBack = amount - price;
  change = change + moneyBack;
  displayChange.innerHTML = `Exchangable amount: ${change} Ft`;
};
// listeners

numbers.forEach((el, i) => {
  if (i + 1 === 10) {
    el.addEventListener("click", function () {
      addToPlace(0);
      el.children[0].src = "pinpad-button-pressed.png";
      setTimeout(() => {
        el.children[0].src = "pinpad-button-normal.png";
      }, 500);
    });
  } else {
    el.addEventListener("click", function () {
      addToPlace(i + 1);
      el.children[0].src = "pinpad-button-pressed.png";
      setTimeout(() => {
        el.children[0].src = "pinpad-button-normal.png";
      }, 500);
    });
  }
});

placeDeleter.addEventListener("click", function () {
  placeDeleter.children[0].src = "pinpad-button-pressed.png";
  setTimeout(() => {
    placeDeleter.children[0].src = "pinpad-button-normal.png";
  }, 500);
  selectedPlace = "";
});

placeSubmitter.addEventListener("click", function () {
  let found = false;
  placeSubmitter.children[0].src = "pinpad-button-pressed.png";
  setTimeout(() => {
    placeSubmitter.children[0].src = "pinpad-button-normal.png";
  }, 500);
  slots.forEach((el) => {
    if (el.innerHTML === selectedPlace) {
      if (
        el.parentElement.previousElementSibling.lastElementChild.alt === "bomba"
      ) {
        if (el.parentElement.previousElementSibling.children.length === 0) {
          setErrorMessage("This place is sold out!");
        } else if (moneyInTheMachine < 315) {
          setErrorMessage("Not enough money!");
          found = true;
        } else {
          found = true;
          deployProduct(
            el.parentElement.previousElementSibling.lastElementChild.alt
          );
          giveChange(moneyInTheMachine, 315);
          moneyInTheMachine = 0;
          refreshDisplay(moneyInTheMachine);
          setSuccessMessage("Enjoy your product!");
          el.parentElement.previousElementSibling.lastElementChild.remove();
        }
      } else if (
        el.parentElement.previousElementSibling.lastElementChild.alt ===
        "snickers"
      ) {
        if (el.parentElement.previousElementSibling.children.length === 0) {
          setErrorMessage("This place is sold out!");
        } else if (moneyInTheMachine < 220) {
          setErrorMessage("Not enough money!");
          found = true;
        } else {
          found = true;
          deployProduct(
            el.parentElement.previousElementSibling.lastElementChild.alt
          );
          giveChange(moneyInTheMachine, 220);
          moneyInTheMachine = 0;
          refreshDisplay(moneyInTheMachine);
          setSuccessMessage("Enjoy your product!");
          el.parentElement.previousElementSibling.lastElementChild.remove();
        }
      } else if (
        el.parentElement.previousElementSibling.lastElementChild.alt === "mars"
      ) {
        if (el.parentElement.previousElementSibling.children.length === 0) {
          setErrorMessage("This place is sold out!");
        } else if (moneyInTheMachine < 190) {
          setErrorMessage("Not enough money!");
          found = true;
        } else {
          found = true;
          deployProduct(
            el.parentElement.previousElementSibling.lastElementChild.alt
          );
          giveChange(moneyInTheMachine, 190);
          moneyInTheMachine = 0;
          refreshDisplay(moneyInTheMachine);
          setSuccessMessage("Enjoy your product!");
          el.parentElement.previousElementSibling.lastElementChild.remove();
        }
      }
    }
  });
  if (!found) {
    setErrorMessage("Invalid number");
  }
  selectedPlace = "";
});

twoHundred.addEventListener("click", function () {
  if (balance < 200) {
    setErrorMessage("Not enough balance");
  } else {
    addMoney(200);
    detractMoney(200);
  }
});

hundred.addEventListener("click", function () {
  if (balance < 100) {
    setErrorMessage("Not enough balance");
  } else {
    addMoney(100);
    detractMoney(100);
  }
});

fifty.addEventListener("click", function () {
  if (balance < 50) {
    setErrorMessage("Not enough balance");
  } else {
    addMoney(50);
    detractMoney(50);
  }
});

cancel.addEventListener("click", function () {
  if (moneyInTheMachine === 0) {
    setErrorMessage("No money in the machine.");
  } else {
    balance = balance + Number(displayMoney.innerHTML);
    displayBalance.innerHTML = `Balance: ${balance} Ft`;
    moneyInTheMachine = 0;
    displayMoney.innerHTML = 0;
    selectedPlace = "";
  }
});

exchangeBtn.addEventListener("click", function () {
  if (change < 50) {
    setErrorMessage("Not enough money to exchange");
  } else {
    balance = balance + 50;
    displayBalance.innerHTML = `Balance: ${balance} Ft`;
    change = change - 50;
    displayChange.innerHTML = `Exchangable amount: ${change} Ft`;
  }
});

// cancel.addEventListener("click", functi);
