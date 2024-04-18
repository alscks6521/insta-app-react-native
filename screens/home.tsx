import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { MainStackScreenList } from "../stacks/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// es6버전이 되면서 funtion을 두가지 타입으로 생성 가능해짐
// function name(...)                   -> export default function name(params:type){}
// function : function & arrow func     -> export default() => {} 람다식
export default () => {
  // navigation Hook
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  // expot = 외부에서 접근할 수 있게끔해줌.
  // move to Detail function 만들기       ->      const, let 함수명 = () => { }
  const moveTo = () => {
    console.log("GO Move!");
    navigation.navigate("Detail");
  };

  // design screen
  return (
    <View style={styles.container}>
      <Text>Home Screen.</Text>
      <Button title="Go to Detail" onPress={moveTo} />
    </View>
  );
};

// css style
const styles = StyleSheet.create({
  container: {
    // 왼,오 가운데 정렬
    alignItems: "center",
    // 위,아래 가운데 정렬
    justifyContent: "center",
    // 크기: 화면 전체
    flex: 1,
    backgroundColor: "skyblue",
  },
});
