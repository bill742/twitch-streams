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

          if channelStream != null
              channelStatus = "online"
              streamStatus = channels.stream.channel.status
              $('.stream').css('display', 'block');

          if name == undefined
            # do nothing
          else
            feedList.innerHTML += "<div class='stream-block " + channelStatus + "'><div class='stream-block-top' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><a href='" + channelUrl + "' target='_blank' class='link'>View Channel</a></div><div class='stream-block-bottom'><h3>" + name + "</h3><p>Status: " + channelStatus + "</p><p class='stream'>Currently playing: " + streamStatus + "</p></div></div>"

      error: (errorMessage) ->
          feedList.innerHTML += "<div class='stream-block'><p>Error: Status not found</p></div>"
