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
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackScreenList } from "../../stacks/MainStack";

// get my Device screen Width/Height
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
// Item Line 0.25 = 4
const itemOfItemPerLine = 0.25;

// 내가 선택한 이미지의 크기
const mainPhotoSize = WIDTH * 0.75;

const Container = styled(View)`
  background-color: white;
`;
const Title = styled(Text)``;

const SelectedPhotoScroll = styled(ScrollView)`
  width: ${WIDTH}px;
  height: ${WIDTH}px;
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
const SelectedCircle2 = styled(SelectedCircle)`
  position: relative;
  width: 40%;
  height: 40%;
`;

// -----Header Style Component -----
const CustomHeader = styled(TouchableOpacity)`
  margin-right: 15px;
`;
const HeaderTitle = styled(Text)`
  color: #1e88e5;
  font-size: 18px;
  font-weight: 500;
`;

// 받을 타입
type Props = {
  album: MediaLibrary.Asset[];
  mainPhotos: MediaLibrary.Asset[];
  loading: boolean;
  updateMainPhotos: (photos: MediaLibrary.Asset[]) => void;
};

export default ({ album, mainPhotos, loading, updateMainPhotos }: Props) => {
  // navtigation Hook
  const nav = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();
  // move to create-post-detail-screen
  const goToDetail = () => {
    // Params : mainStack
    nav.navigate("CreatePostDetail", {
      photos: mainPhotos,
    });
  };

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
    // 선택한 이미지가, 이미 내가 선택한 이미지인지 아닌지
    // - mainPhotos: 내가 선택한 이미지 리스트
    // - asset: 내가 선택한 이미지

    const foundIndex = mainPhotos.findIndex((photo) => {
      return photo.id === asset.id;
    });

    // b. 이미 선택한 사진인 경우(foundIndex가 존재하고, -1보다 큰 경우)
    if (foundIndex > -1) {
      // mainPhoto 이미지 삭제
      // -> 내가 찾은 foundIndex에 존재하는 이미지를 삭제한 후,
      mainPhotos.splice(foundIndex, 1);
      // -> 삭제 된 배열을 mainPhotos 새롭게 갱신하여 반영
      // const newList = mainPhotos.concat(); 방법1
      updateMainPhotos([...mainPhotos]);

      // a. 내가 선택하지 않은, 새로운 이미지인 경우
    } else {
      // mainPhoto 이미지 추가
      // -> 기존 선택 이미지 리스트에 새로운 이미지를 (맨 마지막에)

      updateMainPhotos([...mainPhotos, asset]);
    }
  };

  // Header 커스텀 CSS
  useLayoutEffect(() => {
    // ! Header를 변경할 수 있는 option을 설정
    nav.setOptions({
      headerRight: () => {
        return (
          <CustomHeader onPress={goToDetail}>
            <HeaderTitle>Next</HeaderTitle>
          </CustomHeader>
        );
      },
    });
    // 오른쪽 Navigaion Header를 변경
  }, [[mainPhotos]]);

  // Header를 제외한 영역 CSS
  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
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
      <Title>Recent ▼</Title>
      <AlbumPhotoScroll
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {album?.map((asset, index) => {
          // 선택 되었는지
          const select = isSelect(asset);

          return (
            <Media key={index} onPress={() => selectPhoto(asset)}>
              <AlbumImage source={{ uri: asset.uri }} />
              <SelectedCircle
                style={
                  select && {
                    backgroundColor: "#1e88e5",
                  }
                }
              >
                {/* {select && <Ionicons name="checkmark-outline" size={18} />} */}
                {select && <SelectedCircle2 />}
              </SelectedCircle>
            </Media>
          );
        })}
      </AlbumPhotoScroll>
    </Container>
  );
};
