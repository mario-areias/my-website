/* This is my version for this code.

 You can buy the original code here:

 http://themeforest.net/item/perfectcv-responsive-bootstrap-cv-resume/4102616

*/

$(function(){
  var MOBILE_SCREEN_WIDTH = 767;
  var BIG_SCREEN_WIDTH = 940;
  var DISTANCE_FROM_TOP_BIG_SCREEN = 60;
  var DISTANCE_FROM_TOP_SMALL_SCREEN = -140;
  var SCROLL_SPEED_ANIMATION = 300;

  var lastId = 0;

  var current_width = $(window).width();
  var topMenu = $(".site_nav");
  var menuItems = topMenu.find("a");
  var scrollItems = getScrollItems();

  $(window).on('load resize', function () {
    if ( current_width < MOBILE_SCREEN_WIDTH ) {
      $("br").hide();
    } else {
      $("br").show();
    }
  });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href");
    if (href === "#"){
      return;
    }
    var offsetTop = $(href).offset().top + 1 - getTopMenuHeight();
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, SCROLL_SPEED_ANIMATION);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop() + getTopMenuHeight();

     // Get id of current scroll item
     var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
     });
     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "null";

     if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
       .parent().removeClass("active")
       .end().filter("[href=#"+id+"]").parent().addClass("active");
     }
  });

  $(window).scroll(function(){
    var pos = $(window).scrollTop();
    if (pos > 55 && current_width > BIG_SCREEN_WIDTH) {
      $(".site_nav").css({
          "position": "fixed",
          "top":    "0",
          "width":    "940px",
          "margin-bottom":    "55px",
      });
      $("#aftermenuspace").css({
          "height":    "55px",
      });
    } else {
      $(".site_nav").css({
          "position": "relative",
          "margin-bottom":    "0",
          "width":    "100%",
      });
      $("#aftermenuspace").css({
          "height":    "0",
      });
    }
    if ( pos > 600 ) { $('.upbtn').fadeIn();} else { $('.upbtn').fadeOut(); }
  });

  $('.upbtn').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  $('.print_button').on('click', 'a', function(event){
    event.preventDefault();
    window.print();
  });


  function getScrollItems(){
      var topMenuHeight = getTopMenuHeight();
      // Anchors corresponding to menu items
      return menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });
  }

  function getTopMenuHeight(){
    if ( $(window).width() > BIG_SCREEN_WIDTH ) {
      return topMenu.outerHeight() + DISTANCE_FROM_TOP_BIG_SCREEN;
    } else {
      return topMenu.outerHeight() + DISTANCE_FROM_TOP_SMALL_SCREEN;
    }
  }
});
