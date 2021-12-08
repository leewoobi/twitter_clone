import Nweet from "components/Nweet";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import NweetFactory from "components/NweetFacory";

const Home = ({userObj}) => {
    console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment,setAttachment] = useState("");

    useEffect(()=>{ 
       dbService.collection("nweets").onSnapshot((snapshop) => {
        const nweetArray = snapshop.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data(),
        }));
        setNweets(nweetArray);
       });
    },[]);
    
return(
    <div>
        <NweetFactory userObj={userObj}/>
        <div>
            {nweets.map((nweet) => (
                                      <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
    </div>

    )

}

export default Home;