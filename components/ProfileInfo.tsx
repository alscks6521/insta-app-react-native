import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

const Container = styled(View)``;

const Info = styled(View)`
  flex-direction: row;
`;

const Data = styled(View)`
  flex-direction: column;
  justify-content: center;
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

const CustomButton = styled(TouchableOpacity)``;

export default () => {
  return (
    <Container>
      <Info>
        <CustomButton>
          <ProfileImg source={require("../assets/splash.png")} />
        </CustomButton>
        <Data>
          <Name>MinSung</Name>
          <JoinDate>2024.05.02</JoinDate>
        </Data>
      </Info>
    </Container>
  );
};
