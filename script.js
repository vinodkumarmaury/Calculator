console.log('working')

var result = document.getElementById("display");
var buttons = document.getElementsByClassName("box");
var operand1 = 0;
var operand2 = null;
var operator = null;

// Function to update the display with the current value or "0" if the value is empty
function updateDisplay(value) {
  result.value = value || "0";
}

// Initialize display with "0"
updateDisplay();

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var value = this.getAttribute("data-value");

    if (
      value === "+" ||
      value === "/" ||
      value === "*" ||
      value === "-"
    ) {
      if (result.value !== "") {
        // Check if the last character is an operator
        var lastChar = result.value.slice(-1);
        if (lastChar === "+" || lastChar === "/" || lastChar === "*" || lastChar === "-") {
          // Replace the last operator with the new one
          result.value = result.value.slice(0, -1) + value;
        } else {
          // Append operator
          result.value += " " + value + " ";
        }
      }
    } else if (value === "=") {
      if (result.value !== "") {
        operand2 = parseFloat(result.value);
        calculate();
      }
    } else if (value === "AC") {
      clear();
    } else if (value === "CE") {
      // Remove the last character from the display
      result.value = result.value.slice(0, -1);
    } else if (value === "+/-") {
      if (result.value !== "") {
        // Toggle sign of the current value
        result.value = parseFloat(result.value) * -1;
      }
    } else {
      if (result.value === "0") {
        // Replace "0" with the clicked number
        result.value = value;
      } else {
        // Append value to the display
        result.value += value;
      }
    }
  });
}

document.addEventListener('keydown', function(event) {
  var key = event.key;
  var validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '/', '*', '-', '=', 'Enter', 'Escape'];

  if (validKeys.includes(key)) {
    event.preventDefault();

    if (key === 'Enter') {
      key = '=';
    } else if (key === 'Escape') {
      key = 'AC';
    }

    var button = document.querySelector('button[data-value="' + key + '"]');
    if (button) {
      button.click();
    }
  }
});

function calculate() {
  var expression = result.value;
  var resultValue = eval(expression); // Using eval to evaluate the expression

  // Check if the result is a valid number
  if (!isNaN(resultValue) && isFinite(resultValue)) {
    updateDisplay(resultValue);
    operand1 = resultValue;
    operand2 = null;
    operator = null;
  } else {
    result.value = "Error";
  }
}

function clear() {
  updateDisplay(); // Reset display to "0"
  operand1 = 0;
  operand2 = null;
  operator = null;
}
