# Academiq

Academiq is a modern, feature-rich platform designed for hosting Olympiad-level timed contests. Inspired by platforms like CodeChef, Academiq provides a seamless experience for both contest organizers and participants. Built using **Next.js** with **TypeScript** and powered by **Firebase**, Academiq is fast, scalable, and secure.

---

## Features

### For Contest Organizers:
- **Custom Contest Creation**: Create contests with customizable durations, problem sets, and difficulty levels.
- **Real-time Submissions**: Track participants' submissions live.
- **Leaderboards**: Automatically generate and update leaderboards in real-time.
- **Problem Management**: Add, update, or delete problems effortlessly.
- **Analytics**: Gain insights into participants' performance and contest statistics.

### For Participants:
- **User Dashboard**: View upcoming contests, registered contests, and past performances.
- **Problem Solving Interface**: Submit solutions and receive instant feedback.
- **Timer Integration**: Track remaining contest time seamlessly.
- **Detailed Feedback**: View submission history, scores, and explanations for incorrect answers.
- **Leaderboards**: Monitor rankings and performance during and after contests.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) with TypeScript
- **Backend**: Firebase Cloud Functions
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Hosting**: Firebase Hosting
- **Styling**: Tailwind CSS
- **Real-time Updates**: Firebase Realtime Database & Firestore triggers

---

## Installation and Setup

### Prerequisites
- Node.js (v16+ recommended)
- Firebase CLI installed globally (`npm install -g firebase-tools`)
- A Firebase project set up ([Create Firebase Project](https://console.firebase.google.com/))

### Clone the Repository
```bash
git clone https://github.com/ItsArnavSh/Academiq.git
cd Academiq
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory and add:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Start the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

---




## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push to your forked repository (`git push origin feature-branch`).
5. Open a pull request.

Please ensure your code follows the project’s style guide and passes all tests.

---



## Acknowledgements

- Inspired by CodeChef and other Olympiad platforms.
- Built with love using Next.js, TypeScript, and Firebase.

---
