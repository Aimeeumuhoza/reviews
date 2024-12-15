import React from 'react'

type Props = {
  name: string
  icon: string
  lat: number
  lng: number
}
const Marker: React.FC<Props> = ({ name, icon }) => {
  return (
    <div style={{ cursor: 'pointer' }} title={name}>
      <img src={icon} alt="uzuri_map_marker" height="36px" width="36px" />
    </div>
  )
}

export default Marker
