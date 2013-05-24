
# yes-no-dialog

  A simple wrapper for TJs dialog and bootstraps modal.

## Installation

    $ component install mikanda/yes-no-dialog

## API

### yesNoDialog(title, text[, saveFn, cancelFn, lang]);
   Creates a new instance of YesNoDialog.
   On click on a button the callback ``saveFn`` or ``cancelFn`` is called.
   Via ``lang`` you can change the default language like 
   
    {
      save: 'Speichern',
      cancel: 'Abbrechen'
    }

## License

  LGPLv3
