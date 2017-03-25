var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "test_channel", "cretetion", "sheevergaming", "TR7K", "OgamingSC2", "ESL_SC2"];

function getChannel() {
  channels.forEach(function(channel) {
    function makeURL(category, name) {
      return "https://wind-bow.gomix.me/twitch-api/" + category + "/" + name + "?callback=?";
    }
    var status, game;
    $.getJSON(makeURL("streams", channel), function(json) {
      if (json.stream === null) {
        status = "offline";
      } else {
        status = "online";
      }
      console.log(status, channel);
      $.getJSON(makeURL("channels", channel), function(json) {
      var html = "";
      var logo = json.logo ? json.logo : "http://images.clipartpanda.com/question-mark-black-and-white-Icon-round-Question_mark.jpg";
      var name = json.display_name ? json.display_name : channel;
      var description = status === "online" ? json.game + "<span class='hidden-xs'>: " + json.status + "</span>" : status === "closed" ? "Account Closed" : "Offline";
      console.log(status, channel, description);
      var url = json.url ? json.url : "";
      html += "<a href='" + url + "' target='__blank'><div class='row " + status + "'><div class='col-xs-2' id='logo'><img class='img-responsive center-block' src='" + logo + "' /></div><div class='col-xs-10 col-sm-2 text-center' id='name'><strong>" + name + "</strong></div><div class='col-xs-10 col-sm-8 text-center' id='desc'>" + description + "</div></div></a>";
      status === "online" ? $("#display").prepend(html) : $("#display").append(html);
    });
    });
  });
}

$(document).ready(function() {
  getChannel();
  $("#buttons button").click(function() {
    if ($(this).attr('id') == "online") {
      $(".offline, .undefined, .closed").slideUp();
      $(".online").slideDown();
    } else if ($(this).attr('id') == "offline") {
      $(".online, .closed, .undefined").slideUp();
      $(".offline").slideDown();
    } else {
      $(".offline, .undefined, .closed, .online").slideDown();
    }
  });
});