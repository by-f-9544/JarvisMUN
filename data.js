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
      category: "WELCOME",
      date: "Update this date",
      title: "Welcome to the Jarvis MUN Portal",
      body: "This is the place to find club updates, conference opportunities, and ways to get involved. Replace this sample announcement with your first official update.",
      day: "22",
      month: "OCT",
      shortTitle: "Portal launch & club updates",
      shortBody: "A new home for Jarvis MUN announcements and opportunities."
    },
    {
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
      name: "Conference opportunity",
      type: "In-person",
      status: "Planning",
      date: "Date TBA",
      location: "Location TBA",
      description: "Replace this sample listing with a real conference, its dates, location, and application details.",
      link: "",
      linkLabel: "Details soon"
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
