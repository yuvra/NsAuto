import React from "react";
import { Card } from "antd";

const SvgBackgroundPattern = () => (
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
  >
    <pattern
      id="dot-pattern"
      width="40"
      height="40"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="2" cy="2" r="1" fill="#E0E5EB" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
  </svg>
);

const App = () => {
  const handleCustomerSearch = () => {
    window.location.href = "/Customer";
  };

  const handleCreateBill = () => {
    window.location.href = "/GenerateBill";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "98vh",
        width: "98vw",
        overflow: "hidden",
        backgroundColor: "#F7F9FC",
        position: "relative",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <SvgBackgroundPattern />

      <Card
        style={{
          padding: "60px 80px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "90%",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            marginBottom: "50px",
            color: "#333333",
            fontSize: "2.8em",
            fontWeight: "700",
          }}
        >
          Welcome to Our Service
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              backgroundColor: "#A0D9FF",
              minWidth: "250px",
              padding: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: "15px",
              transition:
                "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 8px 20px rgba(160, 217, 255, 0.4)",
              flex: 1,
            }}
            hoverable
            onClick={handleCustomerSearch}
          >
            <span
              style={{
                color: "#333333",
                fontSize: "1.4em",
                fontWeight: "600",
              }}
            >
              Search Customer
            </span>
          </Card>

          <Card
            style={{
              backgroundColor: "#BCE88E",
              minWidth: "250px",
              padding: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: "15px",
              transition:
                "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 8px 20px rgba(188, 232, 142, 0.4)",
              flex: 1,
            }}
            hoverable
            onClick={handleCreateBill}
          >
            <span
              style={{
                color: "#333333",
                fontSize: "1.4em",
                fontWeight: "600",
              }}
            >
              Create Bill
            </span>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default App;
