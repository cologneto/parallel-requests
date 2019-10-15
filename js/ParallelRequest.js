var ParReq = (function(){
    var maxPicturesRequests;
    var requestsCounter = 0;
    var parallelRequests;
    var photosArray;
    var wrapperSelector;

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
    function appendPictureToContainer(pic) {
        var img     = document.createElement('img');
        var wrapper = document.querySelector(wrapperSelector);
        img.src = pic;
        wrapper.appendChild(img);
    }

    // make a single get request for a picture
    function getSinglePicture(pic, con) {
        var pictureUrl = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg'

        // setting the timeout
        setTimeout(function () {
        //     // getting image as 'blob'
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    //
                    var url = window.URL || window.webkitURL;

                    appendPictureToContainer(url.createObjectURL(this.response));
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

     function createRequest(maxPicReq, parReqCount, wrapSelector) {
         maxPicturesRequests = maxPicReq || 100;
         parallelRequests    = parReqCount || 5;
         wrapperSelector     = wrapSelector || 'body';

         // Flickr URL for retrieving recently added pictures (maxPictureRequests <= 500 - API )
         var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&' +
             'api_key=1ca0f212d85403b1b6a9cc9fcb8bc369&' +
             'per_page=' + maxPicturesRequests +
             '&format=json&nojsoncallback=1';

        getAllPicturesLinks(url);
    }

    return {
        createRequest: createRequest
    }
})();
