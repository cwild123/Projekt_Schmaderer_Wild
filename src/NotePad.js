(function (win, doc) {
    'use strict';

    /**
     * @constructor
     */
    function NotePad() {

        // Calling explicitly "Super"-constructor
        EventEmitter2.call(this);

        this._init();

        this.notes = [];
    }

    /**
     * Inherit form EventEmitter2
     *
     * @type {EventEmitter2}
     */
    NotePad.prototype = Object.create(EventEmitter2.prototype);

    /**
     * @protected
     */
    NotePad.prototype._init = function () {
        this._container = doc.createElement('div');
        this._container.className = 'note_pad_container';

        this._list = doc.createElement('ul');
        this._list.className = 'note_pad';

        this._container.appendChild(this._list);

        doc.body.appendChild(this._container);
    };

    /**
     * @type {Node}
     * @protected
     */
    NotePad.prototype._container = null;

    /**
     * @type {Node}
     * @protected
     */
    NotePad.prototype._list = null;

    /**
     * @type {[Note]}
     */
    NotePad.prototype.notes = null;

    /**
     * @param {Note, Note, Note, ...} note
     */
	//Methode um neue Notes einzubinden	
    NotePad.prototype.add = function () {
		//Durch arguments koennen mehrere Notes gleichzeitig uebergeben werden.
		for (var i=0;i<arguments.length;i++){
			if (arguments[i] instanceof Note){
				this.notes.push(arguments[i]);
				this.render();
			}
			else {
				//Fehlermeldung, falls keine Note uebergeben wurde
				alert('Das übergebene Objekt ist keine Note.');
			}
		}
    };

    /**
     * @param {Note} note
     * @returns {Note}
     */
	 //Methode um Notes zu entfernen
    NotePad.prototype.remove = function (note) {
		for (var i=0;i<this.notes.length;i++){
			if (this.notes[i] === note){
				this.notes.splice(i, 1);
			}
		}
		this.render();
    };

    NotePad.prototype.render = function () {
        var i;

        while (this._list.firstChild) {
            this._list.removeChild(this._list.firstChild);
        }

        for (i = 0; this.notes.length > i; i++) {
            this._list.appendChild(this.notes[i]._container);
        }
    };

    /**
     *
     * @type {NotePad}
     */
    win.NotePad = NotePad;

})(window, document);