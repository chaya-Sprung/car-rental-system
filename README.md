הנה כל תוכן ה-README כטקסט נקי (Raw Markdown) בתוך תיבת קוד אחת מסודרת.

לחצי על כפתור ה-Copy (העתק) שנמצא בפינה של התיבה, ואז הדביקי ישירות לתוך הקובץ README.md:

Markdown
# 🚗 Car Rental Management System

A robust, full-stack enterprise web application for managing vehicle rentals, customer bookings, vehicle availability, and payment processing. 

Built with an **Angular** frontend, a scalable **ASP.NET Web API (C#)** backend utilizing clean **N-Tier Architecture (API, BL, DAL)**, and **Entity Framework** connected to **SQL Server**.

---

## 🌟 Key Features

### 👤 Customer Facing
* **Browse Vehicles:** Filter and view real-time fleet availability with detailed specs, pricing, and category filters.
* **Authentication & Identity:** User registration, secure login, and session persistence.
* **Booking & Reservation:** Select pickup/return dates, locations, and choose specific available vehicles.
* **Payment Processing:** Integrated billing flow validating payment details and completing order transactions.
* **Rental History:** Personal user profile dashboard to track past, active, and upcoming rentals.

### 🏢 System & Business Logic
* **Validation & Business Rules:** Backend logic ensuring vehicles cannot be double-booked across overlapping rental windows.
* **N-Tier Decoupling:** Complete separation of concerns:
  * **API Layer:** RESTful endpoints with CORS handling and status management.
  * **Business Logic (BL):** Validation, DTO mapping, and domain services.
  * **Data Access (DAL):** Entity Framework data context, database entity mappings, and queries.

---

## 🛠️ Architecture & Tech Stack

### Frontend (Client-Side)
* **Framework:** Angular (v17+)
* **Language:** TypeScript
* **State & Async:** RxJS Observables, Reactive Services
* **Routing:** Angular Component Routing with route parameters
* **Styling:** Bootstrap, Responsive Grid layout, Modern Custom CSS

### Backend (Server-Side)
* **Framework:** ASP.NET Web API 2 / .NET Framework
* **Language:** C#
* **Architecture:** N-Tier Layered Design (`API` ➔ `BL` ➔ `DAL`)
* **ORM:** Entity Framework (Database First / EDMX)
* **API Documentation:** ASP.NET Web API Help Page & Metadata

### Database
* **Engine:** Microsoft SQL Server (`CarsDB.mdf`)
* **Core Entities:** `Cars`, `Customers`, `Rents`, `Cities`, `PayMents`

---

## 📂 Project Structure

```text
car-rental-system/
├── AngularCars/                      # Client-side Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── Services/             # HTTP Client Services (Cars, Rents, Customers, Payment, Cities)
│   │   │   ├── desplay-cars/         # Fleet catalog and vehicle grid view
│   │   │   ├── rent-car/             # Booking & reservation workflow
│   │   │   ├── payment/              # Payment submission and receipt processing
│   │   │   ├── login/                # Authentication & customer login
│   │   │   ├── register/             # New user registration
│   │   │   ├── user-history/         # Customer rental history view
│   │   │   ├── app.routes.ts         # Navigation & routing definitions
│   │   │   └── app.config.ts         # Application configuration & HTTP providers
│   │   └── environments/             # API connection endpoints configuration
│   └── package.json
│
├── CarsShifi/                        # Backend .NET Solution
│   ├── API/                          # Web API Layer
│   │   ├── Controllers/              # CarsController, RentsController, CustomersController, etc.
│   │   ├── App_Start/                # WebApiConfig, RouteConfig, CORS Setup
│   │   └── Web.config
│   ├── BL/                           # Business Logic Layer
│   │   ├── ClassesBL/                # Domain operations & business rules (CarsBL, RentsBL)
│   │   └── ClassesDTO/               # Data Transfer Objects (CarsDTO, CustomersDTO, etc.)
│   ├── DAL/                          # Data Access Layer
│   │   ├── Model1.edmx               # Entity Framework Context & Mapping
│   │   └── CarsDB.mdf                # SQL Server Database
│   └── CarsShifi.sln                 # Visual Studio Solution
└── README.md
🚀 Getting Started
Prerequisites
Node.js (v18.x or later recommended)

Angular CLI (npm install -g @angular/cli)

Visual Studio (2022 recommended) with ASP.NET and web development workload

SQL Server / LocalDB

Backend Setup (.NET Web API)
Open CarsShifi/CarsShifi.sln in Visual Studio.

Verify the connection string in API/Web.config points to your local SQL Server instance or the included CarsDB.mdf in App_Data.

Restore NuGet packages:

Right-click the Solution ➔ Restore NuGet Packages.

Set the API project as the Startup Project.

Run the server (press F5 or Ctrl + F5). The API will launch on:

Plaintext
http://localhost:PORT/api/
Frontend Setup (Angular)
Open a terminal and navigate to the client folder:

Bash
cd AngularCars
Install dependencies:

Bash
npm install
Verify the API endpoint in src/environments/environment.ts:

TypeScript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:PORT/api' // Replace PORT with your backend port
};
Start the Angular development server:

Bash
ng serve
Navigate to http://localhost:4200/ in your browser.

📡 API Endpoints Overview
Controller	Method	Endpoint	Description
Cars	GET	/api/Cars	Retrieve all available cars
Cars	GET	/api/Cars/{id}	Get car details by ID
Customers	POST	/api/Customers/login	Authenticate customer credentials
Customers	POST	/api/Customers/register	Register a new customer
Rents	POST	/api/Rents	Create a new car reservation
Rents	GET	/api/Rents/customer/{id}	Get rental history for a customer
Payment	POST	/api/Payment	Process and store transaction details
City	GET	/api/City	Get available branch locations/cities
👩‍💻 Author
Developed by Chaya  Sprung

Software Engineering graduate & Computer Science student.
