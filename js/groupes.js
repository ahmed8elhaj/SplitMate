const createGroupBtn = document.getElementById("create-group");
const groupFormContenair = document.getElementById("group-form-contenaire");
const closeGroupeFormBtn = document.getElementById("close-groupe-form");
const createGroupForm = document.getElementById("create-group-form");

const groupeNameInpute = document.getElementById("group-name");
const groupeDescriptionInpute = document.getElementById("group-description");
const groupeCurrencyInpute = document.getElementById("group-currency");
const groupeDateInpute = document.getElementById("group-date");

const nameErrorMessage = document.getElementById("name-error");
const descriptionErrorMessage = document.getElementById("description-error");
const currencyErrorMessage = document.getElementById("currency-error");
const dateErrorMessage = document.getElementById("date-error");

const groupsContainer = document.getElementById("groups-container");
const groupsCounter = document.getElementById("groups-counter");
const emptyGroupsMessage = document.getElementById("empty-message");

const cancelButton = document.getElementById("cancel");

const submitButton = document.getElementById("submit-button");

let Groupe = readFromLS(GROUPS_KEY);

showGroups(Groupe);


function checkIfEmpty() {
  let isValide = true;
  if (groupeNameInpute.value.trim() === "") {
    nameErrorMessage.textContent = "This field is required";
    isValide = false;
  } else {
    nameErrorMessage.textContent = "";
  }
  if (groupeDateInpute.value === "") {
    dateErrorMessage.textContent = "This field is required";
    isValide = false;
  } else {
    dateErrorMessage.textContent = "";
  }
  return isValide;
}
function getFormData() {
  createGroupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!checkIfEmpty()) {
      return;
    }
    if (editingGroupId !== null) {
      const selectedGroup = Groupe.find((group) => group.id === editingGroupId);
      if (!selectedGroup) return;
      selectedGroup.groupeName = groupeNameInpute.value.trim();
      selectedGroup.groupeDescription = groupeDescriptionInpute.value.trim();
      selectedGroup.groupeCurrency = groupeCurrencyInpute.value;
      selectedGroup.groupeDate = groupeDateInpute.value;
      selectedGroup.avatar = getFirstLetterName(groupeNameInpute.value);
    } else {
      const newGroupeObject = {
        id: Date.now(),
        groupeName: groupeNameInpute.value.trim(),
        groupeDescription: groupeDescriptionInpute.value.trim(),
        groupeCurrency: groupeCurrencyInpute.value,
        groupeDate: groupeDateInpute.value,
        cloture: false,
        avatar: getFirstLetterName(groupeNameInpute.value),
        color: getRandomColor(),
      };
      Groupe.push(newGroupeObject);
    }
    saveToLS(GROUPS_KEY, Groupe);
    showGroups(Groupe);
    groupFormContenair.classList.add("hidden");
    createGroupForm.reset();
    editingGroupId = null;
  });
}

showHiddenElement(createGroupBtn, groupFormContenair);
hideTheElement(closeGroupeFormBtn, groupFormContenair);

getFormData();

emptyAndClose(cancelButton, groupFormContenair);

handleGroupOptions(groupsContainer, Groupe);

groupsContainer.addEventListener("click", function (event) {
  
    
    const button = event.target.closest(".open-group-button");


  const groupId = Number(button.dataset.id);

  const group = Groupe.find(function (element) {
    return element.id === groupId;
  });

  if (!group) {
    return;
  }

  selectedGroupId = groupId;

  document.getElementById("groups-page-header").classList.add("hidden");
  document.getElementById("groups-page-filters").classList.add("hidden");
  document.getElementById("groups-page-list").classList.add("hidden");

  document.getElementById("group-details").classList.remove("hidden");

  document.getElementById("details-group-name").textContent = group.groupeName;
  document.getElementById("details-group-description").textContent =
    group.groupeDescription;
  document.getElementById("details-group-currency").textContent =
    group.groupeCurrency;
  document.getElementById("details-group-avatar").textContent = group.avatar;
  document.getElementById("details-group-date").textContent = group.groupeDate;
  document.getElementById("details-group-status").textContent = group.cloture
    ? "Closed"
    : "Active";

  document.getElementById("group-expenses-section").classList.remove("hidden");
  document.getElementById("group-members-section").classList.add("hidden");

  showGroupExpenses(groupId);
  showGroupMembers(groupId);
  displayPayers(groupId);
  showGroupTab("expenses");
  updateGroupSummary(groupId);
});
