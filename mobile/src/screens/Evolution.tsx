import { CalorieChart } from "@/components/CalorieChart";
import { ScreenHeader } from "@/components/ScreenHeader";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { VStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";

export function Evolution() {
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenCalculator() {
        navigation.navigate('calculator')
    }

    return (
        <VStack flex={1} background='gray.400'>
            <ScreenHeader title='Evolução' />

            <TouchableOpacity onPress={() => handleOpenCalculator()}>
                <Text mt={4} color='blue.500' fontWeight='bold' fontSize='lg' textAlign='center'>Utilize a calculadora de calorias!</Text>
            </TouchableOpacity>

            <CalorieChart />
        </VStack>
    )
}