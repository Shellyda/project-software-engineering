# API Documentation - api.receita.ai

##### **Note:** This documentation is subject to change as the API is still under development. Please check for updates regularly to ensure you have the latest information.

---

## Table of Contents

1. [Purpose and Functionality](#1-purpose-and-functionality)

   - [Purpose](#purpose)
   - [Functionality](#functionality)
   - [Problems the API Solves](#problems-the-api-solves)

2. [Technical Specification](#2-technical-specification)

   - [List Recipes (Feed)](#21-list-recipes-feed)
   - [Register Advertisement](#22-register-advertisement)
   - [Share Recipe with Photos](#23-share-recipe-with-photos)
   - [Comment and Rate Recipes](#24-comment-and-rate-recipes)
   - [User Registration](#25-user-registration)
   - [User Login](#26-user-login)
   - [View and Update User Data](#27-view-and-update-user-data)
   - [View Activity History](#28-view-activity-history)
   - [Response Codes and Descriptions](#response-codes-and-descriptions)
   - [Common Errors](#common-errors)

3. [Security and Authorization](#3-security-and-authorization)

   - [Authentication](#authentication)
   - [Authorization](#authorization)
   - [Data Protection](#data-protection)

4. [Monitoring and Performance](#4-monitoring-and-performance)

   - [Monitoring](#monitoring)
     - [Tools Used](#tools-used)
     - [Monitored Metrics](#monitored-metrics)
     - [Configured Alerts](#configured-alerts)
   - [Performance](#performance)
     - [Rate Limits](#rate-limits)
     - [Optimization](#optimization)

5. [Versioning and Compatibility](#5-versioning-and-compatibility)

6. [Additional Resources](#6-additional-resources)
   - [Reference Links](#reference-links)
   - [Glossary](#glossary)
   - [Additional Examples](#additional-examples)

---

## 1. Purpose and Functionality

### Purpose:

The primary purpose of the API is to provide an interface that allows interaction between users (both authenticated and unauthenticated) and the platform, facilitating the management and viewing of recipes and user profiles. This API contributes by collecting, storing, and managing information about **Chefs**, **Businesses**, and **Visitors**, offering functionalities that enhance user experience and assist with data management.

### Functionality:

The API offers the following key functionalities:

1. **Recipe Management:** Allows **Chefs** and **Businesses** to publish, share, filter, comment on, and rate recipes. These recipes can be viewed by all users, but only authenticated users can fully interact with them.
2. **User Registration and Authentication:** The API enables new user registration and secure authentication for **Chefs** and **Businesses**, providing JWT tokens that allow access to the platform’s protected services.
3. **Profile Management:** The API provides access to authenticated users' profiles, allowing them to update their registration data and view their activity history, making it easier to personalize and manage their profiles.

4. **Recipe Viewing for Visitors:** Even without authentication, visitors can view public recipes and apply filters to explore the content, promoting higher engagement before registration.

### Problems the API Solves:

- **Automates recipe and ad sharing**, simplifying the process of publishing gastronomic content for chefs and businesses.
- **Centralizes user data management**, allowing data to be securely captured, stored, and managed, integrating with the CDP for analysis and marketing purposes.
- **Offers a secure and personalized experience** for authenticated users, ensuring that sensitive information is protected and profiles are kept up to date.

This API facilitates the connection between content creators (chefs/businesses) and consumers (visitors), encouraging the creation and sharing of recipes in a controlled and secure environment.

## 2. Technical Specification

**Endpoints and Methods:**

### 2.1 List Recipes (Feed)

- **Base URL:** api.receita.ai
- **Endpoint:** `/recipes`
- **Supported Method:** `GET`

**Request Parameters:**

- **URL or Request Body Parameters:**
  - `category` (Type: String, Optional): Filter recipes by category.
  - `page` (Type: Integer, Required): Pagination for the recipes.
  - `author` (Type: String, Optional): Filter recipes by author.
  - `rating` (Type: Int, Optional): Filter recipes by rating.

**Data Format:**

- **Input:** JSON
- **Output:** JSON

**Request Example:**

```http
GET /api/recipes?category=dessert&page=2 HTTP/1.1
Host: api.receita.ai
```

**Response Example:**

```json
{
  "page": 2,
  "totalPages": 5,
  "recipes": [
    {
      "id": 123,
      "title": "Chocolate Cake",
      "description": "Delicious chocolate cake with brigadeiro topping",
      "author": "Chef João",
      "category": "dessert",
      "averageRating": 4.8
    }
  ]
}
```

### 2.2 Register Advertisement

- **Base URL:** api.receita.ai
- **Endpoint:** `/ads`
- **Supported Method:** `POST`

**Request Parameters:**

- **URL or Request Body Parameters:**
  - `title` (Type: String, Required): Advertisement title.
  - `description` (Type: String, Required): Advertisement description.
  - `price` (Type: Float, Required): Price of the service/product.
  - `userId` (Type: UUID, Required): User ID.

**Data Format:**

- **Input:** JSON
- **Output:** JSON

**Request Example:**

```http
POST /ads
Content-Type: application/json
{
  "title": "Catering Services",
  "description": "We offer catering services for events.",
  "price": 500.00,
  "userId": 45
}
Authorization: Bearer {token}
```

**Response Example:**

```json
{
  "message": "Advertisement successfully registered!",
  "anuncioId": "675e903e-6915-4ce5-93ac-c1b98f60a40c"
}
```

### 2.3 Share Recipe with Photos

- **Base URL:** api.receita.ai.
- **Endpoint:** `/recipes`
- **Supported Method:** `POST`

**Request Parameters:**

- **Parameters in URL or Request Body:**
  - `title` (Type: String, Required): Title of the recipe.
  - `ingredients` (Type: String, Required): Ingredients of the recipe.
  - `preparationMethod` (Type: String, Required): How to prepare the recipe.
  - `photos` (Type: Array of Files, Optional): Photos of the recipe.
  - `userId` (Type: UUID, Required): Associated user ID.

**Data Format:**

- **Input:** JSON.
- **Output:** JSON.

**Request Example:**

```http
POST /recipes
Content-Type: multipart/form-data
{
  "title": "Cheese Bread",
  "ingredients": "Tapioca Flour, Cheese, Egg",
  "preparationMethod": "Mix everything and bake for 20 minutes.",
  "photos": [file1.jpg, file2.jpg],
  "userId": "675e903e-6915-4ce5-93ac-c1b98f60a40c"
}
Authorization: Bearer {token}
```

**Response Example:**

```json
{
  "message": "Recipe shared successfully!",
  "recipeId": "675e903e-6915-4ce5-93ac-c1b98f60a40c"
}
```

### 2.4 Comment and Rate Recipes

- **Base URL:** api.receita.ai.
- **Endpoint:** `/recipes/${id}/rate`
- **Supported Method:** `POST`

**Request Parameters:**

- **Parameters in URL or Request Body:**
  - `comment` (Type: String, Required): Comment on the recipe.
  - `rating` (Type: Integer, Required): Rating of the recipe.
  - `userId` (Type: UUID, Required): Associated user ID.

**Data Format:**

- **Input:** JSON.
- **Output:** JSON.

**Request Example:**

```http
POST /recipes/675e903e-6915-4ce5-93ac-c1b98f60a40c/avaliar
Content-Type: application/json
{
  "comment": "Wonderful recipe, very easy to make!",
  "rating": 5,
  "userId": "675e903e-6915-4ce5-93ac-c1b98f60a40c"
}
Authorization: Bearer {token}
```

**Response Example:**

```json
{
  "message": "Comment and rating recorded successfully!"
}
```

### 2.5 User Registration

- **Base URL:** api.receita.ai.
- **Endpoint:** `/users/register`
- **Supported Method:** `POST`

**Request Parameters:**

- **Parameters in URL or Request Body:**
  - `name` (Type: String, Required): User's name.
  - `email` (Type: String, Required): User's email.
  - `password` (Type: String, Required): User's password.
  - `type` (Type: String, Required): Type "Chef" or "Company".

**Data Format:**

- **Input:** JSON.
- **Output:** JSON.

**Request Example:**

```http
POST /users/register
Content-Type: application/json
{
  "name": "Chef João",
  "email": "chefjoao@example.com",
  "password": "password123",
  "type": "Chef"
}
```

**Response Example:**

```json
{
  "message": "Registration successful!",
  "userId": "675e903e-6915-4ce5-93ac-c1b98f60a40c",
  "token": "jwt-token-example"
}
```

### 2.6 User Login

- **Base URL:** api.receita.ai.
- **Endpoint:** `/users/login`
- **Supported Method:** `POST`

**Request Parameters:**

- **Parameters in URL or Request Body:**
  - `email` (Type: String, Required): User's email.
  - `password` (Type: String, Required): User's password.

**Data Format:**

- **Input:** JSON.
- **Output:** JSON.

**Request Example:**

```http
POST /users/login
Content-Type: application/json
{
  "email": "chefjoao@example.com",
  "password": "password123"
}
```

**Response Example:**

```json
{
  "message": "Login successful!",
  "userId": "675e903e-6915-4ce5-93ac-c1b98f60a40c",
  "token": "jwt-token-example"
}
```

### 2.7 View and Update User Data

- **Base URL:** api.receita.ai.
- **Endpoint:** `/users/{id}`
- **Supported Method:** `POST | GET`

**Request Parameters:**

- **Parameters in URL or Request Body:**
  - `id` (Type: UUID, Required): ID of the authenticated user.
  - `name` (Type: String, Required [PUT]): New user name.
  - `email` (Type: String, Required [PUT]): New user email.

**Data Format:**

- **Input:** JSON.
- **Output:** JSON.

**Request Example:**

```http
GET /users/675e903e-6915-4ce5-93ac-c1b98f60a40c
```

**Response Example:**

```json
{
  "name": "Chef João",
  "email": "chefjoao@example.com",
  "company": "Catering João"
}
```

**Request Example:**

```http
PUT /users/675e903e-6915-4ce5-93ac-c1b98f60a40c
Content-Type: application/json
{
  "name": "Chef João Silva",
  "email": "chefjoaosilva@example.com"
}
```

**Response Example:**

```json
{
  "message": "Data updated successfully!"
}
```

### 2.8 View Activity History

- **Base URL:** api.receita.ai.
- **Endpoint:** `/users/{id}/history`
- **Supported Method:** `GET`

**Request Parameters:**

- **Parameters in URL or Request Body:**
  - `id` (Type: UUID, Required): User ID.

**Data Format:**

- **Input:** JSON.
- **Output:** JSON.

**Request Example:**

```http
GET /users/675e903e-6915-4ce5-93ac-c1b98f60a40c/historico
Authorization: Bearer {token}
```

**Response Example:**

```json
{
  "history": [
    {
      "date": "2024-09-01",
      "action": "Shared the recipe 'Carrot Cake'"
    },
    {
      "date": "2024-09-05",
      "action": "Commented on the recipe 'Cheese Bread'"
    }
  ]
}
```

**Response Codes and Descriptions:**

- **200 OK:** Success.
- **400 Bad Request:** Error description and possible causes.
- **401 Unauthorized:** Authentication required.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** Server error.

**Common Errors:**

- **Error 400 - Invalid Parameter:** Returns an error related to search/request.
- **Error 401 - Invalid Token:** Redirects to authentication page with a redirect to the page where the user was.

## 3. Security and Authorization

### Authentication:

**Method Used:**

- **JWT (JSON Web Token):** Authentication will be done using **JWT**. Upon login or registration, the server issues a JWT token containing user authentication information, such as their ID and access level. This token must be included in the header of all requests to endpoints that require authentication.

**Authentication Header Example:**

- The JWT token should be sent in the `Authorization` header for all subsequent requests after login:
  ```
  Authorization: Bearer {token}
  ```

### Authorization:

**Permission Levels and Access Controls:**

- The application uses **Role-Based Access Control (RBAC)** to manage permissions and access levels. There are two main roles:
  1. **Authenticated User (Chef/Company):**
     - Can create ads.
     - Can share recipes.
     - Can comment and rate recipes.
     - Can view and update personal data.
     - Has access to activity history and profile.
  2. **Unauthenticated User (Visitor):**
     - Can only view recipes (feed) and apply filters.
     - Cannot comment, rate, or share recipes.
     - Cannot view or interact with history and profile.

**Access Control Examples:**

- **Authenticated User (Chef/Company):**
  - Endpoints like `/ads`, `/recipes`, `/users/{id}`, and `/recipes/{id}/rate` can only be accessed if the user is authenticated with a valid token.
  - Requests without a token or with an invalid token return a 401 (Unauthorized) error.
- **Unauthenticated User (Visitor):**
  - Endpoints like `/recipes` (viewing recipes) can be accessed without authentication.

**Unauthorized Response Example:**

```json
{
  "message": "Unauthorized. Invalid or expired token.",
  "statusCode": 401
}
```

### Data Protection:

**Secure Transmission:**

- **HTTPS:** All communications between the client and server must use **HTTPS** to ensure the security of transmitted data. The use of HTTPS protects the communication against attacks such as man-in-the-middle (MITM) and ensures data integrity during transport.
  - **Best Practice:** Updated SSL/TLS certificate to secure HTTP requests.

**Encryption:**

- **Passwords:** All user passwords will be stored in the database encrypted using **bcrypt**. This algorithm provides security against brute force and rainbow table attacks.
- **JWT:** JWT tokens will be signed with a secret key using the **HS256** (HMAC with SHA-256) algorithm to ensure token authenticity. This prevents tokens from being tampered with undetected.
- **Sensitive Data:** Any sensitive data such as emails, addresses, or financial information (if applicable) may be stored using **encryption at rest** in the database to prevent data exposure in case of a security breach.

**Additional Measures:**

- **Token Expiry:** JWT tokens should have a defined expiry time, generally short (e.g., 1 hour). After expiration, the user will need to re-authenticate to obtain a new token.
- **Token Renewal:** Implement a **refresh token** mechanism to allow users to obtain new access tokens without needing to re-authenticate every hour.
- **Protection Against CSRF and XSS:** In addition to authentication, the application should implement measures to protect against **Cross-Site Request Forgery (CSRF)** and **Cross-Site Scripting (XSS)**. This can be done, for example, by validating the origin of requests and sanitizing user input.

## 4. Monitoring and Performance

### Monitoring:

### Tools Used:

The API utilizes **Grafana** for observability and monitoring, integrated with **Prometheus** for real-time metric collection. Grafana provides a detailed visual dashboard with alerts and reports to track API performance.

- **Grafana:** An observability platform that allows real-time visualization of performance and behavior metrics of the API.
- **Prometheus:** Responsible for collecting system and API metrics, which are displayed on the Grafana dashboard.

### Monitored Metrics:

Key metrics monitored via Grafana include:

- **Response Time (Latency):** Real-time visualization of the average response time of the API for different types of requests.
- **Error Rate:** Continuous monitoring of the percentage of requests that return errors, such as 4xx and 5xx, with alerts configured for critical values.
- **CPU and Memory Usage:** Real-time display of resource usage, including alerts in case of overload.
- **Throughput:** Measures the number of requests processed per second.
- **Availability (Uptime):** Monitoring of API uptime, with reports and alerts for downtimes.

### Configured Alerts:

Alerts in Grafana are configured to trigger notifications for cases such as:

- **Response time exceeding 500ms.**
- **Error rate above 2%.**
- **CPU usage exceeding 90%.**
- **Availability drop (uptime below 99%).**

### Performance:

### Rate Limits:

To ensure API stability, the following request limits are applied:

- **Authenticated Users:** Limit of 100 requests per second.
- **Unauthenticated Users:** Limit of 50 requests per second.

These limits help to prevent system overload and protect against attacks.

### Optimization:

The API employs the following optimization techniques to ensure a quick and efficient response:

- **Caching:** Responses for frequent requests (such as recipe lists and profiles) are cached, reducing the need for database queries.
- **Load Balancing:** Used to distribute traffic among multiple servers, preventing overload on a single point.
- **Response Compression (gzip):** To reduce data transfer time, API responses are compressed before being sent.

## 5. Versioning and Compatibility

**Versioning Policy:**

- The _Receita.ai_ API follows semantic versioning, where major changes that may cause incompatibility receive a new major version number. Minor improvements or bug fixes increment minor versions.
- Clients can specify the API version to be used via the URL path. For example: `/v1/recipes` or `/v2/users`.
- The use of specific HTTP headers for versioning may also be adopted for greater flexibility.

**Compatibility:**

- Changes in the API are communicated in advance through changelogs and documentation. Backward compatibility is ensured for all minor versions, while breaking changes will only occur in new major versions.
- Support for previous versions is maintained for a specified period before official deprecation.

---

## 6. Additional Resources

### **Reference Links:**

- [JWT.io](https://jwt.io/): An essential resource for understanding the workings of JSON Web Token, with interactive tools for encoding and decoding JWT tokens.

- [MDN Web Docs - HTTP Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication): A detailed guide on HTTP authentication, including methods like Basic Auth and Bearer Token, used for authenticated API requests.

- [cURL - Official Documentation](https://curl.se/docs/): Comprehensive documentation for cURL, a versatile command-line tool for transferring data with URLs. Useful for quickly testing RESTful APIs.

- [OWASP API Security Project](https://owasp.org/www-project-api-security/): A resource addressing best practices for API security, including topics on authentication, authorization, and data protection.

- [Postman API Documentation Guide](https://learning.postman.com/docs/publishing-your-api/documenting-your-api/): A guide on best practices for creating effective API documentation, focusing on how tools like Postman can be used for interactive testing and documentation.

### **Glossary:**

- **JWT (JSON Web Token):** A standard for securely representing claims between two parties, commonly used for authentication.
- **Endpoint:** A specific URL exposed by the API that accepts requests and returns responses.
- **Rate Limit:** The limit on the number of requests a client can make to a server within a certain period of time.
- **Authentication:** The process of verifying a user's identity.
- **Authorization:** The process of verifying whether an authenticated user has permission to access a specific resource.

### **Additional Examples:**

Here are practical examples of using the _Receita.ai_ API in different programming languages.

#### **cURL Example:**

- **Share Recipe with Photo:**
  ```bash
  curl -X POST "https://api.receita.ai/recipes" \
       -H "Authorization: Bearer {token}" \
       -F "title=Bolo de Chocolate" \
       -F "ingredients=Flour, Eggs, Chocolate" \
       -F "preparationMethod=Bake for 30 minutes" \
       -F "photos=@cake_photo.jpg" \
       -F "userId=675e903e-6915-4ce5-93ac-c1b98f60a40c"
  ```

#### **Python Example (using requests):**

- **List Recipes:**

  ```python
  import requests

  url = "https://api.receita.ai/recipes"
  headers = {"Authorization": "Bearer {token}"}
  params = {"category": "dessert", "page": 1}

  response = requests.get(url, headers=headers, params=params)
  print(response.json())
  ```

#### **JavaScript Example (using fetch):**

- **Comment and Rate Recipe:**

  ```javascript
  const url = 'https://api.receita.ai/recipes/{recipeId}/rate';
  const token = '{token}';

  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: 'Amazing recipe!',
      rating: 5,
      userId: '675e903e-6915-4ce5-93ac-c1b98f60a40c'
    })
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  ```

---
