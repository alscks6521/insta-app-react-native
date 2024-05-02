import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import ProfileInfo from "../../components/ProfileInfo";

const ScrollBox = styled(ScrollView)`
  flex: 1;
`;
const Header = styled(View)`
  height: 300px;
  background-color: skyblue;
`;
const Body = styled(View)`
  height: 500px;
  background-color: brown;
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
