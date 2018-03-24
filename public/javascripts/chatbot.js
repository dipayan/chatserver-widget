'use strict';

var app = {


  initBot : function(userName,botName){
    
    var socket = io('/chatbot', { transports: ['websocket'] });

    socket.on('connect', function () {
        $("#typing").hide();
        socket.emit('initBotEvent', userName )

        socket.on('welcomeEvent', function (welcomeMsg) {

            var message = { 
                content: welcomeMsg,
                date: Date.now(),
                userName: botName
            };
            app.common.addBotMessage(message);
      
        });
      
        // Whenever the user hits the save button, emit newMessage event.
        $("#message-send-btn").on('click', function(e) {

          var userMessage = $("#message-to-send");
          var userMessageContent = userMessage.val().trim();
          if(userMessageContent !== '') {
            var message = { 
              content: userMessageContent, 
              userName: userName,
              date: Date.now()
            };
            app.common.addUserMessage(message);
            $("#typing").show();
            socket.emit('newUserMessage', message);
            userMessage.val('');
            
          }
        });

        $(document).on('keypress', '#message-to-send', function(e) {

            if ( e.keyCode == 13 ) { 
                e.preventDefault();
                $('#message-send-btn').click(); 
            }
        });

        // Append a new message 
        socket.on('botMessage', function(botMessage) {
            var message = { 
                content: botMessage,
                date: Date.now(),
                userName: botName
            };
            
            setTimeout(() => {
                $("#typing").hide();
                app.common.addBotMessage(message);
            }, 1000); 
        });
      });
  },

  common: {


    addUserMessage: function(message){
      message.date      = (new Date(message.date)).toLocaleString();
      message.userName  = message.userName;
      message.content   = message.content;

       var html = `
       <li class="clearfix">
            <div class="message-data align-right">
                <span class="message-data-name"> ${message.userName }</span> <i class="fa fa-circle me"></i>
                <span class="message-data-time">${message.date}</span>
            </div>
            <div class="message other-message float-right">
                ${message.content}
            </div>
        </li> 
       `;
      
      $(html).hide().appendTo('.message-container').slideDown(200);
      $(".chat-history").animate({ scrollTop: $('.chat-history')[0].scrollHeight}, 1000);
      
    },
    addBotMessage: function(message){
        message.date      = (new Date(message.date)).toLocaleString();
        message.userName  = message.userName;
        message.content   = message.content;
  
         var html = `
         <li>
            <div class="message-data">
                <span class="message-data-name"><i class="fa fa-circle online"></i> ${message.userName}</span>
                <span class="message-data-time">${message.date}</span>
            </div>         
            <div class="message my-message">
            ${message.content}
            </div>
          </li> 
         `;
        $(html).hide().appendTo('.message-container').slideDown(200);
        $(".chat-history").animate({ scrollTop: $('.chat-history')[0].scrollHeight}, 1000);
    },
  }
};
