getFeeds = ->
    feeds = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
    feeds = feeds.sort()
    url = ""

    # feeds1 = ['ESL_SC2', 'OgamingSC2'].sort (a, b) ->
    #   a.toLowerCase().localeCompare b.toLowerCase()
    # return

    # feeds1 = feeds.sort()
    # console.log feeds1

    i = 0
    while i < feeds.length

        url = "https://wind-bow.gomix.me/twitch-api/channels/" + feeds[i] + "?callback=?"

        $.getJSON url, (data)->
            # console.log data
            name = data.display_name
            logo = data.logo
            channelUrl = data.url
            background
            bannerBg = data.profile_banner

            if data.profile_banner != null
              background = bannerBg
            else
              background = "/images/twitch-bg.png"

            username = data.name
            feedList = document.getElementById('feedList')

            channel(username, background, logo, name, channelUrl)

        i++

getFeeds()
