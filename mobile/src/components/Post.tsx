import React from 'react';
import { HStack, VStack, Heading, Image, Text } from 'native-base';

type Props = {
    name: string;
    image: any;
};

export function Post({ name, image }: Props) {
    return (
        <VStack w='full' px={5} pb={4} mb={6} bg='gray.600' rounded='md' alignItems='center' justifyContent='space-between'>
            <Image 
                rounded='md'
                source={image} 
                alt={name}             
                style={{ width: '100%', aspectRatio: 1 }} 
                resizeMode="contain" 
            />

            <Text mt={3} mb={1}  color='white' fontSize='md'>
                {name}
            </Text>
        </VStack>
    );
}