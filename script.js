// Masks the password with asterisks
function maskPassword(password) {
    return '*'.repeat(password.length);
}

// Copies text to the clipboard and shows an alert
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
            document.getElementById("alert").style.display = "none";
        }, 2000);
    }).catch(() => {
        alert("Clipboard copying failed");
    });
}

// Deletes a password entry from local storage
function deletePassword(website) {
    const data = localStorage.getItem("passwords");
    if (data) {
        const passwords = JSON.parse(data);
        const updatedPasswords = passwords.filter(entry => entry.website !== website);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        alert(`Successfully deleted ${website}'s password`);
        showPasswords();
    }
}

// Renders the passwords table
function showPasswords() {
    const table = document.querySelector("table");
    const data = localStorage.getItem("passwords");
    table.innerHTML = "";

    if (!data || JSON.parse(data).length === 0) {
        table.innerHTML = "No Data To Show";
    } else {
        const passwords = JSON.parse(data);
        const fragment = document.createDocumentFragment();

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        `;
        fragment.appendChild(headerRow);

        passwords.forEach(entry => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.website} <img onclick="copyText('${entry.website}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td>${entry.username} <img onclick="copyText('${entry.username}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td>${maskPassword(entry.password)} <img onclick="copyText('${entry.password}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td><button class="btnsm" onclick="deletePassword('${entry.website}')">Delete</button></td>
            `;
            fragment.appendChild(row);
        });

        table.appendChild(fragment);
    }

    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

// Initializes and sets up event listeners
function init() {
    console.log("Working");
    showPasswords();

    document.querySelector(".btn").addEventListener("click", (e) => {
        e.preventDefault();
        const website = document.getElementById("website").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        let passwords = localStorage.getItem("passwords");
        const json = passwords ? JSON.parse(passwords) : [];

        json.push({ website, username, password });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
        showPasswords();
    });
}

document.addEventListener("DOMContentLoaded", init);
