(function (win, doc) {
    'use strict';

    /**
     * @param {string} text
     * @constructor
     */
    function Note(text) {
        EventEmitter2.call(this);
		
        this._init(text);
    }

    /**
     * @type {EventEmitter2}
     */
    Note.prototype = Object.create(EventEmitter2.prototype);
    /**
     * @param {string} text
     * @protected
     */
    Note.prototype._init = function (text) {
        this.text = text;
		
		//Listelement
        this._container = doc.createElement('li');
        this._container.className = 'note';

		//Deletebutton
        this._button = doc.createElement('button');
        this._button.appendChild(doc.createTextNode(' X '));
        this._button.addEventListener('click', this._clickHandler.bind(this), false);
		this._button.className = 'delbutton';
		
		//Prioritaetsbutton
		this._buttonprio = doc.createElement('button');
        this._buttonprio.appendChild(doc.createTextNode(' Prio '));
        this._buttonprio.addEventListener('click', this._clickHandlerprio.bind(this), false);
		this._buttonprio.className = 'priobutton';
		
		//Text-link
		this._divcont = doc.createElement('a');
		this._divcont.className = 'text';
        this._text = doc.createTextNode(text.slice(0, 50));
		this._divcont.setAttribute('onclick', 'popup("' + text + '");');
		this._divcont.title = "Ganze Nachricht";
		this._divcont.href = "";

		this._divcont.appendChild(this._text);
		this._container.appendChild(this._buttonprio);
        this._container.appendChild(this._divcont);
        this._container.appendChild(this._button);
    };

    /**
     * @type {Node}
     * @protected
     */
    Note.prototype._container = null;

    /**
     * @type {Node}
     * @protected
     */
    Note.prototype._button = null;
	Note.prototype._buttonprio = null;

    /**
     * @type {Node}
     * @protected
     */
    Note.prototype._text = null;
	Note.prototype._divcont = null;

    /**
     * @protected
     */
	 //Clickhandler delete
    Note.prototype._clickHandler = function () {
        this.emit('delete', this);
        this.onDelete(this);
    };
	
	/**
     * @protected
     */
	 //Clickhandler Prioritaet
    Note.prototype._clickHandlerprio = function () {
		this.emit('prio', this);
        this.onPrio(this);
    };

    /**
     * Will be set by server after Note was successfully stored.
     *
     * @type {null|number}
     */
    Note.prototype.id = null;

    /**
     * @type {string}
     */
    Note.prototype.text = null;
	
    /**
     * @param text
     * @returns {Note}
     */
    Note.prototype.setText = function (text) {
        this._container.removeChild(this._text);
        this._text = doc.createTextNode(text);
        this._container.appendChild(this._text);
        this.text = text;

        return this;
    };

    /**
     * @param {Note} self
     */
    Note.prototype.onDelete = function (self) {
    };
	
	    /**
     * @param {Note} self
     */
	 //Funktion fuer Prioritaets-Clickhandler; aendert css-klasse
    Note.prototype.onPrio = function (self) {
		if (this._divcont.className == 'textrot'){
			this._divcont.className = 'text';
		} else {
			this._divcont.className = 'textrot'
		}
    };
	
    /**
     * @type {Note}
     */
    win.Note = Note;

})(window, document);