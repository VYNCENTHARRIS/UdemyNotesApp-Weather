// Import required modules
const chalk = require('chalk');  // Chalk module to add colors to console output
const yargs = require('yargs');  // Yargs module to handle command line arguments
const notes = require('./notes');  // Import the custom notes module
const { describe } = require('node:test');
const { type } = require('os');
const { strict } = require('assert');


yargs.version('1.1.0');

// Create 'add' command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',  // Description of the 'title' option
            demandOption: true,  // Make 'title' a required option
            type: 'string'  // Specify that 'title' should be a string
        },
        body: {
            describe: 'Note Body',  // Description of the 'body' option
            demandOption: true,  // Make 'body' a required option
            type: 'string'  // Specify that 'body' should be a string
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);  // Call the addNote function from the notes module
    }
});

// Create 'remove' command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'  // 
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);  // Call the removeNote function from the notes module
    }
});

// Create 'list' command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        console.log('Listing out the notes!');  // Placeholder 
    }
});
const readNote = (title) => {

}
// Create 'read' command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: ''
            demandOption: true,
            type: string
        }
    },
    handler() {
        console.log('Reading a note')
    }

})

// Parse the command line arguments
yargs.parse();
