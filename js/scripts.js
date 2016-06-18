$(document).ready(function(){
  $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
    $(this).toggleClass('fechar');
    $('nav').slideToggle(200);
  });
});
window.setTimeout(function() {
    $(".info-temp").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 6000);
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});
$(document).on('page:fetch', function() {
  NProgress.start();
});
$(document).on('page:change', function() {
  NProgress.done();
});
$(document).on('page:restore', function() {
  NProgress.remove();
});