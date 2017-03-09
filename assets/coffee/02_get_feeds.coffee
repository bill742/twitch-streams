getFeeds = ->
    feeds = ['freecodecamp', 'noobs2ninjas', 'habathcx', 'medrybw']
    feeds = feeds.sort()
    url = ""

    i = 0
    while i < feeds.length

        url = "https://wind-bow.gomix.me/twitch-api/channels/" + feeds[i] + "?callback=?"

        $.getJSON url, (data)->
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
