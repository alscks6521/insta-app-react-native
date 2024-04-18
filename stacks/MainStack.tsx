import { createStackNavigator } from "@react-navigation/stack";
import home from "../screens/home";
import detail from "../screens/detail";

// 이동할 스크린 StackNavigator : type 지정
export type MainStackScreenList = {
  Home: undefined;
  Detail: undefined;
};

// StackNavigator 생성
export const Stack = createStackNavigator<MainStackScreenList>();

export default () => {
  // Stack안에 이동할 페이지 만들어 그룹화
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="Detail" component={detail} />
    </Stack.Navigator>
  );
};
