var ParReq = (function(){
    var maxPicturesRequests;
    var requestsCounter = 0;
    var parallelRequests;
    var photosArray;
    var getAllPicturesErrorMsg = 'Something went wrong. Please check you internet connection ';
    var active = document.querySelector(".active");

    // This application using Flickr rest API for retrieving the recent uploaded pictures
    function getAllPicturesLinks(url) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 ){
                if(this.status == 200){
                    photosArray = this.response.photos.photo;
                    requestsCounter = parallelRequests;
                    for (var i = 0; i < parallelRequests; i++) {
                        getSinglePicture(photosArray[i]);
                    }
                }
            }
        }
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
    }

    // append picture to body
    function appendPictureToBody(pic) {
        var img = document.createElement('img');
        img.src = pic;
        document.body.appendChild(img);
    }

    // make a single get request for a picture
    function getSinglePicture(pic) {
        var pictureUrl = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg'

        // setting the timeout
        setTimeout(function () {
        //     // getting image as 'blob'
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    //
                    var url = window.URL || window.webkitURL;

                    appendPictureToBody(url.createObjectURL(this.response));
                    if(requestsCounter < maxPicturesRequests) {
                        getSinglePicture(photosArray[requestsCounter]);
                        requestsCounter++;
                    } else {
                        return false;
                    }
                }
            };
            xhr.open('GET', pictureUrl);
            xhr.responseType = 'blob';
            xhr.send();
        }, 1);
    }

     function createRequest(maxPicReq, parReqCount) {
         maxPicturesRequests = maxPicReq || 100;
         parallelRequests = parReqCount || 5;

         var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&' +
             'api_key=1ca0f212d85403b1b6a9cc9fcb8bc369&' +
             'per_page=' + maxPicturesRequests +
             '&format=json&nojsoncallback=1';

        getAllPicturesLinks(url);

        updateActive();

        function updateActive() {
            active.textContent = XMLHttpRequest.active;
            requestAnimationFrame(updateActive);
        }

        // Script for counting the active requests
        (function(xhr) {
            xhr.active = 0;
            var pt = xhr.prototype;
            var _send = pt.send;
            pt.send = function() {
                xhr.active++;
                this.addEventListener('readystatechange', function(e) {
                    if ( this.readyState == 4 ) {
                        setTimeout(function() {
                            xhr.active--;
                        }, 1);
                    }
                });
                _send.apply(this, arguments);
            }
        })(XMLHttpRequest);
    }

    return {
        createRequest: createRequest
    }
})();
