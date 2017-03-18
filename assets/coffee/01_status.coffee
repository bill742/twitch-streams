channel = (username, background, logo, name, channelUrl) ->
    stream = ""

    $.ajax
      type: "GET"
      url: "https://wind-bow.gomix.me/twitch-api/streams/" + username + "?callback=?"
      contentType: "application/json; charset=utf-8"
      async: false
      dataType: "json"
      success: (channels, textStatus, jqXHR) ->
        channelStatus = "offline"
        channelStream = channels.stream
        streamStatus = ""
        current = ""
        embed = ""
        online_Status = document.getElementById('online_Status')
        lean_overlay = document.getElementById('lean_overlay')

        if channelStream != null
          channelStatus = "online"
          streamStatus = channels.stream.channel.status
          current = "<p class='stream'><span>Currently showing:</span> " + streamStatus + "</p>"
          # Embed code for channel in modal window. Currently requires Twitch API key
          embed = "<iframe src='http://player.twitch.tv/?channel=" + name + "' allowfullscreen autoplay: false></iframe>"

        if name == undefined
          # do nothing
        else
          feedList.innerHTML += "<div class='stream-block " + channelStatus + "'><div class='stream-block-top' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><a href='" + channelUrl + "' target='_blank' class='link'>View on Twitch</a></div><div class='stream-block-bottom'><h3>" + name + "</h3><p class='channel-status'><span>Status:</span> " + channelStatus + "</p>" + current + "</div></div>"

      error: (errorMessage) ->
          feedList.innerHTML += "<div class='stream-block'><p>Error: Status not found</p></div>"
