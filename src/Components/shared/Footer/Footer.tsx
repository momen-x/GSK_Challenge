const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      style={{ background: "rgba(190, 188, 188, 0.764)", color: "black" }}
    >
      <div
        style={{ width: "100vw", margin: "auto", padding: "0 16px 16px 16px " }}
      >
        <div style={{ textAlign: "center" }}>
          <p>
            &copy; {currentYear} {"   "}
            <span
              style={{ color: "orange", fontSize: "large", fontWeight: "900" }}
            >
              eCom.
            </span>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
