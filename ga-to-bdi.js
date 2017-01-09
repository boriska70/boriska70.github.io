ga(function(tracker) {
    console.log('>>>> Overriding sendHitTask for tracker: ' + tracker.get('name'));
    var originalSendHitTask = tracker.get('sendHitTask');
    tracker.set('sendHitTask', function(model) {
        if(model.get('hitType') != 'pageview'){
            originalSendHitTask(model);
        }
        var url = 'http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/cors';
        var data = model.get('hitPayload');
        console.log('Sending data to server on ' + url + ': ' + model.get('hitPayload'));
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?' + data, true);
        xhr.onreadystatechange = function () {
            console.log('Data sent to ' + url );
        };
        xhr.send(null);

        var img = document.createElement("img");
        img.src = 'http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/pixel?tenant=1111111&' + model.get('hitPayload');
        img.style = 'width:1px;height:1px;visibility:hidden';
        var src = document.getElementById("foooo");
        src.appendChild(img);

    });
});

ga('send', 'pageview');
