import React from "react";
import "./TweetInFeed.css";
import { defaultImgs } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import ReactModal from 'react-modal';

export const CommentFeed = (props) => {


    return (
        <ReactModal isOpen={props.load} shouldCloseOnOverlayClick={false}>
        <button onClick={toggleModal} >
          Close Comments
        </button>

        <div className="profileTweet">
          <img src={ /*user.attributes.pfp ? user.attributes.pfp : */ defaultImgs[0]} className="profilePic"></img>
          <div className="tweetBox">
            <TextArea
              label=""
              name="tweetTxtArea"
              value="Comment"
              type="text"
              onChange={(e) => setComment(e.target.value)}
              width="95%"
            ></TextArea>
            <div className="imgOrTweet">
              <div className="tweetOptions">
                <div className="tweet" onClick={saveComment} style={{ backgroundColor: "#8247e5" }}>
                  <Icon fill="#ffffff" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </ReactModal>
    )
}