import React from 'react'
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
const Footer = () => {
    function Copyright(props) {
        return (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            style={{color:"white"}}
            {...props}
          >
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/OpenLake/Leaderboard-Pro/">
              LeaderBoard-Pro
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        );
      }
  return (
    <div style={{
        textAlign:"center",
        bottom:0,
    }}>
       <Copyright sx={{ mt: 5 }} />
    </div>
  )
}

export default Footer
