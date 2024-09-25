# Software Architecture Documentation

## Overview
This document describes the software architecture of the **Receita.ai** system using the C4 Model.

## 1. Context Diagram

### 1.1. Context Diagram Description
The context diagram provides a high-level overview of the system and its interactions with external actors.

- **System:** Me passa a receita aí? (receita.ai)
- **External Actors:** Authenticated Users (Chefs), Non-authenticated Users (Visitors), and Partner Companies

### 1.2. Diagram
![Context Diagram](https://github.com/user-attachments/assets/5c559760-35e3-4c65-b47b-55f8ee1433ca)

### 1.3. Component Descriptions
- **External Actors:**
  - **Authenticated Users (Chefs):** Interact with the web application to create, comment, and share recipes.
  - **Non-authenticated Users (Visitors):** Consume content and advertisements on the system, searching for recipes posted by chefs.
  - **Partner Companies:** Invest money into the system by placing their advertisements for consumers, gaining visibility through the platform.
- **System:** The **Receita.ai** platform centralizes recipe management, allowing users to interact with content created by others.

---

## 2. Container Diagram

### 2.1. Container Diagram Description
The container diagram shows the main software containers that make up the system and how they interact with each other.

- **Included Containers:**
  - **Web Application (Frontend):** User interface developed with Next.js.
  - **Backend API:** Backend using Supabase for data management and authentication.
  - **Database:** PostgreSQL, hosted on Supabase, to store user and recipe data.

### 2.2. Diagram
![Container Diagram](https://github.com/user-attachments/assets/3d8f3c75-fa8a-415c-bfeb-394656aca690)

### 2.3. Software Architecture

The project architecture follows a **monolithic** model on the backend, with specialized components in the frontend, depending on the technology used and cloud support services.

### 2.3. Container Descriptions

1. **DNS Service (Route 53):**
   - **Function:** Resolves the domain name to the corresponding IP address, allowing access to the site.
   - **Interaction:** Users access the system's domain, and DNS routes them to the correct servers.
   - **Technology:** Amazon Route 53 or equivalent.

2. **CDN Service (Cache):**
   - **Function:** Distributes and caches static content of the site, such as HTML pages, CSS, images, and JavaScript files, ensuring users have fast access to cached content.
   - **Interaction:** Acts between users and the static site, serving content directly from the cache and reducing latency.
   - **Technology:** Amazon CloudFront or another CDN that delivers content more efficiently to users.

3. **Static Site (Frontend - React):**
   - **Function:** Displays the user interface and handles user interactions.
   - **Interaction:** Renders web pages and consumes data from the backend (API and database) to display recipes, perform login/registration, etc.
   - **Technology:** React, a JavaScript library for building dynamic user interfaces.

4. **Compute Service (Backend - Supabase):**
   - **Function:** Handles backend functionalities such as authentication, data manipulation, and communication with the database.
   - **Interaction:** Receives requests from the frontend, processes them, and communicates with the database to retrieve or save data (recipes, users, comments, etc.).
   - **Technology:** Supabase, a backend platform offering user authentication and a REST API for interacting with the database.

5. **Database (PostgreSQL):**
   - **Function:** Stores system data, such as recipes, users, ratings, and other entities.
   - **Interaction:** All dynamic data is stored in the PostgreSQL database, and data requests made by the frontend via Supabase are handled and returned by this database.
   - **Technology:** PostgreSQL, a relational database.

#### Data Flow:
1. The user accesses the site through a domain name, which is resolved by the **DNS Service**.
2. The CDN, through the **CDN Service**, serves the static content of the React site to the user.
3. The static site (React) communicates with the **Compute Service (Supabase)** for dynamic operations such as login, recipe listing, and rating.
4. **Supabase** interacts with the **PostgreSQL database**, performing read and write operations.
5. Responses to the requests are processed by the frontend and displayed to the user.

---

## 3. Component Diagram

### 3.1. Component Diagram Description
The component diagram details the internal architecture of the **Frontend (Next.js)** container, showing the components that make it up and their interactions.

- **Focused Container:** Web Application (Next.js)

### 3.2. Diagram
![Component Diagram](https://github.com/user-attachments/assets/bd134550-a96e-4575-bf01-c05c8a0e89bb)

### 3.3. Component Descriptions

#### Login/Registration Component:
- **Responsibility:** Manages user login, registration, and authentication. Allows authenticated users, like Chefs and Companies, to share recipes and register ads.
- **Interactions:** Sends and receives authentication data to the backend via Supabase. Also enables users to register ads and post recipes with photos.
- **Technologies:** React, JWT, Supabase Auth.

#### Recipe List Component (Feed):
- **Responsibility:** Displays recipes for visitors and authenticated users. Allows authenticated users to share, comment, and rate recipes. Non-authenticated users can view recipes and ads.
- **Interactions:** Communicates with the API for recipe data manipulation in the database. Relates to the comments and ratings component and displays content for visitors.
- **Technologies:** React, Supabase API.

#### Profile Component:
- **Responsibility:** Manages authenticated users' profile data, allowing them to update their information. Displays profile data and contact information.
- **Interactions:** Communicates with the database to send and display user information, as well as allow profile updates.
- **Technologies:** React, Supabase API.

#### History Feed Component:
- **Responsibility:** Displays the activity history of an authenticated user, including actions such as recipe sharing, ratings, and comments.
- **Interactions:** Communicates with the backend to obtain the activity history and display it for the authenticated user.
- **Technologies:** React, Supabase API.

---

## 5. Architectural Decisions

### 5.1. Key Decisions

- **Decision:** Use of Next.js in the frontend.
  - **Description:** Next.js was chosen for its flexibility in static and dynamic rendering, as well as excellent performance for SEO.
  - **Justification:** Greater efficiency in page loading and easy API integration.
  - **Impact:** Improved frontend performance and scalability.

- **Decision:** Supabase as Backend-as-a-Service.
  - **Description:** Supabase was selected to provide authentication, API, and database as a service.
  - **Justification:** Reduces the need for manual backend configuration and allows focus on application development.
  - **Impact:** Faster development, reduced infrastructure costs.

---

## 6. Final Considerations

### 6.1. Standards and Practices
List the architectural standards and recommended practices followed during the architecture development.

- **Standards:**
  - **Monolithic:** The entire application logic, including frontend, backend, and database handling, is integrated into a single codebase and executed as a unified application.
  - **MVC (Model-View-Controller):** Pattern used to organize the application's responsibilities, separating business logic (Model), user interface (View), and user interaction control (Controller).
  - **Layered Architecture:** The application is structured into logical layers, such as presentation layer (UI), business logic, and data persistence.

- **Practices:**
  - **Continuous Integration:** Continuous code integration to ensure frequent delivery of changes, facilitating early error detection.
  - **Testing:** Unit and integration tests to ensure application stability.
  - **Code Review:** Adoption of code review practices to improve quality and security.

### 6.2. Next Steps
Indicate any future improvements or areas to be explored for architecture evolution.

- **System Scalability:** Consider future migration to a microservices-based architecture as the application grows in terms of users and features.
- **Performance Improvements:** Evaluate the need for query optimization in the database or improve backend response times.
- **Adoption of Third-Party Services:** Evaluate the integration of external services that could add value, such as AI-based automatic recipe recommendations or advanced analytics.
- **Modularization:** Maintain code modularization, even within the monolithic architecture, to facilitate future migrations or component splits.

---

**Authors:** Alysson Ramos, José Basilio, Shellyda Barbosa, and Vituriano Xisto  
**Date:** 09/05/24
