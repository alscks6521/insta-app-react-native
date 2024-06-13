import { useEffect, useState } from "react";
import {
  Image,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackScreenList } from "../../stacks/MainStack";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { assetToBlob } from "../../utils/utils";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled(View)``;
const Title = styled(Text)``;

const Information = styled(View)`
  background-color: transparent;
  flex-direction: row;
  padding: 15px;
`;
const Photos = styled(Image)`
  width: 120px;
  height: 120px;
  background-color: red;
`;
const CaptionBox = styled(View)`
  margin-left: 15px;
`;
const InputCaption = styled(TextInput)``;

const Btn = styled(TouchableOpacity)``;

type Props = NativeStackScreenProps<MainStackScreenList> & {
  // add my props..
};

export default ({ route: { params } }: Props) => {
  // Text Input userStateHook
  const [caption, setCaption] = useState("");

  // 업로드 Screen
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

  // Change Text Func
  const onChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    // my text
    const text = e.nativeEvent.text;
    // set Caption
    setCaption(text);
  };

  // Upload = Submit 'Post Data'
  const onSubmit = async () => {
    // Check SignIn
    const user = auth.currentUser;
    if (!user) return;
    // send data to server
    // 1. caption
    // 1-1. add document +etc data...
    const doc = await addDoc(collection(db, "posts"), {
      caption: caption,
      createdAt: new Date(),
      userId: user.uid,
      userName: user.displayName,
      likes: [],
      commnets: [],
    });
    // 2. photos
    const photoUrls = [];
    for (const photo of photos) {
      // 2-1. set upload path
      const uploadPath = `posts/${user.uid}/${doc}/${photo.id}`;

      // 2-2. add image to storage
      const location = ref(storage, uploadPath);

      // 2-3. convert image to Blob;
      const blob = await assetToBlob(photo.uri);

      // 2-4. upload
      const uploadResult = await uploadBytesResumable(location, blob);

      // 2-5. download photo url
      const photoUrl = getDownloadURL(uploadResult.ref);

      // [...photoUrls, photoUrl] 같은 것 서로 각 맞는상황이 있음.
      photoUrls.push(photoUrl);
    }

    // 1-2. update photo
    await updateDoc(doc, {
      photoUrls: photoUrls,
    });
  };

  // when page rendered, get params data...
  useEffect(() => {
    setPhotos(params?.photos);
  }, []);

  return (
    <Container>
      <Information>
        <Photos source={{ uri: photos[0]?.uri }} />
        <CaptionBox>
          <Title>Caption</Title>
          <InputCaption
            placeholder="Input Cation..."
            placeholderTextColor={"#b1b1b1"}
            multiline={true}
            onChange={(e) => {
              onChangeText(e);
            }}
            value={caption}
          />
        </CaptionBox>
      </Information>
      <Btn onPress={onSubmit}>
        <Title>Submit</Title>
      </Btn>
    </Container>
  );
};
