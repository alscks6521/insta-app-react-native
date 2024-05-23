import { Dimensions, ScrollView, Text, View } from "react-native";
import styled from "styled-components";

// get my Device screen Width/Height
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
// Item Line 0.25 = 4
const itemOfItemPerLine = 0.25;

const Container = styled(View)``;
const Title = styled(Text)``;

const SelectedPhotoScroll = styled(ScrollView)`
  width: ${WIDTH}px;
  height: ${WIDTH}px;
  background-color: brown;
`;
const DummySelected = styled(View)`
  width: 200px;
  height: 200px;
  margin: 5px;
  background-color: red;
`;

const AlbumPhotoScroll = styled(ScrollView)``;
const DummyAlbum = styled(View)`
  width: ${WIDTH * itemOfItemPerLine}px;
  height: ${WIDTH * itemOfItemPerLine}px;
  background-color: yellow;
  border-width: 0.5px;
`;

export default () => {
  return (
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
        <DummySelected />
        <DummySelected />
        <DummySelected />
      </SelectedPhotoScroll>

      <Title>Album Photo</Title>
      <AlbumPhotoScroll
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <DummyAlbum />
        <DummyAlbum />
        for(int i = 0)
      </AlbumPhotoScroll>
    </Container>
  );
};
