# 11week

1. 자신의 디바이스 가로,세로 길이 확인법 (create-post-screen)
   1. const { width , height } = Dimensions.get("screen");
   2. 별칭 칭하는 법: { width : WIDTH, height : HEIGHT }
   3. 스크롤등
2. Expo MediaLibrary (https://docs.expo.dev/versions/latest/sdk/media-library/)

   1. npx expo install expo-media-library
   2. 사이트 안:
      [ "expo-media-library",
      {
      "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
      "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
      "isAccessMediaLocationEnabled": true
      } ]를 복사
   3. app.json으로 이동 후 plugins 배열안에 추가

3. .

---

# 10week

1. 9주차에는 권한설정하였고, 이미지 고르기 ImagePicker.launchImageLibraryAsync (profile-container.tsx)

2. **이미지를 BinaryLargeObject로 변환 후 Firebase Storage에 profil폴더에 업로드**

   1. Firebase에 저장할 위치 설정 및 업로드

3. **firebaseConfig.tsx 수정** (Firebase에서 Authentication만 사용하게 해놨었음.)

   1. import { getStorage } from "firebase/storage";
   2. const storage = getStorage(app);

4. auth.currentUser의 사용자 값을 utils 폴더 파일 만듦

   1. assets => Blob 데이터로 변환하고 반환 하는 코드 구현
   2. 프로필 기본 이미지 코드 구현

5. setUser의 타입을 MyUser 타입을 따로 생성

**9주차 ( 5 / 9 )**

AuthStack = signin, signup
MainStack(Tabs) =

1. Main
   1. Timeline
2. Profile

M.V.C
Model -> data
View -> design < Screen >
Controller -> < Container >

< 파이어베이스 서버에서 데이터 불러오기 >

< 이미지 선택하기 >
https://docs.expo.dev/versions/latest/sdk/imagepicker/
Pick -> Local
Update -> Server(Update)

<참고>
app.json파일 :

1. “orientation": "portrait", = 폰 방향(세로)
2. "resizeMode": "cover", = 화면에 알아서 꽉차게 그 반대 (contain)
