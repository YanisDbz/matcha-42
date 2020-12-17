import React from "react";
import ReactMapGL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@material-ui/icons/Room';
export default function MapContainer({lat, lon}) {
  const [viewport, setViewport] = React.useState({
    latitude: lat,
    longitude: lon,
    zoom: 13
  });
  return (
    <ReactMapGL
        {...viewport}
        width="400px"
        height="400px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1IjoiZGJ6eW5zIiwiYSI6ImNraWtoZ2xyYzA5d2QydXFqNndxaHY1bnQifQ.IyYzee1rWyV0MsKSqrGpMQ"
        onViewportChange={nextViewport => setViewport(nextViewport)}
    >
        <Marker latitude={lat} longitude={lon} offsetLeft={-20} offsetTop={-10}>
          <RoomIcon fontSize="large" color="primary"/>
        </Marker>
      </ReactMapGL>
  );
}