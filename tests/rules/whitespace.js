(function () {
    "use strict";
    var Assert = YUITest.Assert,
        ruleId = "whitespace", expectWarning, expectPass;

    expectWarning = function (ruleset, expectedMessage) {
        var result, enabledRules = {};
        enabledRules[ruleId] = 1;
        result = CSSLint.verify(ruleset, enabledRules);
        Assert.areEqual(1, result.messages.length);
        Assert.areEqual("warning", result.messages[0].type);
        Assert.areEqual(expectedMessage, result.messages[0].message);
    };

    expectPass = function (ruleset) {
        var result, enabledRules = {};
        enabledRules[ruleId] = 1;
        result = CSSLint.verify(ruleset, enabledRules);
        Assert.areEqual(0, result.messages.length);
    };

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: ruleId + " Rule Errors",

        "lines indented with a tab should result in a warning": function () {
            expectWarning(".foo,\n\t.bar{}", "Each line should be indented by a 2-space (or multiple of) soft tab - TABS");
        },

        "lines indented with three spaces should result in a warning": function () {
            expectWarning(".foo,\n   .bar{}", "Each line should be indented by a 2-space (or multiple of) soft tab - SPACES");
        },

        "lines indented with two spaces should not result in a warning ": function () {
            expectPass(".foo,\n  .bar{}");
        },

        "lines indented with four spaces should no result in a warning ": function () {
            expectPass(".foo,\n    .bar{}");
        }
    }));

}());
