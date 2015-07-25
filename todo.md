- Make everything use math.js BigNumbers. See
  http://mathjs.org/docs/datatypes/numbers.html.
- Make some properties override others. E.g, entering 7 should just give
  
      7 is a Mersenne prime.
  
  and not
  
      7 is a Mersenne prime.
      7 is a Mersenne number.
- There's a gap where no message is displayed between when it says
  "Processing..." and when it finishes rendering the MathJax.
- Terminating web workers too quickly can crash chrome. Change the fact finder
  worker to not occasionally crash.