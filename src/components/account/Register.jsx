import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAccount } from "../../store/account/accountActions";
import { clearStatusState } from "../../store/account/accountSlice";
import LoadingIndicator from "../../pages/sabina/LoadingIndicator";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const areFieldsEmpty = () => {
    return !user.username.trim() || !user.email.trim() || !user.password.trim();
  };
  const handleRegister = () => {
    if (areFieldsEmpty()) {
      alert("Please fill all fields");
    } else {
      dispatch(registerAccount({ user, navigate }));
    }
  };

  const { loading, status } = useSelector((state) => state.account);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStatusState());
  }, []);

  return (
    <div
      className="flex-1 flex justify-center items-center bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "url(https://png.pngtree.com/background/20230607/original/pngtree-hd-wallpaper-forest-scenery-mountains-mountain-wallpaper-picture-image_2903512.jpg)",
      }}
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {status ? (
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-2xl text-white font-light uppercase">
                Error!
              </h3>
              <button
                onClick={() => dispatch(clearStatusState())}
                className="w-80 text-center py-3 px-4 bg-blue-900 text-white font-light uppercase hover:bg-blue-950 my-5"
              >
                Try again!
              </button>
            </div>
          ) : (
            <div className="flex flex-col px-2 max-h-80 w-8/12 align-center justify-center ">
              <div className="flex w-full h-screen">
                <div
                  className="flex-1 flex justify-center items-center bg-cover bg-center shadow-xl"
                  style={{
                    backgroundImage:
                      "url(https://i.pinimg.com/564x/c3/a3/58/c3a358966200d9b2240607a4f5e5aaa5.jpg)",
                  }}
                />
                <div className="flex flex-1 flex-col justify-center items-center bg-transparent p-8 px-6 py-14 shadow-xl text-black font-light text-xs">
                  <button
                    onClick={() => navigate("/login")}
                    className="hover:underline text-white text-xs font-light"
                  >
                    Already have an account? Login!
                  </button>
                  <h3 className="mb-8 text-4xl font-light text-center uppercase text-white ">
                    Create Account
                  </h3>
                  <input
                    type="text"
                    className="border border-slate-300 w-full p-3 rounded mb-4 uppercase text-center "
                    placeholder="name"
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    className="border border-slate-300 w-full p-3 rounded mb-4 uppercase text-center"
                    placeholder="email adress"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />

                  <input
                    type="password"
                    className="border border-slate-300 w-full p-3 rounded mb-4 uppercase text-center"
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <div className="flex">
                    <input type="checkbox" />
                    <p className=" text-white">
                      I have read and agree with the site policy
                    </p>
                  </div>

                  <button
                    className="w-full text-center py-3 bg-blue-900 text-white font-light uppercase hover:bg-blue-950 my-5"
                    onClick={() => dispatch(handleRegister)}
                  >
                    Create account
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Register;
