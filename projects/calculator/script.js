// script.js

function appendToDisplay(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculate() {
  try {
    let result = eval(document.getElementById('display').value);
    if (isNaN(result) || !isFinite(result)) {
      throw new Error('Invalid calculation');
    }
    document.getElementById('display').value = result;
  } catch (error) {
    document.getElementById('display').value = 'Error';
  }
}

function backspace() {
  let display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function toggleSign() {
  let display = document.getElementById('display');
  let currentValue = display.value;

  if (currentValue.startsWith('-')) {
    display.value = currentValue.slice(1);
  } else if(currentValue !== ''){
    display.value = '-' + currentValue;
  }
}

function calculateSquareRoot() {
  let display = document.getElementById('display');
  let value = parseFloat(display.value);
  if (!isNaN(value) && value >= 0) {
    display.value = Math.sqrt(value);
  } else {
    display.value = 'Error';
  }
}

function calculatePower() {
  let display = document.getElementById('display');
  let value = display.value;
  if(value.includes('^')){
      let parts = value.split("^");
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          display.value = Math.pow(parseFloat(parts[0]), parseFloat(parts[1]));
      } else {
          display.value = "Error";
      }
  } else {
      display.value += "^";
  }
}

function calculateFactorial() {
  let display = document.getElementById('display');
  let value = parseInt(display.value);
  if (!isNaN(value) && value >= 0) {
    let result = 1;
    for (let i = 2; i <= value; i++) {
      result *= i;
    }
    display.value = result;
  } else {
    display.value = 'Error';
  }
}

function calculateLog() {
  let display = document.getElementById('display');
  let value = parseFloat(display.value);
  if (!isNaN(value) && value > 0) {
    display.value = Math.log10(value);
  } else {
    display.value = 'Error';
  }
}

function validateInput(input) {
  let validChars = /^[0-9+\-*/%.^√!log()=]+$/;
  let currentValue = input.value;
  let lastChar = currentValue.slice(-1);

  if (currentValue.length > 0 && !validChars.test(lastChar)) {
    input.value = currentValue.slice(0, -1);
  }
}

function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === "=") { // Added "=" key check
        calculate();
        event.preventDefault();
    }
}