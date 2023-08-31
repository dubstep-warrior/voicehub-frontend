import Connections from "../tabs/main/Connections/Connections";
import Home from "../tabs/main/Home/Home"; 
import Profile from "../tabs/main/Profile/Profile";
import config from "./../../Images.config"
import { Image, ImageSourcePropType } from "react-native";

type TabConfig = {
  name: string,
  component: ({ route, navigation }: any) => JSX.Element,
  image: ImageSourcePropType
  imageSelected: ImageSourcePropType
}

const MainTab: TabConfig[] = [
    {
      name: "Home",
      component: Home,
      image: config['logo-wordless-grey'],
      imageSelected: config['logo-wordless-white'],
    },
    {
      name: "Connections",
      component: Connections,
      image: config['connections-grey'],
      imageSelected: config['connections-white'],
    }, 
    {
      name: "Profile",
      component: Profile,
      image: config['profile-grey'],
      imageSelected: config['profile-white'],
    },
  ];
  export default MainTab;