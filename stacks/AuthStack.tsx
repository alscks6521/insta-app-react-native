import { createStackNavigator } from "@react-navigation/stack";
import signin from "../screens/signin-screen";
import signup from "../screens/signup-screen";

// 이동할 스크린 StackNavigator : type 지정
export type AuthStackScreenList = {
  SignIn: undefined;
  SignUp: undefined;
};

// StackNavigator 생성
const Stack = createStackNavigator<AuthStackScreenList>();

export default () => {
  // Stack안에 이동할 페이지 만들어 그룹화
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={signin} />
      <Stack.Screen name="SignUp" component={signup} />
    </Stack.Navigator>
  );
};
