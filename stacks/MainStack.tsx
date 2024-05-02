import { createStackNavigator } from "@react-navigation/stack";
import tabs from "../stacks/Tabs";

// 이동할 스크린 StackNavigator : type 지정
export type MainStackScreenList = {
  Tabs: undefined;
};

// StackNavigator 생성
export const Stack = createStackNavigator<MainStackScreenList>();

export default () => {
  // Stack안에 이동할 페이지 만들어 그룹화
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
