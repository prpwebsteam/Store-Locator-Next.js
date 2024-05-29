'use client'
import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsAPI } from '../utils/googleMapsLoader';
import mapThemes from '../utils/mapThemes';
import StoreInfo from './StoreInfo';
import Direction from '../assests/send.png';
import Shop from '../assests/shop.png';
import Link from '../assests/link.png';

const Map = () => {
  const [csrfToken, setCsrfToken] = useState('qyJj4PUdfKvK78fQpXCZQHDPu64P29ifW9aEA=');
  const [selectedRadius, setSelectedRadius] = useState('5');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const elementRef = useRef(null);
  const [myMapCenter, setMyMapCenter] = useState({ lat: 40.785091, lng: -73.968285 });
  const [zooming, setZooming] = useState(50);
  const [unit, setUnit] = useState("mi");
  const [filters, setFilters] = useState([]);
  var [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const searchInputRef = useRef(null);
  const searchRadiusInputRef = useRef(null);
  const storeWrapperRef = useRef(null);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingStores, setLoadingStores] = useState(true);

  const Gkey = "AIzaSyBe_A3Q0aV6QUqZLzJS8g3UAOYUDtNVh_4";
  let chooseMarkerOption = `<svg height="60" viewBox="0 0 64 64" width="60" xmlns="http://www.w3.org/2000/svg"><g id="Locator">
  <path d="m32 8a18.02069 18.02069 0 0 0 -18 18c0 5.61 2.3 9.06 4.37 12.15l12 17a1.98788 1.98788 0 0 0 3.26 0l12-17c.01-.01.02-.03.03-.04 2.04-3.05 4.34-6.5 4.34-12.11a18.02069 
  18.02069 0 0 0 -18-18zm-9 18a9 9 0 1 1 9 9 9.01356 9.01356 0 0 1 -9-9z" fill="#000"/><path d="m32 17a9 9 0 1 0 9 9 9.01356 9.01356 0 0 0 -9-9zm0 14a5 5 0 1 1 5-5 5.00182 5.00182
   0 0 1 -5 5z" fill="#000"/><circle cx="32" cy="26" fill="#fff" r="5"/></g></svg>`;
  let colorIconBtn = "#000";
  const getSearchIcon = (fillColor) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="${fillColor}" height="20px" width="20px" viewBox="0 0 488.4 488.4">
              <g>
                <g>
                  <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z"/>
                </g>
              </g>
            </svg>`;
  };

  const getFlexDirection = (layout) => {
    switch (layout) {
      case 'layout-2':
        return 'row-reverse';
      case 'layout-3':
        return 'column';
      default:
        return 'row';
    }
  };

  const getLayoutClasses = (layout) => {
    if (layout === 'layout-3') {
      return 'layout-3-classes';
    }
    return '';
  };

  const toggleBounce = (marker) => {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2000);
    }
  };

  let mapImage = `<svg height="60" viewBox="0 0 64 64" width="60" xmlns="http://www.w3.org/2000/svg"><g id="Locator"><path d="m32 8a18.02069 18.02069 0 0 0 -18 18c0 5.61 2.3 9.06 4.37 12.15l12 17a1.98788 1.98788 0 0 0 3.26 0l12-17c.01-.01.02-.03.03-.04 2.04-3.05 4.34-6.5 4.34-12.11a18.02069 18.02069 0 0 0 -18-18zm-9 18a9 9 0 1 1 9 9 9.01356 9.01356 0 0 1 -9-9z" fill="${colorIconBtn}"/><path d="m32 17a9 9 0 1 0 9 9 9.01356 9.01356 0 0 0 -9-9zm0 14a5 5 0 1 1 5-5 5.00182 5.00182 0 0 1 -5 5z" fill="${colorIconBtn}96"/><circle cx="32" cy="26" fill="#fff" r="5"/></g></svg>`;
  let sideIcons = "";
  let mapThemeliquid = "silver";
  let groups = "false";
  let url = "/api/getStores";
  let addressSvg = "";
  let storeSvg = "";
  let phoneSvg = "";
  let linkSvg = "";
  let mapBgColor = "#000";
  let zoom_level = "50";

  let mcOptions = {
    maxZoom: zoom_level,
    styles: [
      {
        height: 53,
        url: "{{ 'm1.png' | asset_url }}",
        width: 53
      }, {
        height: 56,
        url: "{{ 'm2.png' | asset_url }}",
        width: 56
      }, {
        height: 66,
        url: "{{ 'm3.png' | asset_url }}",
        width: 66
      }, {
        height: 78,
        url: "{{ 'm4.png' | asset_url }}",
        width: 78
      }
    ]
  };

  const getBaseURL = () => {
    return `${window.location.protocol}//${window.location.host}`;
  };

  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user?.email;
  
        if (!email) {
          console.error('User email is not available');
          return;
        }
  
        const response = await fetch(`/api/settings?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        const data = await response.json();
  
        const markerImage = data.markerImage ? `${getBaseURL()}${data.markerImage}` : null;
  
  
        setSettings({
          apiKey: data.apiKey[0],
          googleMapsApiKey: data.googleMapsApiKey[0],
          iconButtonColor: data.iconButtonColor[0],
          layout: data.layout[0],
          mapBackground: data.mapBackground[0],
          mapTheme: data.mapTheme[0],
          markerImage: markerImage, 
          markerType: data.markerType[0],
          markersBehavior: data.markersBehavior[0],
          searchButtonBackground: data.searchButtonBackground[0],
          searchIconButton: data.searchIconButton[0],
          zoomLevel: parseInt(data.zoomLevel[0], 10),
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
  
    fetchSettings();
  }, []);  


  // search defaults when no query set
  var searchDefaults = {
    lat: "",
    lng: "",
    radius: 8000,
  };

  useEffect(() => {
    const searchInput = searchInputRef?.current;

    if (searchInput) {
    }
  }, []);

  useEffect(() => {
    loadGoogleMapsAPI(Gkey)
      .then(() => {
        setGoogleMapsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function searchStore(searchString, { lat, lng }, radius) {
   
    const coordinates = { lat: Number(lat), lng: Number(lng) };
  
    if (map) {
      map.setCenter(coordinates);
  
      const nearbyStores = findStores(coordinates.lat, coordinates.lng, radius);
  
      if (nearbyStores.length > 0) {
        renderStores(nearbyStores);
      } else {
        renderStores([]); 
      }
  
      disableZoomSearch(1000);
  
      map.setZoom(12); 
      const inRangeMarkers = getInRangeMarkers();
      setMarkersVisible(inRangeMarkers);
  
      const outRangeMarkers = getOutRangeMarkers();
      setMarkersDeVisible(outRangeMarkers);
    } else {
      console.error("Map instance is not available.");
    }
  }  


  function disableZoomSearch(duration) {
    setZooming(true)
    setTimeout(function () {
      setZooming(false)
    }, duration);
  }

  useEffect(() => {
    if (searchInputRef.current && googleMapsLoaded) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        searchInputRef.current,
        { types: ['(cities)'] }
      );

      autocompleteInstance.addListener('place_changed', function () {
        const place = autocompleteInstance.getPlace();
        if (!place.geometry) {
          console.error('No details available for input:', place.name);
          return;
        }

        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        searchStore(place.name, { lat, lng }, selectedRadius);
      });
    }
  }, [googleMapsLoaded, map, selectedRadius]);


  useEffect(() => {
    setLoadingStores(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStores(data);
        setLoadingStores(false);
      })
      .catch((error) => {
        console.error('Fetch Stores Error:', error);
        setLoadingStores(false);
      });
  }, []);


  async function initMap() {

    // let result = await requestCall({
    //   url: "/apps/pw-express-proxy/locator/",
    //   method: "GET",
    //   headers: { Accept: "*/*", "Ngrok-Skip-Browser-Warning": "6024" },
    // });

    stores = [{
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
  // grab default map center if it is
  var lat = "";
  var lng = "";

  // if no defaults set use first store for map center
  if ((lat == "" || lng == "") && stores.length > 0) {
    lat = Number(stores[0].latitude);
    lng = Number(stores[0].longitude);
  } else {
    lat = 40.7128;
    lng = 74.006;
  }

  function showStoreInfo(storeInfo, marker) {
    return (
      <StoreInfo storeInfo={storeInfo} marker={marker} map={map} />
    );
  }

  const requestCall = async (requestConfig) => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "POST",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.error("error name", error);
    }
  };

  const initialRequestConfig = {
    url: "/api/getStores",
    method: "GET",
  };

  useEffect(() => {
    setLoading(true);
    requestCall(initialRequestConfig)
      .then((data) => {
        setStores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch Stores Error:', error);
        setLoading(false);
      });
  }, []);

  function showOnLoadLocations(lat, lng, radius) {
    const nearby = findStores(lat, lng, radius);
    renderStores(nearby);
  }

  function findStores(lat, lng, radius) {
    var results = [];
  
    for (let i = 0; i < stores.length; i++) {
      var store = stores[i];
      var storeLat = Number(store.latitude);
      var storeLng = Number(store.longitude);
  
      var distance = calcDistance(lat, lng, storeLat, storeLng);
  
      if (distance <= radius) {
        if (filters.length === 0 || filterCheck(store)) {
          store.distance = distance;
          results.push(store);
        }
      }
    }
  
    results = results.sort((f1, f2) => f1.distance - f2.distance);
  
    return results.slice(0, 50);
  }  

  function calcDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
  
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c; 
  
    return unit === "mi" ? distanceKm * 0.621371 : distanceKm;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }  

  function filterCheck(store) {
    if (filters.length == 0) {
      return true;
    } else if (
      store.tags.indexOf(",") == -1 &&
      $.inArray(store.tags, filters) != -1
    ) {
      return true;
    } else {
      var tags = store.tags.split(",");
      var match = false;

      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i].toLowerCase().trim();

        if ($.inArray(tag, filters) != -1) {
          match = true;
        }
      }
      return match;
    }
    return false;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    const initialLat = 123.456;
    const initialLng = 789.012;
    const radius = 10;

    showOnLoadLocations(initialLat, initialLng, radius);
  }, []);


  useEffect(() => {
    if (googleMapsLoaded && map && stores.length > 0) {
      const newMarkers = stores.map((store, index) => {
        const markerIcon = settings?.markerImage ? {
          url: settings.markerImage,
          scaledSize: new window.google.maps.Size(40, 40) 
        } : null;
  
  
        const marker = new window.google.maps.Marker({
          position: { lat: Number(store.latitude), lng: Number(store.longitude) },
          map: map,
          animation: window.google.maps.Animation.DROP,
          zIndex: index,
          icon: markerIcon,
        });
  
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 10px 0px; max-width: 640px; width: 100%;">
                        <div style="display: flex; flex-direction: column; gap: 10px; border: 1px solid #d3d3d3; padding: 10px; margin-bottom: 10px; background-color: #f4f4f4;">
                          <h4 style="font-size: 32px; font-weight: bold; color: #000;">Target Store</h4>
                        </div>
                        <a href="https://maps.google.com?saddr=Current+Location&daddr=${Number(store.latitude)},${Number(store.longitude)}" target="_blank">
                          <div class="directions-container" style="display: flex; align-items: center; gap: 10px; padding: 10px; margin: 0px 10px 5px 10px; border: 1px solid #d3d3d3; border-radius: 5px;">
                            <img src="${Direction.src}" alt="Directions" style="width: 40px; height: 40px;">
                            <div style="flex-grow: 1;">
                              <p style="margin-bottom: 3px; color: #000; font-size: 14px; font-weight: semibold;">Address</p>
                              <p style="margin-bottom: 5px;">${store.searchAddress}, ${store.addressLine1}, ${store.addressLine2}</p>
                              <p style="margin: 0;">${store.city}, ${store.stateProvince}, ${store.country} ${store.postalCode}</p>
                            </div>
                            <p>Directions</p>
                          </div>
                        </a>
                        ${store.email ? `
                        <a href="mailto:${store.email}" target="_blank" style="text-decoration: none;">
                          <div class="directions-container" style="display: flex; align-items: center; gap: 10px; padding: 10px; margin: 0px 10px 5px 10px; border: 1px solid #d3d3d3; border-radius: 5px;">
                            <img src="${Shop.src}" alt="Store Info" style="width: 40px; height: 40px;">
                            <div style="flex-grow: 1;">
                              <p style="margin-bottom: 3px; color: #000; font-size: 14px; font-weight: semibold;">Store Info</p>
                              <p style="margin-bottom: 5px;">Email: ${store.email}</p>
                            </div>
                          </div>
                        </a>` : ''}
                        ${store.website ? `
                        <a href="${store.website}" target="_blank" style="text-decoration: none;">
                          <div class="directions-container" style="display: flex; align-items: center; gap: 10px; padding: 10px; margin: 0px 10px 10px 10px; border: 1px solid #d3d3d3; border-radius: 5px;">
                            <img src="${Link.src}" alt="Website" style="width: 40px; height: 40px;">
                            <div style="flex-grow: 1;">
                              <p style="margin-bottom: 3px; color: #000; font-size: 14px; font-weight: semibold;">Website</p>
                              <p style="margin-bottom: 5px;">${store.website}</p>
                            </div>
                          </div>
                        </a>` : ''}
                      </div>`
        });
  
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
  
        return marker;
      });
  
      setMarkers(newMarkers);
  
      markers.forEach(marker => marker.setMap(null));
  
      return () => {
        newMarkers.forEach(marker => marker.setMap(null));
      };
    }
  }, [googleMapsLoaded, map, stores, settings?.markerImage]);
  

  useEffect(() => {
    if (googleMapsLoaded && !map) {
      const zoomLevel = parseInt(settings?.zoomLevel || zoom_level, 10);

      const mapOptions = {
        center: myMapCenter,
        zoom: zoomLevel,
        styles: mapThemes(settings?.mapTheme || mapThemeliquid),
      };

      // Create the map
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(map);

      // Load default stores and markers
      if (map) {
        showOnLoadLocations(lat, lng, searchDefaults.radius);
      }

      let mapIcon = `<svg height="60" viewBox="0  64 64" width="60" xmlns="http://www.w3.org/2000/svg"><g id="Locator"><path d="m32 8a18.02069 18.02069 0 0 0 -18 18c0 5.61 2.3 9.06 4.37 12.15l12 17a1.98788 1.98788 0 0 0 3.26 0l12-17c.01-.01.02-.03.03-.04 2.04-3.05 4.34-6.5 4.34-12.11a18.02069 18.02069 0 0 0 -18-18zm-9 18a9 9 0 1 1 9 9 9.01356 9.01356 0 0 1 -9-9z" fill="${colorIconBtn}"/><path d="m32 17a9 9 0 1 0 9 9 9.01356 9.01356 0 0 0 -9-9zm0 14a5 5 0 1 1 5-5 5.00182 5.00182 0 0 1 -5 5z" fill="${colorIconBtn}96"/><circle cx="32" cy="26" fill="#fff" r="5"/></g></svg>`;

      if (settings?.markerType === "icon") {
        let svg = `<svg height="60" viewBox="0  64 64" width="60" xmlns="http://www.w3.org/2000/svg"><g id="Locator"><path d="m32 8a18.02069 18.02069 0 0 0 -18 18c0 5.61 2.3 9.06 4.37 12.15l12 17a 1.98788 0 0 0 3.26 0l12-17c.01-.01.02-.03.03-.04 2.04-3.05 4.34-6.5 4.34-12.11a18.02069 18.02069 0 0 0 -18-18zm-9 18a9 9 0 1 1 9 9 9.01356 9.01356 0 0 1 -9-9z" fill="${colorIconBtn}"/><path d="m32 17a9 9 0 1 0 9 9 9.01356 9.01356 0 0 0 -9-9zm0 14a5 5 0 1 1 5-5 5.00182 5.00182 0 0 1 -5 5z" fill="${colorIconBtn}96"/><circle cx="32" cy="26" fill="#fff" r="5"/></g></svg>`;

        mapIcon = {
          url: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg),
        };
      } else {
        mapIcon = mapImage;
      }

      // Add the markers to the map
      const markers = stores && stores.map((location, i) => {
        return new window.google.maps.Marker({
          position: {
            lat: Number(location.latitude),
            lng: Number(location.longitude),
          },
          animation: window.google.maps.Animation.DROP,
          zIndex: i,
          map: map,
          icon: mapIcon,
          visible: true,
        });
      });

      // Enable or disable marker clustering based on settings
      if (settings?.markersBehavior === "group location while zoomed out") {
        new MarkerClusterer(map, markers, mcOptions);
      }

      markers.map((marker, i) => {
        marker.addListener("click", toggleBounce);

        marker.addListener("click", () => {
          let storeInfo = stores.filter(
            (loc) =>
              Number(loc.latitude) === marker.position.lat() &&
              Number(loc.longitude) === marker.position.lng()
          );
          showStoreInfo(storeInfo[0], marker);
        });
      });

      // map drag nearby search
      map.addListener("dragend", function () {
        searchBoundary();
        let inRangeMarkers = getInRangeMarkers();
        setMarkersVisible(inRangeMarkers);

        let outRangeMarkers = getOutRangeMarkers();
        setMarkersDeVisible(outRangeMarkers);
      });

      // map zoom nearby search
      map.addListener("zoom_changed", function () {
        if (!zooming) {
          // do not fire when zoom is being set elsewhere
          searchBoundary();
          let inRangeMarkers = getInRangeMarkers();
          setMarkersVisible(inRangeMarkers);

          let outRangeMarkers = getOutRangeMarkers();
          setMarkersDeVisible(outRangeMarkers);
        }
      });
      setMarkers(markers);

      // Store the map instance if needed
      mapRef.current = map;
    } else if (map) {
      const zoomLevel = parseInt(settings?.zoomLevel || zoom_level, 10);
      map.setOptions({
        styles: mapThemes(settings?.mapTheme || mapThemeliquid),
        zoom: zoomLevel,
      });
    }
  }, [googleMapsLoaded, myMapCenter, settings, mapThemes]);

  function getInRangeMarkers() {
    if (mapRef.current) {
      const mapBounds = mapRef.current.getBounds();
      return markers.filter(
        (item) =>
          mapBounds &&
          mapBounds.contains({
            lat: item.position.lat(),
            lng: item.position.lng(),
          })
      );
    }
    return [];
  }

  // search maps bounding box on zoom change
  function searchBoundary() {
    let zoom = map?.getZoom();
    var distance = [
      25000, 25000, 20000, 15000, 8000, 1500, 1200, 600, 200, 150, 100, 75, 50,
    ];

    let radius = zoom < 12 ? distance[zoom] : 50;
    let center = map?.getCenter();
    // search for nearby stores
    let nearby = findStores(center?.lat(), center?.lng(), radius);
    // render list of stores
    if (nearby.length > 0) {
      renderStores(nearby);
    } else {
      renderStores([]);
    }
  }


  function getOutRangeMarkers() {
    if (mapRef.current) {
      const mapBounds = mapRef.current.getBounds();
      return markers.filter(
        (item) =>
          !mapBounds ||
          !mapBounds.contains({
            lat: item.position.lat(),
            lng: item.position.lng(),
          })
      );
    }
    return markers;
  }

  function setMarkersVisible(inRangeMarkers) {
    for (let marker of inRangeMarkers) {
      marker.visible = true;
    }
  }

  function setMarkersDeVisible(outRangeMarkers) {
    for (let marker of outRangeMarkers) {
      marker.visible = false;
    }
  }

  useEffect(() => {

    const element = elementRef.current;

    if (element) {
      const parentSection = element.closest('section');
      if (parentSection) {
        parentSection.style.backgroundColor = mapBgColor;
      }
    }
  }, []);

  function handleStoreClick(e) {
    let currentStore = e.target.closest("li");
    if (!currentStore) return;
    const coordinates = {
      lat: parseFloat(currentStore.getAttribute("data-lat")),
      lng: parseFloat(currentStore.getAttribute("data-lng")),
    };

    disableZoomSearch(1000); 
    mapRef?.current?.setCenter(coordinates); // Use mapRef to access the map instance
    mapRef?.current?.setZoom(15); // Set your desired zoom level

    const findStore = stores.filter(
      (store) =>
        Number(store.latitude) === coordinates.lat &&
        Number(store.longitude) === coordinates.lng
    );
    const marker = markers.filter(
      (marker) =>
        Number(findStore[0]?.latitude) === marker?.position?.lat() &&
        Number(findStore[0]?.longitude) === marker?.position?.lng()
    );

    showStoreInfo(findStore[0], marker[0]);

    let inRangeMarkers = getInRangeMarkers();
    setMarkersVisible(inRangeMarkers);

    let outRangeMarkers = getOutRangeMarkers();
    setMarkersDeVisible(outRangeMarkers);
  }

  useEffect(() => {
    if (storeWrapperRef.current) {
      const storeWrapper = storeWrapperRef.current;


      storeWrapper.addEventListener("click", handleStoreClick);

      return () => {
        storeWrapper.removeEventListener("click", handleStoreClick);
      };
    }
  }, [stores, markers]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRadiusChange = (e) => {
    setSelectedRadius(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function renderStores(stores) {
    const storeWrapper = storeWrapperRef.current;
    if (storeWrapper) {
      if (loadingStores) {
        storeWrapper.innerHTML = `<li>
          <div class="pw-group-field">
            <div class="pw-list-map-icon">
              <span class="map-icon">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 92.25 122.88"
                  style="enable-background:new 0 0 92.25 122.88"
                  xml:space="preserve"
                >
                  <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M68.51,106.28c-5.59,6.13-12.1,11.62-19.41,16.06c-0.9,0.66-2.12,0.74-3.12,0.1 c-10.8-6.87-19.87-15.12-27-24.09C9.14,86.01,2.95,72.33,0.83,59.15c-2.16-13.36-0.14-26.22,6.51-36.67 c2.62-4.13,5.97-7.89,10.05-11.14C26.77,3.87,37.48-0.08,48.16,0c10.28,0.08,20.43,3.91,29.2,11.92c3.08,2.8,5.67,6.01,7.79,9.49 c7.15,11.78,8.69,26.8,5.55,42.02c-3.1,15.04-10.8,30.32-22.19,42.82V106.28L68.51,106.28z M46.12,23.76 c12.68,0,22.95,10.28,22.95,22.95c0,12.68-10.28,22.95-22.95,22.95c-12.68,0-22.95-10.27-22.95-22.95 C23.16,34.03,33.44,23.76,46.12,23.76L46.12,23.76z"/></g>
                </svg>
              </span>
            </div>
            <div class="pw-list-map-data">
              <div class="pw-result-store-name">Loading stores...</div>
            </div>
          </div>
        </li>`;
      } else if (stores.length === 0) {
        storeWrapper.innerHTML = `<li>
          <div class="pw-group-field">
            <div class="pw-list-map-icon">
              <span class="map-icon">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/2000/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 92.25 122.88"
                  style="enable-background:new 0 0 92.25 122.88"
                  xml:space="preserve"
                >
                  <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M68.51,106.28c-5.59,6.13-12.1,11.62-19.41,16.06c-0.9,0.66-2.12,0.74-3.12,0.1 c-10.8-6.87-19.87-15.12-27-24.09C9.14,86.01,2.95,72.33,0.83,59.15c-2.16-13.36-0.14-26.22,6.51-36.67 c2.62-4.13,5.97-7.89,10.05-11.14C26.77,3.87,37.48-0.08,48.16,0c10.28,0.08,20.43,3.91,29.2,11.92c3.08,2.8,5.67,6.01,7.79,9.49 c7.15,11.78,8.69,26.8,5.55,42.02c-3.1,15.04-10.8,30.32-22.19,42.82V106.28L68.51,106.28z M46.12,23.76 c12.68,0,22.95,10.28,22.95,22.95c0,12.68-10.28,22.95-22.95,22.95c-12.68,0-22.95-10.27-22.95-22.95 C23.16,34.03,33.44,23.76,46.12,23.76L46.12,23.76z"/></g>
                </svg>
              </span>
            </div>
            <div class="pw-list-map-data">
              <div class="pw-result-store-name">Sorry, we didn't find any stores nearby.</div>
            </div>
          </div>
        </li>`;
      } else {
        let storesHtml = stores.map(store => `
          <li data-lat="${store.latitude}" data-lng="${store.longitude}">
            <div class="pw-group-field">
              <div class="pw-list-map-icon">
                <span class="map-icon">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 92.25 122.88"
                    style="enable-background:new 0 0 92.25 122.88"
                    xml:space="preserve"
                    fill="${sideIcons}"
                  >
                    <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M68.51,106.28c-5.59,6.13-12.1,11.62-19.41,16.06c-0.9,0.66-2.12,0.74-3.12,0.1 c-10.8-6.87-19.87-15.12-27-24.09C9.14,86.01,2.95,72.33,0.83,59.15c-2.16-13.36-0.14-26.22,6.51-36.67 c2.62-4.13,5.97-7.89,10.05-11.14C26.77,3.87,37.48-0.08,48.16,0c10.28,0.08,20.43,3.91,29.2,11.92c3.08,2.8,5.67,6.01,7.79,9.49 c7.15,11.78,8.69,26.8,5.55,42.02c-3.1,15.04-10.8,30.32-22.19,42.82V106.28L68.51,106.28z M46.12,23.76 c12.68,0,22.95,10.28,22.95,22.95c0,12.68-10.28,22.95-22.95,22.95c-12.68,0-22.95-10.27-22.95-22.95 C23.16,34.03,33.44,23.76,46.12,23.76L46.12,23.76z"/></g>
                  </svg>
                </span>
              </div>
              <div class="pw-list-map-data">
                <div class="pw-result-store-name" style="color:${sideIcons}">${store.name}</div>
                <div class="pw-result-store-address">${store.address ? store.address + ', ' : ''} ${store.searchAddress ? store.searchAddress + ', ' : ''
          } ${store.city ? store.city + ', ' : ''} ${store.stateProvince ? store.stateProvince + ', ' : ''} ${store.country ? store.country + ', ' : ''
          } ${store.postalCode ? store.postalCode : ''}</div>
                <div class="pw-address-link"><a href="https://maps.google.com?saddr=Current+Location&daddr=${Number(
            store.latitude
          )}, ${Number(store.longitude)}" target="_blank" style="color:${sideIcons}">Directions</a></div>
              </div>
            </div>
          </li>
        `).join('');
        storeWrapper.innerHTML = storesHtml;
      }
    }
  }

  if (stores.length > 0) {
    renderStores(stores);
  }


  return (
    <section className='w-[100%]' id="map-integration" style={{ background: settings?.mapBackground || '#fff' }}>
      <div className={`container-pw-store-locator pw-locator p-4 ${getLayoutClasses(settings?.layout)}`} id="store-search-form">
        <div className="pw-horizontal-map">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="_csrf" value={csrfToken} />
            <div className="pw-top-bar pw-layout">
              <div id="map-style" style={{ display: 'flex', flexDirection: getFlexDirection(settings?.layout), gap: '1rem' }}>
                <div className='flex flex-col gap-4 sm:w-[50%] w-[100%]'>
                  <div className="pw-search">
                    <div className="form-group pw-search-bar-12 pw-search-bar-6 pw-search-bar-3 pw-search-bar">
                      <input
                        className="form-control"
                        type="text"
                        name="location"
                        id="pw-location"
                        placeholder="street, city, zip code, or state"
                        ref={searchInputRef}
                      />
                      <button
                        className="btn btn-primary store-search"
                        type="submit"
                        id="search_btn"
                        style={{ background: settings?.searchButtonBackground || '#fff' }}
                        dangerouslySetInnerHTML={{ __html: getSearchIcon(settings?.searchIconButton || '#000000') }}
                      />
                    </div>
                    <div className="hidden-xs form-group pw-search-bar-12 pw-search-bar-6 pw-search-bar-3 pw-search-raduis">
                      <label className="control-label" htmlFor="radius">Search radius</label>
                      <select className="form-control" id="pw-radius" value={selectedRadius} onChange={handleRadiusChange} ref={searchRadiusInputRef}>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="20">20 miles</option>
                        <option value="40">40 miles</option>
                        <option value="60">60 miles</option>
                        <option value="100">100 miles</option>
                        <option value="200">200 miles</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12" id="store-list">
                    <div className="pw-loader">
                      <span></span>
                    </div>
                    <ul className="list-unstyled" ref={storeWrapperRef}>
                      {/* Rendered stores or loading message will be injected here */}
                    </ul>
                  </div>
                </div>
                <div className="col-12" id="store-map">
                  <div id="map" ref={mapRef}></div>
                  {/* The Modal */}
                  {isModalOpen && (
                    <div id="myModal" className="modal">
                      {/* Modal content */}
                      <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <p>
                          PW Store locator needs a map key from Google to show your map.
                          To finish setup and remove this notice, add a map key to your PW Store Locator account.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Map;