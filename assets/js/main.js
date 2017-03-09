function channel(username, background, logo, name, channelUrl) {
  var stream = "https://wind-bow.gomix.me/twitch-api/streams/" + username + "?callback=?";

  $.getJSON(stream, function(channels) {
    var channelStatus = "offline";
    var channelStream = channels.stream;

    if (channelStream !== null) {
       channelStatus = "online";
    }

    // return channelStatus;
    feedList.innerHTML += "<div class='stream-block' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><h3>" + name + "</h3><p>Status: " + channelStatus + "</p><p><a href='" + channelUrl + "'>View Channel</a></p></div>";
  });
}

function getFeeds() {
  var feeds = ['freecodecamp', 'noobs2ninjas', 'habathcx', 'medrybw'];
  feeds = feeds.sort();
  var url = "";

  for (var i = 0; i < feeds.length; i++) {
    url = "https://wind-bow.gomix.me/twitch-api/channels/" + feeds[i] + "?callback=?";

    $.getJSON(url, function (data) {
      // console.log(data);
      var name = data.display_name;
      var logo = data.logo;
      var channelUrl = data.url;
      var background;
      var bannerBg = data.profile_banner;
      if (data.profile_banner !== null) {
        background = bannerBg;
      } else {
        background = "/images/twitch-bg.png";
      }

      var username = data.name;
      var feedList = document.getElementById('feedList');

      // Get channel online status
      channel(username, background, logo, name, channelUrl);

    });
  }
}
getFeeds();
