export function loadGoogleMapsAPI(key) {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        // Google Maps API is already loaded
        resolve();
      } else {
        if (!key) {
          // Handle the case where the API key is not provided
          reject(new Error('Google Maps API key is missing.'));
          return;
        }
  
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
  
        script.onload = () => {
          resolve();
        };
  
        script.onerror = () => {
          reject(new Error('Failed to load Google Maps API.'));
        };
  
        document.head.appendChild(script);
      }
    });
  }  