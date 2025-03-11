# Employee ID Finder

A web application built with **Node.js**, **Express.js**, and **EJS** to help 4,500 employees quickly retrieve their employee ID by entering any part of their name.

## Overview

The Employee ID Finder allows employees to input a portion of their name and retrieve their corresponding employee ID. This simple yet effective tool enhances accessibility and efficiency within the organization.

## Features

- **Flexible Search:** Enter any part of your name to get your employee ID.
- **Responsive UI:** Dynamic rendering using EJS for a smooth experience.
- **Fast Performance:** Built with Node.js and Express.js for quick searches.
- **Scalability:** Designed to handle databases containing thousands of employee records.

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)

## Getting Started

### Prerequisites

- **Node.js** (v14 or later recommended)
- **npm** (comes with Node.js)
- A data source containing employee names and IDs (JSON file or a database)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd employee-id-finder
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure your data source:**

   - If using a JSON file, ensure it is located in `data/employees.json` with the following structure:

     ```json
     [
       { "name": "John Doe", "id": "EMP001" },
       { "name": "Jane Smith", "id": "EMP002" }
     ]
     ```

   - If using a database, update `config.js` with your connection details.

4. **Run the application:**

   ```bash
   npm start
   ```

   The server will start on port **3000**. Open [http://localhost:3000](http://localhost:3000) to use the Employee ID Finder.

## Usage

1. Open the application in your browser.
2. Enter a partial or full name in the search bar.
3. Click the search button.
4. The application will return the matching employee(s) with their corresponding ID(s).

## License

This project is licensed under the [MIT License](LICENSE).

