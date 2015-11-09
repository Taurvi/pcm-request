serverMsg = function(msg) {
    console.log('|| SERVER || ' + msg);
};

serverMsg('node.js is initializing');

// Initialization
var app = require('express')();
serverMsg(' Loaded express.');
var http = require('http').Server(app);
serverMsg(' Loaded http.');
var io = require('socket.io')(http);
serverMsg(' Loaded socket.io.');
var crypto = require('crypto');
serverMsg(' Loaded crypto.');
var Twilio = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');
serverMsg(' Loaded Twilio.');
var Trello = require("node-trello");
serverMsg(' Loaded Trello.');
var t = new Trello("<your key>", "<token>");

serverMsg('Server has initialized!');

var loggedUsers = [];

// User connects to socketIO
io.sockets.on('connection', function(socket){
    serverMsg('  io.sockets.on: User has connected: ' + socket.id);

    socket.on('verifyUser', function(data){
        serverMsg('  io.sockets.on: Form data received.');
    });
});