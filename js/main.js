document.querySelectorAll('input[type=number]').forEach(el => {
    const v = localStorage.getItem(el.id)
    if (v) el.value = v;
    el.onchange = () => localStorage.setItem(el.id, el.value);
})

document.querySelectorAll('input[type=checkbox]').forEach(el => {
    el.onchange = () => localStorage.setItem(el.id, el.checked);
    const v = localStorage.getItem(el.id)
    if (v === 'true') el.checked = true; else if (v === 'false') el.checked = false;
})

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/js/service-worker.js',{ scope: '/' }).then(r => console.debug(r));

document.getElementById('generate').addEventListener('click', () => {
    const availableChars = getAvailableChars();
    const maxLength = document.getElementById('length').value;

    const passwordArray = [];
    for(let i = 0; i < maxLength;i++){
        const typeIndex = getRandomInt(0, availableChars.length - 1);
        const [min, max] = getRandomRange(availableChars[typeIndex]);
        passwordArray.push(String.fromCharCode(getRandomInt(min, max)));
    }

    document.getElementById('password').value = passwordArray.join('');
    document.getElementById('passwordContainer').style.gridTemplateColumns = `min(${passwordArray.length}ch, calc(100% - 36px)) 36px`;

    const passwordDisplay = document.getElementById('passwordDisplay');
    if (passwordDisplay.style.opacity !== '1') {
        passwordDisplay.style.opacity = '1';
    }
});

document.getElementById('copy').addEventListener('click', async () => {
    try {
        const passwordInput = document.getElementById('password');
        await navigator.clipboard.writeText(passwordInput.value);
        console.info('Password copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
});

const getRandomRange = (range) => {
    if (range[0] !== undefined && range[0].constructor === Array) {
        const randomIndex = getRandomInt(0, range.length - 1);
        return [range[randomIndex][0], range[randomIndex][1]];
    } else {
        return [range[0], range[1]];
    }
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getAvailableChars = () => {
    const charRanges = {
        d: [48, 57], // Numbers
        u: [65, 90], // Uppercase letters
        l: [97, 122], // Lowercase letters
        un: [[42128, 44031], [55216, 129647], [192, 8587], [42240, 42539]], // Unicode characters
        s: [[33, 47], [58, 64], [91, 96], [123, 126]], // Special characters
        sp: [32, 32] // Space
    };
    let a = [];
    for (const key in charRanges) {
        if (document.getElementById(key).checked) {
            a.push(charRanges[key]);
        }
    }
    return a;
};
