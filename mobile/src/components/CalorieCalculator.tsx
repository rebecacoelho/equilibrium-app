import React, { useState } from 'react';
import { Button } from 'react-native';
import { Input } from './Input';
import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'native-base';

export const CalorieCalculator = () => {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState<any>();
    const [weight, setWeight] = useState<any>();
    const [height, setHeight] = useState<any>();
    const [activityLevel, setActivityLevel] = useState('1.2'); 
    const [showResult, setShowResult] = useState(false);
  
    const [tmb, setTmb] = useState<any>();
    const [maintenance, setMaintenance] = useState<any>();
    const [loseWeight, setLoseWeight] = useState<any>();
    const [gainWeight, setGainWeight] = useState<any>();

    const handleSubmit = () => {
        const calculatedTmb =
        gender === 'female'
            ? 655 + 9.6 * weight + 1.8 * height - 4.7 * age
            : 66 + 13.7 * weight + 5 * height - 6.8 * age;

        const calculatedMaintenance = Math.round(calculatedTmb * parseFloat(activityLevel));
        const calculatedLoseWeight = calculatedMaintenance - 450;
        const calculatedGainWeight = calculatedMaintenance + 450;

        setTmb(Math.round(calculatedTmb));
        setMaintenance(calculatedMaintenance);
        setLoseWeight(calculatedLoseWeight);
        setGainWeight(calculatedGainWeight);

        setShowResult(true);
    };


    return (
        <View mx={6} flex={1}>
        {showResult ? (
            <View flex={1} justifyContent='space-between'>
            <Text color='white' textAlign='center' mt={8} fontFamily='heading' fontSize='xl' >Aqui está o resultado</Text>
            <View style={{ marginVertical: 10 }}>
                <Text color='white' fontSize='md' mb={4}>
                Seu metabolismo basal é de <Text fontFamily='heading'>{tmb} calorias</Text>.
                </Text>
                <Text color='white' fontSize='md' mb={4}>
                Para manter o seu peso você precisa consumir em média{' '}
                <Text color='white' fontFamily='heading'>{maintenance} calorias</Text>.
                </Text>
                <Text color='white' fontSize='md' mb={4}>
                Para perder peso você precisa consumir em média{' '}
                <Text fontFamily='heading'>{loseWeight} calorias</Text>.
                </Text>
                <Text color='white' fontSize='md' mb={4}>
                Para ganhar peso você precisa consumir em média{' '}
                <Text color='white' fontFamily='heading'>{gainWeight} calorias</Text>.
                </Text>
            </View>

            <Text textAlign='center' fontSize='lg'  color='white' fontFamily='heading' mb={6}>Keep Going!</Text>
            </View>
        ) : (
            <View mt={-8}>
            <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                selectionColor='white'
            >
                <Picker.Item label="Feminino" value="female" color='#fff'/>
                <Picker.Item label="Masculino" value="masc"  color='#fff'/>
                <Picker.Item label="Prefiro não responder" color='#fff'/>
            </Picker>
            <Input
                placeholder="Idade"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                mt={2}
            />
            <Input
                placeholder="Peso"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
            />
            <Input
                placeholder="Altura"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                mb={-24}
            />
            <Picker
                selectedValue={activityLevel}
                onValueChange={(itemValue) => setActivityLevel(itemValue)}
                selectionColor='#fff'
            >
                <Picker.Item label="Sedentário" value="1.2" color='#fff'/>
                <Picker.Item label="Pouca atividade" value="1.375"  color='#fff'/>
                <Picker.Item label="Atividade moderada" value="1.55"  color='#fff'/>
                <Picker.Item label="Atividade intensa" value="1.725"  color='#fff'/>
                <Picker.Item label="Atividade muito intensa" value="1.9"  color='#fff'/>
            </Picker>
            <Button title="Calcular" onPress={handleSubmit} />
            </View>
        )}
        </View>
    );
    };
