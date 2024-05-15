import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { Input } from './Input';
import { HStack, Heading, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons'
import EmojiBoard from 'react-native-emoji-board'
import { ScreenHeader } from './ScreenHeader';

type Emotion = {
  id: string;
  feeling: string;
  date: string;
  selectedEmoji: string | undefined;
};

const EmotionTracker: React.FC = () => {
  const [inputEmotion, setInputEmotion] = useState('');
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [show, setShow] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  useEffect(() => {
    getEmotions();
  }, []);

  const getEmotions = async () => {
    try {
      const emotionsFromStorage = await AsyncStorage.getItem('@emotions');
      if (emotionsFromStorage !== null) {
        setEmotions(JSON.parse(emotionsFromStorage));
      }
    } catch (error) {
      console.error('Error fetching emotions', error);
    }
  };

  const saveEmotion = async () => {
    try {
      const newEmotion: Emotion = {
        id: String(Date.now()),
        feeling: inputEmotion,
        date: dayjs().format('YYYY-MM-DD'),
        selectedEmoji,
      };

      const updatedEmotions = [...emotions, newEmotion];
      setEmotions(updatedEmotions);
      await AsyncStorage.setItem('@emotions', JSON.stringify(updatedEmotions));
      setInputEmotion('');
      setSelectedEmoji('');
    } catch (error) {
      console.error('Error saving emotion', error);
    }
  };

  const renderEmotion = ({ item }: { item: Emotion }) => (
    <View style={styles.emotionItem}>
      <Text style={styles.emotionText}>{item.selectedEmoji} {' '} {item.feeling}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Heading fontFamily='heading'fontSize='xl' color='white'>{title}</Heading>
    </View>
  );

  const emotionsGroupedByDate = emotions.reduce((acc: { [key: string]: Emotion[] }, emotion) => {
    if (!acc[emotion.date]) {
      acc[emotion.date] = [];
    }
    acc[emotion.date].push(emotion);
    return acc;
  }, {});

  const insertEmoji = (emoji: any) => {
    setSelectedEmoji(emoji.code);
    setShow(false)
  }

  const sections = Object.keys(emotionsGroupedByDate)
  .map(date => ({
    title: dayjs(date).format('DD-MM-YYYY'),
    data: emotionsGroupedByDate[date],
  }))
  .sort((a, b) => dayjs(b.title, 'DD-MM-YYYY').unix() - dayjs(a.title, 'DD-MM-YYYY').unix());
  
  return (
    <View style={styles.container}>
      <ScreenHeader title="Controle de emoções" />

      <Heading mx={14} my={6} marginBottom={3} textAlign='center' color='gray.100' fontSize='lg' fontFamily='heading'>
        Como você está se sentindo hoje?  (pode abrir o coração)
      </Heading>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setShow(!show)}>
          {selectedEmoji ? (
            <Text style={{ fontSize: 24 }}>{selectedEmoji}</Text>
          ) : (
            <FontAwesome
              name="smile-o"
              size={24}
              color="#4682B4"
            />
          )}
        </TouchableOpacity>
        <Input
          placeholder="Digite sua emoção"
          value={inputEmotion}
          onChangeText={setInputEmotion}
          style={{ flex: 1, marginTop: 15 }}
          _focus={{ bg: 'gray.700', borderWidth: 0 }}
        />
      </View>

      <EmojiBoard showBoard={show} onClick={insertEmoji} />

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={saveEmotion} style={{ backgroundColor: '#4682B4', borderRadius: 8 }}>
          <Text style={{ color: '#fff', padding: 10, paddingHorizontal: 20 }}>Salvar sentimento</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        renderItem={renderEmotion}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => item.id + index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emotionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4682B4',
    marginHorizontal: 20
  },
  sectionHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4682B4',
    marginTop: 10,
    marginHorizontal: 20
  },
  emotionText: {
    color: '#fff', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4682B4',
    borderRadius: 8,
    paddingHorizontal: 30,
    marginBottom: 20,
    marginHorizontal: 20
  },
});

export default EmotionTracker;
