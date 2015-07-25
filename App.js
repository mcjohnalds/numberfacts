// The fact-finding application.

"use strict"

let App = {}

// Start the application.
App.start = function() {
    let numberInput = $("#numberInput")
    let factOutput = $("#factOutput")

    factOutput.text("Enter a number above")

    let factFinder = new FactFinder(function(facts) {
        if (numberInput.val() === "") {
            return
        }

        if (facts.length === 0) { // No facts found
            factOutput.text("This number has no interesting facts, but that makes it kind of special in its own way.")
        } else {
            factOutput.html(markdown.toHTML("- " + facts.join("\n- ")))
            App._typesetElement(factOutput)
        }
    })

    // factFinder.start must be debounced because terminating web workers too
    // quickly crashes chrome. It also makes the UI feel a little bit nicer.
    let startFactFinder = _.debounce(function(n) {
        factFinder.start(n)
    }, 100)

    App._restrictInputToDigits(numberInput)

    numberInput.on("input", function() {

        if (numberInput.val() === "") {
            factOutput.text("")
            factFinder.stop()
        } else {
            factOutput.text("Processing...")
            startFactFinder(parseInt(numberInput.val()))
        }
    })
}

// Configure a html input element to only accept digits as input.
App._restrictInputToDigits = function(element) {
    element.keypress(function(event) {
        if (String.fromCharCode(event.keyCode).search(/^[0-9]$/) === -1) {
            event.preventDefault()
        }
    })
}

// Hides a html element until MathJax has finished typesetting it.
App._typesetElement = function(element) {
    element.css("visibility", "hidden")

    MathJax.Hub.Queue(
        ["Typeset", MathJax.Hub, element.attr("id")],
        function() {element.css("visibility", "")}
    )
}