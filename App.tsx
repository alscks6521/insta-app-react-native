import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import * as Firebase from "firebase/auth";
import LoadingScreen from "./screens/loading-screen";
import home from "./screens/home";
import detail from "./screens/detail";
import signin from "./screens/signin-screen";
import signup from "./screens/signup-screen";

const Stack = createStackNavigator();

// 8week Firebase에 저장된 데이터를 실제로 가져와 사용하기
export default function App() {
  // User 정보
  // userState 타입 설정.
  const [user, setUser] = useState<Firebase.User | null>();

  // loading state
  const [loading, setLoading] = useState(true);

  // App.tsx가 실행될 때 처음,...등 useEffect 실행됨
  useEffect(() => {
    console.log("1. 로그인이 되었는지 확인 중이에요!");
    // userState 타입 설정.
    // user가 로그인 되었는지 안되었는지, 항시 체크
    auth.onAuthStateChanged((userState: Firebase.User | null) => {
      // 로그인 여부에 따라 그룹으로 각각 보여줌.
      // a. 로그인 되어 있음
      if (userState) {
        console.log("2-a. 로그인이 되었어요!");
        setUser(userState);
      }
      // b. 로그인 안되어있음
      else {
        console.log("2-b. 로그인이 안되어있어요 or 로그아웃!");
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  const LoadingProcess = <LoadingScreen />;
  const AuthProcess = auth.currentUser ? <MainStack /> : <AuthStack />;

  return (
    <NavigationContainer>
      {/* 방법 1 */}
      {/* {loading?LoadingProcess:AuthProcess} */}

      {/* 방법 2 */}
      {loading ? (
        <LoadingScreen />
      ) : auth.currentUser ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

// return (
//   {/* {
//       현재 로그인된 유저가 존재하는 경우
//       ? 메인화면 그룹
//       : 인증화면 그룹
//     }  */}
//   <NavigationContainer>
//     {auth.currentUser ? (
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={home} />
//         <Stack.Screen name="Detail" component={detail} />
//       </Stack.Navigator>
//     ) : (
//       <Stack.Navigator>
//         <Stack.Screen name="SignIn" component={signin} />
//         <Stack.Screen name="SignUp" component={signup} />
//       </Stack.Navigator>
//     )}
//   </NavigationContainer>
// );

// 원조
{
  /* <Stack.Navigator>
  <Stack.Screen name="Home" component={home} />
  <Stack.Screen name="Detail" component={detail} />
  <Stack.Screen name="SignIn" component={signin} />
  <Stack.Screen name="SignUp" component={signup} />
</Stack.Navigator>; */
}
