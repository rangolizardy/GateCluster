var zmq = require('zmq');
//Todo store registered clients in mongoDB
var clients_registered = [];

// socket to talk to clients
var responder = zmq.socket('rep');

responder.on('message', function(request) {
    var message = JSON.parse(request.toString());
    switch(message.action){
        case "register":
             var randid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                                 var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); return v.toString(16); }); 
            var message = {action:"register_reckon",rid:randid};
            clients_registered.push(randid);
            responder.send(JSON.stringify(message));
            break;
         case "get_workload":
            //Check if we have any outstanding workloads
            
            
             var message = {action:"workload_reckon",wl:{haswork:true,loadid:"testi12"}};
            break;
          //Temporary for development
         case "list_registered":
            var message = {action:"list_reckon",registered:clients_registered};
            responder.send(JSON.stringify(message));
            break;
    }
    
});

responder.bind('tcp://*:5555', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on 5555...");
  }
});

process.on('SIGINT', function() {
  responder.close();
});