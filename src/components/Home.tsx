import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const { user_id } = location.state || {}; // Get user_id passed from the login page

  if (!user_id) {
    // Handle the case where the user_id is missing
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
