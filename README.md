node server.js
    to manually run the server

curl -v http://57.129.61.111:3000/get-data
    to manually get the data the server is sending

curl -X POST http://57.129.61.111:3000/data \
     -H "Content-Type: application/json" \
     -d '{"hour":23, "minute":6, "random":42}'
    to manually send data to the server


### ToDo
- Globally store login state with express-session
- Cleanup for GitHub public
- Chat with upvoting
- Revise the commands abov

