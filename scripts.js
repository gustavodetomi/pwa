if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

let deferredPrompt; // Allows to show the install prompt
let setupButton;
let install = localStorage.getItem("install")
if (install === 'true') {
  if (setupButton == undefined) {
    setupButton = document.getElementById("setup_button");
  }
  setupButton.style.display = 'none';
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log("beforeinstallprompt fired");
  if (setupButton == undefined) {
    setupButton = document.getElementById("setup_button");
  }
  // Show the setup button
  setupButton.style.display = "inline";
  setupButton.disabled = false;
});

function installApp() {
  // Show the prompt
  deferredPrompt.prompt();
  setupButton.disabled = true;
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        localStorage.setItem("install", "true");
        console.log('PWA setup accepted');
        // hide our user interface that shows our A2HS button
        setupButton.style.display = 'none';
      } else {
        console.log('PWA setup rejected');
      }
      deferredPrompt = null;
    });
}

