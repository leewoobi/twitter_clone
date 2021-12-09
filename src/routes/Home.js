import Nweet from "components/Nweet";

import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import NweetFactory from "components/NweetFacory";

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);
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
    <div className="container">
        <NweetFactory userObj={userObj}/>
        <div style={{ marginTop: 30 }}>
            {nweets.map((nweet) => (
                                      <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
    </div>

    )

}

export default Home;