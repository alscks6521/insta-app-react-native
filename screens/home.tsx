import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import styled from "styled-components";
import { MainStackScreenList } from "../stacks/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SafeContainer = styled(SafeAreaView)``;

//# A구역
const Header = styled(View)`
  background-color: burlywood;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LogoImg = styled(Image)`
  width: 180px;
  height: 30px;
`;
const AddButton = styled(TouchableOpacity)``;

//# B구역
const ScrollContainer = styled(ScrollView)``;
const DummyItem = styled(View)`
  width: 95%;
  height: 250px;
  margin-bottom: 10px;
  background-color: skyblue;
`;

export default () => {
  // navigation Hook
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  // go to create-post-screen
  const goToCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  // design screen
  return (
    <SafeContainer>
      <Header>
        <LogoImg source={require("../assets/instaDaelim_title.png")} />
        <AddButton onPress={goToCreatePost}>
          <Ionicons name="add-circle-outline" size={30} />
        </AddButton>
      </Header>
      <ScrollContainer>
        <DummyItem />
        <DummyItem />
        <DummyItem />
        <DummyItem />
        <DummyItem />
        <DummyItem />
        <DummyItem />
      </ScrollContainer>
    </SafeContainer>
  );
};
