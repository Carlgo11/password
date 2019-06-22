$(window).on('load', function () {
    $('body').fadeIn();
});

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

    function genPassword() {
        let pass = '';

        for (let i = 0; i < document.getElementById('length').value; i++) {
            let a = [];
            if (document.getElementById('d').checked) {
                a.push([
                    48,
                    57
                ]);
            }
            if (document.getElementById('u').checked) {
                a.push([
                    65,
                    90
                ]);
            }
            if (document.getElementById('l').checked) {
                a.push([
                    97,
                    122
                ]);
            }
            if (document.getElementById('un').checked) {
                a.push([
                    42128,
                    44031
                ], [
                    55216,
                    129647
                ], [
                    192, 8587
                ], [
                    42240, 42539
                ]);
            }
            if (document.getElementById('s').checked) {
                a.push([
                    33, 47
                ], [
                    58, 64
                ], [
                    91, 96
                ], [
                    123, 126
                ]);
            }
            if (document.getElementById('sp').checked) {
                a.push([
                    32,
                    32
                ]);
            }
            const type = getRandomInt(0, a.length - 1);
            const min = a[type][0];
            const max = a[type][1];
            const newint = getRandomInt(min, max);
            const newchar = String.fromCharCode(newint);
            // console.log((1 + pass.length) + ": " + newchar + "\t" + newint); // Debug
            pass += newchar;
        }

        $('#password').val(pass.toString());
        if ($('#password').css('visibility') !== 'visible') {
            $('#password-div').css('visibility', 'visible').hide().fadeIn();
        }
    }

    function setTooltip(message) {
        $('#password-button-span').tooltip('hide')
            .attr('data-original-title', message)
            .tooltip('show');
    }

    function hideTooltip() {
        setTimeout(function () {
            $('#password-button-span').tooltip('dispose');
        }, 2000);
    }

    let clipboard = new Clipboard('#password-button');

    clipboard.on('success', function (e) {
        e.clearSelection();
        setTooltip('Copied!');
        hideTooltip();
    });

    clipboard.on('error', function (e) {
        setTooltip('Error');
        console.error('Error copying to clipboard.' + e);
    });
});
