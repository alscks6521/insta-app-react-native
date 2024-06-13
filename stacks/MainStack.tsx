import { createStackNavigator } from "@react-navigation/stack";
import tabs from "../stacks/Tabs";
import CreatePost from "../screens/create-post";
import createPostDetail from "../screens/create-post-detail";
import * as MediaLibrary from "expo-media-library";

// 이동할 스크린 StackNavigator : type 지정
export type MainStackScreenList = {
  Tabs: undefined;
  CreatePost: undefined; // 이동 가능한 페이지
  CreatePostDetail: {
    photos: MediaLibrary.Asset[];
  };
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
      <Stack.Screen name={"CreatePost"} component={CreatePost}></Stack.Screen>
      <Stack.Screen
        name={"CreatePostDetail"}
        component={createPostDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
