import React, { useState, useEffect } from 'react';
import { Image, Platform, TouchableOpacity, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text, TextArea, View } from 'native-base';
import { Post } from './Post';

export default function Posts() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<any>();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos das permissões da galeria para fazer isso funcionar!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!text || !image) {
      Alert.alert('Por favor, insira texto e selecione uma imagem antes de enviar o post.');
      return;
    }

    const newPost = { text, image };
    setPosts([...posts, newPost]);

    try {
      await AsyncStorage.setItem('posts', JSON.stringify([...posts, newPost]));
      Alert.alert('Post salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o post:', error);
    }

    setText('');
    setImage(null);
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem('posts');
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        }
      } catch (error) {
        console.error('Erro ao carregar os posts:', error);
      }
    };

    loadPosts();
  }, []);

  return (
    <View>
        <TextArea
            autoCompleteType='on'
            placeholder="Comente sobre o seu post"
            value={text}
            placeholderTextColor='white'
            fontSize='sm'
            color='white'
            onChangeText={setText}
            m={6}
            minH={100}
            maxLength={256}
            style={{ flex: 1, borderWidth: 1, borderColor: '#7C7C8A', borderRadius: 4 }}
            _focus={{ bg: 'gray.600', borderWidth: 1 }}
        />
        <View mt={2}>
            <TouchableOpacity onPress={pickImage}>
                <Text textAlign='center' fontSize='lg' fontFamily='heading' color='white'>Selecionar uma imagem</Text>
            </TouchableOpacity>   
        
            {image && 
            <View margin={10}>
                <Image source={{ uri: image }} style={{ width: '100%', aspectRatio: 1 }}  />
            </View>}
            <Button title="Enviar" onPress={handlePost} />
        </View>

       <View mx={5}>
        <FlatList
                mt={3}
                data={posts}
                renderItem={({ item }) => ( <Post name={item.text} image={{ uri: item.image}} /> )}
                showsVerticalScrollIndicator={true}
                _contentContainerStyle={{ paddingBottom: 20 }}
                ListFooterComponent={<View style={{height: 800}} />}
            />
       </View>
    </View>
  );
}
