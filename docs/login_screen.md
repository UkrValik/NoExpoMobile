# Login Screen

It's main feature is to provide to user authorization functionality. Only registered user can log in to the App.

The Screen shows **two input fields**:
- username - for user's login name, it changes keyboard appearance and expects data in form of email
- password - for user's password, common keyboard

Password field also has a small icon-button on its right side. When pressed this icon allows to look on password as on plain text or as on row of dots.

There is a **button "Log in"** after input fields. When pressed it sends request to the server with username and password.

If response from the server is negative (username or password is not correct), tooltip with appropriate message will appear above the input fields. Red icons will also appear to the right side of input fields.

If response from the server is positive, the App will receive authorization token and direct user to Main Screen. The token will be used to communicate with server.