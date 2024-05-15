import { CalorieCalculator } from "@/components/CalorieCalculator";
import { ScreenHeader } from "@/components/ScreenHeader";
import { VStack } from "native-base";

export function Calculator() {
    return (
        <VStack flex={1} background='gray.400'>
            <ScreenHeader title='Calculadora de Calorias' />

            <CalorieCalculator />
        </VStack>
    )
}