(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-89745902-1', 'auto');

ga('require', 'localHitPrinter', {now: new Date(), debug: true});

/*ga(function(){
    console.log(ga.getAll());
    console.log(JSON.stringify(ga.getAll()));
});*/
/*ga(function (tracker) {
    console.log('Traker ' + tracker.get('name') + ' for trackingId' + tracker.get('trackingId') + ' event type ' + tracker.get('eventAction') + ' screenResolution ' + tracker.get('screenResolution'))
});*/

ga(function(tracker) {
    var originalSendHitTask = tracker.get('sendHitTask');
    tracker.set('sendHitTask', function(model) {
        originalSendHitTask(model);
        var url = 'http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/cors';
        var data = model.get('hitPayload');
        console.log('Sending data to server on ' + url + ': ' + model.get('hitPayload'));
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?' + data, true);
        xhr.onreadystatechange = function () {
            console.log('Data sent to ' + url );
        };
        xhr.send(null);
        document.write('<img src="http://ec2-35-157-3-13.eu-central-1.compute.amazonaws.com:3000/requests/pixel?"' + 'tenant=1111111&' + model.get('hitPayload') + ' style="width:1px;height:1px;visibility:hidden" >');

    });
});
ga('send', 'pageview');
