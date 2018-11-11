$(window).load(function () {
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
	if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
  $('#generate').click(function () {
    genPassword();
  });

  $('#length').keypress(function (e) {
    // keyCode 13 = 'Enter'
    if (e.keyCode === 13) {
      genPassword();
    }
  });

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function genPassword() {
    var pass = '';
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
          161,
          9999
        ]);
      }
      if (document.getElementById('s').checked) {
        a.push([
          33,
          47
        ]);
      }
      if (document.getElementById('sp').checked) {
        a.push([
          32,
          32
        ]);
      }
      var type = getRandomInt(0, a.length - 1);
      var min = a[type][0];
      var max = a[type][1];
      pass += String.fromCharCode(getRandomInt(min, max));
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
      $('#password-button-span').tooltip('hide');
    }, 2000);
  }

  var clipboard = new Clipboard('#password-button');

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

