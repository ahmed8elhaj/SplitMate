
const groupCategorySelect = document.getElementById('group-expense-category');
const groupPayerSelect = document.getElementById('group-expense-payer');
const groupSearchInput = document.getElementById('group-expense-search');
const groupSortSelect = document.getElementById('group-expense-sort');
const expensesContainer = document.getElementById('group-expenses-container');


function displayPayers(groupId) {
    groupPayerSelect.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = 'All';
    allOption.textContent = 'All payers';

    groupPayerSelect.appendChild(allOption);

    const members = getGroupMembers(groupId);

    members.forEach(function (member) {
        const option = document.createElement('option');

        option.value = member.id;
        option.textContent = member.nom;

        groupPayerSelect.appendChild(option);
    });

    groupCategorySelect.value = 'All categories';
    groupSearchInput.value = '';
    groupSortSelect.selectedIndex = 0;
}


function filterByCategory(expenses) {
    const category = groupCategorySelect.value;

    if (category === 'All categories') {
        return expenses;
    }

    return expenses.filter(function (expense) {
        return expense.category === category;
    });
}


function filterByPayer(expenses) {
    const payer = groupPayerSelect.value;

    if (payer === 'All') {
        return expenses;
    }

    return expenses.filter(function (expense) {
        return expense.paidBy === Number(payer);
    });
}


function filterBySearch(expenses) {
    const search = groupSearchInput.value.trim().toLowerCase();

    return expenses.filter(function (expense) {
        return expense.title.toLowerCase().includes(search);
    });
}


function sortExpenses(expenses) {
    const sort = groupSortSelect.value;

    if (sort === 'Oldest first') {
        expenses.sort(function (a, b) {
            return a.date.localeCompare(b.date);
        });
    }

    if (sort === 'Newest first') {
        expenses.sort(function (a, b) {
            return b.date.localeCompare(a.date);
        });
    }

    if (sort === 'Highest amount') {
        expenses.sort(function (a, b) {
            return b.amount - a.amount;
        });
    }

    if (sort === 'Lowest amount') {
        expenses.sort(function (a, b) {
            return a.amount - b.amount;
        });
    }

    return expenses;
}


function displayFilteredExpenses(expenses) {
    expensesContainer.innerHTML = '';

    if (expenses.length === 0) {
        expensesContainer.textContent = 'No expenses found for this group.';
        return;
    }

    expenses.forEach(function (expense) {
        const card = createExpenseCard(expense);
        expensesContainer.appendChild(card);
    });
}


function filterGroupExpenses() {
    if (selectedGroupId === null) {
        return;
    }

    let expenses = getGroupExpenses(selectedGroupId);

    expenses = filterByCategory(expenses);
    expenses = filterByPayer(expenses);
    expenses = filterBySearch(expenses);
    expenses = sortExpenses(expenses);

    displayFilteredExpenses(expenses);
}


groupCategorySelect.addEventListener('change', filterGroupExpenses);
groupPayerSelect.addEventListener('change', filterGroupExpenses);
groupSearchInput.addEventListener('input', filterGroupExpenses);
groupSortSelect.addEventListener('change', filterGroupExpenses);

