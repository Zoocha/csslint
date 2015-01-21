/*
 * Rule: Avoid new-line characters in selectors.
 */

CSSLint.addRule({

    //rule information
    id: "whitespace",
    name: "Indents should be with a 2-space soft tab",
    desc: "Each line should be indented by a 2-space (or multiple of) soft tab",
    browsers: "All",

    //initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        function checkSheet(line, lineIndex) {
            // Regex to test for tabs at the beginning of a line)
            var tabIndent = /^\t/g,
            // Regex to test for multiples of two space at the beginning of a line)
                spacesIndent = /^( +)/g,
                matchedSpaces;

            // Check to see if there's a tab at the beginning of a line, and throw a warning if so
            if(tabIndent.test(line)) {
                reporter.report(rule.desc + " - TABS", lineIndex + 1, line.length, rule);
            }


            // Check for spaces at the beginning of the line
            matchedSpaces = line.match(spacesIndent);
            // If there are spaces, check to see if they're in multiples of two. If not throw a warning.
            if(matchedSpaces && matchedSpaces[0] && matchedSpaces[0].length % 2 !== 0) {
                reporter.report(rule.desc + " - SPACES", lineIndex + 1, line.length, rule);
            }

        }

        reporter.lines.forEach(function(line, lineIndex) {
            checkSheet(line, lineIndex);
        });
    }
});
