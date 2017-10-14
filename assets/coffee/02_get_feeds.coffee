getFeeds = ->
    feeds = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'noopkat']

    feeds.sort (a, b) ->
      a.toLowerCase().localeCompare b.toLowerCase()

    url = ""

    i = 0
    while i < feeds.length

      url = "https://wind-bow.gomix.me/twitch-api/channels/" + feeds[i] + "?callback=?"

      $.getJSON url, (data)->
          name = data.display_name
          logo = data.logo
          channelUrl = data.url
          background = ""
          bannerBg = data.profile_banner

          if data.profile_banner != null
            background = bannerBg
          else
            background = "https://raw.githubusercontent.com/bill742/twitch-streams/master/images/twitch-bg.png"

          username = data.name
          feedList = document.getElementById('feedList')

          channel(username, background, logo, name, channelUrl)

        i++

getFeeds()
