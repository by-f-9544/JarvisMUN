/*
  EDIT THIS FILE TO UPDATE THE PORTAL.
  This is the easiest way to change announcements and conference listings:
  1. Open data.js on GitHub.
  2. Click the pencil (Edit this file).
  3. Change the text below, commit your changes, and wait for GitHub Pages to redeploy.
  Use plain text inside quotes. Keep commas and brackets in place.
*/
window.PORTAL_DATA = {
  announcements: [
     {
      featured: true,
      category: "CCIMUN 2026",
      date: "November 15, 2026",
      title: "CCIMUN 2026 Delegation Confirmed",
      body: "The Jarvis MUN delegation for CCIMUN 2026 has been confirmed! Students can now check their delegation status and view the confirmed team roster on the Teams page."
    },
      category: "REMINDER",
      date: "Add a date",
      title: "Club meeting reminder",
      body: "Add meeting details, location, preparation notes, or deadlines here.",
      day: "—",
      month: "DATE",
      shortTitle: "Add your next club reminder",
      shortBody: "Update this card in data.js with the next important reminder."
    },
    {
      category: "TRAINING",
      date: "Add a date",
      title: "Delegate training",
      body: "Share research resources, position-paper guidance, or practice-session information here.",
      day: "—",
      month: "DATE",
      shortTitle: "Training and preparation",
      shortBody: "Share training sessions and preparation resources with members."
    }
  ],
  conferences: [
    {
  name: "CCIMUN - Cedarbrae Collegiate Institute MUN",
  type: "In-person",
  status: "Team Confirmed",
  date: "Saturday, December 5, 2026",
  location: "Cedarbrae Collegiate Institute",
  description: "Explore the CCIMUN conference opportunity and visit the official website for conference details and registration.",
  logo: "ccimun-logo.png",
  registrationLink: "https://forms.gle/JuXbDPF5F3aeEfjT7",
  officialLink: "https://www.ccimun.com/",
  link: "https://www.ccimun.com/",
  linkLabel: "Official Website"
  },
    {
      name: "Regional MUN conference",
      type: "Conference",
      status: "Planning",
      date: "Date TBA",
      location: "Toronto area",
      description: "Add the official conference name, delegate eligibility, fees, and registration deadline once confirmed.",
      link: "",
      linkLabel: "Details soon"
    },
    {
      name: "Training / practice session",
      type: "Workshop",
      status: "Planning",
      date: "Date TBA",
      location: "Jarvis Collegiate",
      description: "Use this card for an internal practice conference, workshop, or committee training session.",
      link: "",
      linkLabel: "Details soon"
    }
  ]
};
