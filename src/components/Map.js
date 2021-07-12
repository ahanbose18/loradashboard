import React,{useState} from 'react'
import ReactMapGl, {MapContext}  from "react-map-gl"

function CustomMarker(props) {
  const context = React.useContext(MapContext);
  
  const {longitude, latitude} = props;

  const [x, y] = context.viewport.project([longitude, latitude]);

  const markerStyle = {
    position: 'absolute',
    background: '#fff',
    left: x,
    top: y
  };

  return (
    <div style={markerStyle} >
      ({longitude}, {latitude})
    </div>
  );
}




export default function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  return (
    <ReactMapGl {...viewport} mapboxApiAccessToken={"pk.eyJ1IjoiYWhhbmJvc2UiLCJhIjoiY2tvdTJ3ajVlMDJ3MDJ3cGZ2ZjM3cWJ1ZSJ9.Twutfpj-tVMbE9cC2jSwug"} 
    mapStyle="mapbox://styles/ahanbose/ckr01apae663u1ao95ode0x6i"
    onViewportChange={(viewport)=>{setViewport(viewport)}}>
             <CustomMarker longitude={-122.45} latitude={37.78} />
    </ReactMapGl>  
  )
}
