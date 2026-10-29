const createGroupBtn = document.getElementById('create-group');
const groupFormContenair = document.getElementById('group-form-contenaire');
const closeGroupeFormBtn = document.getElementById('close-groupe-form');
const createGroupForm = document.getElementById('create-group-form');

const groupeNameInpute = document.getElementById('group-name');
const groupeDescriptionInpute = document.getElementById('group-description');
const groupeCurrencyInpute = document.getElementById('group-currency');
const groupeDateInpute = document.getElementById('group-date')

const nameErrorMessage = document.getElementById('name-error');
const descriptionErrorMessage = document.getElementById('description-error');
const currencyErrorMessage = document.getElementById('currency-error');
const dateErrorMessage = document.getElementById('date-error');

const groupsContainer = document.getElementById('groups-container');
const groupsCounter = document.getElementById('groups-counter');
const emptyGroupsMessage = document.getElementById("empty-message");

const cancelButton = document.getElementById("cancel");

let groupeId = 11;

let Groupe = [
    {
        id: 1,
        groupeName: "Weekend Marrakech",
        groupeDescription: "A weekend trip with friends",
        groupeCurrency: "MAD",
        groupeDate: "2026-10-20",
        cloture: false,
        avatar: "WM",
        color: "bg-red-50 text-red-500"
    },
    {
        id: 2,
        groupeName: "Apartment Expenses",
        groupeDescription: "Monthly rent, electricity and water",
        groupeCurrency: "MAD",
        groupeDate: "2026-09-01",
        cloture: false,
        avatar: "AE",
        color: "bg-blue-50 text-blue-600"
    },
    {
        id: 3,
        groupeName: "Summer Trip",
        groupeDescription: "Summer vacation in Spain",
        groupeCurrency: "EUR",
        groupeDate: "2026-07-15",
        cloture: true,
        avatar: "ST",
        color: "bg-purple-50 text-purple-600"
    },
    {
        id: 4,
        groupeName: "YouCode Team",
        groupeDescription: "Shared expenses for our coding project",
        groupeCurrency: "MAD",
        groupeDate: "2026-10-26",
        cloture: false,
        avatar: "YT",
        color: "bg-green-50 text-green-600"
    },
    {
        id: 5,
        groupeName: "Agadir Road Trip",
        groupeDescription: "Fuel, food and accommodation",
        groupeCurrency: "MAD",
        groupeDate: "2026-08-12",
        cloture: true,
        avatar: "AR",
        color: "bg-amber-50 text-amber-600"
    },
    {
        id: 6,
        groupeName: "Gaming Setup",
        groupeDescription: "Shared gaming equipment expenses",
        groupeCurrency: "USD",
        groupeDate: "2026-10-10",
        cloture: false,
        avatar: "GS",
        color: "bg-teal-50 text-teal-600"
    },
    {
        id: 7,
        groupeName: "Birthday Party",
        groupeDescription: "Organizing a surprise birthday",
        groupeCurrency: "MAD",
        groupeDate: "2026-10-05",
        cloture: true,
        avatar: "BP",
        color: "bg-red-50 text-red-500"
    },
    {
        id: 8,
        groupeName: "Casablanca Weekend",
        groupeDescription: "Restaurants, transport and activities",
        groupeCurrency: "MAD",
        groupeDate: "2026-10-22",
        cloture: false,
        avatar: "CW",
        color: "bg-blue-50 text-blue-600"
    },
    {
        id: 9,
        groupeName: "Paris Vacation",
        groupeDescription: "Hotels, museums and restaurants",
        groupeCurrency: "EUR",
        groupeDate: "2026-06-10",
        cloture: true,
        avatar: "PV",
        color: "bg-purple-50 text-purple-600"
    },
    {
        id: 10,
        groupeName: "Football Team",
        groupeDescription: "Stadium rental and team equipment",
        groupeCurrency: "MAD",
        groupeDate: "2026-10-15",
        cloture: false,
        avatar: "FT",
        color: "bg-green-50 text-green-600"
    }
];

showGroups(Groupe)




















function checkIfEmpty() {
    let isValide = true
    if (groupeNameInpute.value.trim() === "") {
        nameErrorMessage.textContent = "This field is required";
        isValide = false
    }
    else {
        nameErrorMessage.textContent = ""
    }
    if (groupeDateInpute.value === "") {
        dateErrorMessage.textContent = "This field is required";
        isValide = false
    }
    else {
        dateErrorMessage.textContent = ""
    }
    return isValide
}




function getFormData() {
    createGroupForm.addEventListener('submit', event => {
        event.preventDefault();

        if (!checkIfEmpty()) {
            return
        }
        let newGroupeObject = {
            id: groupeId++,
            groupeName: groupeNameInpute.value.trim(),
            groupeDescription: groupeDescriptionInpute.value.trim(),
            groupeCurrency: groupeCurrencyInpute.value.trim(),
            groupeDate: groupeDateInpute.value.trim(),
            cloture: false,
            avatar: getFirstLetterName(groupeNameInpute.value),
            color: getRandomColor()
        }


        Groupe.push(newGroupeObject);

        showGroups(Groupe)

    })


}
showHiddenElement(createGroupBtn, groupFormContenair);
hideTheElement(closeGroupeFormBtn, groupFormContenair);
getFormData()

emptyAndClose(cancelButton, groupFormContenair)
