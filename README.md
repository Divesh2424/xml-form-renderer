# XML Form Renderer (React Native App)

This is a React Native mobile application that renders dynamic forms based on XML input. The app supports rendering from a predefined XML file and also accepts XML input from the user.

## Features

- Two main buttons:
  - **Render Form from XML File**
  - **Render Form from Input XML**
- Supports the following field types:
  - Text field
  - Date/Datetime field
  - Radio buttons
  - Drawing/Signature field
- Handles invalid or malformed XML input gracefully with alerts.

## Screens

### 1. HomeScreen
Displays two buttons for navigating to form rendering screens.

### 2. FileXmlScreen
Loads form structure from a hardcoded XML file and displays the form.

### 3. InputXmlScreen
Allows users to paste custom XML input to generate a form dynamically.
- Only the following field types are supported: **text**, **date/datetime**, **radio**, and **drawing**

## Components

### FormRenderer.js
Dynamically renders form fields based on parsed XML data.
- Uses `TextInput`, `DateTimePicker`, `Buttons`, and `SignatureCanvas`.

### xmlParser.js
Parses XML strings using `fast-xml-parser` and converts them to a structured JSON format usable by the renderer.

## Error Handling
- If XML is malformed or missing required structure, an error message is shown via an `Alert`.

## Setup Instructions

```bash
git clone https://github.com/yourusername/xml-form-renderer.git
cd xml-form-renderer
npm install
npx expo start

## Requirements
- Node.js
- npm or yarn
- Expo CLI

## License

This project is licensed under the MIT License.  
© 2025 Divesh

## Author

- **Divesh** – [github-profile-link](https://github.com/Divesh2424)


