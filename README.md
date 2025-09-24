# Service Booking Platform

A full-stack web platform for booking home services (plumbing, cleaning, carpentry, appliance repair, etc.).  
Built with **ASP.NET Core Web API** for the backend and designed to handle both **clients** and **service providers**.

## Features
- **User Authentication & Roles**  
  - ASP.NET Core Identity with role-based access (Client / Provider / Admin).  
  - Email verification on registration.
- **Service Requests & Applications**  
  - Clients can create, edit, and manage service requests.  
  - Providers can browse requests, apply, and send proposals.
- **Admin Dashboard**  
  - Manage users, services, and monitor requests.  
- **Financial Workflow**  
  - Clients pay through the platform, providers can withdraw after job completion.
- **Complaints & Resolution System**  
  - Both clients and providers can submit complaints for admin review.

## Tech Stack
- **Backend:** ASP.NET Core 8 Web API, Entity Framework Core  
- **Database:** SQL Server  
- **Authentication:** ASP.NET Identity + JWT  
- **Frontend (Optional):** Angular / React (or any client app)  
- **Email Service:** SMTP for verification codes  

## 🚀 Getting Started
1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/ServiceBookingPlatform.git
   cd ServiceBookingPlatform
