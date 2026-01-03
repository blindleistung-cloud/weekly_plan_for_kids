# Wochenplan Generator

A lightweight, browser-based tool to create, customize, and print weekly schedules for children.

## Overview

Wochenplan Generator is a static web application designed to help parents create structured weekly plans for their children. It replaces the need for manual editing of static HTML files or Excel sheets.

The tool offers a split-view interface: "Plan bearbeiten" on the left for managing tasks and a Live Preview on the right that mirrors the final print output. It balances three core areas of a child's week:

- Schule & Lernen (Hausaufgaben, üben)
- Verantwortung & Alltag (Haushalt, Zimmer aufräumen)
- Freizeit & Ausgleich (Sport, Medienzeit)

## Key Features

- Real-time editing: add, remove, or modify tasks instantly. Changes in the editor appear immediately in the preview.
- Emoji support: customizable icons for every task to make the plan visually appealing for children.
- Auto-save: uses the browser's localStorage to automatically save your changes (UI hint: "Deine Änderungen werden automatisch gespeichert.").
- Print-optimized: custom CSS `@media print` rules ensure the plan prints cleanly on DIN A4 portrait paper.
- Zero dependencies: built with pure HTML5, CSS3, and vanilla JavaScript. No Node.js, build tools, or servers required.
- Reset function: use "Standard wiederherstellen" to reset (zurücksetzen) the plan to the original default template.

## Getting Started

Since this is a static site, you do not need to install any dependencies.

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari).
- A text editor (VS Code) if you wish to modify the source code.

### Installation / Setup

1. Download or clone this repository to your local machine.
2. Navigate to the project folder.
3. Double-click `index.html` to open it in your default web browser.

## Cloudflare Pages Deployment

This project is a static site with no build step.

### Dashboard (Git integration)

- Framework preset: None
- Build command: (leave empty)
- Build output directory: .
- Root directory: (leave empty)

### Wrangler CLI (optional)

A minimal `wrangler.toml` is included with `pages_build_output_dir = "."` for CLI deploys.

Example:

```sh
wrangler pages deploy . --project-name weekly-plan-for-kids
```


## Usage Guide

### 1. Editing the Plan

On the left side of the screen (desktop), you will see the "Plan bearbeiten" panel:

- Titel & Kopfzeile: change the name of the plan (e.g., "Jakobs Wochenplan").
- Schule & Lernen, Verantwortung & Alltag, Freizeit & Ausgleich: add or remove tasks in each category.
- Add items with the "+ Aktivität hinzufügen" button.
- Icons: copy and paste standard emoji into the small input fields to change task icons (Windows: Win + . / Mac: Cmd + Ctrl + Space).

### 2. Saving

There is no "Save" button. The application saves every keystroke automatically to your browser's local storage (see the hint "Deine Änderungen werden automatisch gespeichert.").

### 3. Printing

Click the "Drucken" button in the editor, or press Ctrl + P (Windows) or Cmd + P (Mac).

The print view automatically hides the editor sidebar, navigation buttons, and background colors irrelevant to the printout.

Tip: ensure "Background Graphics" is enabled in your printer settings if you want the colored headers to appear.

## Project Structure

The project follows a standard static web development structure:

```
weekly-planner/
|-- index.html      # Main HTML structure (Editor and Preview markup)
|-- style.css       # All styling, including @media print rules
|-- script.js       # Logic for rendering lists, handling input, and localStorage
`-- README.md       # Project documentation
```

## Technical Details

### Data Structure (script.js)

The application state is managed by a simple JavaScript object `planData`:

```js
const planData = {
  title: "Jakobs Wochenplan",
  school: [ ... ],
  home: [ ... ],
  fun: [ ... ]
};
```

### Styling (style.css)

CSS variables (`:root`) manage the color palette, making it easy to theme the planner:

```css
:root {
  --accent: #274c77; /* Main header color */
  --school: #e7f0ff; /* Blue background for School section */
  --home: #e6f9e6;   /* Green background for Home section */
  --fun: #fff8d6;    /* Yellow background for Fun section */
}
```

## Customization

### Changing Colors

To change the color scheme, open `style.css` and modify the HEX codes in the `:root` section at the top of the file.

### Modifying Default Items

To change what items appear when you click "Standard wiederherstellen":

1. Open `script.js`.
2. Locate the `const defaultData` object at the top.
3. Edit the text and icons within the arrays.

## Troubleshooting

- Emojis are not printing correctly.
  - Some older operating systems or printers struggle with color emoji. Try installing a PDF printer driver or printing from Google Chrome, which renders emoji as graphics.
- Background colors (blue/green/yellow rows) are missing on the printout.
  - In your browser's print dialog, look for an option called "Background graphics" (or "Hintergrundgrafiken") and enable it.
- I want to use this on my phone.
  - While the layout is responsive, the editor is optimized for desktop use. The print layout is strictly A4.

## License

This project is open-source and available for personal use. Feel free to modify and distribute it as needed.

Created with love for better weekly organization.
