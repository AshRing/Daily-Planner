import {http} from './http';
import {ui} from './ui';


//Events to add to lists
//Task list
document.getElementById('taskText').addEventListener('keyup', e => {
    if (e.keyCode === 13) { ui.addTask('taskText', 'taskList'); }
});
document.getElementById('addTask').addEventListener('click', e => {
    ui.addTask('taskText', 'taskList');
});
//Note list
document.getElementById('noteText').addEventListener('keyup', e => {
    if (e.keyCode === 13) { ui.addTask('noteText', 'noteList'); }
});
document.getElementById('addNote').addEventListener('click', e => {
    ui.addTask('noteText', 'noteList');
});


//Events for item removal
document.getElementById('taskList').addEventListener('click', function(e) {
    ui.removeFromList(e.target);
});
document.getElementById('noteList').addEventListener('click', function(e) {
    ui.removeFromList(e.target);
});

//Save day to api
document.querySelector('.saveday').addEventListener('click', function(e) {
    if(confirm('Are you sure you are ready to save this day?')) {
        saveday(e);
    }
});



function saveday(e) {
    const walkdog = document.getElementById('walkDog').checked;
    const meditate = document.getElementById('meditate').checked;
    const takevitamins = document.getElementById('vitamins').checked;
    const tidyroom = document.getElementById('tidyRoom').checked;
    const taskList = document.getElementById('taskList').getElementsByTagName('li');
    const noteList = document.getElementById('noteList').getElementsByTagName('li');

    var taskArray = [];
    for (let i = 0; i < taskList.length; i++) {
        taskArray.push(taskList[i].firstChild.innerText);
    }

    var noteArray = [];
    for (let i = 0; i < noteList.length; i++) {
        noteArray.push(noteList[i].firstChild.innerText);
    }

    const data = {
        date: ui.currentDate,
        daily: {
            walkdog,
            meditate,
            takevitamins,
            tidyroom
        },
        tasks: taskArray,
        notes: noteArray
    }

    http.post('http://localhost:3000/tasks', data)
        .then(data => alert('Day added!'))
        .catch(err => console.log(err));

    console.log(data);

    e.preventDefault();
}