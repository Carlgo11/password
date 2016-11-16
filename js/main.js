document.getElementById('generate').onclick = genPassword;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genPassword() {
    var pass = "";
    for (i = 0; i < document.getElementById('length').value; i++) {
        var a = [];

        if (document.getElementById('d').checked) {
            a.push([48, 57]);
        }

        if (document.getElementById('u').checked) {
            a.push([65, 90]);
        }

        if (document.getElementById('l').checked) {
            a.push([97, 122]);
        }

        if (document.getElementById('un').checked) {
            a.push([161, 9999]);
        }

        if (document.getElementById('s').checked) {
            a.push([33, 47]);
        }

        if (document.getElementById('sp').checked) {
            a.push([32, 32]);
        }

        var type = getRandomInt(0, a.length - 1);
        var min = a[type][0];
        var max = a[type][1];
        var randUnicode = String.fromCharCode(getRandomInt(min, max));
        pass += randUnicode;
    }
    document.getElementById('password').value = pass.toString();
}