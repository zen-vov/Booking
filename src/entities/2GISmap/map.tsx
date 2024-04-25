"use client"
declare global {
  interface Window {
    DG: any;
  }
}

import React, { useEffect, useRef, useState } from "react";

interface Props {
  apiKey: string;
  center: [number, number];
  markerCoordinates?: [number, number];
}

const scriptSrc = "https://maps.api.2gis.ru/2.0/loader.js";

const loadScript = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.body.appendChild(script);
  });
};

const createMap = (container: HTMLElement, center: [number, number]) => {
  return new Promise<any>((resolve) => {
    window.DG.then(() => {
      const map = new window.DG.Map(container, {
        center: center,
        zoom: 13,
      });
      resolve(map);
    });
  });
};

const createMarker = (map: any, coordinates: [number, number]) => {
  return new Promise<any>((resolve) => {
    window.DG.then(() => {
      const marker = new window.DG.Markers.Marker({
        point: coordinates,
      });
      marker.addTo(map);
      resolve(marker);
    });
  });
};

const loadMap = async (
  apiKey: string,
  center: [number, number],
  markerCoordinates?: [number, number]
) => {
  await loadScript(scriptSrc);
  const mapContainer = document.createElement("div");
  mapContainer.style.width = "100%";
  mapContainer.style.height = "400px";

  const map = await createMap(mapContainer, center);

  if (markerCoordinates) {
    await createMarker(map, markerCoordinates);
  }

  return mapContainer;
};

const Map2GIS: React.FC<Props> = ({ apiKey, center, markerCoordinates }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    loadMap(apiKey, center, markerCoordinates).then((mapContainer) => {
      if (mapRef.current && !mapLoaded) {
        mapRef.current.appendChild(mapContainer);
        setMapLoaded(true);
      }
    });
  }, [apiKey, center, markerCoordinates, mapLoaded]);

  return <div ref={mapRef}></div>;
};

export default Map2GIS;
