// Beginner-friendly SPA navigation.
// Each button shows one section and hides the other three.

const dashboardButton = document.getElementById('btn-Dashboard');
const myGroupsButton = document.getElementById('btn-Mygroups');
const expensesButton = document.getElementById('btn-ALLexpenses');
const balancesButton = document.getElementById('btn-Ballances');

const dashboardPage = document.getElementById('dashboard');
const myGroupsPage = document.getElementById('my-groups');
const expensesPage = document.getElementById('all-expenses');
const balancesPage = document.getElementById('Balances');

// Dashboard button.
showHiddenElement(dashboardButton, dashboardPage);
hideTheElement(dashboardButton, myGroupsPage);
hideTheElement(dashboardButton, expensesPage);
hideTheElement(dashboardButton, balancesPage);

// My Groups button.
hideTheElement(myGroupsButton, dashboardPage);
showHiddenElement(myGroupsButton, myGroupsPage);
hideTheElement(myGroupsButton, expensesPage);
hideTheElement(myGroupsButton, balancesPage);

// All Expenses button.
hideTheElement(expensesButton, dashboardPage);
hideTheElement(expensesButton, myGroupsPage);
showHiddenElement(expensesButton, expensesPage);
hideTheElement(expensesButton, balancesPage);

// Balances button.
hideTheElement(balancesButton, dashboardPage);
hideTheElement(balancesButton, myGroupsPage);
hideTheElement(balancesButton, expensesPage);
showHiddenElement(balancesButton, balancesPage);

// Highlight the active sidebar button.
function highlightButton(selectedButton) {
    dashboardButton.classList.remove('is-active');
    myGroupsButton.classList.remove('is-active');
    expensesButton.classList.remove('is-active');
    balancesButton.classList.remove('is-active');
    selectedButton.classList.add('is-active');
}

dashboardButton.addEventListener('click', function () {
    highlightButton(dashboardButton);
});
myGroupsButton.addEventListener('click', function () {
    highlightButton(myGroupsButton);
});
expensesButton.addEventListener('click', function () {
    highlightButton(expensesButton);
});
balancesButton.addEventListener('click', function () {
    highlightButton(balancesButton);
});
highlightButton(dashboardButton);

// Reset the modal so Create Group does not stay in Edit mode.
function resetGroupFormMode() {
    editingGroupId = null;
    createGroupForm.reset();
    deleteGroupButton.classList.add('hidden');
    submitButton.innerHTML = '<i class="ri-check-line text-lg"></i> Create group';
    titleFormGroup.textContent = 'Create new group';
    formTitleDescription.textContent = 'Create a space to track expenses together.';
    nameErrorMessage.textContent = '';
    dateErrorMessage.textContent = '';
}

createGroupBtn.addEventListener('click', resetGroupFormMode);
closeGroupeFormBtn.addEventListener('click', resetGroupFormMode);
cancelButton.addEventListener('click', resetGroupFormMode);
deleteGroupButton.addEventListener('click', resetGroupFormMode);

createGroupForm.addEventListener('submit', function () {
    // groupes.js hides the modal only after a valid submit.
    if (groupFormContenair.classList.contains('hidden')) {
        resetGroupFormMode();
    }
});

// Dashboard Add group shortcut.
const dashboardAddGroupButton = document.getElementById('btn-addGroup');
dashboardAddGroupButton.addEventListener('click', function () {
    myGroupsButton.click();
    createGroupBtn.click();
});

// Dashboard View all buttons.
const dashboardViewAllButtons = document.querySelectorAll('#dashboard .btn-viewAll');
const expensesViewAllButton = dashboardViewAllButtons[0];
const groupsViewAllButton = dashboardViewAllButtons[1];

expensesViewAllButton.addEventListener('click', function () {
    expensesButton.click();
});
groupsViewAllButton.addEventListener('click', function () {
    myGroupsButton.click();
});
