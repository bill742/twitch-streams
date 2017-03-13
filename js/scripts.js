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
      var channelStatus, channelStream, streamStatus;
      channelStatus = "offline";
      channelStream = channels.stream;
      streamStatus = "";
      if (channelStream !== null) {
        channelStatus = "online";
        streamStatus = channels.stream.channel.status;
      }
      if (name === void 0) {

      } else {
        return feedList.innerHTML += "<div class='stream-block " + channelStatus + "' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><h3>" + name + "</h3><a href='" + channelUrl + "' target='_blank' class='link'>View Channel</a><p>Status: " + channelStatus + "</p><p>" + streamStatus + "</p></div>";
      }
    },
    error: function(errorMessage) {
      return feedList.innerHTML += "<div class='stream-block'><p>Error: Status not found</p></div>";
    }
  });
};

var getFeeds;

getFeeds = function() {
  var feeds, i, results, url;
  feeds = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
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

var offline, online, showAll;

online = function() {
  $('.stream-block.offline').addClass('hide');
  return $('.stream-block.online').removeClass('hide');
};

offline = function() {
  $('.stream-block.online').addClass('hide');
  return $('.stream-block.offline').removeClass('hide');
};

showAll = function() {
  return $('.stream-block.offline, .stream-block.online').removeClass('hide');
};

document.getElementById("online").onclick = online;

document.getElementById("offline").onclick = offline;

document.getElementById("all").onclick = showAll;
