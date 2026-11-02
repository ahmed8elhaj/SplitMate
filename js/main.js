// Navigation: Dashboard and My Groups are the only main pages.
const dashboardButton = document.getElementById('btn-Dashboard');
const myGroupsButton = document.getElementById('btn-Mygroups');
const dashboardPage = document.getElementById('dashboard');
const myGroupsPage = document.getElementById('my-groups');
const AddExpensesForm = document.getElementById('Add-expenses');

function showMainPage(page) {
    dashboardPage.classList.add('hidden');
    myGroupsPage.classList.add('hidden');
    page.classList.remove('hidden');
    dashboardButton.classList.remove('is-active');
    myGroupsButton.classList.remove('is-active');
    if (page === dashboardPage) dashboardButton.classList.add('is-active');
    if (page === myGroupsPage) myGroupsButton.classList.add('is-active');
}
function showGroupsPage() {
    selectedGroupId = null;
    document.getElementById('group-details').classList.add('hidden');
    document.getElementById('groups-page-header').classList.remove('hidden');
    document.getElementById('groups-page-filters').classList.remove('hidden');
    document.getElementById('groups-page-list').classList.remove('hidden');
    AddExpensesForm.classList.add('hidden');
    showMainPage(myGroupsPage);
}
dashboardButton.addEventListener('click', function () { showMainPage(dashboardPage); });
myGroupsButton.addEventListener('click', showGroupsPage);
showMainPage(dashboardPage);

const groupExpensesTab = document.getElementById('tab-expenses');
const groupMembersTab = document.getElementById('tab-members');
const groupBalancesTab = document.getElementById('tab-balances');
const groupExpensesSection = document.getElementById('group-expenses-section');
const groupMembersSection = document.getElementById('group-members-section');
const groupBalancesSection = document.getElementById('group-balances-section');

function showGroupTab(tab) {
    groupExpensesSection.classList.add('hidden');
    groupMembersSection.classList.add('hidden');
    groupBalancesSection.classList.add('hidden');
    AddExpensesForm.classList.add('hidden');
    groupExpensesTab.classList.remove('border-b-2', 'border-indigo-600', 'text-indigo-600');
    groupMembersTab.classList.remove('border-b-2', 'border-indigo-600', 'text-indigo-600');
    groupBalancesTab.classList.remove('border-b-2', 'border-indigo-600', 'text-indigo-600');
    groupExpensesTab.classList.add('text-slate-500');
    groupMembersTab.classList.add('text-slate-500');
    groupBalancesTab.classList.add('text-slate-500');
    let activeTab = groupExpensesTab;
    if (tab === 'expenses') {
        groupExpensesSection.classList.remove('hidden');
        if (selectedGroupId !== null) filterGroupExpenses();
    }
    if (tab === 'members') {
        activeTab = groupMembersTab;
        groupMembersSection.classList.remove('hidden');
        if (selectedGroupId !== null) showGroupMembers(selectedGroupId);
    }
    if (tab === 'balances') {
        activeTab = groupBalancesTab;
        groupBalancesSection.classList.remove('hidden');
        if (selectedGroupId !== null) showGroupBalances(selectedGroupId);
    }
    activeTab.classList.add('border-b-2', 'border-indigo-600', 'text-indigo-600');
    activeTab.classList.remove('text-slate-500');
}
groupExpensesTab.addEventListener('click', function () { showGroupTab('expenses'); });
groupMembersTab.addEventListener('click', function () { showGroupTab('members'); });
groupBalancesTab.addEventListener('click', function () { showGroupTab('balances'); });

document.getElementById('concel-expenses').addEventListener('click', function () {
    editingExpenseId = null;
    showGroupTab('expenses');
});

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
// Existing HTML has id="cancel", not class="cancel".
document.getElementById('cancel').addEventListener('click', resetGroupFormMode);
deleteGroupButton.addEventListener('click', resetGroupFormMode);
createGroupForm.addEventListener('submit', function () {
    if (groupFormContenair.classList.contains('hidden')) resetGroupFormMode();
});
document.getElementById('btn-addGroup').addEventListener('click', function () {
    showGroupsPage();
    createGroupBtn.click();
});
const dashboardViewAllButtons = document.querySelectorAll('#dashboard .btn-viewAll');
dashboardViewAllButtons.forEach(function (button) {
    button.addEventListener('click', showGroupsPage);
});

function showGroupMembers(groupId) {
    const container = document.getElementById('members-container');
    container.replaceChildren();
    const members = getGroupMembers(groupId);
    members.forEach(function (member) {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-4 border-b border-slate-100 p-5';
        const avatar = document.createElement('div');
        avatar.className = 'flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600';
        avatar.textContent = member.nom.substring(0, 2).toUpperCase();
        const name = document.createElement('p');
        name.className = 'text-sm font-semibold text-slate-800';
        name.textContent = member.nom;
        item.appendChild(avatar);
        item.appendChild(name);
        container.appendChild(item);
    });
    if (members.length === 0) container.textContent = 'No members in this group yet.';
}
function updateGroupSummary(groupId) {
    const group = Groupe.find(function (item) { return item.id === groupId; });
    if (!group) return;
    const expenses = getGroupExpenses(groupId);
    const members = getGroupMembers(groupId);
    let total = 0;
    expenses.forEach(function (expense) { total += expense.amount; });
    document.getElementById('details-group-total').textContent = total.toFixed(2) + ' ' + group.groupeCurrency;
    document.getElementById('details-group-members-count').textContent = members.length + ' members';
    document.getElementById('group-expenses-summary').textContent = expenses.length + ' expenses · ' + total.toFixed(2) + ' ' + group.groupeCurrency;
    document.getElementById('details-group-outstanding').textContent = 'Balances for ' + group.groupeName;
    if (!groupBalancesSection.classList.contains('hidden')) showGroupBalances(groupId);
}
