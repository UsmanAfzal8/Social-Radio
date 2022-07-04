import React from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import defaultimg from "../images/dimage.png";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Home = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  async function maticTweet() {

    if (!tweet) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      contractAddress: "0x7E366b1606863A0f034D3C7c6BD98F5c0C2A74b2",
      functionName: "addTweet",
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "tweetTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tweetImg",
            "type": "string"
          }
        ],
        "name": "addTweet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }],
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(0.01),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveTweet();
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });

  }


  async function saveTweet() {

    if(!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);
    newTweet.set("likeCount", 0);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    await newTweet.save();
    window.location.reload();

  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
        <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="tweetBox">
            <TextArea
              placeholder=" What's on your mind ... ? "
              name="tweetTxtArea"
              type="text"
              onChange={(e) => setTweet(e.target.value)}
              width="95%"
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} className="tweetImg"></img>
            )}
            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
              <input
              accept=".jpeg, .jpg, .png"
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none"}}
                />
                <Icon fill="#1DA1F2" size={20}  svg="image"></Icon>
              </div>
              <div className="tweetOptions">
                <div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}>
                  <Icon fill="#ffffff" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <TweetInFeed profile={false}/>
      </div>
    </>
  );
};

export default Home;
