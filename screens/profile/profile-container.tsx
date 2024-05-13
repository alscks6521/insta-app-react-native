import { useEffect, useState } from "react";
import ProfileScreen from "./profile-screen";
import { auth } from "../../firebaseConfig";
import { User, signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export default () => {
  // 1. 데이터를 불러오고, 가공하고, 수정한다
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState(null);

  // profile 페이지가 실행될 때, 딱 1번 실행되는 함수
  useEffect(() => {
    getUserData();
  }, []);

  // 로그아웃 기능 함수
  const onSignout = () => {
    signOut(auth);
  };

  // firebase(server) 에서 User의 정보를 불러오는 함수.
  const getUserData = () => {
    // 1. firebase의 유저 정보 가져온다.
    const user = auth.currentUser;

    // 2. User 정보가 있는지 setUser를 호출.
    if (user) {
      // User의 정보를 저장
      setUser(user);
    }
  };

  // 프로필 이미지 변경 함수
  const onEditImage = async () => {
    // 0. img 앨범 접근 권한
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // 1. 권환 허락 or 거절(...다시 한 번 권한 설정 유도) -> img 고르기
    // UNDEFINED = 여러이유로 권한화면에서 못한경우 / DEFINED = 권한 거절 / GRANTED = 권한 허가
    if (permission.status === ImagePicker.PermissionStatus.DENIED) {
      // 다시 한 번 권한 허가 알림창 열기
      return Alert.alert("알림", "사진에 접근하려면 권한을 설정해주세요.", [
        {
          text: "확인",
          style: "default",
          onPress: () => Linking.openSettings(),
        },
      ]);
    } else if (
      permission.status === ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      return await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    // 2. img 고른 후, 서버(firebase)에 Update
  };

  // 2. 가공한 데이터를 Presenter에 넘겨준다.
  return (
    <ProfileScreen
      user={user}
      onSignout={onSignout}
      onEditImage={onEditImage}
    />
  );
};
