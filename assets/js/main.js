function getFeeds() {
    var feeds = ['freecodecamp', 'noobs2ninjas', 'habathcx', 'medrybw'];
    feeds = feeds.sort();
    var url = "";

    for (var i = 0; i < feeds.length; i++) {
        url = "https://wind-bow.gomix.me/twitch-api/channels/" + feeds[i] + "?callback=?"

        $.getJSON(url, function (data) {
            var name = data.display_name;
            var logo = data.logo;
            var background;
            var bannerBg = data.profile_banner;
            if (data.profile_banner !== null) {
                background = bannerBg;
            } else {
                background = "/images/twitch-bg.png"
            }

            var username = data.name;
            var stream = "https://wind-bow.gomix.me/twitch-api/streams/" + username + "?callback=?";
            var feedList = document.getElementById('feedList');
            var channelStatus = "offline";

            // Get channel online status

            // function channel() {
                 $.getJSON(stream, function(channels) {
                     var q = channels["stream"];
                     console.log(q);

                     if (q != null) {
                         channelStatus = "online";
                     }

                     var statusBox = document.getElementById('status');
                     //
                     // console.log("Function status: " + channelStatus);
                     //
                     statusBox.innerHTML += "<div class='status-block'><p>Status: " + channelStatus + "</p></div>";

                    return channelStatus;
                });

            // }
            //
            // var x = channel(channelStatus);
            // channel(channelStatus);
            // console.log(x);
            console.log(channelStatus);

            // function content(){
                // console.log("Status: " + channelStatus);

                feedList.innerHTML += "<div class='stream-block' style='background-image: url(" + background + ");'><img src ='" + logo + "' alt='" + name + "' class='logo'><h3>" + name + "</h3><p>Status: " + channelStatus + "</p></div>";
            // }

            // content();

        });

    }

}
getFeeds();
