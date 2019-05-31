$(window).on('load', function () {
    $('body').fadeIn();
    $.showLoading({
        callback: function () {
            $.hideLoading();
        }
    });
});

$(document).on('pageload', function () {
    $.showLoading({
        name: 'jump-pulse'
    });
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

    /* function getEmojis() {
         fetch('//rawgit.com/iamcal/emoji-data/master/emoji.json')
             .then(r => r.json())
             .then(list => {
                 let map = list.reduce((acc, {short_name: n, short_names, unified}) => {
                     unified = unified.replace(/(^|-)([a-z0-9]+)/gi, (s, b, cp) => (
                         String.fromCodePoint()
                     ));
                     console.log(unified);

                     if (n && !n.match(/^(flag|skin)\-\w+$/)) {
                         acc[n] = unified;
                         for (let i = short_names.length; i--;) {
                             if (short_names[i] !== n) {
                                 acc[short_names[i]] = unified;
                             }
                         }
                     }
                     return acc;
                 }, {});

 // console.log(JSON.stringify(map,null,'  '));
                 return JSON.stringify(map, null, '  ');
             })
     }*/

    function genPassword() {
        let pass = '';

        for (i = 0; i < document.getElementById('length').value; i++) {
            var a = [];
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
            /*if (document.getElementById('em').checked) {
                var emojis = getEmojis();
                a.push([10175, 10175]);
            }*/
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
        $('#new-password').fadeIn();
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
