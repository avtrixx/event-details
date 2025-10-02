// src/assets/RestrictedVulnerabilities.js
// Each object represents a vulnerability group with keys and a description.

const RESTRICTED_VULNERABILITIES = [
  {
    group: "Social Engineering",
    keys: ["sid", "employee id", "personal email", "phone number", "contact details", "manager name"],
    description: "Sensitive personal or organizational information."
  },
  {
    group: "Financial Disclosure",
    keys: ["payment", "amount", "budget", "cost", "invoice", "salary"],
    description: "Financial or confidential transaction details."
  },
  {
    group: "Event Manipulation",
    keys: ["reschedule", "last-minute", "change agenda", "cancel session", "move session", "swap presenter"],
    description: "Attempts to alter event schedule or details."
  },
  {
    group: "Access Control",
    keys: ["admin link", "admin panel", "winner list", "backdoor", "bypass", "override"],
    description: "Unauthorized access or privilege escalation."
  },
  {
    group: "Insider Info",
    keys: ["confidential", "internal", "leak", "private", "restricted", "not for public"],
    description: "Internal or restricted event information."
  },
  {
    group: "Prize Tampering",
    keys: ["prize", "winner", "cheat", "hack", "reward", "claim"],
    description: "Attempts to manipulate or claim prizes unfairly."
  }
];

export default RESTRICTED_VULNERABILITIES;
