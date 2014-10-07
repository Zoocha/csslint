(function() {
  "use strict";
  var Assert = YUITest.Assert;

  YUITest.TestRunner.add(new YUITest.TestCase({
    name: "Space after colon tests",

    "Rule with no space after colon should result in a warning (e.g. margin:0)" : function() {
      var result = CSSLint.verify(".foo { margin:0; }", { "space-after-colon" : 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Always use a single space after the colon for properties", result.messages[0].message);
    },

    "Rule with more than one space after colon should result in a warning" : function() {
      var result = CSSLint.verify(".foo { margin:   0; }", { "space-after-colon" : 1 });
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual("warning", result.messages[0].type);
      Assert.areEqual("Always use a single space after the colon for properties", result.messages[0].message);
    },

    // "Rule with more than one space after colon should result in an error" : function() {
    //   var result = CSSLint.verify(".foo { margin:   0; }", { "space-after-colon" : 2 });
    //   Assert.areEqual(1, result.messages.length);
    //   Assert.areEqual("error", result.messages[0].type);
    //   Assert.areEqual("Always use a single space after the colon for properties", result.messages[0].message);
    // },

    "Rule with space after colon should not result in a warning" : function() {
      var result = CSSLint.verify(".foo { margin: 0; }", { "space-after-colon" : 2 });
      Assert.areEqual(0, result.messages.length);
    }

  }));
})();