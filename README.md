# benchFiveTest
BenchFive Frontend Developer Test – Product Management Web App This is my solution to the BenchFive Frontend Engineer/Developer Test Assignment. The project is a React + TypeScript web application for managing products, featuring a Product List page and an Add/Edit Product page with dynamic form fields, browser storage, and a clean responsive UI.
 Project Features
Product List Page

Displays all products stored in browser local storage.

Shows SKU, Name, Price, and a product-specific attribute:

DVD → Size (MB)

Book → Weight (Kg)

Furniture → Dimensions (HxWxL)

Clickable product name opens image in a new tab.

Select products via checkboxes for:

EDIT: Opens edit form (only when one product is selected).

MASS DELETE: Removes selected products.

Pagination (10 products per page).

Add/Edit Product Page

Form fields:

SKU (unique)

Name

Price ($)

Image URL

Product Type (DVD / Book / Furniture)

Dynamic fields based on type selection:

DVD → Size (MB)

Book → Weight (Kg)

Furniture → Height, Width, Length

Real-time validation for required fields and correct data types.

Auto-generated unique SKU to prevent duplicates.

Cancel or Save to return to the Product List page.

Data Persistence

Products are saved in browser localStorage and persist across page reloads.

Tech Stack

React (with Hooks)

TypeScript

Context API (for state management)

React Router (for navigation)

Tailwind CSS (for styling)

LocalStorage (for saving products)
