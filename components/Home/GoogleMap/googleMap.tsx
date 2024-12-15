import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './marker'
import { GOOGLE_MAPS_API_KEY } from '../../../config/constants'

const SimpleMap: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [center, setCenter] = useState({ lat: -1.9441, lng: 30.0909 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useState(13)
  const allUzuriLocation = [
    { lat: -1.9523329, lng: 30.0905217, addressName: 'KH' },
    { lat: -1.946035, lng: 30.0579336, addressName: 'KCM' },
    { lat: -1.9315979, lng: 30.1120225, addressName: 'Kibagabaga' },
    { lat: -1.9635849, lng: 30.1327706, addressName: 'KIA' },
  ]
  const curr_uzuri_location = allUzuriLocation.map((item, idx) => {
    return (
      <Marker key={idx} lat={item.lat} lng={item.lng} name={item.addressName} icon="/marker.svg" />
    )
  })
  return (
    <div style={{ height: '450px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}>
        {curr_uzuri_location}
      </GoogleMapReact>
    </div>
  )
}

export default SimpleMap
