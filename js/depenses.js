
let editingExpenseId = null;
let Depenses = readFromLS(DEPENSES_KEY);



function addExpense(groupId, title, amount, date, category, paidBy, participants) {
    const expense = {
        id: Date.now(),
        groupId: groupId,
        title: title,
        amount: amount,
        date: date,
        category: category,
        paidBy: paidBy,
        participants: participants,
        splitType: 'equal'
    };
    Depenses.push(expense);
    saveToLS(DEPENSES_KEY, Depenses);
    return expense;
}







saveExpenseButton.addEventListener('click', function () {
    const title = document.getElementById('Expenses-title-input').value.trim();
    const amount = Number(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;
    const category = document.getElementById('expense-category').value;
    const paidBy = Number(document.getElementById('expense-paid-by').value);

    const checkboxes = document.querySelectorAll('#expense-participants input:checked');

    const participants = [];

    checkboxes.forEach(function (checkbox) {
        participants.push(Number(checkbox.value));
    });

    if (selectedGroupId === null) {
        alert('Please select a group.');
        return;
    }

    if (title === '' || amount <= 0 || !Number.isFinite(amount) || date === '' || paidBy === 0 || participants.length === 0) {
        alert('Please fill in all required fields.');
        return;
    }

    if (editingExpenseId === null) {
        addExpense(
            selectedGroupId,
            title,
            amount,
            date,
            category,
            paidBy,
            participants
        );
        alert('Expense added successfully!');
    } else {
        updateExpense(
            editingExpenseId,
            title,
            amount,
            date,
            category,
            paidBy,
            participants
        );
        editingExpenseId = null;
        alert('Expense updated successfully!');
    }
    showGroupExpenses(selectedGroupId);
    updateGroupSummary(selectedGroupId);
    document.getElementById('Add-expenses').classList.add('hidden');
    document.getElementById('group-expenses-section').classList.remove('hidden');


    document.getElementById('Expenses-title-input').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').value = '';
    document.getElementById('expense-category').selectedIndex = 0;
    document.getElementById('expense-paid-by').selectedIndex = 0;


    editingExpenseId = null;

    console.log('All expenses:', Depenses);

});




function createExpenseCard(expense) {

    const group = Groupe.find(function (element) {
        return element.id === expense.groupId;
    });

    const payer = Membres.find(function (member) {
        return member.id === expense.paidBy;
    });

    const card = document.createElement('div');
    card.className = 'flex flex-wrap items-center gap-4 p-5 border-b border-slate-200 bg-white';


    const icon = document.createElement('div');
    icon.className = 'w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0';
    icon.textContent = '▤';


    const information = document.createElement('div');
    information.className = 'flex-1 min-w-40';

    const title = document.createElement('h3');
    title.className = 'text-sm font-semibold text-slate-800';
    title.textContent = expense.title;

    const date = document.createElement('p');
    date.className = 'text-xs text-slate-400 mt-1';
    if (group) {
        date.textContent = group.groupeName + ' · ' + expense.date;
    } else {
        date.textContent = 'Unknown group · ' + expense.date;
    }

    information.appendChild(title);
    information.appendChild(date);


    const category = document.createElement('span');
    category.className = 'bg-purple-100 text-purple-600 rounded-full px-3 py-1 text-xs';
    category.textContent = expense.category;


    const amountContainer = document.createElement('div');
    amountContainer.className = 'text-right min-w-28';

    const amount = document.createElement('p');
    amount.className = 'text-sm font-semibold text-slate-800';
    amount.textContent = expense.amount.toFixed(2) + ' MAD';

    const split = document.createElement('p');
    split.className = 'text-xs text-slate-400 mt-1';
    split.textContent = 'Split equally';

    amountContainer.appendChild(amount);
    amountContainer.appendChild(split);



    const paidByContainer = document.createElement('div');
    paidByContainer.className = 'flex flex-col gap-1 min-w-20';

    const paidByLabel = document.createElement('p');
    paidByLabel.className = 'text-xs text-slate-400';
    paidByLabel.textContent = 'Paid by';

    const paidByName = document.createElement('p');
    paidByName.className = 'text-xs font-semibold text-slate-800';
    paidByName.textContent = payer ? payer.nom : 'Unknown';

    paidByContainer.appendChild(paidByLabel);
    paidByContainer.appendChild(paidByName);
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i> Delete expense';
    deleteButton.className = 'rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700';
    deleteButton.addEventListener('click', function () {
        const confirmation = confirm('Are you sure y    ou want to delete this expense?');

        if (confirmation) {
            deleteExpense(expense.id);

            showGroupExpenses(expense.groupId);
            updateGroupSummary(expense.groupId);
        }

    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700';


    editButton.addEventListener('click', function () {

        editingExpenseId = expense.id;

        document.dispatchEvent(
            new CustomEvent('splitmate:open-expense-form', {
                detail: {
                    groupId: expense.groupId
                }
            })
        );

        fillExpenseForm(expense);

        document.getElementById('expense-paid-by').value = expense.paidBy;

        const checkboxes = document.querySelectorAll(
            '#expense-participants input[type="checkbox"]'
        );

        checkboxes.forEach(function (checkbox) {

            if (expense.participants.includes(Number(checkbox.value))) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }

        });

    });


    card.appendChild(icon);
    card.appendChild(information);
    card.appendChild(category);
    card.appendChild(paidByContainer);
    card.appendChild(amountContainer);
    card.appendChild(editButton);
    card.appendChild(deleteButton);

    return card;
}

function showGroupExpenses(groupId) {
    if (typeof filterGroupExpenses === 'function' && selectedGroupId === groupId) {
        filterGroupExpenses();
        return;
    }
    const container = document.getElementById('group-expenses-container');

    const expenses = getGroupExpenses(groupId);

    container.innerHTML = '';

    expenses.forEach(function (expense) {

        const card = createExpenseCard(expense);

        container.appendChild(card);

    });

}


function showAllExpenses() {
    if (selectedGroupId !== null) {
        showGroupExpenses(selectedGroupId);
    }
}

function deleteExpense(expenseId) {

    Depenses = Depenses.filter(function (expense) {
        return expense.id !== expenseId;
    });
saveToLS(DEPENSES_KEY, Depenses);
}


function updateExpense(expenseId, title, amount, date, category, paidBy, participants) {

    const expense = Depenses.find(function (element) {
        return element.id === expenseId;
    });

    if (expense) {
        expense.title = title;
        expense.amount = amount;
        expense.date = date;
        expense.category = category;
        expense.paidBy = paidBy;
        expense.participants = participants;

        saveToLS(DEPENSES_KEY, Depenses);
    }

}

function fillExpenseForm(expense) {

    const titleInput = document.getElementById('Expenses-title-input');
    const amountInput = document.getElementById('expense-amount');
    const dateInput = document.getElementById('expense-date');
    const categoryInput = document.getElementById('expense-category');

    titleInput.value = expense.title;
    amountInput.value = expense.amount;
    dateInput.value = expense.date;
    categoryInput.value = expense.category;

}

function getGroupExpenses(groupId) {

    return Depenses.filter(function (expense) {
        return expense.groupId === groupId;
    });

}