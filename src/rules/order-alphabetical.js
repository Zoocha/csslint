/*
 * Rule: All properties should be in alphabetical order..
 */
/*global CSSLint*/
CSSLint.addRule({

    //rule information
    id: "order-alphabetical",
    name: "Alphabetical order",
    desc: "Assure properties are in alphabetical order",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        "use strict";
        var rule = this,
            properties;

        var startRule = function () {
            properties = [];
        };

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);

        parser.addListener("property", function(event){
            var name = event.property.text,
                lowerCasePrefixLessName = name.toLowerCase().replace(/^-.*?-/, "");

            properties.push(lowerCasePrefixLessName);
        });

        parser.addListener("endrule", function(event){
            var currentProperties = properties.join(","),
                expectedProperties = properties.sort().join(",");

            if (currentProperties !== expectedProperties){
                reporter.report("Rule doesn't have all its properties in alphabetical ordered.", event.line, event.col, rule);
            }
        });
    }

});
