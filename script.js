// Standard-Daten, falls nichts gespeichert ist
const defaultData = {
    title: "Jakobs Wochenplan",
    school: [
        { icon: "📚", text: "Hausaufgaben sorgfältig erledigt" },
        { icon: "✍️", text: "Schulsachen vorbereitet (Unterschriften, Stifte)" },
        { icon: "🎻", text: "Bratsche geübt (Ziel: 3x/Woche)" },
        { icon: "📝", text: "Schreibübung gemacht" }
    ],
    home: [
        { icon: "🧹", text: "Im Haushalt geholfen (2 Aufgaben = 1 Kreuz)" },
        { icon: "🛏️", text: "Zimmer aufgeräumt" }
    ],
    fun: [
        { icon: "🎧", text: "Spotify / Hörspiel gehört" },
        { icon: "🎮", text: "Videospiele gespielt" },
        { icon: "📺", text: "Fernsehen" }
    ]
};

// Emoji-Vorschlaege fuer schnelle Auswahl neuer Aufgaben.
const iconOptions = [
    "\u2b50",
    "\u{1F31F}",
    "\u{1F308}",
    "\u{1F388}",
    "\u{1F3A8}",
    "\u{1F3B5}",
    "\u26bd",
    "\u{1F9E9}",
    "\u{1F3AF}",
    "\u{1F4DA}",
    "\u270d\uFE0F",
    "\u{1F3BB}",
    "\u{1F4DD}",
    "\u{1F3C6}",
    "\u{1F9F9}",
    "\u{1F6CF}\uFE0F",
    "\u{1F4FA}",
    "\u{1F3AE}",
    "\u{1F3A7}"
];
const iconCursor = { school: 0, home: 0, fun: 0 };

function getDefaultIcon(category) {
    const cursor = iconCursor[category] ?? 0;
    const index = cursor % iconOptions.length;
    iconCursor[category] = cursor + 1;
    return iconOptions[index];
}

function getIconOptionsFor(selectedIcon) {
    const options = iconOptions.slice();
    if (selectedIcon && !options.includes(selectedIcon)) {
        options.unshift(selectedIcon);
    }
    return options;
}

// Daten laden oder Defaults nehmen
let planData = JSON.parse(localStorage.getItem('wochenplanData')) || JSON.parse(JSON.stringify(defaultData));

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    loadEditor();
    renderPreview();
});

// 1. Editor-Felder befüllen
function loadEditor() {
    document.getElementById('planTitle').value = planData.title;
    renderEditorList('school', planData.school);
    renderEditorList('home', planData.home);
    renderEditorList('fun', planData.fun);
}

function renderEditorList(category, items) {
    const container = document.getElementById(`list-${category}`);
    container.innerHTML = '';
    items.forEach((item, index) => {
        const options = getIconOptionsFor(item.icon)
            .map(icon => `<option value="${icon}"${icon === item.icon ? ' selected' : ''}>${icon}</option>`)
            .join('');
        const div = document.createElement('div');
        div.className = 'input-row';
        div.innerHTML = `
            <select class="emoji-select" onchange="updateItem('${category}', ${index}, 'icon', this.value)">
                ${options}
            </select>
            <input type="text" value="${item.text}" oninput="updateItem('${category}', ${index}, 'text', this.value)">
            <button class="btn-del" onclick="deleteItem('${category}', ${index})">✖</button>
        `;
        container.appendChild(div);
    });
}

// 2. Daten aktualisieren
function updatePlan() {
    planData.title = document.getElementById('planTitle').value;
    saveAndRender();
}

function updateItem(category, index, field, value) {
    planData[category][index][field] = value;
    saveAndRender();
}

function addItem(category) {
    planData[category].push({ icon: getDefaultIcon(category), text: "Neue Aufgabe" }); // Default-Werte
    loadEditor(); // Editor neu laden, damit das neue Feld erscheint
    saveAndRender();
}

function deleteItem(category, index) {
    planData[category].splice(index, 1);
    loadEditor();
    saveAndRender();
}

function resetDefaults() {
    if (confirm("Möchtest du wirklich alles auf den Standard zurücksetzen?")) {
        planData = JSON.parse(JSON.stringify(defaultData));
        loadEditor();
        saveAndRender();
    }
}

function saveAndRender() {
    localStorage.setItem('wochenplanData', JSON.stringify(planData));
    renderPreview();
}

// 3. Vorschau Tabelle rendern
function renderPreview() {
    document.getElementById('previewTitle').innerText = planData.title;
    const tbody = document.getElementById('planTableBody');
    tbody.innerHTML = '';

    // Hilfsfunktion für Checkbox-Zellen
    const boxes = '<td><span class="box"></span></td>'.repeat(7);

    // Schule Section
    tbody.innerHTML += `<tr class="group school"><td colspan="8" class="group">Schule & Lernen</td></tr>`;
    if (planData.school.length === 0) tbody.innerHTML += `<tr><td class="label" style="color:#aaa; font-style:italic">Keine Einträge</td>${boxes}</tr>`;
    planData.school.forEach(item => {
        tbody.innerHTML += `<tr><td class="label"><span class="ico">${item.icon}</span><span>${item.text}</span></td>${boxes}</tr>`;
    });
    // Platzhalter-Zeilen optional? Hier weggelassen für Kompaktheit, kann man einfach hinzufügen.

    // Haushalt Section
    tbody.innerHTML += `<tr class="group home"><td colspan="8" class="group">Verantwortung & Alltag</td></tr>`;
    if (planData.home.length === 0) tbody.innerHTML += `<tr><td class="label" style="color:#aaa; font-style:italic">Keine Einträge</td>${boxes}</tr>`;
    planData.home.forEach(item => {
        tbody.innerHTML += `<tr><td class="label"><span class="ico">${item.icon}</span><span>${item.text}</span></td>${boxes}</tr>`;
    });

    // Freizeit Section
    tbody.innerHTML += `<tr class="group fun"><td colspan="8" class="group">Freizeit & Ausgleich</td></tr>`;
    if (planData.fun.length === 0) tbody.innerHTML += `<tr><td class="label" style="color:#aaa; font-style:italic">Keine Einträge</td>${boxes}</tr>`;
    planData.fun.forEach(item => {
        tbody.innerHTML += `<tr><td class="label"><span class="ico">${item.icon}</span><span>${item.text}</span></td>${boxes}</tr>`;
    });
}
