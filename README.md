Employee Management Dashboard

Here is the Employee Management Dashboard assignment. I built this as a Single Page Application (SPA) using React and Bootstrap. It lets you log in, manage employee records, and search/filter the list.

Since there is no backend API, I used LocalStorage to save the data. This means if you refresh the page, your changes are still there

Tech Stack Used

React (set up with Vite)
Bootstrap 5 (for styling)
Context API (to handle global state like Auth and Employee lists)
React Router (for navigation between Login, Dashboard, and Forms)

How to Run It

npm install


Start the server

npm run dev

Login Details

I set up a mock login system. You can use these credentials to get in:

Email: bookxpert@company.com

Password: bookxpert123

Features

Login Page: You can't see the dashboard unless you log in.

Dashboard:

Shows counters for Total, Active, and Inactive employees.

Search & Filter: You can search by name AND filter by gender/status at the same time.

Manage Employees:

Add/Edit: A single form handles both. It has validation (you can't submit empty fields).

Delete: Clicking delete opens a modal to ask "Are you sure?" first.

Toggle Status: You can flip an employee from Active to Inactive directly on the table.

Image Upload: You can upload a profile picture, and it shows a preview immediately.

Print: There's a print button that hides the sidebar and buttons so you just get a clean table on paper.


Images: Since I'm using LocalStorage, I convert images to Base64 strings. 

IDs: I'm just using Date.now() to generate IDs. 

Folder Structure

Here is how I organized the code in src:

/src
  /components   
  /context      
  /pages        
  App.jsx       
  main.jsx      
