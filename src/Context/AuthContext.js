import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );
    let [user, setUser] = useState(authTokens ? jwt_decode(authTokens.access) : null);
    const history = useHistory();

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(
                "https://leaderboard-ten-delta.vercel.app/api/token/",
                {
                    username: e.target.UserName.value,
                    password: e.target.password.value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            let data = response.data;
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            history.push("/");
        } catch (error) {
            alert("ERROR!!!!");
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history.push("/login");
    };

    let registerUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "https://leaderboard-ten-delta.vercel.app/api/register/",
                {
                    first_name: e.target.first_name.value,
                    email: e.target.email.value,
                    username: e.target.username.value,
                    password: e.target.password.value,
                    last_name: e.target.last_name.value,
                    cc_uname: e.target.cc_uname.value,
                    cf_uname: e.target.cf_uname.value,
                    gh_uname: e.target.gh_uname.value,
                    lt_uname: e.target.lt_uname.value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            let response = await axios.post(
                "https://leaderboard-ten-delta.vercel.app/api/token/",
                {
                    username: e.target.username.value,
                    password: e.target.password.value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            let data = response.data;
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            history.push("/");
        } catch (error) {
            alert("ERROR!!!!");
        }
    };

    let update_addUsernames = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "https://leaderboard-ten-delta.vercel.app/api/insertapi/",
                {
                    cc_uname: e.target.cc_uname.value,
                    cf_uname: e.target.cf_uname.value,
                    gh_uname: e.target.gh_uname.value,
                    lt_uname: e.target.lt_uname.value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("authTokens")).access,
                    },
                }
            );

            history.push("/");
        } catch (error) {
            alert("ERROR!!!!");
        }
    };

    let toLogin = () => {
        history.push("/login");
    };

    let toRegister = () => {
        history.push("/register");
    };

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
        toLogin: toLogin,
        toRegister: toRegister,
        update_addUsernames: update_addUsernames,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
