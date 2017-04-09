/*
index.htmlに使用するjs
*/
$(function(){
  $('.dropdown-menu a').click(function(e){
    var linkname = $(this).attr('link');
    console.log("onLink", linkname);
    $('#main_screen').attr({
      'src':linkname
    })
  });

});
