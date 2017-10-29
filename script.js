var fancyText = document.getElementById('company_name');
var scroll = document.getElementById('scroll');
var intervalTime = 80; // milliseconds between character deletion/insertion
var initialPause = 1000; // give the person viewing the website some time to view our site
var callbackPause = 500; // how long we'll wait before we go to the next type-text

function deleteContent(callback) {

    var intervalId = setInterval(function() {
        if (fancyText.innerHTML.length == 0) {
            clearInterval(intervalId);

            if (callback) {
                setTimeout(callback, callbackPause);
            }
        }

        fancyText.innerHTML = fancyText.innerHTML.substring(0, fancyText.innerHTML.length - 1);
    }, intervalTime);

}

function addContent(contentToAdd, callback) {
    var currentIndex = 0;

    var intervalId = setInterval(function() {
        if (currentIndex == contentToAdd.length) {
            clearInterval(intervalId);

            if (callback) {
                setTimeout(callback, callbackPause);
            }
        }

        fancyText.innerHTML = contentToAdd.substring(0, currentIndex);
        currentIndex++;
    }, intervalTime);
}

document.getElementById("scroll").children[0].className += "load";

function fadein(element) {
    var op = 0.05;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

scroll.style.opacity = 1;

setTimeout(function() {
    deleteContent(function() {
        addContent("Find your formula", function() {
            deleteContent(function() {
                addContent("with Hustlr", function() {
                    deleteContent(function() {
                        addContent("Craft your Hustle today")
                    })
                });
            });
        });
    });
}, initialPause);