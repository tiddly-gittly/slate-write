/* eslint-disable @typescript-eslint/no-unsafe-assignment */
(function slateWriteWidgetIIFE() {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!$tw.browser) {
    return;
  }
  // separate the widget from the exports here, so we can skip the require of react code if `!$tw.browser`. Those ts code will error if loaded in the nodejs side.
  const components = require('$:/plugins/linonetwo/slate-write/components/index.js');
  const { widget } = components;
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  exports.slateWrite = widget;
  // fix `Undefined widget 'edit-slateWrite'`
  exports['edit-slateWrite'] = widget;
})();
