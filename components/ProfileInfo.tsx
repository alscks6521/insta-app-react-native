import { Image, Text, View } from "react-native";
import styled from "styled-components";

const Container = styled(View)``;

const Info = styled(View)`
  flex-direction: row;
`;

const Data = styled(View)`
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  background-color: white;
`;

const Name = styled(Text)`
  font-size: 35px;
  font-weight: bold;
`;

const JoinDate = styled(Text)`
  font-size: 20px;
  font-weight: 400;
  color: gray;
`;

const ProfileImg = styled(Image)`
  width: 100px;
  height: 150px;
  background-color: white;
  margin-right: 10px;
  border-radius: 5px;
`;

export default () => {
  return (
    <Container>
      <Info>
        <ProfileImg source={require("../assets/instaDaelim_profile.png")} />
        <Data>
          <Name>MinSung</Name>
          <JoinDate>2024.05.02</JoinDate>
        </Data>
      </Info>
    </Container>
  );
};
