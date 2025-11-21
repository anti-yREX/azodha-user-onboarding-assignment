# Azodha Assignment: User On-Boarding App

Azodha asked for a React + TypeScript + Redux implementation of a multi-step user onboarding flow. The goal is to keep users progressing through login, personal info, favorite songs, payment, and a final success screen before landing on a welcome home page.

## Problem Statement Breakdown

- **Tech stack**: React, TypeScript, Redux (with localStorage for persistence). Any UI library is allowed.
- **Login**: Simple username/password form with a hard-coded credential pair. Successful login routes to onboarding.
- **Step 1 – Personal Profile**: Collect name, age, email, profile picture.
- **Step 2 – Favorite Songs**: Manage a dynamic Formik-based list where users can add/remove song entries.
- **Step 3 – Payment Information**: Inputs for card number, expiry, and CVV.
- **Step 4 – Success**: Show confirmation that onboarding finished.
- **Home Page**: After completion, redirect users here with a welcome message.

## Key Requirements

- Use Redux to manage form data across all steps.
- Persist onboarding progress and data in `localStorage`:
  - Resume from the last incomplete step if the browser tab closes.
  - Auto-redirect to the home page if the user already finished onboarding.
- Allow forward/backward navigation while retaining entered data.
- No backend calls; everything runs on the client with the pre-set credentials.

## Deliverable Expectations

- Organize the project cleanly with best practices for React, TypeScript, and Redux.
- Provide the finished solution via a GitHub repository.
- Keep this README updated with implementation notes or setup instructions as the project evolves.