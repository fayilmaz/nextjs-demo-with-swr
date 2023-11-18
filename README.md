# Todo App with SWR and Zustand

This is a simple Todo App built using React, SWR (React Hooks library for remote data fetching), and Zustand (a small, fast, and scalable state management library).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Development](#development)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [SWR Mutations](#swr-mutations)
- [Enums](#enums)
- [Toasts](#toasts)

## Features

- Add, update, and delete todos
- Real-time updates using SWR for fetching data
- Rollback on Errors with SWR: Optimistic UI updates are rolled back automatically in case of errors during data mutations. This ensures a consistent user experience, where the UI reflects the current state of the data, even if the mutation fails.
- Zustand for simple and efficient state management
- Toast notifications for success and error messages

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/fayilmaz/nextjs-demo-with-swr
    ```

2.  **Navigate to the project directory:**

    ```
    cd nextjs-demo-with-swr
    ```

3.  **Install dependencies:**

    ```
    npm install
    ```

4.  **Environment variables:**
    Set the `json-server` address inside the `.env` file:
    Create a `.env` file in the root of your project and add the following line:
    ```
    NEXT_PUBLIC_DEV_BASE_URL=http://localhost:3005
    ```

# Folder Structure

- **components**: Reusable React components
- **enums**: Enums used for various constants in the application
- **store**: Zustand state management store
- **swrMutations**: SWR mutation functions for API interactions
- **styles**: Global styles and CSS files
- **pages**: React components representing different pages in the app
- **utils**: Utility functions and helpers

# Dependencies

- **react**: JavaScript library for building user interfaces
- **swr**: React Hooks library for remote data fetching
- **axios**: Promise-based HTTP client for the browser and Node.js
- **zustand**: Small, fast, and scalable state management library
- **react-hot-toast**: Toast notifications for React applications
- **json-server**: Fake REST API server

# Usage

Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the Todo App.

# State Management

Zustand is used for state management. The store is defined in `store/todoStore.ts`, providing methods for updating and accessing the state.

# API Integration

API integration is handled through the `useSWR` hook and Axios for HTTP calls. SWR fetches data from the fake API server (for local development `json-server` serving `fakeDB.json`), and API calls and mutations are defined in `api/todosApi.ts` using Axios.

# SWR Mutations

SWR mutations are used for optimistic UI updates during data changes. These mutations are defined in `swrMutations/todosMutations.ts`.

# Enums

Enums are used to define constants and improve code readability. They are located in the `enums` folder.

# Toasts

[React Hot Toast](https://react-hot-toast.com/) is used for displaying toast notifications. Toast messages are defined in `enums/ToastMessageContentEnums.ts`.
