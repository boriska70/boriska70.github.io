function providePlugin(pluginName, pluginConstructor) {
    var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
    if (typeof ga == 'function') {
        ga('provide', pluginName, pluginConstructor);
    }
}

function LocalHitSender(tracker, config) {
    this.tracker = tracker
    this.path = config.path;
    this.debug = config.debug;
    if (this.debug) {
        console.log('localHitSender enabled for path: ' + this.path);
        console.log('on tracker: ' + tracker.get('name'));
    }
}

LocalHitSender.prototype.message = function(message) {
    if (console) console.log('LocalHitSender got a message ' + message);
};

providePlugin('localHitSender', LocalHitSender);