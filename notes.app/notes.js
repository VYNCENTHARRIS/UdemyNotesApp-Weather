// Import required modules
const fs = require('fs');  // File system module to read and write files
const chalk = require('chalk');  // Chalk module to add colors to console output

// Function to get notes (currently returns a placeholder string)
const getNotes = () => {
    return "Your notes...";
}

// Function to add a new note
const addNote = (title, body) => {
    const notes = loadNotes();  // Load existing notes
    const duplicateNote = notes.find((note) => note.title === title);  // Check for duplicate titles

    if (!duplicateNote) {  // If no duplicates are found
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);  // Save the updated notes array
        console.log(chalk.green.inverse('New note added!'));  // Print success message
    } else {
        console.log(chalk.red.inverse('Note title taken!'));  // Print error message for duplicate title
    }
}

// Function to remove a note by title
const removeNote = (title) => {
    const notes = loadNotes();  // Load existing notes
    const notesToKeep = notes.filter(note => note.title !== title);  // Keep notes that do not match the title

    if (notes.length > notesToKeep.length) {  // If some notes were removed
        console.log(chalk.green.inverse('Note removed!'));  // Print success message
        saveNotes(notesToKeep);  // Save the updated notes array
    } else {
        console.log(chalk.red.inverse('No note found!'));  // Print error message if no note was found
    }
}

// Function to list all notes
const listNotes = () => {
    const notes = loadNotes();  // Load existing notes
    console.log(chalk.inverse('Your notes'));
    notes.forEach((note) => {
        console.log(note.title);
    });
}

// Function to read a specific note
const readNote = (title) => {
    const notes = loadNotes();  // Load existing notes
    const note = notes.find((note) => note.title === title);  // Find note with matching title

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

// Function to save notes to a file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);  // Convert notes array to JSON string
    fs.writeFileSync('notes.json', dataJSON);  // Write JSON string to 'notes.json' file
}

// Function to load notes from a file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');  // Read the 'notes.json' file
        const dataJSON = dataBuffer.toString();  // Convert the file buffer to a string
        return JSON.parse(dataJSON);  // Parse the JSON string to an array of notes
    } catch (e) {
        return [];  // If an error occurs (e.g., file not found), return an empty array
    }
}

// Export the functions to be used in other files
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
