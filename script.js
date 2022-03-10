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
const places = document.querySelectorAll(".slotNumber");
const error = document.querySelector(".error");
const success = document.querySelector(".success");
const displayBalance = document.querySelector(".balance");
const displayChange = document.querySelector(".exchAmount");
const exchangeBtn = document.querySelector(".exchange");

// functions

// Shows the product at the bottom of the machine.
const deployProduct = (name) => {
  const selectedProduct = document.querySelector(`.${name}Bought`);
  selectedProduct.style.display = "block";
  setTimeout(() => {
    selectedProduct.style.display = "none";
  }, 3000);
};

// Setting error messages.
const setErrorMessage = (message) => {
  error.innerHTML = message;
  setTimeout(() => {
    error.innerHTML = "";
  }, 3000);
};

// Setting success messages.
const setSuccessMessage = (message) => {
  success.innerHTML = message;
  setTimeout(() => {
    success.innerHTML = "";
  }, 3000);
};

// Setting the pressed numbers.
const addToPlace = (number) => {
  selectedPlace = selectedPlace + `${number}`;
};

// Clears the machine display.
const refreshDisplay = (amount) => {
  displayMoney.innerHTML = amount;
};

// Adding some money to the machine and the display.
const addMoney = (amount) => {
  moneyInTheMachine = moneyInTheMachine + amount;
  refreshDisplay(moneyInTheMachine);
};

// Change money stats after successful purchase.
const detractMoney = (amount) => {
  balance = balance - amount;
  displayBalance.innerHTML = `Balance: ${balance} Ft`;
};

// Change.
const giveChange = (amount, price) => {
  let moneyBack = amount - price;
  change = change + moneyBack;
  displayChange.innerHTML = `Exchangable amount: ${change} Ft`;
};

// onClick events

// Adding events to the pinpad numbers.
numbers.forEach((el, i) => {
  if (i + 1 === 10) {
    el.addEventListener("click", function () {
      addToPlace(0);
      el.children[0].src = "pinpad-button-pressed.png";
      setTimeout(() => {
        el.children[0].src = "pinpad-button-normal.png";
      }, 100);
    });
  } else {
    el.addEventListener("click", function () {
      addToPlace(i + 1);
      el.children[0].src = "pinpad-button-pressed.png";
      setTimeout(() => {
        el.children[0].src = "pinpad-button-normal.png";
      }, 100);
    });
  }
});

// Adding events to the pinpad c button.
placeDeleter.addEventListener("click", function () {
  placeDeleter.children[0].src = "pinpad-button-pressed.png";
  setTimeout(() => {
    placeDeleter.children[0].src = "pinpad-button-normal.png";
  }, 100);
  selectedPlace = "";
});

// Adding events to the pinpad ok button.
placeSubmitter.addEventListener("click", function () {
  let found = false;
  placeSubmitter.children[0].src = "pinpad-button-pressed.png";
  setTimeout(() => {
    placeSubmitter.children[0].src = "pinpad-button-normal.png";
  }, 100);
  places.forEach((el) => {
    // When the entered numbers matching with one place number.
    if (el.innerHTML === selectedPlace) {
      // Checking if the product is already sold out at that location.
      if (el.parentElement.previousElementSibling.children.length === 0) {
        setErrorMessage("Out of stock in this place.");
        found = true;
      } else {
        // Checking the product type.
        if (
          el.parentElement.previousElementSibling.lastElementChild.alt ===
          "bomba"
        ) {
          //  Checking if there is enough money in the machine.
          if (moneyInTheMachine < 315) {
            setErrorMessage("You don't have enough money for the goods!");
            found = true;
            // Performs the operation if everything is okay.
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
          // Checking the product type.
        } else if (
          el.parentElement.previousElementSibling.lastElementChild.alt ===
          "snickers"
        ) {
          //  Checking if there is enough money in the machine.
          if (moneyInTheMachine < 220) {
            setErrorMessage("You don't have enough money for the goods!");
            found = true;
            // Performs the operation if everything is okay.
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
          // Checking the product type.
        } else if (
          el.parentElement.previousElementSibling.lastElementChild.alt ===
          "mars"
        ) {
          // Checking if there is enough money in the machine.
          if (moneyInTheMachine < 190) {
            setErrorMessage("You don't have enough money for the goods!");
            found = true;
            // Performs the operation if everything is okay.
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
    }
  });
  // Setting an error when the deployed numbers are invalid.
  if (!found) {
    setErrorMessage("Invalid number.");
  }
  selectedPlace = "";
});

// Coin button functionality.
twoHundred.addEventListener("click", function () {
  if (balance < 200) {
    setErrorMessage("You don't have that much money.");
  } else {
    addMoney(200);
    detractMoney(200);
  }
});

// Coin button functionality.
hundred.addEventListener("click", function () {
  if (balance < 100) {
    setErrorMessage("You don't have that much money.");
  } else {
    addMoney(100);
    detractMoney(100);
  }
});

// Coin button functionality.
fifty.addEventListener("click", function () {
  if (balance < 50) {
    setErrorMessage("You don't have that much money.");
  } else {
    addMoney(50);
    detractMoney(50);
  }
});

// Cancel button functionality.
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

// Exchange button functionality.
exchangeBtn.addEventListener("click", function () {
  if (change < 50) {
    setErrorMessage("Not enough money to exchange.");
  } else {
    balance = balance + 50;
    displayBalance.innerHTML = `Balance: ${balance} Ft`;
    change = change - 50;
    displayChange.innerHTML = `Exchangable amount: ${change} Ft`;
  }
});
