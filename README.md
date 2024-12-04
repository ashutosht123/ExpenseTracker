# Expense Tracker
An expense tracker to manage finances by adding balances and tracking expenses with real-time updates. https://expense-tracker-luyw.onrender.com

![Screenshot 2024-12-05 012929](https://github.com/user-attachments/assets/eb4a9b14-0f4f-4a8b-abf7-63d6debd0b11)


## Features

- **Add Balance**: Users can add their initial balance to manage finances effectively.
- **Real-Time Updates**: Automatically updates total balance and expense breakdown after each entry.
- **Search Functionality**: Quickly search and filter through expenses by type or description
- **User Authentication & Authorization**: Managed via Passport for secure login and access control.
- **MVC Architecture**: The project is built using the MVC structure for better code organization and maintainability.
- **Deployment**: Hosted on Render.com for easy online access.

## Tech Stack

- **Frontend**: HTML, CSS, JAVASCRIPT 
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Hosting**: Render


## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ashutosht123/ExpenseTracker.git
    cd Seva
    ```

2. **Install dependencies:**

    ```bash
     npm install express
     npm install mongoose
     npm install path
     npm i ejs
     npm install -g nodemon
     npm install method-override
     npm install ejs-mate
     npm install dotenv
     npm install express-session
     npm install connect-mongo
     npm install cookie-parser
     npm install connect-flash
     npm install passport
     npm install passport-local
     npm install passport-local-mongoose
     npm i connect-mongo 
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `your project` directory and add the following:

    ```env
    SECRET=your_jwt_secret
    ATLASDB_URL=your_atlasdb_url
    ```


4. **Run the application:**

    # Start server
     ```bash
    cd ExpenseTracker
     ```
     ```bash
    nodemon app.js
     ```
    or
     ```bash
    node app.js
     ```
    
    The server will run on `http://localhost:5000`.

## Usage

- Visit the [live demo](https://expense-tracker-luyw.onrender.com) to explore the application.  
- Register or log in to your account.  
- View information about Your Expenses.  
