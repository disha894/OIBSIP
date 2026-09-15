// DOM Elements
const tempInput = document.getElementById('tempInput');
const unitSelect = document.getElementById('unitSelect');
const convertBtn = document.getElementById('convertBtn');

const celsiusResult = document.getElementById('celsiusResult');
const fahrenheitResult = document.getElementById('fahrenheitResult');
const kelvinResult = document.getElementById('kelvinResult');

const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const resultCards = document.querySelectorAll('.result-card');

function animateResultCards() {
  resultCards.forEach((card) => {
    card.classList.remove('pop');
    void card.offsetWidth;
    card.classList.add('pop');
  });
}

// Helper: Clear UI Errors
function clearError() {
  errorMessage.style.display = 'none';
  errorText.textContent = '';
}

// Helper: Display UI Errors
function showError(msg) {
  errorText.textContent = msg;
  errorMessage.style.display = 'flex';
  celsiusResult.textContent = '-- °C';
  fahrenheitResult.textContent = '-- °F';
  kelvinResult.textContent = '-- K';
}

// Core Calculation Logic
function convertTemperature() {
  clearError();
  const rawValue = tempInput.value.trim();

  // Validation 1: Check for empty/non-numeric input
  if (rawValue === '' || isNaN(rawValue)) {
    showError('Please enter a valid numeric value.');
    return;
  }

  const val = parseFloat(rawValue);
  const unit = unitSelect.value;

  let celsiusVal, fahrenheitVal, kelvinVal;

  // Validation 2: Check Absolute Zero Violations based on selected input unit
  if (unit === 'Celsius' && val < -273.15) {
    showError('Value cannot be below absolute zero (-273.15°C).');
    return;
  }
  if (unit === 'Fahrenheit' && val < -459.67) {
    showError('Value cannot be below absolute zero (-459.67°F).');
    return;
  }
  if (unit === 'Kelvin' && val < 0) {
    showError('Value cannot be below absolute zero (0 K).');
    return;
  }

  // Perform conversion step by step
  if (unit === 'Celsius') {
    celsiusVal = val;
    fahrenheitVal = (val * 9 / 5) + 32;
    kelvinVal = val + 273.15;
  } else if (unit === 'Fahrenheit') {
    celsiusVal = (val - 32) * 5 / 9;
    fahrenheitVal = val;
    kelvinVal = celsiusVal + 273.15;
  } else if (unit === 'Kelvin') {
    celsiusVal = val - 273.15;
    fahrenheitVal = (celsiusVal * 9 / 5) + 32;
    kelvinVal = val;
  }

  // Display all units simultaneously with formatted precision
  celsiusResult.textContent = `${celsiusVal.toFixed(2)} °C`;
  fahrenheitResult.textContent = `${fahrenheitVal.toFixed(2)} °F`;
  kelvinResult.textContent = `${kelvinVal.toFixed(2)} K`;

  animateResultCards();
}

// Event Listeners
convertBtn.addEventListener('click', convertTemperature);

// Real-time input validation on keystrokes
tempInput.addEventListener('input', () => {
  if (errorMessage.style.display === 'flex') {
    clearError();
  }
});