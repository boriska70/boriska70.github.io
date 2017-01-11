var convertQueryToBody = function (query) {
    var body = {};
    var arr = query.split('&');
    for(var i=0; i<arr.length; i++){
        var elem = arr[i].split('=');
        body[elem[0]] = decodeURIComponent(elem[1]);
    }
    return body;
};

var justget = false;
var cors = true;
var corssimplepost = true;
var corspost = true;
var corsbeacon = true;

var trackingStarted = false;

ga(function(tracker) {
    console.log('>>>> Overriding sendHitTask for tracker: ' + tracker.get('name'));
    var originalSendHitTask = tracker.get('sendHitTask');
    tracker.set('sendHitTask', function(model) {
        if(model.get('hitType') == 'pageview'){
            if(tracker.get('trackingStarted') != undefined) {
                originalSendHitTask(model);
            } else {
                tracker.set('trackingStarted', 'true');
            }
        } else {
            originalSendHitTask(model);
        }

        if(justget) {
            //SIMPLY GET - cross-domain failure expected
            var url = 'http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/';
            var data = model.get('hitPayload');
            console.log('SENDING data to server on ' + url + ': ' + model.get('hitPayload'));
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + '?' + data, true);
            xhr.onreadystatechange = function () {
                console.log('Data sent to ' + url);
            };
            xhr.send(null);
        }
        
        if(cors) {
            //CORS GET
            var url = 'http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/cors';
            var data = model.get('hitPayload');
            console.log('SENDING data to server on ' + url + ': ' + model.get('hitPayload'));
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + '?' + data, true);
            xhr.onreadystatechange = function () {
                console.log('Data sent to ' + url);
            };
            xhr.send(null);
        }

        if(corssimplepost) {
            //CORS SIMPLE POST
            var url = 'http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/corssimplepost';
            var data = model.get('hitPayload');
            console.log('SIMPLY POSTING data to server on ' + url + ': ' + data);
            var xhr = new XMLHttpRequest();
            //xhr.setRequestHeader('Content-Type','text/plain');
            xhr.open('POST', url, true);
            xhr.onreadystatechange = function () {
                console.log('Data sent to ' + url);
            };
            xhr.send(data);
        }
        
        if(corspost) {
            //CORS POST
            var url = 'http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/corspost';
            var data = convertQueryToBody(model.get('hitPayload'));
            console.log('POSTING data to server on ' + url + ': ' + data);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                console.log('Data sent to ' + url);
            };
            xhr.send(JSON.stringify(data));
        }

        if(corsbeacon) {
            //WEB BEACON
            var img = document.createElement("img");
            img.src = 'http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/pixel?tenant=1111111&' + model.get('hitPayload');
            img.style = 'width:1px;height:1px;visibility:hidden';
            var src = document.getElementById("foooo");
            console.log('BEACONING data to server on ' + img.src);
            src.appendChild(img);
        }

    });
});

ga('send', 'pageview');
