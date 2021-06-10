# Account Screen

It contains user information and account picture. Also it allows user to log out. The screen is scrollable.

### Header
There is user photo and user first and last name. There is a "back" icon to the left from the photo and "log out" icon to the right. "Back" icon returns user to the previous screen - Main Screen. "Log out" icon allows to log out and directs user to the Login Screen.

### Toggle Google Fit synchronization button
Enables app to automatically collect data from consumer's Google Fit account. When consumer presses "Enable Google Fit synchronization" and app tries to authorize to Google Fit for the first time, consumer will be prompted to accept permissions for app to collect health data. If data is being collected automatically, there's no sense for consumer to input challenge data manualy. Thus "Send" button on Team Screen will disappear if Google Fit syncronization is enabled.

### User data
There are several input fields that show user email, first name, last name, etc. User can change them but for the first time changes will not be saved or sent to the server.