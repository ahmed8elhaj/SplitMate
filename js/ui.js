const deleteGroupButton = document.getElementById('delete-button')
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
function showGroups(groupes) {
    groupsCounter.textContent = groupes.length
    groupsContainer.innerHTML = ""

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
                                            <button
                                                class="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-50 py-3 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100">
                                                Open group
                                                <i class="ri-arrow-right-s-line text-lg"></i>
                                            </button>`
        groupsContainer.appendChild(groupCarte)
    })
};
const titleFormGroup = document.getElementById('form-title');
const formTitleDescription = document.getElementById('form-title-description');
// const formTitleDescription=document.getElementById('form-title-description');


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







