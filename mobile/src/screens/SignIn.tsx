import { useState } from "react";

import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";

import LogoSvg from '@/assets/logo.svg'
import BackgroundImg from '@/assets/background2.png';
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { useAuth } from "@/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { AppError } from "@/utils/AppError";

type FormData = {
    email: string
    password: string
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)

    const { signIn } = useAuth()
    const navigation = useNavigation<AuthNavigatorRoutesProps>()
    const toast = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

    function handleNewAccount() {
        navigation.navigate('signUp')
    }

    function handleSignIn({ email, password }: FormData) {
        try {
            setIsLoading(true)
            signIn(email, password)
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
            setIsLoading(false)

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
            <Image 
              source={BackgroundImg}
              defaultSource={BackgroundImg}
              alt="Pessoas treinando"
              resizeMode="contain"
              position="absolute"
            />
            <Center my={24}>
              <Text color="gray.100" fontSize="xl">
                  EQUILIBRIUM
              </Text>
            </Center>
            <Center>
              <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                Acesse a conta
              </Heading>
              <Controller 
                control={control}
                name="email"
                rules={{ required: 'Informe o e-mail' }}
                render={({ field: { onChange } }) => (
                  <Input 
                    placeholder="E-mail" 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              
              <Controller 
                control={control}
                name="password"
                rules={{ required: 'Informe a senha' }}
                render={({ field: { onChange } }) => (
                  <Input 
                    placeholder="Senha" 
                    secureTextEntry
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
            </Center>
            <Center mt={24}>
              <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                Ainda não tem acesso?
              </Text>
              <Button 
                title="Criar Conta" 
                variant="outline"
                onPress={handleNewAccount}
              />
            </Center>
          </VStack>
        </ScrollView>
      );
}