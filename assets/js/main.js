$( document ).ready(function() {
  $.getJSON('https://wind-bow.gomix.me/twitch-api/users/freecodecamp?callback=?', function (data) {
    console.log(data);
  });
});
