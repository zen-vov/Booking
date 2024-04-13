// import { useEffect, useRef } from "react";

// interface MapProps {
//   address: string;
// }

// const Map: React.FC<MapProps> = ({ address }) => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadMap = async () => {
//       if (!window.google) {
//         const googleMapScript = document.createElement("script");
//         googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
//         window.document.body.appendChild(googleMapScript);
//         googleMapScript.addEventListener("load", initializeMap);
//       } else {
//         initializeMap();
//       }
//     };

//     const initializeMap = () => {
//       const geocoder = new google.maps.Geocoder();

//       geocoder.geocode({ address }, (results, status) => {
//         if (status === "OK") {
//           const map = new google.maps.Map(mapRef.current!, {
//             zoom: 15,
//             center: results[0].geometry.location,
//           });
//           new google.maps.Marker({
//             map,
//             position: results[0].geometry.location,
//           });
//         } else {
//           console.error(
//             "Geocode was not successful for the following reason:",
//             status
//           );
//         }
//       });
//     };

//     loadMap();

//     return () => {
//       const googleMapScript = document.querySelector(
//         'script[src^="https://maps.googleapis.com/maps/api/js"]'
//       );
//       if (googleMapScript) {
//         googleMapScript.remove();
//       }
//     };
//   }, [address]);

//   return <div ref={mapRef} style={{ height: "400px" }} />;
// };

// export default Map;
