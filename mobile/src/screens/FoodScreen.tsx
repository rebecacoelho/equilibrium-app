import FoodDeatils from "@/components/FoodDetails";
import { VStack } from "native-base";

export function FoodScreen() {

    return (
        <VStack flex={1}>
            <FoodDeatils />
        </VStack>
    )
}