// Balances are calculated independently for each group.
// Reimbursements are kept in memory until the page is refreshed.
let completedReimbursements = [];
function calculateGroupBalances(groupId) {
    const members = getGroupMembers(groupId);
    const expenses = getGroupExpenses(groupId);
    const balances = [];
    members.forEach(function (member) {
        balances.push({ id: member.id, name: member.nom, amount: 0 });
    });
    expenses.forEach(function (expense) {
        const payer = balances.find(function (member) { return member.id === expense.paidBy; });
        if (payer) payer.amount += expense.amount;
        const validParticipants = expense.participants.filter(function (id) {
            return balances.some(function (member) { return member.id === id; });
        });
        if (validParticipants.length > 0) {
            const share = expense.amount / validParticipants.length;
            validParticipants.forEach(function (id) {
                const participant = balances.find(function (member) { return member.id === id; });
                participant.amount -= share;
            });
        }
    });
    completedReimbursements.forEach(function (payment) {
        if (payment.groupId !== groupId) return;
        const sender = balances.find(function (member) { return member.id === payment.fromId; });
        const receiver = balances.find(function (member) { return member.id === payment.toId; });
        if (sender) sender.amount += payment.amount;
        if (receiver) receiver.amount -= payment.amount;
    });
    return balances;
}
function showGroupBalances(groupId) {
    const group = Groupe.find(function (item) { return item.id === groupId; });
    if (!group) return;
    const currency = group.groupeCurrency;
    const balances = calculateGroupBalances(groupId);
    const list = document.getElementById('group-balances-list');
    const suggestions = document.getElementById('group-reimbursements-list');
    const completed = document.getElementById('group-completed-reimbursements');
    list.replaceChildren(); suggestions.replaceChildren(); completed.replaceChildren();
    const creditors = []; const debtors = [];
    let outstanding = 0;
    balances.forEach(function (member) {
        const row = document.createElement('div');
        row.className = 'flex justify-between gap-4 py-3 text-sm';
        const name = document.createElement('span'); name.textContent = member.name;
        const amount = document.createElement('span');
        amount.textContent = (member.amount >= 0 ? '+' : '') + member.amount.toFixed(2) + ' ' + currency;
        amount.className = member.amount >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold';
        row.appendChild(name); row.appendChild(amount); list.appendChild(row);
        if (member.amount > 0.005) { creditors.push({id:member.id,name:member.name,amount:member.amount}); outstanding += member.amount; }
        if (member.amount < -0.005) debtors.push({id:member.id,name:member.name,amount:-member.amount});
    });
    document.getElementById('group-total-outstanding').textContent = outstanding.toFixed(2) + ' ' + currency;
    if (balances.length === 0) list.textContent = 'No members in this group.';
    // Greedy settlement suggestions: debtor pays creditor.
    debtors.forEach(function (debtor) {
        creditors.forEach(function (creditor) {
            if (debtor.amount < 0.005 || creditor.amount < 0.005) return;
            const amount = Math.min(debtor.amount, creditor.amount);
            const roundedAmount = Math.round(amount * 100) / 100;
            if (roundedAmount <= 0) return;
            debtor.amount -= roundedAmount; creditor.amount -= roundedAmount;
            const row = document.createElement('div');
            row.className = 'flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm';
            const label = document.createElement('span');
            label.textContent = debtor.name + ' pays ' + creditor.name + ' · ' + roundedAmount.toFixed(2) + ' ' + currency;
            const button = document.createElement('button');
            button.className = 'rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700';
            button.textContent = 'Mark as paid';
            button.addEventListener('click', function () {
                completedReimbursements.push({groupId:groupId,fromId:debtor.id,toId:creditor.id,amount:roundedAmount});
                showGroupBalances(groupId);
            });
            row.appendChild(label); row.appendChild(button); suggestions.appendChild(row);
        });
    });
    if (!suggestions.children.length) suggestions.textContent = 'Everyone is settled up.';
    completedReimbursements.forEach(function (payment) {
        if (payment.groupId !== groupId) return;
        const from = getGroupMembers(groupId).find(function (member) { return member.id === payment.fromId; });
        const to = getGroupMembers(groupId).find(function (member) { return member.id === payment.toId; });
        if (!from || !to) return;
        const row = document.createElement('p');
        row.className = 'rounded-lg bg-green-50 p-3 text-sm text-green-700';
        row.textContent = from.nom + ' paid ' + to.nom + ' · ' + payment.amount.toFixed(2) + ' ' + currency;
        completed.appendChild(row);
    });
    if (!completed.children.length) completed.textContent = 'No completed reimbursements yet.';
}
