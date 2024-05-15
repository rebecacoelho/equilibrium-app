import React from 'react';
import { TouchableOpacity } from 'react-native';
import { HStack, VStack, Heading, Image } from 'native-base';

type Props = {
    name: string;
    image: any;
    onPress: () => void;
};

export function RecipeDetail({ name, image, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <HStack w='full' px={5} py={4} mb={6} bg='gray.600' rounded='md' alignItems='center' justifyContent='space-between'>
                <VStack mr={5} flex={1}>
                    <Heading mb={1} color='white' fontSize='md' fontFamily='heading' numberOfLines={2}>
                        {name}
                    </Heading>
                </VStack>

                <Image size={10} source={image} alt={name} />
            </HStack>
        </TouchableOpacity>
    );
}
