/*
 * Rule: Always have a single space after the colon for properties
 */

CSSLint.addRule({
  // Rule info
  id       : "space-after-colon",
  name     : "Always use a single space after the colon for properties",
  desc     : "Properties should be formatted like margin: 0; -- a space after the colon, and not before",
  browsers : "All",

  // initialization
  init: function(parser, reporter) {
    "use strict";
    var rule = this,
      nospace = /\:(?!\s)/,
      multiplespaces = /\:\s{2,}/;
      // Regex should match name: value;
    // set up the rule

    function checkRule(line, lineIndex) {
      // Check for no spaces
      if(nospace.test(line)) {
          reporter.report("Always use a single space after the colon for properties", lineIndex + 1, line.length, rule);
          return;
      }

      // Check for more than one space
      if(multiplespaces.test(line)) {
          reporter.report("Always use a single space after the colon for properties", lineIndex + 1, line.length, rule);
          return;
      }
    }

    reporter.lines.forEach(function(line, lineIndex) {
      checkRule(line, lineIndex);
    });
  }
});