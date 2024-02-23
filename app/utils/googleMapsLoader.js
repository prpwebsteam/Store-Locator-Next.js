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

  async function initMap() {

    // let result = await requestCall({
    //   url: "/apps/pw-express-proxy/locator/",
    //   method: "GET",
    //   headers: { Accept: "*/*", "Ngrok-Skip-Browser-Warning": "6024" },
    // });
  
    stores =[{
      "_id": {
        "$oid": "65c0da424ed1400407fd95b5"
      },
      "name": "punit pareek",
      "searchAddress": "Churu",
      "addressLine1": "1234567890 Level 2, K2/4 Behind Central Arcade,DLF Phase 2",
      "addressLine2": "Jaipur, Rajasthan 302020",
      "city": "Churu",
      "stateProvince": "1258899",
      "country": "India",
      "postalCode": "122002",
      "latitude": "",
      "longitude": "",
      "description": "hye",
      "serviceOptions": "hye",
      "hours": "12",
      "phone": "01234567890",
      "email": "punitpareek@tt.com",
      "website": "https://shopmytiara.com/",
      "fax": "123456"
      }
    ];
  }