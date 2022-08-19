import 'antd/dist/antd.css'
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Avatar, Badge } from "antd";
import { store } from "../store";
import { useEffect } from "react";
import { addUser, fetchUser } from "../store/features/user";
import { useDispatch, Provider, useSelector } from "react-redux";
import { fetchFilters } from "../store/features/filters";
import commentIcon from "../assets/icons/comment.svg";
import bellIcon from "../assets/icons/bellIcon.svg";
import Image from "next/image";
import ulLogo from "../assets/images/ulLogo.svg";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

const Header = () => {
  // temp Code Starts
  const { user} = useSelector(
    (state: any) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await fetchUser();
    dispatch(addUser(userData));
    dispatch(fetchFilters(userData));
  };
  // temp code ends here
  return (
    <div>
      <div className="header">
        <div className="header_logo">
          <Image src={ulLogo} className="logo_img" />
        </div>
        <Navbar />
        <div className="comment_icon">
          <Image src={commentIcon} />
        </div>
        <div className="bell_icon">
          <Badge  count={1}>
            <Image src={bellIcon} />
          </Badge>
        </div>
        <div className="user_sections">
          <Avatar
            className="avatar"
            src={
              <img
                src={user.avatarLink}
                style={{
                  width: 30,
                }}
              />
            }
            shape="square"
          />
        </div>
        <div className="user_details">
          <div className="">{user.name}</div>
          <div className="">{user.profile}</div>
        </div>
      </div>
    </div>
  );
};

export default MyApp;
