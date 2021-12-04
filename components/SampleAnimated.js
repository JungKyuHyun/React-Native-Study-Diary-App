import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Easing, StyleSheet, View} from 'react-native';

/**
 * 초기에 설정한 값(new Animated.Value(...)을 변경할때는 Animated.timeing() 함수를 이용한다.
 *
 * example)
 * const animation = useRef(new Animated.Value(1)).current;
 * Animated.timeing(animation, {
 *
 * }).start(optionalFunc)
 *
 * optionalFunc => 애니메이션 처리 완료 후 실행할 작업
 */
export function SampleAnimated() {
  // Value 생성자 함수 인자에는 초깃값을 넣는다.
  const animation = useRef(new Animated.Value(1)).current;
  Animated.timing(animation, {
    useNativeDriver: true, // 필수값 (네이티브 드라이버 사용 여부)
    toValue: 0, // 필수값 (변경할 값)
    // option
    duration: 1000, // 기본값 500, 애니메이션에 걸리는 시간
    delay: 0, // 기본값 0, 딜레이 이후 애니메이션 시작
    isInteraction: true, // 기본값 true, 사용자 인터랙션에 의해 시작한 애니메이션인지 지정
    easing: Easing.inOut(Easing.ease), // 기본값: Easing.inOut(Easing.ease), 애니메이션 속도 변경 함수
  }).start();
  return <Animated.View style={{opacity: animation}} />;
}

export function SlideLeftAndRight() {
  const animation = useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = useState(false);
  console.log({enabled});
  useEffect(() => {
    Animated.timing(animation, {
      toValue: enabled ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [enabled, animation]);

  return (
    <View>
      <Animated.View
        style={[
          styles.rectangle,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
      <Button title="Toggle" onPress={() => setEnabled(v => !v)} />
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'cyan',
  },
});
