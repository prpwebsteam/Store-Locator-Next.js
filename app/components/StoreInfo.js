// components/StoreInfo.js
'use client'
import { useEffect } from 'react';

const StoreInfo = ({ storeInfo, marker, map }) => {
  useEffect(() => {
    if (!storeInfo || !marker || !map) return;

    const content = `
        <div class="popup-content-container" tabindex="0" style="background-color: rgb(255, 255, 255);"><div><div class="card" ><div class="card-header"><h5 class="card-title text-wrap">${
            storeInfo.name
        }</h5></div>
        <div class="card-body"><div class="list-group"><a href="https://maps.google.com?saddr=Current+Location&daddr=${Number(
            storeInfo.latitude
        )}, ${Number(
            storeInfo.longitude
        )}" target="_blank" class="list-group-item list-group-item-action d-flex gap-3 py-3"><img src="${addressSvg}"><div class="d-flex gap-2 w-100 justify-content-between"><div><h6 class="mb-0">Address</h6><p class="mb-0 opacity-75 text-wrap">${
            storeInfo.address
        }, ${storeInfo.addressext},<br> ${storeInfo.city} ${storeInfo.state} ${
            storeInfo.country
        } ${
            storeInfo.zipcode
        } </p></div></div><small class="text-nowrap">Directions</small></a>
        <div class="list-group-item list-group-item-action d-flex gap-3 py-3 ${
            storeInfo.serviceOptions.trim() === "" &&
            storeInfo.descripiton.trim() === "" &&
            storeInfo.email.trim() === "" &&
            storeInfo.hours.trim() === ""
            ? "d-none"
            : ""
        }"><img src="${storeSvg}"><div class="d-flex gap-2 w-100 justify-content-between"><div><h6 class="mb-0">About store</h6><p class="mb-0 opacity-75 text-wrap">${
            storeInfo.descripiton.trim() != "" ? storeInfo.descripiton : ""
        }</p>
            <p class="mb-0 opacity-75 text-wrap ${
            storeInfo.serviceOptions.trim() === "" ? "d-none" : ""
            }">${
            storeInfo.serviceOptions.trim() != ""
            ? `<b>Featured services:</b> ${storeInfo.serviceOptions}`
            : ""
        }</p><p class="mb-0 opacity-75 text-wrap ${
            storeInfo.hours.trim() === "" ? "d-none" : ""
        }">${
            storeInfo.hours.trim() != "" ? `<b>Hours:</b> ${storeInfo.hours}` : ""
        }</p>
        <p class="mb-0 opacity-75 text-wrap ${
            storeInfo.email.trim() === "" ? "d-none" : ""
        }">${
            storeInfo.email.trim() != ""
            ? `<b>Email: </b><a target="_blank" href="mailto:${storeInfo.email}">${storeInfo.email}</a>`
            : ""
        }</p>
        </div></div></div>
        <a target="_blank" href="tel:${
            storeInfo.phone
        }" class="list-group-item list-group-item-action d-flex gap-3 py-3 ${
            storeInfo.phone === "" ? "d-none" : ""
        }"><img src="${phoneSvg}"><div class="d-flex gap-2 w-100 justify-content-between"><div><h6 class="mb-0">Phone</h6><p class="mb-0 opacity-75">${
            storeInfo.phone
        }</p></div><small class="text-nowrap">Call Now</small></div></a><a target="_blank" href="${storeInfo.website.trim()}" class="list-group-item list-group-item-action d-flex gap-3 py-3 ${
            storeInfo.website.trim() === "" ? "d-none" : ""
        }"><img src="${linkSvg}"><div class="d-flex gap-2 w-100 justify-content-between"><div><h6 class="mb-0">Website</h6><p class="mb-0 opacity-75">${
            storeInfo.website.trim() != "" ? `${storeInfo.website}` : ""
        }</p></div></div></a></div></div></div></div></div>
      `;

    const infowindow = new google.maps.InfoWindow();
    infowindow.setContent(content);
    infowindow.open(map, marker);
  }, [storeInfo, marker, map]);

  return null;
};

export default StoreInfo;
