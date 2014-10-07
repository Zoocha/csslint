/*
 * Rule: Avoid new-line characters in selectors.
 */

CSSLint.addRule({

    //rule information
    id: "selector-individual-line",
    name: "Each selector should be on new line",
    desc: "Multi-selector rules should be separated onto their own lines",
    browsers: "All",

    //initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        function startRule(event) {
            var i, len, selector, nextSelector, currentLine, nextLine,
                selectors = event.selectors;

            for (i = 0, len = selectors.length; i < len; i++) {
                // Get the current selector
                selector = selectors[i];
                // Get the next selector
                nextSelector = selectors[i+1];
                // Check there is actually one and we're not at the end of the selector list
                if(nextSelector) {
                    // Test the line numbers
                    currentLine = selector.line;
                    nextLine = nextSelector.line;
                    if(currentLine === nextLine) {
                        reporter.report(rule.desc, currentLine, selectors[i].parts[0].col, rule);
                    }
                }
            }
        }

        parser.addListener("startrule", startRule);

    }
});
