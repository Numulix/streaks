# Streaks - A Modern Habit Tracker

**Streaks** is a full-stack web application designed to help users build and maintain positive habits. It provides a clean, interactive interface for tracking daily progress, visualizing consistency over time, and staying motivated by maintaining streaks.

This project was built to master the frontend full-stack TypeScript ecosystem, leveraging the power of Next.js App Router, server-side data fetching, and a seamless developer experience with a fully integrated toolchain.

[Streaks-Demo.mp4](Streaks-Demo.mp4)

## ✨ Features

* **Secure Authentication:** Google OAuth sign-in managed by NextAuth.js.
* **Full CRUD for Habits:** Users can create, read, update, and delete their habits.
* **Interactive Tracking Grid:** A dynamic grid to mark habits as complete for each of the last 7 days.
* **Optimistic UI Updates:** Toggling a habit's completion provides instant UI feedback while the server request processes in the background.
* **Data Visualization:**
    * Dashboard statistics for total habits, best streak, and total completions.
  * A GitHub-style contribution graph to visualize a full year of progress for each habit.
* **Polished User Experience:** Includes a professional landing page, skeleton loading states, and a global authentication loader.


## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database:** [Vercel Postgres](https://vercel.com/storage/postgres)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
* **Data Visualization:** [react-activity-calendar](https://github.com/grubersjoe/react-activity-calendar)


## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js (v18 or later)
* npm or your package manager of choice

### 1. Clone the Repository

```bash
git clone https://github.com/Numulix/streaks.git
cd streaks
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

You will need to create a `.env` file in the root of the project and add the necessary environment variables.

```
# Vercel Postgres connection string
DATABASE_URL="postgresql://..."

# NextAuth.js configuration
# Generate a secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth credentials
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Run Database Migrations

Apply the database schema to your Postgres database using Prisma.

```bash
npm prisma migrate dev
# or
npm run db:migrate
```

### 5. Run the Development Server

You're all set! Start the development server

```bash
npm run dev
```

The application should now be running at http://localhost:3000

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.