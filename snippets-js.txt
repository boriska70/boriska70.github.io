>>> Add a callback
var a1 = function() {console.log('This is a1')}
var a2 = a1
a1 = function(callback) { a2(); if(callback) {callback()} else console.log('nothing to do') }
var cb = function() {console.log('From callback!')}

>>> Plugins in GA
<script>
ga('create', 'UA-XXXXX-Y', 'auto');
ga('require', 'linkTracker',{prop1: 'value1'});
ga('send', 'pageview');
</script>
<!--Note: plugin scripts must be included after the tracking snippet. -->
<script async src="/path/to/link-tracker-plugin.js"></script>