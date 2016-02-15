/**
 * Created by zenghong on 16/2/15.
 */
$(function () {
  $('.singin-btn').click(function () {
    $.ajax({
      method:'post',
      url: '/webapp/signin',
      data: {
        username: $('.username').val(),
        password: $('.password').val()
      },
      success: function (data) {
        if(!data.err){
          window.location = '/webapp/index'
        }
        console.log(data);
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});