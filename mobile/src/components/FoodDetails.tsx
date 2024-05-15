import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import { HStack, Heading, Text } from 'native-base';
import { FoodCalorie } from './FoodCalorie';
import { Input } from './Input';
import { ScreenHeader } from './ScreenHeader';
import { AppNavigatorRoutesProps } from '@/routes/app.routes';
import { useNavigation } from '@react-navigation/native';

const FoodDeatils = () => {
    const [foodName, setFoodName] = useState('');
    const [foodDetails, setFoodDetails] = useState<any>(null);
    const [consumedFoods, setConsumedFoods] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    useEffect(() => {
        loadConsumedFoods();
    }, []);

    function handleOpenRecipes() {
        navigation.navigate('recipes')
    }

    const translateToEnglish = async (text: string) => {
        const options = {
            method: 'POST',
            url: 'https://rapid-translate.p.rapidapi.com/TranslateText',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': process.env.API_TRANSLATE_KEY,
              'X-RapidAPI-Host': 'rapid-translate.p.rapidapi.com'
            },
            data: {
              from: 'pt-br',
              text,
              to: 'en'
            }
          };
          
        try {
            const response = await axios.request(options);

	        return response.data.result
        } catch (error) {
            console.error(error);
            return text
        }
           
    };

    const translateToPortuguese = async (text: string) => {
        const options = {
            method: 'POST',
            url: 'https://rapid-translate.p.rapidapi.com/TranslateText',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': process.env.API_TRANSLATE_KEY,
              'X-RapidAPI-Host': 'rapid-translate.p.rapidapi.com'
            },
            data: {
              from: 'en',
              text,
              to: 'pt-br'
            }
          };
          
        try {
            const response = await axios.request(options);
	        return response.data.result
        } catch (error) {
            console.error(error);
            return text
        }
           
    };

    const getFoodDetails = async (foodName: string) => {
        try {
            const translatedFoodName = await translateToEnglish(foodName);
            const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${translatedFoodName}`, {
                headers: {
                    'X-Api-Key': process.env.API_CALORIE_KEY
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error fetching food details', error);
            return null;
        }
    };

    const saveConsumedFood = async (food: { name: string; calories: number; date: Date }) => {
        try {
            const translatedFoodName = await translateToPortuguese(food.name);
            const currentDate = new Date();
    
            const consumedFoodList = [...consumedFoods, { ...food, name: translatedFoodName, date: currentDate }];
            await AsyncStorage.setItem('consumedFoods', JSON.stringify(consumedFoodList));
            setConsumedFoods(consumedFoodList);
        } catch (error) {
            console.error('Error saving consumed food', error);
        }
    };

    const loadConsumedFoods = async () => {
        try {
            const savedFoods = await AsyncStorage.getItem('consumedFoods');
            if (savedFoods !== null) {
                setConsumedFoods(JSON.parse(savedFoods));
            }
        } catch (error) {
            console.error('Error loading consumed foods', error);
        }
    };

    const handleSearch = async () => {
        if (foodName.trim() === '') return;

        const foodDetails = await getFoodDetails(foodName);
        if (foodDetails) {
            setFoodDetails(foodDetails);
            {foodDetails.map(async (food: any, index: any) => (
                await saveConsumedFood({ name: food.name, calories: food.calories, date: new Date()})
            ))}
        } else {
            setFoodDetails(null);
        }
        setFoodName('');
    };
    
    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || null;
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const filteredFoods = consumedFoods.filter(food => {
        const foodDate = new Date(food.date);
        return foodDate.toDateString() === (selectedDate && selectedDate.toDateString());
    });

    const totalCalories = filteredFoods.reduce((total, food) => total + food.calories, 0);
    const formattedDate = selectedDate ? format(selectedDate, "dd/MM/yyyy") : "";

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title="Controle de calorias" />
            <Input
                mt={6}
                borderWidth={1}
                borderColor='blue.500'
                onChangeText={setFoodName}
                value={foodName}
                placeholder="Insira o nome da comida consumida"
                mx={6}
            />
            <Button title="Registrar refeição" onPress={handleSearch} />
            <HStack justifyContent='center' alignItems='center'>
                <TouchableOpacity onPress={showDatepicker} style={{ marginVertical: 20, backgroundColor: '#4682B4', padding: 10, paddingHorizontal: 20 ,borderRadius: 8, marginLeft: 5 }}>
                    <Text style={{ color: '#fff' }}>Selecione uma data</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        locale='pt-br'
                        testID="dateTimePicker"
                        value={selectedDate || new Date()}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                        style={{ paddingHorizontal: 22, backgroundColor: '#84b9e4', borderRadius: 15, marginBottom: 10, alignSelf: 'center', marginTop: 10, marginLeft: 15 }}

                    />
                )}
            </HStack>
            <ScrollView style={{ marginVertical: 10, flex: 1, marginHorizontal: 18 }}>
                <Heading fontSize='xl' fontFamily='heading' style={{ marginBottom: 15, color: '#fff' }}>Comidas registradas</Heading>
                {filteredFoods[0] ? filteredFoods.map((food, index) => (
                    <View key={index} style={{ marginBottom: 5 }}>
                        {food && (
                            <FoodCalorie name={food.name} calorie={food.calories} date={food.date}/>
                        )}
                    </View>
                )) :  
                    <Text color='gray.100' textAlign='center' mt={5}>
                        Não há refeições registrados ainda. {'\n'}
                        Registre e veja as calorias consumidas!
                    </Text>
                }
            </ScrollView>
            <HStack alignItems='center' justifyContent='center' style={{ marginVertical: 10 }}>
                <Heading color='gray.100' fontSize='lg' fontFamily='heading'>
                    Total de calorias consumidas:
                </Heading>
                <Text ml={2} mt={0.3} color='blue.400' fontSize='lg'>{totalCalories.toFixed(2)} kcal</Text>
            </HStack>
            <HStack alignItems='center' justifyContent='center' style={{ marginBottom: 10 }}>
                <Heading color='gray.100' fontSize='md' fontFamily='heading'>
                    Data selecionada:
                </Heading>
                <Text ml={2} color='blue.400' fontSize='md'>{formattedDate}</Text>
            </HStack>
            <TouchableOpacity onPress={() => handleOpenRecipes()}>
                <Text fontSize='lg' my={2} color='blue.500' textAlign='center'>Experimente novas receitas clicando aqui!</Text>
            </TouchableOpacity>

        </View>
    );
};

export default FoodDeatils;