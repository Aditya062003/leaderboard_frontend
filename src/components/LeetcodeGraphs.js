import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";

const LeetcodeGraphs = ({ darkmode }) => {
  const { username } = useParams();
  const [rankings, setRankings] = useState([]);
  //   const [chartData, setchartData] = useState({});
  const [options, setoptions] = useState({});
  const [series, setseries] = useState([]);
  const [contestID, setcontestID] = useState([]);

  //   useEffect(() => {
  //     const fetchRankings = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:8000/contest-rankings/"
  //         );
  //         const data = response.data;

  //         const contestRankings = data
  //           .filter((rank) => rank.usernames === username)
  //           .map((rank) => {
  //             const variableNames = Object.keys(rank).filter(
  //               (key) => key !== "usernames"
  //             );
  //             setcontestID(variableNames); // Store all the other fields as contest IDs
  //             return {
  //               username: rank.usernames,
  //               ranking: variableNames.map((key) => rank[key]),
  //             };
  //           });

  //         setRankings(contestRankings);
  //         if (rankings.length > 0) {
  //             const { username, ranking } = rankings[0];
  //             setseries([
  //               {
  //                 name: username,
  //                 data: ranking,
  //               },
  //             ]);
  //             setoptions({
  //               chart: {
  //                 height: 350,
  //                 type: "line",
  //                 zoom: {
  //                   enabled: false,
  //                 },
  //               },
  //               dataLabels: {
  //                 enabled: false,
  //               },
  //               stroke: {
  //                 curve: "straight",
  //               },
  //               title: {
  //                 text: "Product Trends by Month",
  //                 align: "left",
  //               },
  //               grid: {
  //                 row: {
  //                   colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
  //                   opacity: 0.5,
  //                 },
  //               },
  //               xaxis: {
  //                 categories: contestID,
  //               },
  //             });
  //           }
  //         // console.log(rankings); // Verify the updated rankings
  //         // console.log(contestID); // Verify the contest ID values
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     };

  //     fetchRankings();
  //   }, []);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get(
          "https://leaderboard-ten-delta.vercel.app/contest-rankings/"
        );
        const data = response.data;

        const contestRankings = data
          .filter((rank) => rank.usernames === username)
          .map((rank) => {
            const variableNames = Object.keys(rank).filter(
              (key) => key !== "usernames"
            );
            setcontestID(variableNames); // Store all the other fields as contest IDs
            return {
              username: rank.usernames,
              ranking: variableNames.map((key) => rank[key]),
            };
          });

        setRankings(contestRankings);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchRankings();
  }, []);

  useEffect(() => {
    if (rankings.length > 0) {
        const { username, ranking } = rankings[0];
        setseries([
          {
            name: username,
            data: ranking,
          },
        ]);        
      setoptions({
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Leetocde Contest Rankings",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: contestID,
        },
        // yaxis:{
        //     reversed: true,
        // }
      });
    }
  }, [rankings]);


  return (
    <div style={{ marginTop: "100px" }}>
      {username}
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LeetcodeGraphs;
