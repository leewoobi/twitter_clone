import { dbService } from "fbase";
import React from "react";
import { useState } from "react/cjs/react.development";

const Nweet = ({nweetObj,isOwner}) => {
    const [editing , setEditing ] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async ()=> {
        const ok = window.confirm('삭제할거임?');
        console.log(ok)
        if(ok){
        await   dbService.doc(`nweets/${nweetObj.id}`).delete(); 

        }
    };
    const toggleEditing = () => setEditing((prev)=> !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet})
        setEditing(false);
    }
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewNweet(value);
    }
  return  (
        <div>
            {
            editing ? (
                <>
                <form onSubmit={onSubmit}> 
                    <input
                       type="text"
                       placeholder="edit your nweet"
                       value={newNweet}
                       required
                       onChange= {onChange}
                       />
                       <input type="submit" value="Update Nweet" /> 
                </form> 
                <button onClick={toggleEditing}>cancel</button>
                </>
            ) : (
            <> 
            <h4>{nweetObj.text}</h4> 
            { isOwner && ( 
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>
                </>
             )}
          </>
           )}
        </div>
    
    )
};
export default Nweet;