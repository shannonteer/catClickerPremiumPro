Cat Clicker App 
Project for Udacity class - JavaScript Design Patterns

The user clicks a cat’s name tos witch cats, then they can click on the cat’s image, and the app will keep track of the number of times each cat’s image has been clicked on.  There is also an admin mode where you can change any cat’s information, and save it.

The app uses JavaScript and the MVC design pattern to make the app scalable and quick to make changes should requirements change.  The components are split up as follows:

Model - Stores cat information


View – Initiates and renders all view components
Split into 3 views – List of cats, cat picture & click count, and admin view

Includes pointers to DOM elements and event listeners that communicate with the controller  
Uses a for loop to loop through the array of cat objects, and closure in a loop to render the properties associated with the cat selected

Controller - Connects model and view so they don’t communicate directly
