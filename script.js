document.getElementById('addExpenseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const expenseCategory = document.getElementById('expenseCategory').value;
    const expenseDate = new Date().toLocaleDateString();

    // Create a new table row
    const tableBody = document.getElementById('expenseTableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${expenseName}</td>
        <td>$${expenseAmount.toFixed(2)}</td>
        <td>${expenseCategory}</td>
        <td>${expenseDate}</td>
    `;

    // Append the new row to the table
    tableBody.appendChild(row);

    // Update total expenses and entries
    updateDashboard(expenseAmount);

    // Reset the form
    document.getElementById('addExpenseForm').reset();
});

function updateDashboard(amount) {
    const totalExpensesElement = document.getElementById('totalExpenses');
    const totalEntriesElement = document.getElementById('totalEntries');

    // Update the total expenses
    let currentTotal = parseFloat(totalExpensesElement.innerText.replace('$', ''));
    currentTotal += amount;
    totalExpensesElement.innerText = `$${currentTotal.toFixed(2)}`;

    // Update the total entries count
    let totalEntries = parseInt(totalEntriesElement.innerText);
    totalEntries++;
    totalEntriesElement.innerText = totalEntries;
}

let walletAmount = 0;

// Set up wallet button functionality
document.getElementById('setWalletButton').addEventListener('click', function() {
    // Get the initial wallet amount from the input
    const initialAmount = parseFloat(document.getElementById('initialWalletAmount').value);

    if (!isNaN(initialAmount) && initialAmount >= 0) {
        // Set the wallet amount
        walletAmount = initialAmount;

        // Update the wallet display
        updateWalletDisplay();

        // Clear the input field
        document.getElementById('initialWalletAmount').value = '';
    } else {
        alert("Please enter a valid wallet amount.");
    }
});

// Function to update the wallet display
function updateWalletDisplay() {
    document.getElementById('walletBalance').innerText = `$${walletAmount.toFixed(2)}`;
}

// Add event listener to the form submit event
document.getElementById('addExpenseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const expenseCategory = document.getElementById('expenseCategory').value;
    const expenseDate = new Date().toLocaleDateString();

    // Check if wallet has sufficient balance
    if (expenseAmount <= walletAmount) {
        // Deduct the expense from the wallet
        walletAmount -= expenseAmount;

        // Update the wallet display
        updateWalletDisplay();

        // Create a new table row
        const tableBody = document.getElementById('expenseTableBody');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expenseName}</td>
            <td>$${expenseAmount.toFixed(2)}</td>
            <td>${expenseCategory}</td>
            <td>${expenseDate}</td>
        `;

        // Append the new row to the table
        tableBody.appendChild(row);

        // Update total expenses and entries
        updateDashboard(expenseAmount);

        // Reset the form
        document.getElementById('addExpenseForm').reset();
    } else {
        alert("Insufficient wallet balance to cover this expense!");
    }
});

// Function to update the dashboard totals
function updateDashboard(amount) {
    const totalExpensesElement = document.getElementById('totalExpenses');
    const totalEntriesElement = document.getElementById('totalEntries');

    // Update the total expenses
    let currentTotal = parseFloat(totalExpensesElement.innerText.replace('$', ''));
    currentTotal += amount;
    totalExpensesElement.innerText = `$${currentTotal.toFixed(2)}`;

    // Update the total entries count
    let totalEntries = parseInt(totalEntriesElement.innerText);
    totalEntries++;
    totalEntriesElement.innerText = totalEntries;
}
