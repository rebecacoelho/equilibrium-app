import { format } from "date-fns";
import { Text, HStack, VStack, Heading } from "native-base";

type Props = {
    name: string
    calorie: number
    date: string
}

export function FoodCalorie({ name, calorie, date }: Props) {
    return (
        <HStack w='full' px={5} py={4} mb={3} bg='gray.600' rounded='md' alignItems='center' justifyContent='space-between'>
            <VStack mr={5} flex={1}>
                <Heading mb={1} color='white' fontSize='md' textTransform='capitalize' fontFamily='heading' numberOfLines={1}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </Heading>

                <Text color='gray.100' fontSize='lg' numberOfLines={1}>
                    {calorie} kcal
                </Text>
            </VStack>

            <Text color='gray.300' fontSize='md'>
                {format(new Date(date), "HH:mm")}
            </Text>
        </HStack>
    )
}