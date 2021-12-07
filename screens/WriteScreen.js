import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';
import LogContext from '../contexts/LogContext';

function WriteScreen() {
  const log = useRoute().params?.log;
  const navigation = useNavigation();

  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());

  const {onCreate, onModify, onRemove} = useContext(LogContext);

  const onSave = () => {
    if (log !== undefined) {
      onModify({
        ...log,
        title,
        body,
        date: date.toISOString(),
      });
    } else {
      onCreate({
        title,
        body,
        date: date.toISOString(),
      });
    }
    navigation.pop();
  };

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            onRemove(log?.id);
            navigation.pop();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.select({ios: 'padding'})}>
        <WriteHeader
          onSave={onSave}
          onRemove={onAskRemove}
          isEditing={log !== undefined}
          date={date}
          onChangeDate={setDate}
        />
        <WriteEditor
          title={title}
          onChangeTitle={setTitle}
          body={body}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
