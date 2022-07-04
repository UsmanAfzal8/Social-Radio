import React from "react";
import './Rightbar.css';
import cars from "../images/sportscar.jpg";
import cricket from "../images/cricket.jpg";
import coding from "../images/coding.jpg";
import { Input } from "web3uikit";


const Rightbar = () => {
  const trends = [
   
    
    {
      img: cars,
      text: "Top 50 Best Sports Cars of All Time...",
      link: "https://blog.dupontregistry.com/news/top-50-best-sports-cars-of-all-time/",
    },
    {
      img: cricket,
      text: "Live cricket score and update...",
      link: "https://www.espncricinfo.com/live-cricket-score",
    },
    {
      img: coding,
      text: "Best youtube channel to learn coding...",
      link: "https://www.youtube.com/channel/UCMzrh4tBgGjXdC9Et4ML0Hw",
    },
  ];

  return (
    <>
    <div className="rightbarContent">
      

    <div className="trends">
      News For You
      {trends.map((e) => {
          return(
            <>
            <div className="trend" onClick={() => window.open(e.link)}>
              <img src={e.img} className="trendImg"></img>
              <div className="trendText">{e.text}</div>
            </div>
            </>
          )
      })}
    </div>

    </div>
    </>
  );
};

export default Rightbar;

