import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

const LoadingSpinner = () => {
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
          background: `radial-gradient(circle at ${50 + shadowOffset}% ${
            50 - shadowOffset
          }%, #ffffff, #e0e0e0)`,
          boxShadow: `${shadowOffset}px ${shadowOffset}px 20px #bebebe, 
                      ${-shadowOffset}px ${-shadowOffset}px 20px #ffffff`,
          animation: `pulse-animation 2s infinite alternate`,
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
            background: `linear-gradient(135deg, #ffffff, #c0c0c0)`,
            boxShadow: `inset ${shadowOffset}px ${shadowOffset}px 10px #bebebe, 
                        inset ${-shadowOffset}px ${-shadowOffset}px 10px #ffffff`,
            animation: loadingTime > 15 ? "spin-animation 1s linear infinite" : "none",
          }}
        />
      </Box>

      <style>
        {`
          @keyframes pulse-animation {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
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
