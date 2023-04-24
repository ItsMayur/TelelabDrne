// import React, { useEffect, useRef, ReactElement } from "react";
// import ReactDOM from "react-dom";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

// const render = (status: Status): ReactElement => {
//   const status = Status;

//   if (status === Status.LOADING) return <h3>{status} ..</h3>;
//   if (status === Status.FAILURE) return <h3>{status} ...</h3>;
//   return null;
// };

// const MyMapComponent = ({
//   center,
//   zoom,
// }: {
//   center: google.maps.LatLngLiteral,
//   zoom: number,
// }) => {
//   const ref = useRef();

//   useEffect(() => {
//     new window.google.maps.Map(ref.current, {
//       center,
//       zoom,
//     });
//   });

//   return <div ref={ref} id="map" />;
// };

// const NewMap = () => {
//   const center = { lat: -34.397, lng: 150.644 };
//   const zoom = 4;

//   return (
//     <Wrapper apiKey="AIzaSyAzie1a-9pIB9k5cpQbwPHRnqI4gQFmS-Y" render={render}>
//       <MyMapComponent center={center} zoom={zoom} />
//     </Wrapper>
//   );
// };

// export default NewMap();
// ReactDOM.render(<NewMap />, document.querySelector("#root"));
