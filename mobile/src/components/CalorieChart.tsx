import React, { useState, useEffect } from 'react';
import { Heading, Text, View } from 'native-base';
import { format, subDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-gifted-charts';

export const CalorieChart = () => {
    const [weeklyCalories, setWeeklyCalories] = useState<any[]>([]);

    useEffect(() => {
        fetchWeeklyCalories();
    }, []);

    const fetchWeeklyCalories = async () => {
        try {
            const consumedFoodsString = await AsyncStorage.getItem('consumedFoods');
            if (consumedFoodsString !== null) {
                const consumedFoods = JSON.parse(consumedFoodsString);
                const currentDate = new Date();
                const daysAgo = Array.from({ length: 7 }, (_, index) => index);
                const weeklyCaloriesData = daysAgo.map(day => {
                    const date = subDays(currentDate, day);
                    const totalCaloriesOfDay = consumedFoods
                        .filter((food: any) => new Date(food.date).toDateString() === date.toDateString())
                        .reduce((total: any, food: any) => total + food.calories, 0);
                    return { value: totalCaloriesOfDay }; // Formatação dos dados no formato { value: totalCalories }
                });
                setWeeklyCalories(weeklyCaloriesData);
            }
        } catch (error) {
            console.error('Error fetching weekly calories', error);
        }
    };

    const renderWeeklyCaloriesChart = () => {
        if (weeklyCalories.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Não há dados disponíveis para os últimos 7 dias.</Text>
                </View>
            );
        }

        const dates = Array.from({ length: 7 }, (_, index) => {
            const date = subDays(new Date(), index);
            return format(date, 'dd/MM');
        });

        const data = weeklyCalories.reverse()

        return (
            <View flex={1}>
                <LineChart
                    data={data}
                    width={295}
                    backgroundColor='#fff'
                    color='#177AD5'
                    thickness={4}
                    dataPointsColor={'red'}
                    height={200}
                    spacing={43}
                    xAxisLabelTexts={dates}
                    isAnimated
                />
            </View>
        );
    };

    return (
        <View height={310} background='white' margin={4}>
            <Heading fontFamily='heading' textAlign='center' mb={7} mt={2} fontSize='md' px={3} fontWeight='bold'>Calorias consumidas nos últimos 7 dias</Heading>
            <View pl={2}>
                {renderWeeklyCaloriesChart()}
            </View>
        </View>
    );
};