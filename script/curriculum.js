import { form, displayAlert, saveToStorage, nextPage } from '../data/form.js'

checkInput('index');

window.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const executeRevision = params.get('executeRevision');

    if (executeRevision === 'true') {
        revisionInput();
    }
});

formatPhone();

function formatPhone() {
    const phoneElement = document.querySelector('.js-form-input-phone');

    phoneElement.addEventListener('input', (event) => {
        let value = event.target.value;

    
        value = value.replace(/\D/g, '');
        
        if (value.length < 2) {
            value = `(${value}`;
        } else if (value.length === 2) {
            value = `(${value}) `;
        } else if (value.length >= 3 && value.length <= 9) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        } else if (value.length >= 10) {
            value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
        }
        event.target.value = value;
        if (value.length === 0 || value === '(') {
            event.target.value = '';
        }
    });
}




function revisionInput() {
    Object.entries(form.personalInformations).forEach(([key, value]) => {
        const element = document.querySelector(`.js-form-input-${key}`);
        if (element) {
            element.value = value;
        }
    });

    // Assuming form.adress is an object
    Object.entries(form.adress).forEach(([key, value]) => {
        const element = document.querySelector(`.js-form-input-${key}`);
        if (element) {
            element.value = value;
        }
    });

    document.querySelector(`.js-form-button-continue`).addEventListener('click', () => {
        nextPage('revision.html');
    })
}


function checkInput(page) {
    console.log(form)
    const continueButton = document.querySelector(`.js-form-button-continue`);

    continueButton.addEventListener('click', () => {
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const phone = document.querySelector('.js-form-input-phone').value;

        const marital_statusElement = document.querySelector('.js-form-input-maritial-status');
        const marital_status = marital_statusElement.options[marital_statusElement.selectedIndex].text;

        const countryElement = document.querySelector('.js-form-input-country');
        const country = countryElement.options[countryElement.selectedIndex].text;

        const city = document.querySelector('.form-input[name="city"]').value;
        const neighborhood = document.querySelector('.js-form-input-neighborhood').value;

        if (!name || !email || !phone || !marital_status || !country || !city) {
            displayAlert();
        } else {
            nextPage('education.html');
        }

        form.personalInformations = {};
        form.personalInformations.name = name;
        form.personalInformations.email = email;
        form.personalInformations.phone = phone;
        form.personalInformations.marital_status = marital_status;
        form.adress = {};
        form.adress.country = country;
        form.adress.city = city;
        form.adress.neighborhood = neighborhood;

        console.log(form)
        saveToStorage();
    })
}