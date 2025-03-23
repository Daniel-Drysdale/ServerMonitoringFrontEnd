import SiteLogo from "../assets/ServerMonitorTransparent..png";

function Logo() {
  return (
    <>
      <img
        src={SiteLogo}
        className=""
        style={{
          minWidth: ".5%",
          maxWidth: "75px",
          position: "absolute",
          marginLeft: "2px",
          top: "5px",
          marginTop: "10px",
        }}
      ></img>
    </>
  );
}

export default Logo;
