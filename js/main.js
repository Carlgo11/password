document.querySelectorAll('input[type=number]').forEach(el => {
    const v = localStorage.getItem(el.id)
    if (v) el.value = v;
    el.onchange = () => localStorage.setItem(el.id, el.value);
})

document.querySelectorAll('input[type=checkbox]').forEach(el => {
    el.onchange = () => localStorage.setItem(el.id, el.checked);
    const v = localStorage.getItem(el.id)
    if (v === 'true') el.checked = true;
    else if (v === 'false') el.checked = false;
})

document.addEventListener("DOMContentLoaded", () => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
});

document.getElementById('generate').addEventListener('click', () => {
    let pass = '';
    const a = getAvailableChars();

    for (let i = 0; i < document.getElementById('length').value; i++) {

        const type = getRandomInt(0, a.length - 1);
        let min;
        let max;
        /* Check if a is 2D array */
        if (a[type][0] !== undefined && a[type][0].constructor === Array) {
            const charRange = getRandomInt(0, a[type].length - 1);
            min = a[type][charRange][0];
            max = a[type][charRange][1];
        } else {
            min = a[type][0];
            max = a[type][1];
        }
        pass += String.fromCharCode(getRandomInt(min, max));
    }
    document.getElementById('password').value = pass;
    document.getElementById('pass-inner').style.gridTemplateColumns = `min(${pass.length}ch,100%) 36px`
    const passwordDiv = document.getElementById('password-container');
    if (passwordDiv.style.opacity !== '1') passwordDiv.style.opacity = '1';
});

document.getElementById('password-button').addEventListener('click', async () => {
    try {
        const passwordInput = document.getElementById('password');
        await navigator.clipboard.writeText(passwordInput.value);
        console.info('Password copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
});


const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getAvailableChars = () => {
    let a = [];
    /* Numbers */
    if (document.getElementById('d').checked) {
        a.push([48, 57]);
    }

    /* Uppercase letters */
    if (document.getElementById('u').checked) {
        a.push([65, 90]);
    }

    /* Lowercase letters */
    if (document.getElementById('l').checked) {
        a.push([97, 122]);
    }

    /* Unicode characters */
    if (document.getElementById('un').checked) {
        a.push([[42128, 44031], [55216, 129647], [192, 8587], [42240, 42539]]);
    }

    /* Special characters */
    if (document.getElementById('s').checked) {
        a.push([[33, 47], [58, 64], [91, 96], [123, 126]]);
    }

    /* Space */
    if (document.getElementById('sp').checked) {
        a.push([32, 32]);
    }
    return a;
}
