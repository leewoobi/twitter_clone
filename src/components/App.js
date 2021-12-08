import React,{useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserobj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserobj({
          displayName : user.displayName,
          uid : user.uid ,
          updateProfile: (args) => user.updateProfile(args),
        });
      }else{
        // setUserobj(null);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserobj({
      displayName : user.displayName,
      uid : user.uid ,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  return (
    <>
    {init ? <AppRouter
               refreshUser={refreshUser} 
               isLoggedIn={isLoggedIn}
               userObj={userObj}
              /> : "Initializeing..." }
    </>
  )
}

export default App;
