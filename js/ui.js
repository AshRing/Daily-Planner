import moment from 'moment';

class UI {
    constructor() {
        this.currentDate = moment().format('dddd MMMM Do, YYYY');
        this.titleContainer = document.querySelector('.day__title');
        this.newDayContainer = document.querySelector('.new-day');
        this.weekContainer = document.querySelector('.review-week');
        this.cardContainer = document.querySelector('.cardContainer');
        this.titleMenu = document.querySelector('.title-menu');
        this.dummySpan = document.querySelector('.dummySpan');
        this.backBtn = document.querySelector('.backBtn');
        this.taskText = document.getElementById('taskText');
        this.noteText = document.getElementById('noteText');
        this.displayDate(); //displays date on init
    }

    openDiv(divToOpen, divToClose) {
        document.querySelector(divToClose).style.display = 'none';
        document.querySelector(divToOpen).style.display = 'block';
    }

    clearNewDay() { //clears all fields
        document.getElementById('walkDog').checked = false;
        document.getElementById('meditate').checked = false;
        document.getElementById('vitamins').checked = false;
        document.getElementById('tidyRoom').checked = false;
        document.getElementById('taskList').innerHTML = '';
        document.getElementById('noteList').innerHTML = '';
        this.taskText.value = this.taskText.getAttribute('value');
        this.noteText.value = this.noteText.getAttribute('value');
    }

    displayDays(data) {
        if(data.length === 0) { //If there is no data
            this.cardContainer.innerHTML = `<p>There is no data from the past 7 days to display.</p>`;
        } else {
            for (let i=0; i<data.length; i++) { //for the last 7 days of data, outputs a card for each day
                const dayCard = `
                    <div class="card dayCard m-3 p-0 bg-light text-center shadow">
                        <h2 class="card-header p-3 bg-primary text-light">${data[i].date}</h2>
                        <div class="card-body cardBody p-3">
                            <h4 class="text-secondary text-dark mb-3">Daily Tasks</h4>
                            <ul class="list-group list-group-flush mb-4">
                                <li class="list-group-item bg-light border-0"><strong class="text-primary">Walked Dog:</strong> ${data[i].daily.walkdog}</li>
                                <li class="list-group-item bg-light border-0"><strong class="text-primary">Meditated:</strong> ${data[i].daily.meditate}</li>
                                <li class="list-group-item bg-light border-0"><strong class="text-primary">Took Vitamins:</strong> ${data[i].daily.takevitamins}</li>
                                <li class="list-group-item bg-light border-0"><strong class="text-primary">Tidied Room:</strong> ${data[i].daily.tidyroom}</li>
                            </ul>
                            <hr class="bg-primary">
                            <h4 class="text-secondary text-dark mb-3">Tasks</h4>
                            <ul class="past-tasks list-group list-group-flush mb-4">
                                ${this.displayPastItemList(data[i].tasks)}
                            </ul>
                            <hr class="bg-primary">
                            <h4 class="text-secondary text-dark mb-3">Notes</h4>
                            <ul class="list-group list-group-flush mb-4">
                                ${this.displayPastItemList(data[i].notes)}
                            </ul>
                        </div>
                    </div>
                `;
                const dayDiv = document.createElement('div');
                dayDiv.innerHTML = dayCard;
                this.cardContainer.appendChild(dayDiv);
                
            }
            this.closeReviewCards(); 
        }
    }

    displayStats(data) { //displays stats about the data from the past 7 days
        const statsContainer = document.querySelector('.statsContainer');
        
        let walkDogCount = 0;
        let meditateCount = 0;
        let vitaminCount = 0;
        let tidyCount = 0;

        data.forEach((stat) => {
            if(stat.daily.walkdog) {
                walkDogCount++;
            }
            if(stat.daily.meditate) {
                meditateCount++;
            }
            if(stat.daily.vitamins) {
                vitaminCount++;
            }
            if(stat.daily.tidyroom) {
                tidyCount++;
            }
        });

        const stats = `
            <div class="stats">
                <h2>In the past 7 days you have...</h2>
                <ul class="list-group list-group-flush mt-3">
                    <li class="list-group-item border-0">Walked the dog ${walkDogCount} out of ${data.length} times, or ${Math.trunc((walkDogCount/data.length)*100)}% of the time.</li>
                    <li class="list-group-item border-0">Meditated ${meditateCount} out of ${data.length} times, or ${Math.trunc((meditateCount/data.length)*100)}% of the time.</li>
                    <li class="list-group-item border-0">Took daily vitamins ${vitaminCount} out of ${data.length} times, or ${Math.trunc((vitaminCount/data.length)*100)}% of the time.</li>
                    <li class="list-group-item border-0">Tidied the room ${tidyCount} out of ${data.length} times, or ${Math.trunc((tidyCount/data.length)*100)}% of the time.</li>
                </ul>
            </div>
        `;

        statsContainer.innerHTML = stats;
    }

    closeReviewCards() { //hides daily review card-body on init until clicked
        const cardBodies = document.querySelectorAll('.cardBody');
        cardBodies.forEach((cardBody) => {
            cardBody.style.display = 'none';
        });
    }

    toggleReviewCard(e) { //toggles the cardBody of the specific header, toggles it on click
        const target = e.target.parentElement.querySelector('.cardBody');
        if (target.style.display === "none") {
          target.style.display = "block";
        } else {
          target.style.display = "none";
        }
    }

    displayPastItemList(data) { //takes in array from specific list and displays them as lis
        let liList = [];
        for (let i=0; i<data.length; i++) {
            const li = `<li class="list-group-item bg-light border-0">${data[i]}</li>`;
            liList.push(li);
        }
        return liList.join('');
    }

    displayDate() {
        const title = document.createElement('h2');
        title.innerText = this.currentDate;
        this.titleContainer.appendChild(title);
    }

    addTask(input, list) { 
        const _input = document.getElementById(input);
        const _list = document.getElementById(list);

        //add li to specified ul
        const li = document.createElement('li');
        li.className = 'list-group-item py-2';
        li.innerHTML = `<span>${_input.value}</span>`;
        _list.appendChild(li);

        //add link option to delete task, append to li
        const link = document.createElement('a');
        link.className = 'list-item-delete float-right';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);

        //revert input to default text and select
        _input.value = _input.getAttribute('value');
        _input.select();
    }

    removeFromList(target) {  //if the target is the delete button, remove the li from the list
        if(target.parentElement.classList.contains('list-item-delete')) {
            target.parentElement.parentElement.remove();
        }
    }
}

export const ui = new UI();