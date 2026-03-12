// Service responsible for loading the ArcGIS API key from Flask backend.
window.ApiKeyService = {
  load: function () {
    return fetch(window.APP_CONFIG.apiConfigEndpoint)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Could not load API key from server.");
        }
        return response.json();
      })
      .then(function (data) {
        if (!data.apiKey) {
          throw new Error("API key is missing in server response.");
        }
        return data.apiKey;
      });
  }
};
