// Finds every interesting fact about a number. Runs in the background.

"use strict"

// onFinished(facts) is run upon completion where facts is an array of strings.
//
// Does nothing until start(number) is called.
function FactFinder(onFinished) {
    this.onFinished = onFinished
    this.worker = null
}

// Starts finding all the facts for a given number, or restarts it if it's
// already running. When all facts have been found, onFinished(facts) is called
// and no further computation happens until start(number) is called again.
//
// Be careful not to call this function too much, it creates a new web worker
// every call, which can crash chrome when done fast.
FactFinder.prototype.start = function(number) {
    if (this._isRunning()) {
        this.stop()
    }

    this.worker = new Worker("factFinderWorker.js")

    let that = this
    this.worker.onmessage = function(message) {
        that.onFinished(message.data)
        that.stop()
    }

    this.worker.postMessage(number)
}

// Stops any computation prematurely. Does nothing if no computation is
// currently happening.
FactFinder.prototype.stop = function() {
    if (this._isRunning()) {
        this.worker.terminate()
        this.worker = null
    }
}

// Returns true if i am I currently finding facts in the background?
FactFinder.prototype._isRunning = function() {
    return this.worker !== null
}