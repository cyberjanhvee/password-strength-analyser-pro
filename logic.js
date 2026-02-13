function analyzePassword() {
    const pwd = document.getElementById("password").value;
    const output = document.getElementById("output-container");
    const ring = document.getElementById("progress-ring");
    const scoreText = document.getElementById("score-text");
    const statusLabel = document.getElementById("status-label");

    // Reveal UI
    output.classList.remove("hidden");
    output.classList.add("show");

    // 1. Requirements Check
    const hasLength = pwd.length >= 8;
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
    const hasUpper  = /[A-Z]/.test(pwd) && /[a-z]/.test(pwd);

    updateRequirement("req-length", hasLength);
    updateRequirement("req-number", hasNumber);
    updateRequirement("req-symbol", hasSymbol);
    updateRequirement("req-upper", hasUpper);

    // 2. Calculate Score (0 - 100)
    let score = 0;
    if (pwd.length > 0) score += 10;
    if (pwd.length > 4) score += 10;
    if (hasLength) score += 20;
    if (hasNumber) score += 20;
    if (hasSymbol) score += 20;
    if (hasUpper) score += 20;
    if (score > 100) score = 100;

    // 3. Animate Graph
    // Circumference of circle with r=70 is ~440 (2 * pi * r)
    const circleCircumference = 440; 
    const offset = circleCircumference - (score / 100) * circleCircumference;

    // Set Color based on Score
    let color = "#ff3333"; // Red
    let label = "Weak";

    if (score > 40) {
        color = "#ffbd29"; // Yellow
        label = "Medium";
    }
    if (score > 80) {
        color = "#0f0"; // Bright Green
        label = "Strong";
    }

    // Apply Styles (delay slightly for transition effect)
    setTimeout(() => {
        ring.style.strokeDashoffset = offset;
        ring.style.setProperty('--clr', color);
        scoreText.innerHTML = `${score}<span>%</span>`;
        scoreText.style.color = color;
        statusLabel.innerText = label;
        statusLabel.style.color = color;
    }, 100);
}

function updateRequirement(id, isValid) {
    const el = document.getElementById(id);
    const icon = el.querySelector("i");

    if (isValid) {
        el.classList.add("valid");
        icon.className = "fas fa-check-circle";
    } else {
        el.classList.remove("valid");
        icon.className = "fas fa-circle";
    }
}