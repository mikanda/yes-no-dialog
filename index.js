/*
 * require dependencies
 */
var dialog = require('bootstrap-dialog'),
    domify = require('domify'),
    event = require('event'),
    Emitter = require('emitter');
/*
 * create new instance
 */
function YesNoDialog (title, text, save, cancel, lang) {
  var self = this;
  /*
   * set default lang if not definied
   */
  if (lang === undefined || lang === null)
    lang = {};
  if (lang.save === undefined)
    lang.save = 'save';
  if (lang.cancel === undefined)
    lang.cancel = 'cancel';

  /*
   * set footer
   */
  var saveEl = domify('<button class="btn btn-primary">' + lang.save + '</button>');
  var cancelEl = domify('<button class="btn">' + lang.cancel + '</button>');
  var footEl = domify('<span></span>');
  footEl.appendChild(cancelEl);
  footEl.appendChild(saveEl);
  
  /*
   * make new bootstrap-dialog
   */
  var d = dialog(title, text, footEl)
    .closable()
    .overlay()
    .show();
  ['close','hide','show'].forEach(function(event){
    d.on(event, function () {
      self.emit(event);
    });
  });

  /*
   * bind button events and implement standard behaviour
   */
  event.bind(saveEl, 'click', 
    function () {
      /*
       * hide dialog
       * call the save function
       */
      d.hide();
      if (!save)
        return;
      if (typeof save === 'function') {
        save();
      } else if (save['fn']) {
        save['fn'].call(save['scope']);
      }
    }
  );
  event.bind(cancelEl, 'click', 
    function () {
      /*
       * hide dialog
       call the cancel function
       */
      d.hide();
      if (!cancel)
        return;
      if (typeof cancel === 'function') {
        cancel();
      } else if (cancel['fn']) {
        cancel['fn'].call(cancel['scope']);
      }
    }
  );
};
Emitter(YesNoDialog.prototype);

module.exports = function (title, text, save, cancel, lang) {
  return new YesNoDialog(title, text, save, cancel, lang);
};

