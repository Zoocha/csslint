(function () {
    "use strict";
    var Assert = YUITest.Assert,
        ruleId = "selector-individual-line", expectWarning, expectPass;

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

        "multiple selectors on the same line should result in a warning": function () {
            expectWarning(".foo, .bar{}", "Multi-selector rules should be separated onto their own lines");
        },
        "multiple selectors on individual lines should not result in a warning": function () {
            expectPass(".foo,\n.bar{}");
        },
        "'+' or '>' should not result in a warning": function () {
            expectPass(".foo > .bar,\n.foo + .bar,\n.foo >\n.bar{}");
        }
    }));

}());
