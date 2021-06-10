# Main Screen

It contains references to other screens such as teams' screens and account screen.

We can separate three parts of the screen: header, list of teams and part with buttons.

If consumer logs in to the App for the first time then he will be asked in the modal if he would like to collect his health data from Google Fit automatically. If consumer presses "Yes" then he will be prompted to give permissions for the App to collect his health data.

It may happen that data from Google Fit will not be collected or it will be empty. It may be if something went wrong while logging in to the Google Fit, or if there is no Google Fit installed on consumer's device, or if there is no data in Google Fit. In such situation App will propose to disable Google Fit synchronization and enable input data manualy.

### Header
Simple header with screen name "Main" and rounded angles. There is an icon to the right from screen name. It opens Account Screen.

### Team list
Each item of this list represents team. It is pressable and directs user to Team Screen. It contains some general information about appropriate team and challenge: team name, challenge name, challenge activity days and challenge picture. The list is scrollable.

### Buttons
Between teams list and header there is a thin line with text "Teams" and two buttons to the left from the text. These buttons allow user to choose type of teams list.
- First type - items like lines with picture to the left and info to the right
- Second type - items like cards by two in row with picture to the top and info to the bottom of the card