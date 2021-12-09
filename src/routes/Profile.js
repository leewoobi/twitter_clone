import { authService, dbService } from "fbase";
import React from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";


export default ({refreshUser,userObj}) =>{
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const { 
            target: {value},
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
           const response = await userObj.updateProfile({
                displayName : newDisplayName
            });
            refreshUser();
        }
    };
    // const getMyNweets = async()=> {
    //     const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", userObj.uid) //필터링 
    //         .orderBy("createdAt")
    //         .get();
    //         console.log(nweets.docs.map((doc) => doc.data()));
    // }
    // useEffect(()=>{
    //     getMyNweets();
    // }, [])
    return (
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input 
            onChange={onChange}
            type="text"
            autoFocus
            placeholder="Display name"
            value ={newDisplayName}
            className="formInput"
            />
            <input
              type="submit"
              value="Update Profile"
              className="formBtn"
              style={{
                marginTop: 10,
              }}
            />
         </form>
         <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    )
}