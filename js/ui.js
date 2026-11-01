const deleteGroupButton = document.getElementById('delete-button');



function showHiddenElement(button, hiddenElement) {
    button.addEventListener('click', () => {
        hiddenElement.classList.remove("hidden");
    })
}
function hideTheElement(button, element) {
    button.addEventListener('click', () => {
        element.classList.add("hidden");

    })
}
function emptyAndClose(button, element) {

    button.addEventListener('click', () => {
        const elemnetInputes = element.querySelectorAll('input, textarea, select')
        elemnetInputes.forEach(input => {
            input.value = "";
        })
        element.classList.add("hidden");
    })

};
let selectedGroupId = null;

function showGroups(groupes) {
    groupsCounter.textContent = groupes.length
    groupsContainer.innerHTML = ""
    const dashboardGroupsContainer = document.getElementById("dashboard-groups-container");
    dashboardGroupsContainer.innerHTML = "";

    if (groupes.length <= 0) {
        emptyGroupsMessage.classList.remove("hidden");
        return;
    }
    emptyGroupsMessage.classList.add("hidden");


    groupes.forEach(element => {
        let statusGroupe;
        let statusGroupeColor;
        if (element.cloture === false) {
            statusGroupe = "Active"
            statusGroupeColor = "bg-green-400"
        }
        else {
            statusGroupe = "Closed"
            statusGroupeColor = "bg-slate-400"
        }

        const groupCarte = document.createElement('article');
        groupCarte.dataset.id = 'groupe-' + element.id;
        let buttonEditId = 'button-edit-' + element.id
        groupCarte.className = "flex w-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:w-[calc(50%-8px)] xl:w-[calc(33.333%-11px)]";
        groupCarte.innerHTML = `<div class="flex items-start justify-between">
                                                <div
                                                    class="flex h-10 w-10 items-center justify-center rounded-xl ${element.color} text-xs font-semibold">
                                                    ${element.avatar}
                                                </div>
                                                <div class="flex items-center gap-3">
                                                    <p class="rounded-full ${statusGroupeColor} px-2 py-1 text-xs font-medium text-green-700">
                                                        ${statusGroupe}
                                                    </p>
                                                    <button data-id='${buttonEditId}' class="text-lg text-slate-400 hover:text-slate-700 group-options" aria-label="Group options">
                                                        <i class="ri-more-fill"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 class="text-base font-medium text-slate-800">
                                                    ${element.groupeName}
                                                </h5>
                                                <p class="mt-1 text-xs text-slate-500">
                                                    ${element.groupeDescription}
                                                </p>
                                            </div>
                                            <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                                <p class="flex items-center gap-1">
                                                    <i class="ri-user-add-line text-base"></i>
                                                    4 members
                                                </p>
                                                <p class="flex items-center gap-1">
                                                    <i class="ri-calendar-line text-base"></i>
                                                    ${element.groupeDate}
                                                </p>
                                            </div>
                                            <div class="flex items-center justify-between border-t border-slate-200 pt-4">
                                                <div>
                                                    <p class="text-xs text-slate-400">
                                                        Total expenses
                                                    </p>
                                                    <h5 class="mt-1 text-sm font-semibold text-slate-800">
                                                        3,460.00 MAD
                                                    </h5>
                                                </div>
                                                <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                                                   ${element.groupeCurrency}
                                                </span>
                                            </div>
                                            <button data-id="${element.id}"
                                                class="open-group-button mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-50 py-3 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100">
                                                Open group
                                                <i class="ri-arrow-right-s-line text-lg"></i>
                                            </button>`

        groupsContainer.appendChild(groupCarte)
    })
};
const titleFormGroup = document.getElementById('form-title');
const formTitleDescription = document.getElementById('form-title-description');
// const formTitleDescription=document.getElementById('form-title-description');
    let shownGroups = 0;
    for (let i = groupes.length - 1; i >= 0; i--) {
        if (shownGroups === 3) break;
        const group = groupes[i];
        let status = 'Active';
        if (group.cloture === true) status = 'Closed';

        const dashboardCard = document.createElement('div');

        dashboardCard.className = "flex w-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:w-[calc(50%_-_8px)] xl:w-[calc(33.333%_-_11px)]";
        dashboardCard.dataset.id = group.id;
        dashboardCard.innerHTML = `
                                                                <div class="flex items-start justify-between">
                                                                    <div class="flex h-10 w-10 items-center justify-center rounded-xl ${group.color} text-xs font-semibold">
                                                                        ${group.avatar}
                                                                    </div>

                                                                    <p class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                                        ${status}
                                                                    </p>
                                                                </div>

let editingGroupId = null;
function handleGroupOptions(container, groupes) {
    container.addEventListener('click', event => {
        const button = event.target.closest('.group-options');
        if (!button) return;
        const id = Number(button.dataset.id.replace('button-edit-', ''));
        const selectedGroup = groupes.find(
            group => group.id === id
        );
        if (!selectedGroup) return;
        editingGroupId = selectedGroup.id;
                                                                <div>
                                                                    <h5 class="text-base font-medium text-slate-800">
                                                                        ${group.groupeName}
                                                                    </h5>

                                                                    <p class="mt-1 text-xs text-slate-500">
                                                                        ${group.groupeDescription}
                                                                    </p>
                                                                </div>

        console.log(selectedGroup);
        groupFormContenair.classList.remove("hidden");
        deleteGroupButton.classList.remove("hidden");
        groupeNameInpute.value = selectedGroup.groupeName;
        groupeDescriptionInpute.value = selectedGroup.groupeDescription;
        groupeCurrencyInpute.value = selectedGroup.groupeCurrency;
        groupeDateInpute.value = selectedGroup.groupeDate;
        submitButton.innerHTML = `<i class="ri-check-line text-lg text-white">Save changes</i>`
    });
}
deleteGroupButton.addEventListener('click', () => {
    if (editingGroupId === null) return;
    const index = Groupe.findIndex(
        group => group.id === editingGroupId
    );
    if (index !== -1) {
        Groupe.splice(index, 1);
        showGroups(Groupe);
    }
    groupFormContenair.classList.add("hidden");
    createGroupForm.reset();
    editingGroupId = null;
});
                                                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                                                    <p class="flex items-center gap-1">
                                                                        <i class="ri-user-add-line text-base"></i>
                                                                        4 members
                                                                    </p>

                                                                    <p class="flex items-center gap-1">
                                                                        <i class="ri-calendar-line text-base"></i>
                                                                        ${group.groupeDate}
                                                                    </p>
                                                                </div>

                                                                <div class="flex items-center justify-between border-t border-slate-200 pt-4">
                                                                    <div>
                                                                        <p class="text-xs text-slate-400">
                                                                            Total expenses
                                                                        </p>

                                                                        <h5 class="mt-1 text-sm font-semibold text-slate-800">
                                                                            3,460.00 ${group.groupeCurrency}
                                                                        </h5>
                                                                    </div>

                                                                    <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                                                                        ${group.groupeCurrency}
                                                                    </span>
                                                                </div>
                                                            `;
        dashboardGroupsContainer.appendChild(dashboardCard);
        shownGroups++;
    }
}












const titleFormGroup = document.getElementById('form-title');
const formTitleDescription = document.getElementById('form-title-description');
let editingGroupId = null;
function handleGroupOptions(container, groupes) {
    container.addEventListener('click', event => {
        const button = event.target.closest('.group-options');
        if (!button) return;
        const id = Number(button.dataset.id.replace('button-edit-', ''));
        const selectedGroup = groupes.find(
            group => group.id === id
        );
        if (!selectedGroup) return;
        editingGroupId = selectedGroup.id;
        console.log(selectedGroup);
        groupFormContenair.classList.remove("hidden");
        deleteGroupButton.classList.remove("hidden");
        groupeNameInpute.value = selectedGroup.groupeName;
        groupeDescriptionInpute.value = selectedGroup.groupeDescription;
        groupeCurrencyInpute.value = selectedGroup.groupeCurrency;
        groupeDateInpute.value = selectedGroup.groupeDate;
        submitButton.innerHTML = '<i class="ri-check-line text-lg"></i> Save changes';
        titleFormGroup.textContent = 'Edit group';
        formTitleDescription.textContent = 'Update the group details.';
    });
}
deleteGroupButton.addEventListener('click', function () {
    if (editingGroupId === null) {
        return;
    }
    const confirmation = confirm("Are you sure you want to delete this group?");
    if (confirmation === false) {
        return;
    }
    const index = Groupe.findIndex(function (group) {
        return group.id === editingGroupId;
    });
    if (index !== -1) {
        Groupe.splice(index, 1);
        showGroups(Groupe);
    }
    groupFormContenair.classList.add("hidden");
    createGroupForm.reset();
    editingGroupId = null;
});


const addGroupExpenseButton = document.getElementById('add-group-expense-btn');




function openExpenseForm(groupId) {

    selectedGroupId = groupId;

    const groupMembers = getGroupMembers(groupId);

    showPaidByMembers(groupMembers);
    showExpenseParticipants(groupMembers);

    expensesButton.click();

    document.getElementById('recent-expenses').classList.add('hidden');
    document.getElementById('Add-expenses').classList.remove('hidden');
}


addGroupExpenseButton.addEventListener('click', function () {

    if (selectedGroupId === null) {
        return;
    }

    editingExpenseId = null;

    openExpenseForm(selectedGroupId);

    document.getElementById('Expenses-title-input').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').value = '';
    document.getElementById('expense-category').selectedIndex = 0;
});


document.addEventListener('splitmate:open-expense-form', function (event) {
    openExpenseForm(event.detail.groupId);
});




function showPaidByMembers(members) {
    const paidBySelect = document.getElementById('expense-paid-by');

    paidBySelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a member';
    paidBySelect.appendChild(defaultOption);

    members.forEach(function (member) {
        const option = document.createElement('option');

        option.value = member.id;
        option.textContent = member.nom;

        paidBySelect.appendChild(option);
    });
}

function showExpenseParticipants(members) {
    const participantsContainer = document.getElementById('expense-participants');

    participantsContainer.innerHTML = '';

    members.forEach(function (member) {
        const label = document.createElement('label');
        label.className = 'flex items-center gap-3 border-array padding-chart cursor-pointer';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = member.id;
        checkbox.checked = true;

        const name = document.createElement('span');
        name.textContent = member.nom;

        label.appendChild(checkbox);
        label.appendChild(name);

        participantsContainer.appendChild(label);
    });
}


function showGroupExpenses(groupId) {

    const container = document.getElementById('group-expenses-container');

    const groupExpenses = Depenses.filter(function (expense) {
        return expense.groupId === groupId;
    });

    container.innerHTML = '';

    groupExpenses.forEach(function (expense) {

        const card = document.createElement('div');
        card.className = 'flex flex-wrap items-center gap-4 p-5 border-b border-slate-100';

        const information = document.createElement('div');
        information.className = 'flex-1';

        const title = document.createElement('h3');
        title.className = 'text-sm font-semibold text-slate-800';
        title.textContent = expense.title;

        const date = document.createElement('p');
        date.className = 'text-xs text-slate-400 mt-1';
        date.textContent = expense.date;

        const category = document.createElement('span');
        category.className = 'bg-indigo-100 text-indigo-600 rounded-full px-3 py-1 text-xs';
        category.textContent = expense.category;

        const amount = document.createElement('p');
        amount.className = 'text-sm font-semibold text-slate-800';
        amount.textContent = expense.amount.toFixed(2) + ' MAD';

        information.appendChild(title);
        information.appendChild(date);

        card.appendChild(information);
        card.appendChild(category);
        card.appendChild(amount);

        container.appendChild(card);
    });
}
