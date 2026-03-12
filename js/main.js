// App entry point: load key, create map, and handle user-friendly errors.
(function () {
  function showError(message) {
    var container = document.getElementById(window.APP_CONFIG.mapContainerId);
    container.innerHTML =
      "<p style='padding:16px;font-family:Arial,sans-serif;'>" + message + "</p>";
  }

  ApiKeyService.load()
    .then(function (apiKey) {
      return MapApp.init(apiKey);
    })
    .then(function (view) {
      // Expose the view for quick debugging in browser console.
      window.view = view;
    })
    .catch(function (error) {
      console.error("Map initialization failed:", error);
      showError("Error loading map. Check /config and API key setup.");
    });
})();
