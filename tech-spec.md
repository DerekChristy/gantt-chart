## Context and Overview
### Problem statement
Your client sent you the list of projects they are working on, in the sheet "List of projects", as well as the team structure in "Teams"
Your client requests one timeline and one chart on the same page: 
Goals and objective

#### Timeline: 
   1. Should be similar to timelines in Notion, Coda, ClickUp, etc. 
   2. At minimum, should reflect the project, priortity, and stage
   3. Adding additional info such as dependencies is a plus
#### Chart: 
   1. Show a bar chart of the distribution of projects per team member
   2. Show a filter for stages and priorities --> Eg, clicking on the P0 filter will only show the P0 projects per team member
## Requirements
### Functional Requirements/Features
#### Timeline / gantt chart view of the projects
1. Ability to view the project cards on the date-wise columns.
2. Create the date columns
3. Current time highlight
4. Create the project cards
 a. Ability to see the list of projects from the left drawer
 b. Ability to add new project cards
5. Add a project by clicking on the timeline, a new project card will be created with the project startDate from where the user clicked.
6. Via the left collapsable drawer
7. Create a component for allowing users to enter and edit project details, currently opening it as an overlay dialog.
8. Hover on the card to view the start and launch dates
9. Ability to jump/bring into view the current date on the timeline, and/or specific cards with a click.
10. Click on the drawer project items, to make the respective project card appear in the timeline.
11. Click on the “Today” button on the top-right of the timeline to scroll to the current date.

##### Improvements
1. Ability to delete a project card
2. Ability to connect project cards to show dependencies using https://www.npmjs.com/package/leader-line or similar package
3. Ability to drag the project card and adjust its start and launch date
4. Ability to have hours and week views if required by the client
5. Add color coding to the project cards' properties so it is easily identifiable.
6. Iteratively adding more features to improve the UX.
7. Improve over time as per team and user feedback.
8. Use lazy loading for loading the date columns and goals and cache them.

#### Charts
1. View project distribution on the bar chart
2. Add filter for priority and stage
##### Improvements
1. Add mode filters on the charts like the status and date filter
2. Add more chart types like pie chart 

### Non-Functional Requirements

The UI actions should be easy to use and the experience should be smooth.
The app should have accessibility labels. 

### Technical Requirements: 
For the timeline after researching found out that many libraries are offering these gantt chart features but most of them are heavy and/or paid. 

I found a free one that can be extended https://frappe.io/gantt. A popular 3rd party library available for purchase and use https://dhtmlx.com/docs/products/dhtmlxScheduler/

I decided to go with implementing the timeline from scratch as it will be lighter, extremely customizable, and free to use.
	Used angular material for the UI elements like the button, dialogs, and cards
	 Used the npm package  “@swimlane/ngx-charts" for the bar chart.


The app is live and can be used at https://derekchristy.github.io/gantt-chart/ 


