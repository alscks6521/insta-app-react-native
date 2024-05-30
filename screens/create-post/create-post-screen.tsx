import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import LoadingScreen from "../loading-screen";
import { Ionicons } from "@expo/vector-icons";

// get my Device screen Width/Height
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
// Item Line 0.25 = 4
const itemOfItemPerLine = 0.25;

// 내가 선택한 이미지의 크기
const mainPhotoSize = WIDTH * 0.75;

const Container = styled(View)``;
const Title = styled(Text)``;

const SelectedPhotoScroll = styled(ScrollView)`
  width: ${WIDTH}px;
  height: ${WIDTH}px;
  background-color: brown;
`;
const PhotoSelected = styled(View)`
  width: ${mainPhotoSize}px;
  height: ${mainPhotoSize}px;
  margin: 5px;
  background-color: red;
`;

const PhotoSelectedImg = styled(Image)`
  width: 100%;
  height: 100%;
`;

const AlbumPhotoScroll = styled(ScrollView)``;

const Media = styled(TouchableOpacity)`
  width: ${WIDTH * itemOfItemPerLine}px;
  height: ${WIDTH * itemOfItemPerLine}px;
  border-width: 0.5px;
`;

const AlbumImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

// 선택되었는지 여부를 나타내는 Circle
const SelectedCircle = styled(View)`
  background-color: #fff;
  border-radius: 30px;
  border: 0.5px #fff;
  position: absolute;
  right: 0;
  margin: 3px;
  align-items: center;
  justify-content: center;
  width: 24%;
  height: 24%;
`;

// 받을 타입
type Props = {
  album: MediaLibrary.Asset[] | undefined;
  mainPhotos: MediaLibrary.Asset[] | undefined;
  loading: boolean;
};

export default ({ album, mainPhotos, loading }: Props) => {
  // 이미지가 선택되었는지?
  const isSelect = (asset: MediaLibrary.Asset) => {
    // (방어코드) 선택 이미지가 존재하지 않은 경우는 실행하지 않고 종료
    if (!mainPhotos) return;

    // 전달 받은 asset이 mainPhotos(선택이미지) 안에 존재한다면
    // mainPhotos 안에 asset이 있는지 확인
    const findIndex = mainPhotos.findIndex((photo) => {
      return photo.id === asset.id;
    });

    if (findIndex > -1) {
      return true;
    } else {
      return false;
    }
    // a. 선택되엇다. true
    // b. 선택안되었다. false
  };
  // 이미지를 선택!
  const selectPhoto = (asset: MediaLibrary.Asset) => {
    // a. 내가 선택하지 않은, 새로운 이미지인 경우
    // mainPhoto 이미지 추가
    // b. 이미 선택한 사진인 경우
    // mainPhoto 이미지 삭제
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <Title>Selected Photo</Title>
      <SelectedPhotoScroll
        horizontal={true}
        // 막대기
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {mainPhotos?.map((item, index) => (
          <PhotoSelected key={index}>
            <PhotoSelectedImg source={{ uri: item.uri }} />
          </PhotoSelected>
        ))}
      </SelectedPhotoScroll>

      <Title>Album Photo</Title>
      <AlbumPhotoScroll
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {album?.map((item, index) => {
          // 선택 되었는지
          const select = isSelect(item);

          return (
            <Media key={index} onPress={() => selectPhoto(item)}>
              <AlbumImage source={{ uri: item.uri }} />
              <SelectedCircle>
                {select && <Ionicons name="checkmark-outline" size={18} />}
              </SelectedCircle>
            </Media>
          );
        })}
      </AlbumPhotoScroll>
    </Container>
  );
};
