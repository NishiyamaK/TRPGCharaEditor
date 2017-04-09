/*
index.htmlに使用するjs
*/
$(function(){
  $('li a').click(function(e){
    var linkname = $(this).attr('link');
    console.log("onLink", linkname);
    $('#main_screen').attr({
      'src':linkname
    })
  });

});
