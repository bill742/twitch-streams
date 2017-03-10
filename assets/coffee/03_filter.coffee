online = ->
    $('.stream-block.offline').addClass('hide')
    $('.stream-block.online').removeClass('hide')

offline = ->
    $('.stream-block.online').addClass('hide')
    $('.stream-block.offline').removeClass('hide')

showAll = ->
    $('.stream-block.offline, .stream-block.online').removeClass('hide')


document.getElementById("online").onclick=online
document.getElementById("offline").onclick=offline
document.getElementById("all").onclick=showAll
