# Navigation overview

Navigation consists of main stack navigator starting from login screen. Then after login and accepting grpc we move to home screen. There we can see bottom tab navigator with four tabs:
1. Home
2. Challenges
3. Profile
4. Settings
## 1. Home
It's a stack navigator nested to main bottom tab navigator. We can move to team details screen by pressing a team from the list on home screen. There we can move to rating screen.
### Home screen
It shows a list of active or planned teams. In the bottom of the screen there is a button which adds ended teams to the list. Ended teams will be hiden if the screen is blured and focused again.
### Team details screen
It's informative screen. It shows how many active participants are in the team, rank of current user, end date, challenge description, team duration. Below there is a diagram which visualizes user's statistics in current team. Then there is a button with which we can navigate to rating screen. And finaly input data section. User can choose date and write his data in the input field.
### Rating screen
Shows team members rating. There is a list of members' names and scores.
## 2. Challenges
It's also a stack navigator nested to main bottom tab navigator. Its initial screen is challenges. We can press some challenge and move to its details screen.
### Challenges screen
There is a list of all challenges published on the site. Items show challenge picture and name.
### Challenge details screen
There are challenge details such as description, start/end dates, etc.
## 3. Profile
Single screen that shows to user his personal information. In the bottom of the screen user logout from his account.
## 4. Settings
Single screen with settings of the app. User can turn on synchronization with Google Fit or Apple Health. There are links to different help pages of GB platform.
## Installation
### Android
To install app on android just move apk file from /android/app/release/ to your device.
### ios
Latest build is located by /ios/Challanges2508.