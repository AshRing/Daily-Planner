import {http} from './http';
import {ui} from './ui';
import moment from 'moment';

//Events to open different components
//Start a new day button, opens new-day div and shuts title-menu
document.querySelector('.open-new-day').addEventListener('click', e => {
    ui.openDiv('.new-day', '.title-menu');
    e.preventDefault();
});

//Review week button, opens review-week div and shuts title-menu
document.querySelector('.open-review-week').addEventListener('click', e => {
    ui.openDiv('.review-week', '.title-menu');
    if(!document.querySelector('.dayCard')) {
        retrieveWeek();
    }
    e.preventDefault();
});


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

//Save day button -- gos back to title screen after confirm
document.querySelector('.saveday').addEventListener('click', function(e) {
    if(confirm('Are you sure you are ready to save this day?')) {
        saveday(e);
        ui.openDiv('.title-menu', '.new-day');
        ui.clearNewDay();
    }
});

//Back button --New Day
document.querySelector('.backBtnNewDay').addEventListener('click', e => {
    //If any of the fields aren't empty, confirm if its ok to lose progress. Clear day and go back to title menu
    if(document.getElementById('walkDog').checked === true ||
    document.getElementById('meditate').checked === true ||
    document.getElementById('vitamins').checked === true ||
    document.getElementById('tidyRoom').checked === true ||
    document.getElementById('taskList').innerHTML !== '' ||
    document.getElementById('noteList').innerHTML !== '') {  //Validation. If any fields are filled out, confirm and clear
        if(confirm('Go back and lose progress?')){
            ui.openDiv('.title-menu', '.new-day');
            ui.clearNewDay();
        }
    } else { //If no fields are filled out, just go back
        ui.openDiv('.title-menu', '.new-day');
    }
    e.preventDefault();
});

//Back button --Review Week
document.querySelector('.backBtnReview').addEventListener('click', (e) => {
    ui.openDiv('.title-menu', '.review-week');
    e.preventDefault();
});

//Toggle Review
document.querySelector('.cardContainer').addEventListener('click', (e) => {
    if(e.target.classList.contains('card-header')) { //Only target areas that are a part of the card-header
        ui.toggleReviewCard(e);
    }
});

//Save current day's data to API
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


//Retrieve past week from API
function retrieveWeek() {
    http.get('http://localhost:3000/tasks')
        .then(data => {
            ui.displayDays(getLast7Days(data));
            ui.displayStats(data);
        })
        .catch(err => console.log(err));
}


//Return last 7 days
function getLast7Days(data) {
    const dataDays = Object.values(data);
    let result = [];
    for (let i=0; i<7; i++) {
        let today = moment(); //create a moment and subtract i days from it, format it in the same way the data is formatted
        today = today.subtract(i, 'days').format('dddd MMMM Do, YYYY');
        for(let j=0; j<dataDays.length; j++) { //Loop through data, if the date from data matches "today" var, push that day's info into result array
            if(data[j].date === today) {
                result.push(data[j]);
            }
        }
    }

    return result;
}
