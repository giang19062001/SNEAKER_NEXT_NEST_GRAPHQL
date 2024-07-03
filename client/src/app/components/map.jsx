import {
  useJsApiLoader, //gọi api map
  GoogleMap, //bản đồ
  MarkerF, //icon định vị
  Autocomplete, //hiện các mẫu vị trí khi nhập
  DirectionsRenderer, //vẽ đường đi
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { Box, Typography, TextField, Container, Stack } from "@mui/material";
import { useEffect } from "react";

const center = { lat: 10.72960796554797, lng: 106.67554205846282 };

const Map = (props) => {

  const [size, setSize] = useState({
    width: 800,
    height: 450,
  });



  const [map, setMap] = useState(null);

  return (
    <>
      {props.load === true ? (
        <>
          <Stack spacing={2} className="text-neutral-700">
            <Box sx={{ width: size.width, height: size.height, mt: 2 }}>
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
              >
                <MarkerF position={center} />
                {props.directionsResponse && (
                  <DirectionsRenderer directions={props.directionsResponse} />
                )}
              </GoogleMap>
            </Box>
          </Stack>
        </>
      ) : null}
    </>
  );
};
export default Map;
