const cBody = document.querySelector("#c-body");
const cScreen = document.querySelector("#c-screen");
const buttonContainer = document.querySelector("#button-container");

const AC = document.querySelector("#AC");
const signSwitch = document.querySelector("#sign-switch");
const remainder = document.querySelector("#remainder");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const add = document.querySelector("#add");
const decimal = document.querySelector("#decimal");
const equals = document.querySelector("#equals");

const value0 = document.querySelector("#value-0");

let returnFlag = false;
let operatorFlag = false;

value0.addEventListener("click", () => {
  if (returnFlag) {
    cScreen.value = "";
  }
  const currentValue = cScreen.value;
  if (currentValue != "") cScreen.value = `${currentValue}${0}`;
});

function init() {
  for (let i = 1; i < 10; i++) {
    const query = `#value-${i}`;
    const input = document.querySelector(query);
    input.addEventListener("click", () => {
      if (returnFlag === true) {
        cScreen.value = i;
        returnFlag = false;
        operatorFlag = false;
      } else {
        const currentValue = cScreen.value;
        cScreen.value = `${currentValue}${i}`;
        operatorFlag = false;
      }
    });
  }
}

init();

AC.addEventListener("click", () => {
  cScreen.value = "";
});

signSwitch.addEventListener("click", () => {
  const currentValue = cScreen.value;
  cScreen.value = currentValue * -1;
});

remainder.addEventListener("click", () => {
  const currentValue = cScreen.value;
  if (currentValue != "" && operatorFlag === false) {
    cScreen.value = `${currentValue}%`;
    returnFlag = false;
    operatorFlag = true;
  }
});

divide.addEventListener("click", () => {
  const currentValue = cScreen.value;
  if (currentValue != "" && operatorFlag === false) {
    cScreen.value = `${currentValue}/`;
    returnFlag = false;
    operatorFlag = true;
  }
});

multiply.addEventListener("click", () => {
  const currentValue = cScreen.value;
  if (currentValue != "" && operatorFlag === false) {
    cScreen.value = `${currentValue}*`;
    returnFlag = false;
    operatorFlag = true;
  }
});

subtract.addEventListener("click", () => {
  const currentValue = cScreen.value;
  if (currentValue != "" && operatorFlag === false) {
    cScreen.value = `${currentValue}-`;
    returnFlag = false;
    operatorFlag = true;
  }
});

add.addEventListener("click", () => {
  const currentValue = cScreen.value;
  if (currentValue != "" && operatorFlag === false) {
    cScreen.value = `${currentValue}+`;
    returnFlag = false;
    operatorFlag = true;
  }
});

decimal.addEventListener("click", () => {
  const currentValue = cScreen.value;
  const lastValue = currentValue[currentValue.length - 1];
  if (currentValue === "") {
    cScreen.value = `0.`;
  } else if (lastValue === ".") {
    return;
  } else if (operatorFlag === true) {
    cScreen.value = `${currentValue}0.1`;
    operatorFlag = false;
  } else {
    cScreen.value = `${currentValue}.`;
  }
});

equals.addEventListener("click", () => {
  const currentValue = cScreen.value;
  if (currentValue != "" && isNaN(currentValue)) {
    cScreen.value = eval(currentValue);
    returnFlag = true;
  }
});
