import { useMemo, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";

const AirportMap = (props: any) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDWpg3IpwX7iAEPO0DbLQwXtmNL1NG11Rw",
    });

    if (!isLoaded) return <div></div>;
    return <Map {...props} />;
};

const Map = (props: any) => {
    const { airports, setAirport, selectedAirport } = props;

    return (
        <div className="outer-map">
            <GoogleMap zoom={4} center={{ lat: 50, lng: 11 }} mapContainerClassName="googleMap">
                {airports.map((airport: any) => {
                    return (
                        <MarkerF 
                            key={airport?.AirportCode}
                            position={{lat: airport?.Geolocation?.x, lng: airport?.Geolocation?.y}} 
                            onClick={() => {
                                console.log(airport?.AirportCode, selectedAirport)
                                if(airport?.AirportCode == selectedAirport) {
                                    setAirport("dowolne")
                                } else {
                                    setAirport(airport?.AirportCode)
                                }
                            }}
                        />)
                })}
            </GoogleMap>
        </div>
    );
}

export default AirportMap;