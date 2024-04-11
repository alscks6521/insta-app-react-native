import home from "./screens/home";
import detail from "./screens/detail";
import signin from "./screens/signin-screen";
import signup from "./screens/signup-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  // User 정보
  const [user, setUser] = useState();

  // App.tsx가 실행될 때 with useEffect Hook 사용
  useEffect(() => {
    // user가 로그인 되었는지 안되었는지, 항시 체크
    auth.onAuthStateChanged((userState) => {
      // 로그인 여부에 따라 그룹으로 각각 보여줌.
      // a. 로그인 되어 있음
      if (userState) {
        setUser(userState);
      }
      // b. 로그인 안되어있음
      else {
        setUser(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {auth.currentUser ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={home} />
          <Stack.Screen name="Detail" component={detail} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={signin} />
          <Stack.Screen name="SignUp" component={signup} />
        </Stack.Navigator>
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
