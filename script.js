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
    "\U0001f31f",
    "\U0001f308",
    "\U0001f388",
    "\U0001f3a8",
    "\U0001f3b5",
    "\u26bd",
    "\U0001f9e9",
    "\U0001f3af",
    "\U0001f4da",
    "\u270d\ufe0f",
    "\U0001f3c6",
    "\U0001f9f9",
    "\U0001f6cf\ufe0f",
    "\U0001f3ae",
    "\U0001f3a7"
];
const iconCursor = { school: 0, home: 0, fun: 0 };

function getDefaultIcon(category) {
    const cursor = iconCursor[category] ?? 0;
    const index = cursor % iconOptions.length;
    iconCursor[category] = cursor + 1;
    return iconOptions[index];
}

function ensureIconDatalist() {
    if (document.getElementById('icon-options')) return;
    const datalist = document.createElement('datalist');
    datalist.id = 'icon-options';
    iconOptions.forEach(icon => {
        const option = document.createElement('option');
        option.value = icon;
        datalist.appendChild(option);
    });
    document.body.appendChild(datalist);
}

// Daten laden oder Defaults nehmen
let planData = JSON.parse(localStorage.getItem('wochenplanData')) || JSON.parse(JSON.stringify(defaultData));

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    ensureIconDatalist();
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
        const div = document.createElement('div');
        div.className = 'input-row';
        div.innerHTML = `
            <input type="text" class="emoji-input" value="${item.icon}" list="icon-options" onchange="updateItem('${category}', ${index}, 'icon', this.value)">
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
