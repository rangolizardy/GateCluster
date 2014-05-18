
Methodlogy 
===============
There is a GateMaster and several GateHandlers

GateKeepers will run blindly

Early setup >

Domain.com has its A record set to either one or many IP's
Each IP leads to one VARNISH cache which leads to a single NGINX deployment loadbalancing to (local) GateKeeper * (NCores - 2) 

Each server uses Memcached to reduce load on databases.

4 servers each 12 core leads to a total of
    4 Varnish caches
    4 nginx processes (Could replace with an nodejs dynamo)
    4 MemCached processes
    40 GateKeeper instanses
    

Late time setup will feature servers dedicated to just GateKeeper / Memcached and servers dedicated to just Varnish / Nginx.

GateMaster<(ZMQ)>GateHandler<(ZMQ)>Application(Running inside GK)
