Changes to yelp_api.js:
1. Using ExpressJS framework to create the server
2. Using dummy HTML file (display.html) to create a page for users to enter inputs
3. The HTML form has a POST action, which is caught by line 16-17.
4. The request body is parsed and placed into variables in line 24-25
5. Remaining code is using the Yelp Client to perform a search
6. Sends all the queried results to the browser. Unorganized. (line 39)

To do:
1. Integration with current bootstrap frontend