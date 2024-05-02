import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import ProfileInfo from "../../components/ProfileInfo";

const ScrollBox = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;
const Header = styled(View)`
  padding: 0px 30px;
  height: 300px;
  justify-content: flex-end;
  bottom: -20px;
  z-index: 99;
`;
const Body = styled(View)`
  height: 500px;
  background-color: lightgray;
`;

export default () => {
  return (
    <ScrollBox>
      <Header>
        <ProfileInfo />
      </Header>
      <Body></Body>
    </ScrollBox>
  );
};
