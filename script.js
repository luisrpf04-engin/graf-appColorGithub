const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");

const rValue = document.getElementById("rValue");
const gValue = document.getElementById("gValue");
const bValue = document.getElementById("bValue");

const colorBox = document.getElementById("colorBox");
const rgbText = document.getElementById("rgbText");
const hexText = document.getElementById("hexText");
const hexInput = document.getElementById("hexInput");
const colorPicker = document.getElementById("colorPicker");

const historyContainer = document.getElementById("colorHistory");
const themeToggle = document.getElementById("themeToggle");

let colorHistory = [];
const maxHistory = 8;

function toHex(value) {
    let hex = Number(value).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function updateColor() {
    const r = redSlider.value;
    const g = greenSlider.value;
    const b = blueSlider.value;

    rValue.textContent = r;
    gValue.textContent = g;
    bValue.textContent = b;

    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    colorBox.style.backgroundColor = rgbColor;
    rgbText.textContent = rgbColor;

    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    hexText.textContent = hexColor;
    hexInput.value = hexColor;
    colorPicker.value = hexColor;

    addToHistory(hexColor);
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(hex)) return null;

    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

function updateFromHex() {
    const rgb = hexToRgb(hexInput.value.trim());
    if (rgb) {
        redSlider.value = rgb.r;
        greenSlider.value = rgb.g;
        blueSlider.value = rgb.b;
        updateColor();
        hexInput.classList.remove("is-invalid");
    } else {
        hexInput.classList.add("is-invalid");
    }
}

function updateFromPicker() {
    const rgb = hexToRgb(colorPicker.value);
    if (rgb) {
        redSlider.value = rgb.r;
        greenSlider.value = rgb.g;
        blueSlider.value = rgb.b;
        updateColor();
    }
}

function addToHistory(hex) {
    if (colorHistory.includes(hex)) return;
    colorHistory.unshift(hex);
    if (colorHistory.length > maxHistory) colorHistory.pop();
    renderHistory();
}

function renderHistory() {
    historyContainer.innerHTML = "";
    colorHistory.forEach(color => {
        const div = document.createElement("div");
        div.className = "color-history-item";
        div.style.backgroundColor = color;
        div.title = color;
        div.addEventListener("click", () => {
            hexInput.value = color;
            updateFromHex();
        });
        historyContainer.appendChild(div);
    });
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    themeToggle.textContent = isLight ? "Modo oscuro" : "Modo claro";
    themeToggle.classList.toggle("btn-outline-dark", isLight);
    themeToggle.classList.toggle("btn-outline-light", !isLight);
});

redSlider.addEventListener("input", updateColor);
greenSlider.addEventListener("input", updateColor);
blueSlider.addEventListener("input", updateColor);
hexInput.addEventListener("change", updateFromHex);
hexInput.addEventListener("keyup", e => { if (e.key === "Enter") updateFromHex(); });
colorPicker.addEventListener("input", updateFromPicker);

updateColor();
