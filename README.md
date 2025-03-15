# Personal website with some other stuff in it
So far no domain, accessible via
<code>http://57.129.61.111:3000</code>

# Instructions

<code>node server.js</code>

    to manually run the server

<code>curl -v http://57.129.61.111:3000/get-data</code>

    to manually get the data the server is sending

<code>curl -X POST http://57.129.61.111:3000/data \ -H "Content-Type: application/json" \ 
-d '{
  "currentHour": 10,
  "currentMinute": 41,
  "startHour": 0,
  "startMinute": 0,
  "endHour": 0,
  "endMinute": 0,
  "random": 560
}'</code>

    to manually send data to the server

***

## ToDo
- Cleanup for GitHub public
- Revise commands above
- Implement auth for esp communication
