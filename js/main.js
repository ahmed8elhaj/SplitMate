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

// When My Groups is opened normally, show the list again.
myGroupsButton.addEventListener('click', function () {
    document.getElementById('group-details').classList.add('hidden');
    document.getElementById('groups-page-header').classList.remove('hidden');
    document.getElementById('groups-page-filters').classList.remove('hidden');
    document.getElementById('groups-page-list').classList.remove('hidden');
});

// Group Details tabs: reuse the same show/hide functions used by the sidebar.
const groupExpensesTab = document.getElementById('tab-expenses');
const groupMembersTab = document.getElementById('tab-members');
const groupBalancesTab = document.getElementById('tab-balances');
const groupExpensesSection = document.getElementById('group-expenses-section');
const groupMembersSection = document.getElementById('group-members-section');

showHiddenElement(groupExpensesTab, groupExpensesSection);
hideTheElement(groupExpensesTab, groupMembersSection);

showHiddenElement(groupMembersTab, groupMembersSection);
hideTheElement(groupMembersTab, groupExpensesSection);

// Balances already exists as a separate page, so reuse its sidebar button.
groupBalancesTab.addEventListener('click', function () {
    balancesButton.click();
});

// Show which of the two internal tabs is selected.
groupExpensesTab.addEventListener('click', function () {
    groupExpensesTab.classList.add('border-b-2', 'border-indigo-600', 'text-indigo-600');
    groupExpensesTab.classList.remove('text-slate-500');
    groupMembersTab.classList.remove('border-b-2', 'border-indigo-600', 'text-indigo-600');
    groupMembersTab.classList.add('text-slate-500');
});

groupMembersTab.addEventListener('click', function () {
    groupMembersTab.classList.add('border-b-2', 'border-indigo-600', 'text-indigo-600');
    groupMembersTab.classList.remove('text-slate-500');
    groupExpensesTab.classList.remove('border-b-2', 'border-indigo-600', 'text-indigo-600');
    groupExpensesTab.classList.add('text-slate-500');
});

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
