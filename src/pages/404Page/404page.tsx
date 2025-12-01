import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          fontWeight: "bold",
          color: "#424242",
          margin: "0 0 10px 0",
          lineHeight: "1",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "28px",
          fontWeight: "600",
          color: "#616161",
          margin: "0 0 16px 0",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          fontSize: "18px",
          color: "#757575",
          maxWidth: "500px",
          margin: "0 0 40px 0",
          lineHeight: "1.5",
        }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            fontSize: "100px",
            color: "#9e9e9e",
          }}
        >
          ⎈
        </div>
      </div>

      <Button
        variant="contained"
        onClick={() => navigate("/home")}
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "12px 32px",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "8px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Go to Home Page
      </Button>

      <p style={{ marginTop: "20px", color: "#757575" }}>
        or{" "}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "#1976d2",
            cursor: "pointer",
            fontSize: "16px",
            textDecoration: "underline",
          }}
        >
          go back
        </button>
      </p>
    </div>
  );
};

export default Page404;
