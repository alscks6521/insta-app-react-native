import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";

// `` 백틱, image
const Container = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  background-color: #bb5cff;
  flex: 1;
`;

const LogoImg = styled(Image)`
  width: 100%;
  height: 30%;
`;

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  color: #7b0072;
  margin-bottom: 10px;
`;

const SignBox = styled(View)`
  background-color: white;
  width: 80%;
  height: 60%;
  padding: 20px;
  border-radius: 10px;
`;

const BGImgDir = require("../assets/instaDaelim_background.jpg");
const LogoImgDir = require("../assets/instaDaelim_title.png");

// Text Input (ID / PW)
const InputField = styled(View)`
  padding: 3px;
`;

const UserId = styled(TextInput)`
  background-color: #efeded;
  margin-bottom: 7px;
  font-size: 17px;
  padding: 5px 12px;
`;

const UserPw = styled(UserId)`
  /* 재사용 */
`;

// Footer (Signin Btn, Create Account)
const Footer = styled(View)`
  margin-top: 15px;
`;
const SigninButton = styled(TouchableOpacity)`
  background-color: #4fadff;
  padding: 10px;
  align-items: center;
`;
const SigninTitle = styled(Text)`
  color: white;
  font-size: 15px;
`;

const CreationGuide = styled(Text)`
  color: #acacac;
  text-align: center;
`;

const CreateAccount = styled(Text)`
  color: #4fadff;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 10px;
`;

const ErrorMessage = styled(Text)`
  color: #f02d2d;
  font-size: 15;
`;

export default () => {
  // Email(ID), PW ==> state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // Error Message
  const [error, setError] = useState("");

  // Loaing State...
  const [loading, setLoading] = useState(false);

  // onChange  Text ( 사용자 입력에 따라 변경된 Input Text )
  const onChangeText = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    type: String
  ) => {
    // 1. 'e'의 담겨있는 사용자의 입력 텍스트를 가져온다.
    const value = event.nativeEvent.text;
    console.log(value);

    // 2. 입력 텍스트를 email, password state에 저장한다.
    switch (type) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const onSubmit = async () => {
    try {
      if (email === "" || password === "") {
        setError("please input user info");
        alert(error);
        return;
      }
      setLoading(true);

      // error message reset
      setError("");

      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success Login", "", [
        {
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    } finally {
      setLoading(false);
      return;
    }
  };

  const goToSignUp = () => navigation.navigate("SignUp");

  // Screen Design
  return (
    <Container source={BGImgDir}>
      <SignBox>
        {/* resize = 영역안 크기에 맞게 */}
        <LogoImg source={LogoImgDir} resizeMode="contain" />
        <Title>나의 인스타대림 App!</Title>
        <InputField>
          <UserId
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            value={email}
            onChange={(e) => onChangeText(e, "email")}
          />
          <UserPw
            placeholder="PW"
            secureTextEntry={true}
            keyboardType="visible-password"
            returnKeyType="none"
            value={password}
            onChange={(e) => onChangeText(e, "password")}
          />
        </InputField>
        <Footer>
          <CreationGuide>Already have an account?</CreationGuide>
          <CreateAccount onPress={() => goToSignUp()} disabled={loading}>
            Create Account
          </CreateAccount>
          <SigninButton onPress={() => onSubmit()} disabled={loading}>
            <SigninTitle>{loading ? "loading..." : "Sign in"}</SigninTitle>
          </SigninButton>
          <ErrorMessage>{error}</ErrorMessage>
        </Footer>
      </SignBox>
    </Container>
  );
};
