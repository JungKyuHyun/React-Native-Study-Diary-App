# Diary

앞에서 배운 내용을 토대로 다이어리 앱을 만든다. 배운 내용에 대한 것들은 많이 생략한다.

- [설치 및 할일 만들기](https://ajdkfl6445.gitbook.io/study/mobile/react-native/install)
- [내비게이션, Hooks](https://ajdkfl6445.gitbook.io/study/mobile/react-native/hooks)

## 참고

> npx pod-install

기존에는 ios 폴더로 이동하여 `pod install`을 해주었다. 위 명령어는 동일한 기능이자만, 루트 폴더에서도 `pod`를 설치할 수 있게 해주는 명령어다.

## 설치

```bash
$ yarn add @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-vector-icons
```

`info.plist` 파일 업데이트(아이콘 관련)
`build.gradle` 파일 업데이트(아이콘 관련)

## FloatButton 만들기

앞에서 배운 `Touchable*` 컴포넌트 대신 리액트 네이티브 v0.63에서 새로 도입된 `Pressable` 컴포넌트를 사용했다.

```javascript
import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function FloatingWriteButton() {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({pressed}) => [
          styles.button,
          Platform.select({ios: {opacity: pressed ? 0.6 : 1}}),
        ]}
        android_ripple={{color: 'white'}}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,

    // IOS 전용 그림자 설정
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // 안드로이드 전용 그림자 설정
    elevation: 5,
    // 안드로이드에서 물결 효과가 영역 밖으로 나가지 않도록 설정
    // ios에서는 overflow가 hidden이 경우 그림자가 보여지지 않음
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default FloatingWriteButton;
```

`Pressable` 컴포넌트는 `TouchableWithoutFeedback`과 성격이 비슷하지만 기능이 더 많다. `android_ripple`을 설정하여 안드로이드에서 물결 효과를 줄 수 있으며, 스타일을 설정할 때 `pressed` 값을 인식하여 컴포넌트가 눌리면 동적인 스타일을 적용할 수도 있다.

```javascript
<Pressable
  style={({pressed}) => [
    styles.button,
    Platform.select({ios: {opacity: pressed ? 0.6 : 1}}),
  ]}
  android_ripple={{color: 'white'}}>
// ...
```

다만 이 컴포넌트의 경우 `position: 'absolute'`로 설정했기 때문에 사용시에 부모 엘리먼트(여기선 `View`)의 영역을 확보해 줘야한다. 영역을 확보하지 않으면 `View`가 비어있을때 높이가 0으로 간주되어 버튼이 보이지 않게 된다.

![image](https://user-images.githubusercontent.com/42884032/144601455-6b259b1c-c38c-4e97-ba7d-1bb4b572f860.png)

## Enter를 눌렀을때 다른 컴포넌트로 포커스 옮기기

함수 컴포넌트에서 컴포넌트의 레퍼런스를 선택할 때 사용하는 `useRef()` 훅을 이용하여, 이 기능을 구현할 수 있다.

- `.focus()`: TextInput에 포커스를 잡아준다.
- `.blur()`: TextInput에 포커스를 해제한다.
- `.clear()`: TextInput에 내용을 모두 비운다.

```javascript
// components/WriteEditor.js
function WriteEditor({title, body, onChangeTitle, onChangeBody}) {
  const bodyRef = useRef(); // <- here!
  return (
    <View style={styles.block}>
      <TextInput
        value={title}
        onChangeText={onChangeTitle}
        placeholder="제목을 입력하세요."
        style={styles.titleInput}
        returnKeyType="next"
        onSubmitEditing={() => {
          bodyRef.current.focus(); // <- here!
        }}
      />
      <TextInput
        multiline
        value={body}
        onChangeText={onChangeBody}
        placeholder="당신의 오늘을 기록해보세요."
        style={styles.bodyInput}
        textAlignVertical="top"
        ref={bodyRef} // <- here!
      />
    </View>
  );
}
```

![2021-12-03_22-17-33 (1)](https://user-images.githubusercontent.com/42884032/144608992-df3f3c75-21c0-4ff3-bf03-f2702c454f93.gif)

## ios에서 키보드가 올라와 있을 경우, 본문의 스크롤이 제대로 안되는 현상 (KeyboardAvoidingView)

사실 이건 처음에 다뤘던 내용이긴하지만, 잘 까먹을 수 있는 내용이라 한번 더 넣는다.

### 문제 상황

보다시피, 안드로이드는 괜찮지만 `ios`에서는 기본으로 보여줄 수 있는 거 이상의 데이터가 화면에 있고, 키보드가 올라왔을때 스크롤이 제대로 안되는걸 볼 수 있다.

![2021-12-03_22-23-51 (1)](https://user-images.githubusercontent.com/42884032/144609757-7a33f315-7536-4092-a2c5-d66d8d03a017.gif)

### 문제 해결

`KeyboardAvoidingView`로 감싸 해당 문제를 해결할 수 있다.

```javascript
// screens/WriteScreen.js
function WriteScreen() {
  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.select({ios: 'padding'})}>
        <WriteHeader />
        <WriteEditor />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
```

![2021-12-03_22-27-11 (1)](https://user-images.githubusercontent.com/42884032/144610132-a7718498-e8db-434e-80e2-de56fe3cff5d.gif)

## 추가 설치

고유한 값을 만들기 위해 범용 고유 식별자(`Universally Uniqute IDentifier`, `UUID`)를 사용할 예정이다. 일반적으로 랜덤한 고유한 식별자를 생성할 때 사용하는 `v4`를 많이 사용한다.

```bash
$ yarn add uuid
# 이 라이브러리의 경우 Node.js의 cryto 기능을 사용하는데, RN에는 기본 내장이 안되어 있기 때문에
# 아래 라이브러리를 추가 설치 해준다.
$ yarn add react-native-get-random-values
$ npx pod-install
```

그리고 프로젝트 최상위 디렉터리에 있는 `index.js` 파일을 열어서 아래 코드를 추가한다.

```javascript
// index.js
import 'react-native-get-random-values';
```

## 애니메이션

`RN`에서 애니메이션을 구현할 때는 `Animated`이라는 객체를 사용한다. [[공식문서](https://reactnative.dev/docs/animated)]

```javascript
import React, {useRef} from 'react';
import {Animated, Easing} from 'react-native';

/**
 * 초기에 설정한 값(new Animated.Value(...)을 변경할때는 Animated.timeing() 함수를 이용한다.
 *
 * example)
 * const animation = useRef(new Animated.Value(1)).current;
 * Animated.timeing(animation, {
   useNativeDriver: true, // 필수값 (네이티브 드라이버 사용 여부)
    toValue: 0, // 필수값 (변경할 값)
    // option
    duration: 1000, // 기본값 500, 애니메이션에 걸리는 시간
    delay: 0, // 기본값 0, 딜레이 이후 애니메이션 시작
    isInteraction: true, // 기본값 true, 사용자 인터랙션에 의해 시작한 애니메이션인지 지정
    easing: Easing.inOut(Easing.ease), // 기본값: Easing.inOut(Easing.ease), 애니메이션 속도 변경 함수
 * }).start(optionalFunc)
 *
 * optionalFunc => 애니메이션 처리 완료 후 실행할 작업
 */
function SampleAnimated() {
  // Value 생성자 함수 인자에는 초깃값을 넣는다.
  const animation = useRef(new Animated.Value(1)).current;

  return <Animated.View style={{opacity: animation}} />;
}
```

- `useNativeDriver`: 애니메이션 작업을 자바스크립트 엔진이 아닌 네이티브 레벨에서 진행하는 옵션으로 `transform`, `opacity`처럼 레이아웃과 관련 없는 스타일에만 적용할 수 있다. 예를들어 `left`, `width`, `paddingLeft`, `marginLeft`와 같은 스타일에는 꼭 `useNativeDriver: false`로 지정해 줘야 한다.
- 만약 어떤 상태값에 따라 애니메이션이 변하게 하고 싶다면 `useState`, `useEffect`를 이용하자.
- `components/SampleAnimated.js`의 `SlideLeftAndRight` 컴포넌트 예제

![2021-12-04_14-43-50 (1)](https://user-images.githubusercontent.com/42884032/144698952-f03f6dc9-ac63-48b2-9af4-19f8229d7f26.gif)

## FlatList에서 스크롤을 내렸을때 바닥에 가까워져 있는지 감지하는 방법

`onEndReachedThreshold`에 넣은 값만큼 스크롤이 진행되었을때 `onEndReached` 함수가 호출된다.

```javascript
<FlatList
  // ...
  onEndReached={distanceFormEnd => {
    console.log({distanceFormEnd});
  }}
  onEndReachedThreshold={0.85}
/>
```

- 이 방식은 무한 스크롤을 구현할 때 유용하다.
- 다만 이 방식은 멀어졌을 때를 구분하지 못하기 때문에 이것의 구분도 필요하다면, `onScroll` 이벤트를 사용하자. `onScroll` 이벤트의 경우 콘텐츠의 전체 크기와 스크롤의 위치까지 알 수 있다.

```javascript
function FeedList({logs}) {
  const onScroll = e => {
    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
  };

  return (
    <FlatList
      // ...
      onScroll={onScroll}
    />
  );
}
```

![image](https://user-images.githubusercontent.com/42884032/144699488-35d3da99-a274-4805-b532-15cc5dcde719.png)

- `contentSize`: `FlatList`내부의 전체 크기
- `layoutMeasurement`: 실제 화면에 나타난 `FlatList`의 크기
- `contentOffset`: `contentOffset.y`는 스크롤할 때마다 늘어나는 값이다. 스크롤이 맨 위에 있을 때는 0이고, 스크롤이 맨 아래에 있을 때는 `contentSize.height - layoutMeasurement.height`를 계산한 값이다.

`contentSize.height - layoutMeasurement.height - contentOffset.y`를 계산한 값이 0에 가까워진다면 `FlatList`의 스크롤이 바닥에 가까워진 것이다.

### FloatingWriteButton에 애니메이션 적용

```javascript
function FloatingWriteButton({hidden}) {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      useNativeDriver: true,
      toValue: hidden ? 1 : 0,
    }).start();
  }, [hidden, animation]);

  const onPress = () => {
    navigation.navigate('Write');
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 88],
              }),
            },
          ],
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}>
      <Pressable
        style={({pressed}) => [
          styles.button,
          Platform.select({ios: {opacity: pressed ? 0.6 : 1}}),
        ]}
        android_ripple={{color: 'white'}}
        onPress={onPress}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
}
```

![2021-12-04_15-31-28 (1)](https://user-images.githubusercontent.com/42884032/144700250-305700ba-50d4-4ee0-a9cb-72f79f158fa2.gif)

### Spring 애니메이션 적용하기

기존 `timing` 함수의 경우 `toValue`에 지정한 값으로 서서히 변하게된다. 반명 `spring`함수의 경우 스프링이 눌렸다가 다시 펴지는 것처럼 값이 목표값 근처에서 값이 왔다갔다(`oscillate`)하게 된다.

![2021-12-04_15-37-41 (1)](https://user-images.githubusercontent.com/42884032/144700372-5e6fc0bd-88a2-4ff8-aee9-5af28c32f2f8.gif)

다만 여러 옵션이 있으나, 정해진 묶음 내에서 사용해야 한다. [[공식 문서](https://reactnative.dev/docs/animated#spring)]를 참고하자.

> Note that you can only define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one:

## 화면 크기를 dp로 가져오는법

1. `Dimensions.get('window' | 'screen')` 사용
2. `useWindowDimensions` hook 사용

### Dimensions.get()

ios에서는 현재 앱에서 사용할 수 있는 영역의 크기를 가져오기 때문에 `'window' | 'screen'` 둘다 동일하다.

다만 안드로이드에서는 `'window'`로 조회했을 때 상단의 상태 바와 하단의 소프트 메뉴바 영역을 제외한 크기를 반환한다.

다만 `Dimensions.get()`으로 화면 크기를 구할때의 단점은 화면의 방향을 바꾸거나, 폴더블 디바이스를 사용하면 이 크기가 변할 수 있기 때문에 여기에 대응해 줘야 한다. 최신 버전을 사용중이라면 `case1`번처럼, 아니라면 `case2`번처럼 구현하면 된다.

```javascript
// case 1
function SearchHeader() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const eventListener = ({window, screen}) => {
      setDimensions(window);
    };
    const subscription = Dimensions.addEventListener('change', eventListener);
    return () => {
      subscription.remove();
    };
  }, []);

  return <View ... />;
}
```

```javascript
// case 2 - 이 방법은 최신 버전에서는 deprecated 되었다.
function SearchHeader() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const eventListener = ({window, screen}) => {
      setDimensions(window);
    };

    Dimensions.addEventListener('change', eventListener);
    return () => {
      Dimensions.removeEventListener('change', eventListener)
    };
  }, []);

  return <View ... />;
}
```

### useWindowDimensions hook 사용

`useWindowDimensions` 훅을 사용할 경우 `Dimensions.get`과 달리 화면 크기가 바뀌는 상황에 자동으로 반영되기 때문에 우리가 직접 대응할 필요가 없다.

다만 전체 화면 크기를 가져오는 기능이 없어, 전체 화면 크기를 구해야 한다면, `Dimensions.get('screen')`으로 구해야 한다.

```javascript
function SearchHeader() {
  const {width, height} = useWindowDimensions();

  return ...;
}
```

<hr />

## 달력 기능 구현하기

## 추가 설치

https://github.com/wix/react-native-calendars#readme

```bash
$ yarn add react-native-calendars
```

## 기본 사용법

대부분은 문서 보면 된다.

```javascript
function CalendarView() {
  const markedDates = {
    '2021-12-06': {
      selected: true,
    },
    // 07 한 자리더라도 0을 꼭 붙여줘야한다. 7로 표현하면 마커가 제대로 안찍히는 현상이 있다.
    // yyyy-MM-dd
    '2021-12-07': {
      marked: true,
    },
    '2021-12-25': {
      marked: true,
    },
  };
  return <Calendar style={styles.calendar} markedDates={markedDates} />;
}
```

색상 변경 등의 반영은 앱을 리로드하여야 반영된다. (아래는 ios앱만 리로드 했을 때의 모습)

![image](https://user-images.githubusercontent.com/42884032/144840498-67c692ff-0764-4319-9371-f25e33e2a306.png)

## FlatList의 ListHeaderComponent

`FlatList` 컴포넌트 `Props` 중에 있는 `ListHeaderComponent`를 사용하면, `FlatList`의 내용 상단부에 특정 컴포넌트를 보여줄 수 있다.

<hr />

## 날짜 및 시간 수정 기능 구현하기

## 추가 설치

https://github.com/react-native-datetimepicker/datetimepicker

```bash
$ yarn add react-native-modal-datetime-picker @react-native-community/datetimepicker
```

<hr />

## 데이터 유지

앞써 배운 `AsyncStorage`를 사용한다.

## 설치

```bash
$ yarn add @react-native-community/async-storage
```

<hr />

## 끝

- Floating 버튼 구현 및 애니메이션 구현
- 일정 등록, 삭제, 수정 보기 기능
- 캘린더 라이브러리 사용법
- 캘린더에서 날짜별로 등록된 일정 확인 기능
- 일정 검색 기능
- 날짜 수정 기능
- context api, react hooks
- ios / android 둘다 개발

### ios

![2021-12-07_17-22-53 (1)](https://user-images.githubusercontent.com/42884032/144993050-bcf2327a-fc1f-45fe-9d5a-672c9564ce31.gif)

### android

![2021-12-07_17-34-31 (1)](https://user-images.githubusercontent.com/42884032/144994719-32723f56-1670-4501-beab-88cbc296dfc9.gif)
