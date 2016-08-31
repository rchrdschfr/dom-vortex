export default function getHTMLAndCSS() {
  var styleLinks = [];
  return Promise.all(Object.keys(document.styleSheets).map((key) => {
    let sheet = document.styleSheets[key];
    if (sheet.href) {
      styleLinks.push(sheet.href);
      return Promise.resolve("");
    }
    let rules = sheet.cssRules || sheet.rules;
    if (rules && typeof rules === 'object') {
      if (rules.length === 0) {
        styleLinks.push(sheet.href);
        return Promise.resolve("");
      }
      let rulesArray = Object.keys(rules).map((key) => rules[key]);
      return Promise.resolve(rulesArray.reduce((a, b) => {
        return a + b.cssText;
      }, ""));
    }
    else {
      styleLinks.push(sheet.href);
      return Promise.resolve("");
    }
  })).then((css) => {
    return {
      styleLinks,
      css: css.reduce((a, b) => a + b, ""),
      html: document.getElementsByTagName('body')[0].outerHTML
    }
  });
}
