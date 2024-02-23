const cBody = document.querySelector("#c-body");
const cScreen = document.querySelector("#c-screen");
const buttonContainer = document.querySelector("#button-container");

let returnFlag = false;

buttonContainer.addEventListener("click", (e) => {
  const button = e.target.id;
  const buttonVal = button[button.length - 1];
  const inputDisplayVal = cScreen.value;

  if (button === "AC") {
    cScreen.value = "0";
    return;
  }

  if (button === "sign-switch") {
    cScreen.value = inputDisplayVal * -1;
    return;
  }

  if (button === "equals") {
    if (inputDisplayVal != "" && isNaN(inputDisplayVal)) {
      cScreen.value = eval(inputDisplayVal);
    }
    returnFlag = true;
    return;
  }

  if (button === "decimal") {
    const lastDisplayVal = inputDisplayVal[inputDisplayVal.length - 1];

    if (
      lastDisplayVal === "%" ||
      lastDisplayVal === "/" ||
      lastDisplayVal === "*" ||
      lastDisplayVal === "-" ||
      lastDisplayVal === "+"
    ) {
      cScreen.value = `${inputDisplayVal}0.`;
      returnFlag = false;
      return;
    } else {
      if (!hasDecimalInOperand()) {
        console.log(lastDisplayVal);
        cScreen.value = `${inputDisplayVal}.`;
      }
      returnFlag = false;
      return;
    }

    function hasDecimalInOperand() {
      for (let i = inputDisplayVal.length - 1; i > -1; i--) {
        const digit = inputDisplayVal[i];
        if (isNaN(digit)) {
          if (digit === ".") {
            return true;
          }
          if (digit != "0") {
            return false;
          }
        }
      }
    }
  }

  //BUTTONS [0-9]
  if (!isNaN(buttonVal)) {
    if (buttonVal === "0") {
      if (returnFlag) {
        cScreen.value = "";
      }
      if (inputDisplayVal != "") cScreen.value = `${inputDisplayVal}${0}`;
      return;
    } else {
      if (returnFlag === true || inputDisplayVal === "0") {
        cScreen.value = buttonVal;
        returnFlag = false;
      } else {
        const inputDisplayVal = cScreen.value;
        cScreen.value = `${inputDisplayVal}${buttonVal}`;
      }
    }
    return;
  }

  //OPERATORS [%, /, *, -, +]
  cScreen.value = `${inputDisplayVal}${buttonVal}`;
  returnFlag = false;
});
