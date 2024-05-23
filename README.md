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
