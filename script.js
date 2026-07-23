const result = document.getElementById("result");
const history = document.getElementById("history");

let current = "0";
let expression = "";

function updateDisplay() {
    result.textContent = current;
    history.textContent = expression;
}

document.querySelectorAll(".number").forEach(btn => {
    btn.onclick = () => {
        current = current === "0" ? btn.textContent : current + btn.textContent;
        updateDisplay();
    };
});

document.querySelector(".decimal").onclick = () => {
    if (!current.includes(".")) {
        current += ".";
        updateDisplay();
    }
};

document.querySelectorAll(".operator").forEach(btn => {
    btn.onclick = () => {
        expression += current + btn.textContent.replace("×","*").replace("÷","/").replace("−","-");
        current = "0";
        updateDisplay();
    };
});

document.querySelector(".equal").onclick = () => {
    try {
        current = eval(expression + current).toString();
        expression = "";
    } catch {
        current = "Error";
        expression = "";
    }
    updateDisplay();
};

document.querySelector(".clear").onclick = () => {
    current = "0";
    expression = "";
    updateDisplay();
};

document.querySelector(".plusminus").onclick = () => {
    current = (parseFloat(current) * -1).toString();
    updateDisplay();
};

document.querySelector(".percent").onclick = () => {
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
};

updateDisplay();
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key)) {
        document.querySelectorAll(".number").forEach(btn => {
            if (btn.textContent === key) btn.click();
        });
    }

    if (key === ".") document.querySelector(".decimal").click();
    if (key === "+") document.querySelectorAll(".operator")[3].click();
    if (key === "-") document.querySelectorAll(".operator")[2].click();
    if (key === "*") document.querySelectorAll(".operator")[1].click();
    if (key === "/") document.querySelectorAll(".operator")[0].click();
    if (key === "Enter" || key === "=") document.querySelector(".equal").click();
    if (key === "Escape") document.querySelector(".clear").click();
    if (key === "%") document.querySelector(".percent").click();
});