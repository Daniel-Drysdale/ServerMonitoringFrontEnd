import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const { user_id } = location.state || {};

  if (!user_id) {
    return <div>Error: No user ID found</div>;
  }

  return (
    <>
      <div className="center-div" style={{ color: "black" }}>
        Home Path, {user_id}
      </div>
    </>
  );
};

export default Home;
