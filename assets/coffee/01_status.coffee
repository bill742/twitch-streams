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

          feedList.innerHTML += "<div class='stream-block' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><h3>" + name + "</h3><p>Status: " + channelStatus + "</p><a href='" + channelUrl + "' target='_blank' class='link'>View Channel</a></div>"
      error: (errorMessage) ->
          feedList.innerHTML += "<div class='stream-block'><p>Error: Status not found</p></div>"
