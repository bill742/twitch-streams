var channel;

channel = function(username, background, logo, name, channelUrl) {
  var stream;
  stream = "";
  return $.ajax({
    type: "GET",
    url: "https://wind-bow.gomix.me/twitch-api/streams/" + username + "?callback=?",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function(channels, textStatus, jqXHR) {
      var channelStatus, channelStream;
      channelStatus = "offline";
      channelStream = channels.stream;
      if (channelStream !== null) {
        channelStatus = "online";
      }
      return feedList.innerHTML += "<div class='stream-block' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><h3>" + name + "</h3><a href='" + channelUrl + "' target='_blank' class='link'>View Channel</a><p>Status: " + channelStatus + "</p></div>";
    },
    error: function(errorMessage) {
      return feedList.innerHTML += "<div class='stream-block'><p>Error: Status not found</p></div>";
    }
  });
};

var getFeeds;

getFeeds = function() {
  var feeds, i, results, url;
  feeds = ['freecodecamp', 'noobs2ninjas', 'habathcx', 'medrybw'];
  feeds = feeds.sort();
  url = "";
  i = 0;
  results = [];
  while (i < feeds.length) {
    url = "https://wind-bow.gomix.me/twitch-api/channels/" + feeds[i] + "?callback=?";
    $.getJSON(url, function(data) {
      var background, bannerBg, channelUrl, feedList, logo, name, username;
      name = data.display_name;
      logo = data.logo;
      channelUrl = data.url;
      background;
      bannerBg = data.profile_banner;
      if (data.profile_banner !== null) {
        background = bannerBg;
      } else {
        background = "/images/twitch-bg.png";
      }
      username = data.name;
      feedList = document.getElementById('feedList');
      return channel(username, background, logo, name, channelUrl);
    });
    results.push(i++);
  }
  return results;
};

getFeeds();
