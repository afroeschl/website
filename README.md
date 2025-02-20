<code>node server.js</code>

    to manually run the server

<code>curl -v http://57.129.61.111:3000/get-data</code>

    to manually get the data the server is sending

<code>curl -X POST http://57.129.61.111:3000/data \
     -H "Content-Type: application/json" \
     -d '{"hour":23, "minute":6, "random":42}'</code>

    to manually send data to the server

***

## ToDo
- Cleanup for GitHub public
- Fix vote count to 1 per user/comment
- Fix wrong display of comment after commenting - reload needed rn
- Revise commands above
