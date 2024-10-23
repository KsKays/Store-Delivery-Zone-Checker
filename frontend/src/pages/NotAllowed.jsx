import notwarning from "../assets/notwarning.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const [counter, setCounter] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      navigate("/");
    }, 10000); // Navigate every 5 seconds

    const countDown = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(countDown);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000); // Update counter every second

    // Cleanup function to clear intervals when component unmounts or dependencies change
    return () => {
      clearInterval(timer);
      clearInterval(countDown);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={notwarning} alt="" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Page Not Allowed!</h2>
          <p>You are not allowed to access this page</p>
          <span className="countdown font-mono text-6xl">
            <span style={{ "--value": counter }}></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;
