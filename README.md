# AzhChat

**Frontend:** https://azh-chat.netlify.app  
**Backend:** https://online-chat-back.onrender.com  
**Backend Repo:** https://github.com/manziro785/online_chat_back

A real-time chat app with channels, instant messaging, and member management. Built with **React** and **Socket.io**.

---

## Tech Stack
**Frontend:** React, Tailwind CSS, MUI, Zustand (persist), React Hook Form, React Router, Axios  
**Real-time:** Socket.io Client  
**Data:** TanStack React Query  

---

## Features

### Messaging
- Instant real-time messages via WebSockets  
- Messages update without refresh  
- Enter to send

### Channels
- Create new channels  
- Join via invite codes  
- Channel list in the left sidebar  

### Members
- Right panel shows all members  
- Channel creators can remove users  
- Online/offline status tracking  

### Layout
- Left: profile + channels  
- Center: chat  
- Right: channel info + members  
- Responsive mobile UI

---

## How It Works
- On channel select, history loads from the backend  
- Client joins the channel's Socket.io room  
- Incoming messages merge with history  
- Auto-leave/join rooms when switching channels  
- Messages are deduped and sorted by timestamp

---

## Scripts
```bash
npm i       # install
npm run dev # start dev server
npm run build # production build
