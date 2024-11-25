# MoustacheRepublic Test

Developer test for application

## Features

- **Product Display**: Shows product information including an image, description, price, and available sizes.
- **Cart Management**: Users can add products to their cart with selected sizes and view their cart with a detailed summary.

## Technology Stack

- **React**: Used for building the user interface.
- **Jest**: Utilized for running unit tests.
- **Tailwind CSS**: For styling the application.

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later recommended)
- npm (typically installed with Node.js)

### Getting Started

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/jpmal22/MoustacheRepublic-DeveloperTest
   cd moustacherep-test
   ```

2. **Install NPM Packages**

   ```bash
   npm install
   ```

3. **Create .env**

Create a .env file with the following variable name for the API endpoint - REACT_APP_API_URL

4. **Run the application**

   ```bash
   npm start
   ```

## Usage

Viewing the Product: The main page displays the Classic Tee with all pertinent details.
Selecting a Size: Click on one of the size buttons (S, M, L) to select a size.
Adding to Cart: With a size selected, click on Add to Cart to add the item to your shopping cart.
Viewing the Cart: Click on the My Cart button in the navigation bar to expand the cart dropdown and view selected items.

## Running Tests

```bash
  npm test
```
