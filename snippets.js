var a1 = function() {console.log('This is a1')}
var a2 = a1
a1 = function(callback) { a2(); if(callback) {callback()} else console.log('nothing to do') }
var cb = function() {console.log('From callback!')}
