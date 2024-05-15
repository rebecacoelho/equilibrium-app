import { HistoryCard } from "@/components/HistoryCard";
import { Loading } from "@/components/Loading";
import { ScreenHeader } from "@/components/ScreenHeader";
import { HistoryDayByGroupDTO } from "@/dtos/HistoryDayByGroupDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

export function History() {
    const [isLoading, setIsLoading] = useState(true)

    const toast = useToast()
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const [exercises, setExercises] = useState<HistoryDayByGroupDTO[]>([])

    function handleOpenEvolution() {
        navigation.navigate('evolution')
    }

    function handleOpenProgress() {
        navigation.navigate('progress')
    }

    async function fetchHistory() {
        try {
            setIsLoading(true)
            const response = await api.get('/history')
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError

            const title = isAppError ? error.message : 'Não foi possível carregar o histórico.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchHistory()
        },[])
    )

    return (
        <VStack flex={1}>
            <ScreenHeader title='Histórico de Exercícios' />

            <TouchableOpacity onPress={() => handleOpenEvolution()}>
                <Text mt={4} color='blue.500' fontWeight='bold' fontSize='lg' textAlign='center'>Veja sua evolução!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOpenProgress()}>
                <Text mt={4} color='blue.500' fontWeight='bold' fontSize='lg' textAlign='center'>Registre seu progresso!</Text>
            </TouchableOpacity>

           { 
                isLoading ? <Loading /> :
                <SectionList
                    sections={exercises}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => ( <HistoryCard data={item}/> )}
                    renderSectionHeader={({ section }) => (
                        <Heading color='gray.200' fontSize='md' fontFamily='heading' mt={8} mb={3}>
                            {section.title}
                        </Heading>
                    )}
                    px={8}
                    contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' } }
                    ListEmptyComponent={() => (
                        <>
                        <Text color='gray.100' textAlign='center'>
                            Não há exercícios registrados ainda. {'\n'}
                            Vamos fazer exercícios hoje?
                        </Text>
                        </>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            }
        </VStack>
    )
}