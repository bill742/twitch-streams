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
      var channelStatus, channelStream, current, embed, lean_overlay, online_Status, streamStatus;
      channelStatus = "offline";
      channelStream = channels.stream;
      streamStatus = "";
      current = "";
      embed = "";
      online_Status = document.getElementById('online_Status');
      lean_overlay = document.getElementById('lean_overlay');
      if (channelStream !== null) {
        channelStatus = "online";
        streamStatus = channels.stream.channel.status;
        current = "<p class='stream'><span>Currently showing:</span> " + streamStatus + "</p>";
        embed = "<iframe src='http://player.twitch.tv/?channel=" + name + "' allowfullscreen autoplay: false></iframe>";
      }
      if (name === void 0) {

      } else {
        return feedList.innerHTML += "<div class='stream-block " + channelStatus + "'><div class='stream-block-top' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><a href='" + channelUrl + "' target='_blank' class='link'>View on Twitch</a></div><div class='stream-block-bottom'><h3>" + name + "</h3><p class='channel-status'><span>Status:</span> " + channelStatus + "</p>" + current + "</div></div>";
      }
    },
    error: function(errorMessage) {
      return feedList.innerHTML += "<div class='stream-block'><p>Error: Status not found</p></div>";
    }
  });
};

var getFeeds;

getFeeds = function() {
  var feeds, i, results, sorted, url;
  feeds = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
  sorted = feeds.sort();
  url = "";
  i = 0;
  results = [];
  while (i < sorted.length) {
    console.log(sorted);
    url = "https://wind-bow.gomix.me/twitch-api/channels/" + sorted[i] + "?callback=?";
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
