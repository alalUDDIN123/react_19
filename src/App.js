import React, { useContext } from 'react'
import { authContext} from './useContext'
import Dashboared from './Dashboared'
import SignIn from './SignIn'

const App = () => {
  const { isSignnedIn } = useContext(authContext)
  return (
    <>
     
        {isSignnedIn ? <Dashboared /> : <SignIn />}
    </>
  )
}

export default App