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
      const isPlanning = (c.status || "").toLowerCase().includes("planning") ||
        (c.status || "").toLowerCase().includes("tba");

      const logo = c.logo
        ? `<img class="conference-logo" src="${safe(c.logo)}" alt="${safe(c.name)} logo">`
        : "";

      const registrationLink = c.registrationLink &&
        /^https?:\/\//i.test(c.registrationLink)
        ? `<a class="conference-link" href="${safe(c.registrationLink)}" target="_blank" rel="noopener noreferrer">Register ↗</a>`
        : "";

      const officialLink = c.officialLink &&
        /^https?:\/\//i.test(c.officialLink)
        ? `<a class="conference-link" href="${safe(c.officialLink)}" target="_blank" rel="noopener noreferrer">Official Website ↗</a>`
        : c.link && /^https?:\/\//i.test(c.link)
        ? `<a class="conference-link" href="${safe(c.link)}" target="_blank" rel="noopener noreferrer">${safe(c.linkLabel || "Official details")} ↗</a>`
        : "";

      return `<article class="conference-card">
        <div class="conference-top">
          <span class="conference-type">${safe(c.type || "Conference")}</span>
          <span class="status ${isPlanning ? "planning" : ""}">${safe(c.status || "Update soon")}</span>
        </div>
        ${logo}
        <h3>${safe(c.name)}</h3>
        <p>${safe(c.description)}</p>
        <div class="conference-meta">
          <span><b>${safe(c.date || "Date TBA")}</b><br>${safe(c.location || "Location TBA")}</span>
        </div>
        <div class="conference-actions">
          ${registrationLink}
          ${officialLink}
        </div>
      </article>`;
    }).join("");
  }
  renderConferences();
  $("conferenceSearch").addEventListener("input", e => renderConferences(e.target.value));

    const accountDialog = $("accountDialog"), interestDialog = $("interestDialog");

  const supabaseConfig = window.SUPABASE_CONFIG;
  const supabaseClient = window.supabase && supabaseConfig?.url && supabaseConfig?.publishableKey
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.publishableKey)
    : null;

  let accountMode = "signin";

  function setAccountStatus(message) {
    $("accountStatus").textContent = message;
  }

  function setAccountMode(mode) {
    accountMode = mode;
    const isSignup = mode === "signup";

    $("accountHeading").textContent = isSignup ? "Create your account." : "Student sign in.";
    $("accountCopy").textContent = isSignup
      ? "Use your email and create a password."
      : "Sign in with your email and password.";
    $("studentNameField").classList.toggle("hidden", !isSignup);
    $("studentName").required = isSignup;
    $("studentPassword").autocomplete = isSignup ? "new-password" : "current-password";
    $("accountSubmit").textContent = isSignup ? "Create account" : "Sign in";
    $("accountModeToggle").textContent = isSignup
      ? "Already have an account? Sign in"
      : "Need an account? Sign up";

    setAccountStatus("");
  }

  function updateAccountUI(session) {
    const user = session?.user;

    if (user) {
      const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";

      $("accountButton").textContent = `Hi, ${name.split(/\s+/)[0]}`;
      $("accountModeToggle").classList.add("hidden");
      $("accountForm").classList.add("hidden");
      $("accountSignOut").classList.remove("hidden");
      $("accountHeading").textContent = "You're signed in.";
      $("accountCopy").textContent = `Signed in as ${user.email || "your account"}.`;
      setAccountStatus("");
    } else {
      $("accountButton").textContent = "Student sign in";
      $("accountModeToggle").classList.remove("hidden");
      $("accountForm").classList.remove("hidden");
      $("accountSignOut").classList.add("hidden");
      setAccountMode("signin");
    }
  }

  $("accountButton").addEventListener("click", async () => {
    if (!supabaseClient) {
      toast("Supabase didn't load. Please refresh and try again.");
      return;
    }

    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      toast(error.message);
      return;
    }

    updateAccountUI(data.session);
    accountDialog.showModal();
  });

  $("accountModeToggle").addEventListener("click", () => {
    setAccountMode(accountMode === "signin" ? "signup" : "signin");
  });

  $("accountForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!supabaseClient) {
      setAccountStatus("Authentication isn't available. Refresh and try again.");
      return;
    }

    const email = $("studentEmail").value.trim();
    const password = $("studentPassword").value;
    const name = $("studentName").value.trim();
    const submit = $("accountSubmit");

    submit.disabled = true;
    setAccountStatus("Please wait…");

    try {
      if (accountMode === "signup") {
        if (!name) {
          setAccountStatus("Please enter your name.");
          return;
        }

        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin + window.location.pathname
          }
        });

        if (error) throw error;

        if (data.session) {
          updateAccountUI(data.session);
          accountDialog.close();
          toast("Account created and signed in.");
        } else {
          setAccountStatus("Check your email for a confirmation link to finish creating your account.");
        }
      } else {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        updateAccountUI(data.session);
        accountDialog.close();
        toast("You're signed in!");
      }
    } catch (error) {
      setAccountStatus(error.message || "Authentication failed. Please try again.");
    } finally {
      submit.disabled = false;
    }
  });

  $("accountSignOut").addEventListener("click", async () => {
    if (!supabaseClient) {
      setAccountStatus("Authentication isn't available.");
      return;
    }

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      setAccountStatus(error.message);
      return;
    }

    updateAccountUI(null);
    setAccountStatus("You've signed out.");
    toast("Signed out.");
  });

  if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      updateAccountUI(session);
    });

    supabaseClient.auth.getSession().then(({ data, error }) => {
      if (!error) updateAccountUI(data.session);
    });
  } else {
    console.warn("Supabase config or library is missing.");
  }

  $("interestButton").addEventListener("click", () => {
    interestDialog.showModal();
  });

  function read(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  }

  $("interestForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const submission = Object.fromEntries(form.entries());

    try {
      const entries = read("jarvisMunDemoInterests") || [];
      entries.push({ ...submission, submittedAt: new Date().toISOString() });
      localStorage.setItem("jarvisMunDemoInterests", JSON.stringify(entries));
    } catch {
      toast("Could not save in this browser. Please check storage settings.");
      return;
    }

    interestDialog.close();
    e.currentTarget.reset();
    toast("Interest saved locally on this device. No email was sent.");
  });

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


