(() => {
  const data = window.PORTAL_DATA || { announcements: [], conferences: [] };
  const $ = (id) => document.getElementById(id);
  const safe = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const toast = (message) => {
    const el = $("toast"); el.textContent = message; el.classList.add("show");
    clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 3200);
  };
  const first = data.announcements[0];
  if (first) {
    $("featuredUpdate").innerHTML = `<div><span class="tag">${safe(first.category || "UPDATE")}</span><div class="update-date">${safe(first.date || "")}</div><h3>${safe(first.title)}</h3><p>${safe(first.body)}</p></div><span class="update-arrow" aria-hidden="true">↗</span>`;
    $("updatesList").innerHTML = data.announcements.slice(1).map(item => `<article class="update-row"><div class="date-block"><strong>${safe(item.day || "—")}</strong><small>${safe(item.month || "")}</small></div><div><h3>${safe(item.shortTitle || item.title)}</h3><p>${safe(item.shortBody || item.body)}</p></div><span class="row-arrow" aria-hidden="true">↗</span></article>`).join("");
  } else {
    $("featuredUpdate").innerHTML = "<p>No announcements yet. Add them in data.js.</p>";
    $("updatesList").innerHTML = "";
  }

  const grid = $("conferenceGrid");
  function renderConferences(query = "") {
    const filtered = data.conferences.filter(c => [c.name,c.type,c.status,c.date,c.location,c.description].join(" ").toLowerCase().includes(query.toLowerCase()));
    $("conferenceCount").textContent = `${filtered.length} OPPORTUNIT${filtered.length === 1 ? "Y" : "IES"}`;
    $("conferenceEmpty").classList.toggle("hidden", filtered.length !== 0);
    grid.innerHTML = filtered.map(c => {
      const isPlanning = (c.status || "").toLowerCase().includes("planning") || (c.status || "").toLowerCase().includes("tba");
      const link = c.link && /^https?:\/\//i.test(c.link) ? `<a class="conference-link" href="${safe(c.link)}" target="_blank" rel="noopener noreferrer">${safe(c.linkLabel || "Official details")} ↗</a>` : `<span class="conference-link">${safe(c.linkLabel || "Details soon")}</span>`;
      return `<article class="conference-card"><div class="conference-top"><span class="conference-type">${safe(c.type || "Conference")}</span><span class="status ${isPlanning ? "planning" : ""}">${safe(c.status || "Update soon")}</span></div><h3>${safe(c.name)}</h3><p>${safe(c.description)}</p><div class="conference-meta"><span><b>${safe(c.date || "Date TBA")}</b><br>${safe(c.location || "Location TBA")}</span>${link}</div></article>`;
    }).join("");
  }
  renderConferences();
  $("conferenceSearch").addEventListener("input", e => renderConferences(e.target.value));

  const accountDialog = $("accountDialog"), interestDialog = $("interestDialog");
  $("accountButton").addEventListener("click", () => {
    const profile = read("jarvisMunDemoProfile");
    if (profile) { $("studentName").value = profile.name || ""; $("studentEmail").value = profile.email || ""; }
    accountDialog.showModal();
  });
  $("interestButton").addEventListener("click", () => {
    const profile = read("jarvisMunDemoProfile");
    if (profile) { $("interestName").value = profile.name || ""; $("interestEmail").value = profile.email || ""; }
    interestDialog.showModal();
  });
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
  }
  $("accountForm").addEventListener("submit", e => {
    e.preventDefault();
    const profile = { name: $("studentName").value.trim(), email: $("studentEmail").value.trim() };
    try { localStorage.setItem("jarvisMunDemoProfile", JSON.stringify(profile)); }
    catch { toast("Browser storage is unavailable. Please check your browser settings."); return; }
    accountDialog.close();
    $("accountButton").textContent = profile.name ? `Hi, ${profile.name.split(/\s+/)[0]}` : "Student sign in";
    toast("Demo profile saved on this device.");
  });
  $("interestForm").addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const submission = Object.fromEntries(form.entries());
    try {
      const entries = read("jarvisMunDemoInterests") || [];
      entries.push({...submission, submittedAt: new Date().toISOString()});
      localStorage.setItem("jarvisMunDemoInterests", JSON.stringify(entries));
    } catch { toast("Could not save in this browser. Please check storage settings."); return; }
    interestDialog.close(); e.currentTarget.reset(); toast("Interest saved locally on this device. No email was sent.");
  });
  const savedProfile = read("jarvisMunDemoProfile");
  if (savedProfile?.name) $("accountButton").textContent = `Hi, ${savedProfile.name.split(/\s+/)[0]}`;

  $("menuToggle").addEventListener("click", () => {
    const nav = $("mainNav"); const open = nav.classList.toggle("open");
    $("menuToggle").setAttribute("aria-expanded", String(open));
    $("menuToggle").textContent = open ? "×" : "☰";
  });
  document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => {
    $("mainNav").classList.remove("open"); $("menuToggle").setAttribute("aria-expanded", "false"); $("menuToggle").textContent = "☰";
  }));
  $("year").textContent = new Date().getFullYear();
})();
