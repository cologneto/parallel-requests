# Parallel requests
	'Parallel requests' is a simple HTML/CSS/JavaScript application using recent pictures feed from Flickr API.
 By default the (on application loading) number of pictures retrieved from Flickr API is 100 and number of parallel requests is 5.
 The user can change two value by selecting values from the dropdown menus on the right side of the screen.  
 On the right side there is a active(parallel) request counter. 
 The dropdowns are are disabled whe active request counter is biiger then 0 the requests.
 The application is uploaded to https://gt-parallel-requests.herokuapp.com/
## Installation
You can download or clone the application files from Github - https://github.com/cologneto/parallel-requests.
Once downloaded you can simply run the index.html file into your browser.
## Usage 
To add the Parallel Requests module into your own project you can include parallelRequest.js from /js directory in this project.
To use it just call - ParallelRequests.create(maximumNumberOfPictures, numberOfParallelRequests, wrapSelector)
where maximumNumberOfPictures argument must be of data type 'number' smaller then 500,  null or undefined,
numberOfParallelRequests argument - must be of data type 'number' smaller then 500,  null or undefined and
wrapSelector must be of type 'string' or null or undefined and you must include element with class or id attribute into body.

	Examples
  
	 ParallelRequests.create(100, 5, '.wrapper');
	 
	 You can call it without arguments  - 
	 ParallelRequests.create()
	 
	 or ParallelRequests.create(100, 5)
	 or ParallelRequests.create(100) 
	 or ParallelRequests.create(null, 5, '');

 