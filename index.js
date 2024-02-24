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

  if (button === "equals") {
    if (inputDisplayVal != "" && isNaN(inputDisplayVal)) {
      cScreen.value = eval(inputDisplayVal);
    }
    returnFlag = true;
    return;
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

  const operandIndex = getOperandIndex();
  const currentNum = inputDisplayVal.slice(operandIndex);

  function getOperandIndex() {
    for (let i = inputDisplayVal.length - 1; i > -1; i--) {
      const digit = inputDisplayVal[i];
      if (isNaN(digit)) {
        if (digit != "0" && digit != ".") {
          return i + 1;
        }
      }
    }
    return 0;
  }

  if (button === "sign-switch") {
    if (inputDisplayVal[operandIndex - 1] != "-") {
      const val = inputDisplayVal.slice(0, operandIndex) + currentNum * -1;
      cScreen.value = val;
    }
    return;
  }

  if (button === "decimal") {
    if (currentNum === "") {
      cScreen.value = `${inputDisplayVal}0.`;
      returnFlag = false;
      return;
    } else {
      if (!currentNum.includes(".")) {
        cScreen.value = `${inputDisplayVal}.`;
        returnFlag = false;
      }
      return;
    }
  }

  //OPERATORS [%, /, *, -, +]
  cScreen.value = `${inputDisplayVal}${buttonVal}`;
  returnFlag = false;
});
