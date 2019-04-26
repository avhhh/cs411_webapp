Files & Descriptors:
--------------------
`config.js` - Attempt at trying to hid the API keys from Github. Troubleshooting needed for attempting to access global variables between different Javascript files.

`facebook.js` - Module to extract Facebook friends after a user has signed in.

`yelp_api.js` - Handles the Facebook OAuth calls and the Yelp API Call. 

`fb_main.html` - A dummy HTML file to test validity of the Authentication and Login Process. Provides a link for user to login to Facebook.

`index.html` - Bootstrapped frontend intended for signed-in users to input parameters for their next intended meal with friends.

What's Happening on the Backend?
-------------------------------
1. Using ExpressJS framework to create the server

2. Starts up with the Option to login to Facebook. Since the app matches Facebook friends, the user must sign-in to use the features.

3. Use the `passport-facebook` module to use Facebook's authenticated login.

4. On a successful callback, the console will log the user's display name and the accessToken of the user for further API use (to find friends).

5. Then it would trigger the index.html next so the user can choose a cuisine.

6. After the user provides all the input into the HTML form, the response is caught in the backend where it's used to make a query to the Yelp Fusion API through a `yelp-fusion-client` module.

7. The response body is parsed to show the restaurant name, location, distance and price range.

8. This information is then transferred back into the frontend where it's displayed.

9. Restaurant selections are placed into a MySQL database for acknowledgement of an event for other Facebook friends to join/view.
