document.addEventListener('DOMContentLoaded', function () {

    /*** ================================
     * 1. First Law Interactive Demo
     * =================================*/
    if (document.getElementById('inertia-demo')) {
        const object = document.getElementById('demo-object');
        const pushButton = document.getElementById('push-object');
        const resetButton = document.getElementById('reset-demo');
        const explanation = document.getElementById('demo-explanation');

        pushButton.addEventListener('click', function () {
            object.style.transform = 'translateX(200px)';
            explanation.textContent =
                "The object moves when force is applied, but would stay at rest otherwise.";
        });

        resetButton.addEventListener('click', function () {
            object.style.transform = 'translateX(0)';
            explanation.textContent =
                "Click 'Apply Force' to see how the object resists changes to its motion.";
        });
    }

    /*** ================================
     * 2. Second Law Calculator
     * =================================*/
    if (document.getElementById('calculate-force')) {
        const calculateButton = document.getElementById('calculate-force');
        const massInput = document.getElementById('mass');
        const accelerationInput = document.getElementById('acceleration');
        const resultDiv = document.getElementById('force-result');

        calculateButton.addEventListener('click', function () {
            const mass = parseFloat(massInput.value);
            const acceleration = parseFloat(accelerationInput.value);

            if (isNaN(mass) || isNaN(acceleration)) {
                resultDiv.textContent =
                    "Please enter valid numbers for mass and acceleration.";
                resultDiv.style.backgroundColor = "#fdedec";
                resultDiv.style.color = "#e74c3c";
            } else {
                const force = mass * acceleration;
                resultDiv.textContent = `Force = ${force.toFixed(2)} N`;
                resultDiv.style.backgroundColor = "#e8f8f5";
                resultDiv.style.color = "#27ae60";
            }
        });
    }

    /*** ================================
     * 3. Make Law Cards Clickable
     * =================================*/
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const url = onclickAttr.split("'")[1];
                window.location.href = url;
            }
        });
    });

    /*** ================================
     * 4. Hamburger Menu for Small Screens
     * =================================*/
    // Create hamburger button dynamically
    const nav = document.querySelector('nav ul');
    if (nav) {
        const hamburger = document.createElement('div');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        nav.parentNode.insertBefore(hamburger, nav);

        hamburger.addEventListener('click', function () {
            nav.classList.toggle('nav-open');
            this.classList.toggle('active');
        });
    }
});
