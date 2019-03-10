function startCounter() {
    $('.countdown').html("");
    $('.countdown').css("color", "#000 !important");
    $('.countdown').css("display", "block");
    var timeleft = 20;
    var downloadTimer = setInterval(function(){
      $('.countdown').html(timeleft);
      timeleft -= 1;
      if (timeleft < 15) {
        $('.countdown').css("color", "#FF9800");
      }
      if (timeleft < 10) {
        $('.countdown').css("color", "#E64A19");
      }
      if (timeleft < 5) {
        $('.countdown').css("color", "#FF5252");
        $('.countdown').css("font-size", "3em");
      }
      if(timeleft < 0){
        clearInterval(downloadTimer);
        $('.countdown').html("Vous avez perdu !");
        return;
      }
    }, 1000);
}
