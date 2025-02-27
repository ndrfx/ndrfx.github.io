import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

const LoadingSpinner = ({ theme = "tealAqua" }) => {
  const [loadingTime, setLoadingTime] = useState(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTime((prev) => prev + 1);
      setAngle((prev) => (prev + 5) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const size = 80;
  const shadowOffset = Math.sin((angle * Math.PI) / 180) * 10;

  const themes = {
    cyanBlue: {
      background: `radial-gradient(circle at 50% 50%, #00FFFF, #007BFF)`,
      inner: `linear-gradient(135deg, #00E5FF, #0096FF)`,
      shadow: `rgba(0, 122, 255, 0.5)`,
    },
    tealAqua: {
      background: `radial-gradient(circle at 50% 50%, #008080, #00E5FF)`,
      inner: `linear-gradient(135deg, #A7FFEB, #4DB6AC)`,
      shadow: `rgba(0, 230, 255, 0.5)`,
    },
    magentaPurple: {
      background: `radial-gradient(circle at 50% 50%, #FF00FF, #6A0DAD)`,
      inner: `linear-gradient(135deg, #E040FB, #AB47BC)`,
      shadow: `rgba(160, 32, 240, 0.5)`,
    },
    sunsetGlow: {
      background: `radial-gradient(circle at 50% 50%, #FF4500, #FFC107)`,
      inner: `linear-gradient(135deg, #FF6D00, #FFD600)`,
      shadow: `rgba(255, 140, 0, 0.5)`,
    },
  };

  const themeColors = themes[theme] || themes.cyanBlue;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#e0e0e0",
        transition: "background 1s ease-in-out",
      }}
    >
      <Box
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          position: "relative",
          background: themeColors.background,
          boxShadow: `${shadowOffset}px ${shadowOffset}px 20px ${themeColors.shadow}, 
                      ${-shadowOffset}px ${-shadowOffset}px 20px #ffffff`,
          animation: `pulse-animation 2s infinite alternate ease-in-out`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: `${size / 2}px`,
            height: `${size / 2}px`,
            borderRadius: "50%",
            background: themeColors.inner,
            boxShadow: `inset ${shadowOffset}px ${shadowOffset}px 10px ${themeColors.shadow}, 
                        inset ${-shadowOffset}px ${-shadowOffset}px 10px #ffffff`,
            animation: loadingTime > 15 ? "spin-animation 1.5s linear infinite" : "none",
          }}
        />
      </Box>

      <style>
        {`
          @keyframes pulse-animation {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.1); opacity: 1; }
          }

          @keyframes spin-animation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingSpinner;
