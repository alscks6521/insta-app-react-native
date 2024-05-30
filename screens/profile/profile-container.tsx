import { useEffect, useState } from "react";
import ProfileScreen from "./profile-screen";
import { auth, storage } from "../../firebaseConfig";
import { User, signOut, updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { assetToBlob } from "../../utils/utils";

export type MyUser = {
  name: string | null;
  email: string | null;
  creationTime: string | undefined;
  photoURL: string | null;
};

export default () => {
  // 1. 데이터를 불러오고, 가공하고, 수정한다
  const [user, setUser] = useState<MyUser>();
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
      setUser({
        name: user.displayName,
        email: user.email,
        creationTime: user.metadata.creationTime,
        photoURL: user.photoURL,
      });
    }
  };

  // 프로필 이미지 변경 함수
  const onEditImage = async () => {
    // 0. img 앨범 접근 권한
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // 0-1. 권환 허락 or 거절(...다시 한 번 권한 설정 유도) -> img 고르기
    if (permission.status === ImagePicker.PermissionStatus.DENIED) {
      // 0-1 거절한 경우, 다시 한 번 권한 허가 알림창 열기
      return Alert.alert("알림", "사진에 접근하려면 권한을 설정해주세요.", [
        {
          text: "확인",
          style: "default",
          onPress: () => Linking.openSettings(),
        },
      ]);
      // 0-2 만약, 설정을 미처 못해서 결정을 못한 경우
    } else if (
      permission.status === ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      // 권한설정 시도
      return await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    // 1. img 고르기
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    // 2. img 고른 후, 서버(Firebase)에 Update

    // 2-1. 이미지가 정상적으로 선택된 경우와 유저 로그인 된 상태에만.
    if (!result.canceled && auth.currentUser) {
      // ㄴ 1. 유저 아이디
      const userId = auth.currentUser?.uid;

      // < Firebase에 저장할 위치 설정 및 업로드 >
      // ㄴ 2. 저장 경로
      const path = `profiles/${userId}`;
      const firebasePath = ref(storage, path);

      // 선택한 img의 uri 가져오기
      const locationURi = result.assets[0].uri;

      // ㄴ 1. 내 Img를 blob(Binary Large Object 변환)
      const blob = await assetToBlob(locationURi);
      // ㄴ 2. 변환된 데이터를 Firebase에 업로드
      const uploadTask = await uploadBytes(firebasePath, blob);
      // ㄴ 3. firebase에 업로된 img의 uri 가져오기
      const photoURL = await getDownloadURL(firebasePath);

      // < 스크린에서 나의 프로필 변경된 이미지로 새로고침 >
      // ㄴ 1. 서버에서의 나의 프로필 이미지 업데이트
      await updateProfile(auth.currentUser, { photoURL });
      // ㄴ 2. 로컬(App)화면에서 나의 프러필 이미지 갱신
      setUser({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        creationTime: auth.currentUser.metadata.creationTime,
        photoURL: photoURL,
      });
    }
    // 2-2. 이미지가 선택되지 않은 경우
    else {
    }
  };

  // 3. 가공한 데이터를 Presenter에 넘겨준다.
  return (
    <ProfileScreen
      user={user}
      onSignout={onSignout}
      onEditImage={onEditImage}
    />
  );
};
