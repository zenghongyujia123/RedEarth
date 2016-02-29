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
          return window.location = '/webapp/index'
        }

        alert(data.err.zh_message);
        console.log(data);
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});