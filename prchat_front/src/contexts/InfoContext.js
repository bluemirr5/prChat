import React, { createContext, useState } from "react";

const InfoContext = createContext()

const InfoContextProvider = ({children}) => {
  const [id, setId] = useState('')
  const [room, setRoom] = useState('')
  const externalData = 'https://whochooz.com'
  return (
    <InfoContext.Provider value={{id, setId, room, setRoom, externalData}}>
      {children}
    </InfoContext.Provider>
  )
}

export { InfoContextProvider }
export default InfoContext
