# Custom Autofill Extension

A Chrome extension that allows users to quickly fill forms using a right-click context menu with customizable JSON data.

## Features

- Right-click context menu for quick form filling
- Customizable autofill data through JSON editor
- Works on any website with text input fields
- Secure local storage of user data
- Simple JSON-based configuration

## Installation

### From Chrome Web Store

1. Visit the [Chrome Web Store](your-store-link)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

### Setting Up Autofill Data

1. Click the extension icon in your browser toolbar
2. Enter your autofill data in JSON format
3. Click "Save Settings"

Example JSON format:

```json
{
  "fullName": "John Doe",
  "phone": "1234567890",
  "email": "example@email.com",
  "address": "123 Main St"
}
```

### Using the Extension

1. Right-click on any text input field
2. Select "Autofill" from the context menu
3. Choose the data you want to insert

## Development

### Project Structure
