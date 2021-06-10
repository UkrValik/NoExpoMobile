# Team Screen

It contains information about certain team and challenge. It also has reference to Rating Screen.

### Header
There is a "back" icon in the top left corner. It returns user to the previous screen - Main Screen. Also there is a team name in the center of header and challenge picture.

### Challenge general info and icons
This part consists of four icons and text fields. Each icon represents the sense of data in text field below itself. Data shown there:
- Active participants - count of team members that are active
- Your rank - rank of current user in this team
- Duration - how many days this team will participate in this challenge
- End date - the date when this team ends participating in this challenge

### Statistics
There are data diagrams for every month that is between start date and end date. Depending on consumer's challenge values diagram counts five horizontal divisions. For example if consumer points are 1000, 250, 400, 300, then diagram takes the highest of them, which is 1000, and creates next divisions: 200, 400, 600, 800, 1000. 0 division always exists as bottom of the diagram. If user presses vertical bar, tooltip with this day value will appear above the bar.

### "Rating" button
It directs user to the rating screen with list of team participants and their ranks in the team.

### Input data
There are two input fields. The first one calls calendar and allows consumer to choose date for which he would like to input data. The second field allows to input challenge data for that date. Then user can press button "Send" and challenge data will be sent to the server. User will see loading component indicating operation execution. In a second modal with operation result will appear on the screen. If server response is negative, nothing will be changed. If server response is positive and data is sent, data will be saved to the server and localy to the user's device and diagrams will rebuild adding new bar for chosen date.