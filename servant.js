var zmq = require('zmq');
var requester = zmq.socket('req');

//
var current_running = 0;

requester.on("message", function(reply) {
  console.log("Received reply", reply.toString());
});
requester.connect("tcp://localhost:5555");


var request = {action:"register"};
requester.send(JSON.stringify(request));
var request = {action:"list_registered"};
requester.send(JSON.stringify(request));

//Here we are past the registration phase
var request = {action:"get_workload",currentload:current_running};
requester.send(JSON.stringify(request));
