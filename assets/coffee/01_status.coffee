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

          if channelStream != null
              channelStatus = "online"

          feedList.innerHTML += "<div class='stream-block " + channelStatus + "' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><h3>" + name + "</h3><a href='" + channelUrl + "' target='_blank' class='link'>View Channel</a><p>Status: " + channelStatus + "</p></div>"
      error: (errorMessage) ->
          feedList.innerHTML += "<div class='stream-block'><p>Error: Status not found</p></div>"
