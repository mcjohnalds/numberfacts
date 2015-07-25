// Tests a number to see what interesting properties it has.

"use strict"

let Property = {}

// Returns an array of names of all of the properties of n. In order of how
// interesting they are.
Property.properties = function(n) {
    let properties = []

    for (let info of Property._propertyInfo()) {
        if (info.predicate(n)) {
            properties.push(info.name)
        }
    }

    return properties
}

// Given a property name, returns a URL to a Wikipedia or MathWorld page about
// that property. Returns null if there is no URL for this property.
Property.url = function(property) {
    return Property._urls()[property] || null
}

// Return an object that all maps property names to urls.
Property._urls = function() {
    let urls = {}

    for (let info of Property._propertyInfo()) {
        urls[info.name] = info.url
    }

    return urls
}

// Returns an array containing information on all properties.
Property._propertyInfo = function() {
    return [
        {
            name: "prime",
            url: "https://en.wikipedia.org/wiki/Prime_number",
            predicate: Property._isPrime
        },
        {
            name: "perfect",
            url: "https://en.wikipedia.org/wiki/Perfect_number",
            predicate: Property._isPerfect
        },
        {
            name: "Mersenne prime",
            url: "https://en.wikipedia.org/wiki/Mersenne_prime",
            predicate: Property._isMersennePrime
        },
        {
            name: "a Fibonacci number",
            url: "https://en.wikipedia.org/wiki/Fibonacci_number",
            predicate: Property._isFibonacci
        },
        {
            name: "a square number",
            url: "https://en.wikipedia.org/wiki/Square_number",
            predicate: Property._isSquare
        },
        {
            name: "a pronic number",
            url: "https://en.wikipedia.org/wiki/Pronic_number",
            predicate: Property._isPronic
        },
        {
            name: "a square-free number",
            url: "https://en.wikipedia.org/wiki/Square-free_integer",
            predicate: Property._isSquareFree
        },
        {
            name: "a practical number",
            url: "https://en.wikipedia.org/wiki/Practical_number",
            predicate: Property._isPracticalNumber
        },
        {
            name: "a Mersenne number",
            url: "http://mathworld.wolfram.com/MersenneNumber.html",
            predicate: Property._isMersenne
        },
        {
            name: "the closest integer estimate of both $\\pi$ and $e$",
            predicate: function(n) {return n === 3}
        },
        {
            name: "the only even prime",
            predicate: function(n) {return n === 2}
        }
    ]
}

Property._isPrime = function(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false
        }
    }

    return n > 1
}

Property._isPerfect = function(n) {
    if (n < 2) {
        return false
    } else {
        return math.sum(Numeric.properDivisors(n)) === n
    }
}

Property._isMersennePrime = function(n) {
    return Property._isPrime(n) && Property._isMersenne(n)
}

Property._isFibonacci = function(n) {
    return Property._isSquare(5 * n ^ 2 + 4) || Property._isSquare(5 * n ^ 2 - 4)
}

Property._isSquare = function(n) {
    for (let i = 0; i < Math.sqrt(n) + 1; i++) {
        if (Math.pow(i, 2) === n) {
            return true
        }
    }

    return false
}

Property._isPronic = function(n) {
    for (let i = 0; i < n; i++) {
        if (n === i * (i + 1)) {
            return true
        }
    }

    return n === 0
}

Property._isSquareFree = function(n) {
    let allDivisorsExcept1 = Numeric.divisors(n).slice(1)
    return !allDivisorsExcept1.some(Property._isSquare)
}

Property._isPracticalNumber = function(n) {
    // TODO
    return false
}

Property._isMersenne = function(n) {
    return Numeric.isInteger(Math.log2(n + 1))
}