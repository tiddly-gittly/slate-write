/* eslint-disable @typescript-eslint/no-unsafe-assignment */
(function slateWriteWidgetIIFE() {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!$tw.browser) {
    return;
  }
  const components = require('$:/plugins/linonetwo/slate-write/components/index.js');
  const { SlateWriteWidget } = components
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  exports.slateWrite = SlateWriteWidget;
  // fix `Undefined widget 'edit-slateWrite'`
  exports['edit-slateWrite'] = SlateWriteWidget;
})();
