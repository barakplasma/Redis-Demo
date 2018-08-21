// client-side js
// run by the browser each time your view template is loaded

// protip: you can rename this to use .coffee if you prefer

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  $.get('/getMessages', function(messages) {
    messages.forEach(function(message) {
      $('<li></li>').text(message).appendTo('ul#messages');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    const message = $('input').val();
    $.post('/sendMessage?' + $.param({message}), function() {
      $('<li></li>').text(message).appendTo('ul#messages');
      $('input').val('');
      $('input').focus();
    });
  });

});
