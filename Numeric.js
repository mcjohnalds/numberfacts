// Math utility functions.

"use strict"

let Numeric = {}

// Returns sorted array of n's divisors, including itself.
Numeric.divisors = function(n) {
    return Numeric.properDivisors(n).concat(n)
}

// Returns sorted array of n's divisors, not including itself.
Numeric.properDivisors = function(n) {
    let divs = []

    for (let i = 1; i < n; i++) {
        if (n % i === 0) {
            divs.push(i)
        }
    }

    return divs
}

// Returns true if n is even.
Numeric.isEven = function(n) {
    return n % 2 === 0
}

// Returns true if n is an integer.
Numeric.isInteger = function(n) {
    return Math.floor(n) === n
}