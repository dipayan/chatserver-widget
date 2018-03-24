'use strict';

var config 	= require('../config');
var responseInventory 	= require('../models/responseInventory');

var ioEvents = function(io) {

	// Chatroom namespace
	io.of('/chatbot').on('connect', function(socket) {

		// Starts a ChatBot
		socket.on('initBotEvent', function(userName) {

            socket.emit('welcomeEvent', responseInventory.greetMsg);
        
		});


		// When the user disconnects 
		socket.on('disconnect', function() {

            socket.emit('closeEvent', responseInventory.closeMsg);
                
		});

		// When a new message arrives
		socket.on('newUserMessage', function(message) {
            
            console.log('User message',message)
            var randomInt = Math.floor(Math.random() * Math.floor(3));
            socket.emit('botMessage', responseInventory.randomMsg[randomInt]);
            
		});

	});
}


var init = function(app){
    
	var server 	= require('http').Server(app);
	var io 		= require('socket.io')(server);
	io.set('transports', ['websocket']);

	ioEvents(io);

	return server;
}

module.exports = init;