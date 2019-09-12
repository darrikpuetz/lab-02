# Lab 02: jQuery Selectors and Events

Welcome to our Lab 2 created by Jonathon and Darrik. We implemented jQuery within this assignment to append and find elements per the users request.

## User Stories


## Feature #1: Display images

### Why are we implementing this feature?

As a user, I want to view the images on the page so that I can browse the photo collection.
What are we going to implement?

Given that a user opens the application in the browser
When the user navigates to the home page
Then the photo gallery should display all of the images in the gallery

### How are we implementing it?

Use AJAX, specifically $.get(), to read the provided JSON file.
Each object should become a new instance of a constructor function. Refer to the data to determine the necessary properties.
Use jQuery to make a copy of the HTML template of the photo component. For each object, fill in the duplicated template with its properties, then append the copy to the DOM.

## Feature #2: Filter images

### Why are we implementing this feature?

As a user, I want to be able to filter the images so that I can view only images that match a keyword.

### What are we going to implement?
Given that a user clicks on the dropdown menu
When the user selects one of the options
Then only the images whose keyword matches the option should be displayed

## Feature #3: Style the application

### Why are we implementing this feature?

As a user, I want a simple, clean looking UI so that my photo gallery clearly displays the images in a grid like pattern.

### What are we going to implement?

Given that a user opens the application in the browser
When the user navigates to the home page
Then the images should be displayed in rows across the screen

Feature #	Feature Name	        Time Est	   Start Est	 Finish Est	   Start Actual	   Finish Actual	Time Needed
1	        Display images	    2 hours        	9:45	       11:15	      9:56	       11:00	          1.25 hours
2	        Filter images	      1.5 hours	     11:15	      12:45	       11:16	          1:30 PM	       2.5 hours
3	        Style the application	1.5 hours	    1:30	     3:00 PM	     1:30	            Not Done	     Unlimited

## Feature 4: Pagination

### Why are we implementing this feature?

As a user, I want to have the ability to view additional images so that my view does not become cluttered.

## Feature 5: Templating

### Why are we implementing this feature?

As a user, I want all of the images to be displayed in a consistent manner, so that it is easy to scan the collection of images.

## Feature 6: Styling with Flexbox

### Why are we implementing this feature?

As a user, I want a simple, clean looking UI so that my photo gallery clearly displays the images.

## Feature 7: Sort the images

## Why are we implementing this feature?

As a user, I want to be able to sort the images so that there is an order to their rendering.
