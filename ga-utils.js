//LocalHitPrinter Plugin START
function providePlugin(pluginName, pluginConstructor) {
    var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
    if (typeof ga == 'function') {
        ga('provide', pluginName, pluginConstructor);
    }
}

function LocalHitPrinter(tracker, config) {
    this.tracker = tracker;
    this.required = config.now;
    this.debug = config.debug;
    if (this.debug) {
        console.log('LocalHitPrinter required at ' + this.required + ' on tracker: ' + this.tracker.get('name'));
    }
}

LocalHitPrinter.prototype.message = function(message) {
    if (console) console.log('LocalHitPrinter got a message ' + message);
};

providePlugin('localHitPrinter', LocalHitPrinter);
//LocalHitPrinter Plugin END

//Just a function that using ga
function onLoadEventHandler(pageName) {
    ga('send','event','PageLoading',pageName + ' loaded');
    ga('localHitPrinter:message', pageName + ' loaded');
    var loadTime = new Date().getTime() - window.performance.timing.navigationStart;
    console.log('Reporting to GA: loadTime for ' + pageName + ' is ' + loadTime);
    ga('send', 'timing', 'Speedy', 'LoadTime - ' + pageName, loadTime);
}
