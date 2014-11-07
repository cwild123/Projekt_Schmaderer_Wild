//Neues NotePad wird erzeugt
var a = new NotePad();
//Neuer Client für localstorage wird erzeugt
var client = new Client();


//Localstorage auslesen und gegebenenfalls Notes zum Notepad hinzufuegen
client.read().then(function (list){
					for (var i=0;i<list.length;i++){
						a.add(list[i]);
					}
				});

//Funktionsaufruf bei einem Klick auf den neue Notesbutton				
var f = new Input();
f.onNew = function (text) {
	var b = new Note(text);
	//Neue Note zum Notepadhinzufuegen
	a.add(b);
	//Neue Note zum Localstorage hinzufuegen
	client.create(b);
};

//Funktionsaufruf bei Klick auf Loeschenbutton
Note.prototype.onDelete = function (note){
		//Note vom Notepad entfernen
		a.remove(note);
		//Note vom Localstorage entfernen
		client.destroy(note);
};

//localStorage.clear();

//Debuginformation bei der connect-Methode
//Connect success
client.on('connected', function () {
    console.log('Connection successfully established!')
;});

//Connect error
client.on('error', function () {
    console.log('Connect Error occured!')
;});


//Debuginformation bei der create-Methode
// Bevor die Anfrage an den Server gestellt wird
client.on('create:create', function createListener(note) {
    console.info('Creating new note with text: ' + note.text);
});

// Bei Fehler von Anfrage an den Server
client.on('create:error', function createErrorListener(err) {
    onsole.error('Create Error:' + err);
});

// Erfolgreiche Anfrage an den Server 
client.on('create:success', function createSuccessListener(note) {
    console.info('Success at note with text: ' + note.text);
});


//Debuginformation bei der read-Methode
// Wenn bei der Anfrage an den Server etwas schief gegangen ist
client.on('read:error', function readErrorListener(err, noteId) {
    if (noteId) {
       console.error('Couldn\'t read note with id ' + noteId + ' from server. Probably it does not exist!');
    } else {
        console.error('Read Error:' + err);
    }
});

// Vor der Anfrage an den Server 
client.on('read:read', function readListener(noteId) {	
       console.info('Reading note from server.');
});

// Wenn bei der Anfrage an den Server alles geklappt hat
client.on('read:success', function readSuccessListener(result) {
       console.info('Success at reading note ');
});



//Debuginformation bei der update-Methode
// Bevor Update ausgefuehrt wird
client.on('update:update', function updateListener(note) {
   console.info('Before updating note with text: ' + note.text);
});

// Fehler beim Update
client.on('update:error', function updateErrorListener(err) {
   console.error('Update Error:' + err);
});

// Update erfolgreich
client.on('update:success', function updateSuccessListener(note) {
   console.info('Successfully updated note with text: ' + note.text);
});


//Debuginformation bei der loeschen-Methode
// Vor dem Loeschen
client.on('destroy:destroy', function destroyListener(note) {
   console.info('Note with text: ' + note.text + ' is being deleted.');
});

// Wenn beim Loeschen fehler auftaucht
client.on('destroy:error', function destroyErrorListener(err,noteId) {
   
   if (noteId) {
       console.error('Couldn\'t delete note with id ' + noteId + ' from server.');
    } else {
        console.error('Delete Error:' + err);
    }
});

// Wenn Loeschen erfolgreich war
client.on('destroy:success', function destroySuccessListener(id) {
   console.info('Note with id ' + id + ' was successfully deleted.');
});