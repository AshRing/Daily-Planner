import moment from 'moment';

class UI {
    constructor() {
        this.currentDate = moment().format('dddd MMMM Do, YYYY');
        this.titleContainer = document.querySelector('.day__title');
        this.newDayContainer = document.querySelector('.new-day');
        this.weekContainer = document.querySelector('.review-week');
        this.titleMenu = document.querySelector('.title-menu');
        this.dummySpan = document.querySelector('.dummySpan');
        this.backBtn = document.querySelector('.backBtn');
        this.displayDate();
    }

    openDiv(divToOpen, divToClose) {
        document.querySelector(divToClose).style.display = 'none';
        document.querySelector(divToOpen).style.display = 'block';
    }

    clearNewDay() {
        document.getElementById('walkDog').checked = false;
        document.getElementById('meditate').checked = false;
        document.getElementById('vitamins').checked = false;
        document.getElementById('tidyRoom').checked = false;
        document.getElementById('taskList').innerHTML = '';
        document.getElementById('noteList').innerHTML = '';
    }

    displayDays(data) {
        console.log(data);
        for (let i=0; i<data.length; i++) {
            const dayCard = `
                <div class="card dayCard mx-3 p-0 bg-light text-center shadow">
                    <h2 class="card-header p-3 bg-primary text-light">${data[i].date}</h2>
                    <div class="card-body p-3">
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
            document.querySelector('.card-deck').insertBefore(dayDiv, this.dummySpan);
        }
    }

    displayPastItemList(data) {
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

    removeFromList(target) {
        if(target.parentElement.classList.contains('list-item-delete')) {
            target.parentElement.parentElement.remove();
            //this.removeFromSessionStorage(currentList, itemValue);
        }
    }
}

export const ui = new UI();