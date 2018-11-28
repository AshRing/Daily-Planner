import {http} from './http';
import {ui} from './ui';
import moment from 'moment';


//Start a new day button
document.querySelector('.open-new-day').addEventListener('click', e => {
    ui.openDiv('.new-day', '.title-menu');
    e.preventDefault();
});

//Review week button
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

//Save day to api
document.querySelector('.saveday').addEventListener('click', function(e) {
    if(confirm('Are you sure you are ready to save this day?')) {
        saveday(e);
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
    document.getElementById('noteList').innerHTML !== '') {
        if(confirm('Go back and lose progress?')){
            ui.openDiv('.title-menu', '.new-day');
            ui.clearNewDay();
        }
    } else {
        ui.openDiv('.title-menu', '.new-day');
    }
    e.preventDefault();
});

//Back button --Review Week
document.querySelector('.backBtnReview').addEventListener('click', e=> {
    ui.openDiv('.title-menu', '.review-week');
    e.preventDefault();
});


//Save current day to API
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
        })
        .catch(err => console.log(err));
}


//Return last 7 days
function getLast7Days(data) {
    const dataDays = Object.values(data);
    console.log(dataDays);
    let result = [];
    for (let i=0; i<7; i++) {
        let today = moment();
        today = today.subtract(i, 'days').format('dddd MMMM Do, YYYY');
        console.log(today);
        for(let j=0; j<dataDays.length; j++) {
            console.log(data[j].date);
            if(data[j].date === today) {
                result.push(data[j]);
            }
        }
    }
    console.log(result);

    // for(let j=0; j<last7.length; j++) {
    //     const day = data[j].date;
    //     console.log(day);
    //     if(last7[j].isSame(day)) {
    //         
    //     }
    // }

    return result;
}