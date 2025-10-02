// src/assets/ChatBotAnswers.js
// This file contains keyword-answer mappings for the chatbot.

const CHAT_BOT_ANSWERS = [
  {
    keys: ["event name"],
    answer: "The event is called Corporate Tech Meet 2025."
  },
  {
    keys: ["date"],
    answer: "The event is on October 16, 2025."
  },
  {
    keys: ["location"],
    answer: "The event will be held at JPMC Tower ETV, Bengaluru."
  },
  {
    keys: ["kickoff"],
    answer: "Kickoff Address is at 9:40 – 10:10 AM by Sandhya Sridharan – Global Head, AI4Tech. Agenda: Opening Pulse Check & AI roadmap direction."
  },
  {
    keys: ["keynote"],
    answer: "Keynote Address is at 10:30 – 11:00 AM. Presenter: TBD. Agenda: Keynote Speech."
  },
  {
    keys: ["lunch"],
    answer: "Lunch Break is from 1:00 – 2:00 PM. Agenda: Networking Lunch."
  },
  {
    keys: ["panel"],
    answer: "Panel Discussion is at 2:25 – 3:25 PM. Presenter: TBD."
  },
  {
    keys: ["fireside", "battlefield"],
    answer: "Fireside Chat / AI Battlefield is at 3:25 – 4:25 PM. Presenter: TBD. Agenda: Presidential debate-esque."
  },
  {
    keys: ["vote of thanks"],
    answer: "Vote of Thanks is at 4:45 – 5:00 PM. Presenter: MK Ullah."
  },
  {
    keys: ["agenda"],
    dynamic: true,
    answer: null // Will be filled in code
  },
  {
    keys: ["presenter", "speaker bio"],
    dynamic: true,
    answer: null // Will be filled in code
  }
  // You can keep appending more objects here as needed
];

export default CHAT_BOT_ANSWERS;
