let editingExpenseId = null;

let Depenses = [];

 Depenses = [
    {
        id: 1,
        groupId: 1,
        title: 'Dinner',
        amount: 300,
        date: '2026-11-01',
        category: 'Dining',
        paidBy: 1,
        participants: [1, 2, 3],
        splitType: 'equal'
    },
    {
        id: 2,
        groupId: 1,
        title: 'Taxi',
        amount: 120,
        date: '2026-10-30',
        category: 'Transport',
        paidBy: 2,
        participants: [1, 2, 3],
        splitType: 'equal'
    },
    {
        id: 3,
        groupId: 1,
        title: 'Hotel',
        amount: 900,
        date: '2026-10-29',
        category: 'Stay',
        paidBy: 1,
        participants: [1, 2],
        splitType: 'equal'
    },
    {
        id: 4,
        groupId: 2,
        title: 'Lunch',
        amount: 180,
        date: '2026-10-28',
        category: 'Dining',
        paidBy: 3,
        participants: [2, 3],
        splitType: 'equal'
    }
];

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

    return expense;
}

const saveExpenseButton = document.getElementById('save-expenses');


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
showAllExpenses();

// Close the expense form
document.getElementById('Add-expenses').classList.add('hidden');

// Show the expenses page
document.getElementById('recent-expenses').classList.remove('hidden');

// Reset form inputs
document.getElementById('Expenses-title-input').value = '';
document.getElementById('expense-amount').value = '';
document.getElementById('expense-date').value = '';
document.getElementById('expense-category').selectedIndex = 0;
document.getElementById('expense-paid-by').selectedIndex = 0;

// Reset editing mode
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
    // Main card
    const card = document.createElement('div');
    card.className = 'flex flex-wrap items-center gap-4 p-5 border-b border-slate-200 bg-white';

    // Expense icon
    const icon = document.createElement('div');
    icon.className = 'w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0';
    icon.textContent = '▤';

    // Expense information
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

    // Category
    const category = document.createElement('span');
    category.className = 'bg-purple-100 text-purple-600 rounded-full px-3 py-1 text-xs';
    category.textContent = expense.category;

    // Amount information
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


    // Paid by information
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
deleteButton.textContent = '🗑️';
deleteButton.className = 'p-2 rounded-lg hover:bg-red-100 cursor-pointer';
deleteButton.addEventListener('click', function () {

    const confirmation = confirm('Are you sure you want to delete this expense?');

    if (confirmation) {
        deleteExpense(expense.id);

        showGroupExpenses(expense.groupId);
        showAllExpenses();
    }

});

const editButton = document.createElement('button');
editButton.textContent = '✏️';
editButton.className = 'p-2 rounded-lg hover:bg-blue-100 cursor-pointer';


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

    // Build card
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

    const container = document.getElementById('group-expenses-container');

    const expenses = getGroupExpenses(groupId);

    container.innerHTML = '';

    expenses.forEach(function (expense) {

        const card = createExpenseCard(expense);

        container.appendChild(card);

    });

}

function showAllExpenses() {

    const container = document.getElementById('all-expenses-list');

    container.innerHTML = '';

    Depenses.forEach(function (expense) {

        const card = createExpenseCard(expense);

        container.appendChild(card);

    });

}


function deleteExpense(expenseId) {

    Depenses = Depenses.filter(function (expense) {
        return expense.id !== expenseId;
    });

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