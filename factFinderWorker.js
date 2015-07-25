// Worker that finds cool facts about a number.

"use strict"

if (typeof WorkerGlobalScope !== "undefined") {
    importScripts("https://cdnjs.cloudflare.com/ajax/libs/mathjs/1.7.0/math.min.js")
    importScripts("https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js")
    importScripts("Numeric.js")
    importScripts("Property.js")
}

onmessage = function(message) {
    postMessage(findFacts(message.data))
}

// Returns every interesting fact about a number, formatted in markdown. Returns
// an array of strings.
function findFacts(n) {
    return Property.properties(n).map(function(property) {
        let url = Property.url(property)
        if (url) {
            // We want the markdown to just look like
            //
            //     "n is a [Fibonacci number](http://en.wikipedia.org/...)"
            //
            // and not
            //
            //     "n is [a Fibonacci number](http://en.wikipedia.org/...)".
            let a = ""
            let name = property
            if (property.startsWith("a ")) {
                a = "a "
                name = property.slice(2)
            }

            return `${n} is ${a}[${name}](${url}).`
        } else {
            return `${n} is ${property}.`
        }
    })
}