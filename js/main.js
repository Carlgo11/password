$(window).on('load', function () {
    $('body').fadeIn();
});

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

document.querySelectorAll('input[type=number]').forEach(el => {

})

document.querySelectorAll('input[type=checkbox]').forEach(el => {

})


$(document).ready(function () {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }

    $('#generate').click(function () {
        genPassword();
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getAvailableChars() {
        let a = [];
        /* Numbers */
        if (document.getElementById('d').checked) {
            a.push([
                48,
                57
            ]);
        }

        /* Uppercase letters */
        if (document.getElementById('u').checked) {
            a.push([
                65,
                90
            ]);
        }

        /* Lowercase letters */
        if (document.getElementById('l').checked) {
            a.push([
                97,
                122
            ]);
        }

        /* Unicode characters */
        if (document.getElementById('un').checked) {
            a.push([[
                42128,
                44031
            ], [
                55216,
                129647
            ], [
                192, 8587
            ], [
                42240, 42539
            ]]);
        }

        /* Special characters */
        if (document.getElementById('s').checked) {
            a.push([[
                33, 47
            ], [
                58, 64
            ], [
                91, 96
            ], [
                123, 126
            ]]);
        }

        /* Space */
        if (document.getElementById('sp').checked) {
            a.push([
                32,
                32
            ]);
        }
        return a;
    }

    function genPassword() {
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

            // console.log(min + "\t" + max);
            const newint = getRandomInt(min, max);
            const newchar = String.fromCharCode(newint);

            // console.log((1 + pass.length) + ": char:" + newchar + "\t int:" + newint); // Debug

            pass += newchar;
        }

        $('#password').val(pass.toString());
        if ($('#password-div').css('visibility') !== 'visible') {
            $('#password-div').css('visibility', 'visible').hide().fadeIn();
        }
    }

    let clipboard = new ClipboardJS('#password-button');

    clipboard.on('success', function (e) {
        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Error copying to clipboard.' + e);
    });
});
