import React, { useState } from 'react';
import { ScreenHeader } from '@/components/ScreenHeader';
import { RecipeDetail } from '@/components/RecipeDetail';
import Salad from '@/assets/salad.png';
import Smoothie from '@/assets/smoothie.png';
import Chicken from '@/assets/chicken.png';
import { Heading, Image, ScrollView, Text, View } from 'native-base';
import { Modal, TouchableOpacity } from 'react-native';

type Recipe = {
    name: string;
    image: any;
    ingredients: string[];
    prepare: string[];
};

const Recipes = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();

    const openModal = (recipe: any) => {
        setSelectedRecipe(recipe);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderIngredients = (ingredients: string[]) => {
        return ingredients.map((ingredient, index) => (
            <Text color='white' key={index}>- {ingredient}</Text>
        ));
    };

    const renderPreparationSteps = (prepare: string[]) => {
        return prepare.map((step, index) => (
            <Text color='white' key={index}>{`${index + 1}. ${step}`}</Text>
        ));
    };

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title="Receitas" />

            <ScrollView mx={18} flex={1} my={10}>
                <RecipeDetail
                    name='Salada de quinoa com vegetais assados'
                    image={Salad}
                    onPress={() => openModal({ name: 'Salada de quinoa com vegetais assados', image: Salad, ingredients: ["Quinoa", "Abobrinha", "Pimentão vermelho", "Cebola roxa", "Tomate cereja", "Espinafre", "Azeite de oliva", "Sal", "Pimenta"], prepare: [
                        "Cozinhe a quinoa de acordo com as instruções da embalagem e reserve.",
                        "Corte os vegetais em pedaços pequenos e tempere com sal, pimenta e azeite de oliva.",
                        "Asse os vegetais em uma assadeira a 200°C por cerca de 20-25 minutos ou até que estejam macios e levemente dourados.",
                        "Em uma tigela grande, misture a quinoa cozida com os vegetais assados.",
                        "Adicione o espinafre fresco e misture bem.",
                        "Sirva a salada em temperatura ambiente ou fria."
                    ] })}
                />
                <RecipeDetail
                    name='Frango grelhado com legumes no vapor'
                    image={Chicken}
                    onPress={() => openModal({ name: 'Frango grelhado com legumes no vapor', image: Chicken, ingredients: ["Peito de frango", "Brócolis", "Cenoura", "Couve-flor", "Azeite de oliva", "Temperos a gosto (alho, cebola em pó, pimenta, etc.)"], prepare: [
                        "Tempere o peito de frango com sal, pimenta e outros temperos de sua preferência.",
                        "Grelhe o frango em uma grelha ou frigideira antiaderente até que esteja cozido por completo.",
                        "Enquanto o frango está grelhando, prepare os legumes no vapor. Coloque os brócolis, cenoura e couve-flor em uma panela própria para vapor e cozinhe até que fiquem macios, porém ainda crocantes.",
                        "Retire os legumes do vapor e tempere com um fio de azeite de oliva e temperos adicionais, se desejar.",
                        "Sirva o frango grelhado acompanhado dos legumes no vapor."
                    ] })}
                />
                <RecipeDetail
                    name='Smoothie de frutas e espinafre'
                    image={Smoothie}
                    onPress={() => openModal({ name: 'Smoothie de frutas e espinafre', image: Smoothie, ingredients: ["Espinafre fresco", "Banana", "Morangos", "Leite de amêndoas (ou outro leite vegetal)", "Sementes de chia (opcional)"], prepare: [
                        "Em um liquidificador, adicione o espinafre fresco lavado, a banana cortada em rodelas, os morangos lavados e sem folhas, o leite de amêndoas e as sementes de chia, se estiver usando.",
                        "Bata todos os ingredientes até obter uma mistura homogênea e cremosa.",
                        "Se necessário, adicione um pouco mais de leite de amêndoas para atingir a consistência desejada.",
                        "Sirva o smoothie imediatamente em um copo alto."
                    ] })}
                />
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View background='gray.500' style={{ padding: 20, borderRadius: 10 }}>
                        <Heading color='white' fontFamily='heading' fontSize='xl' textAlign='center' mb={4}>{selectedRecipe?.name}</Heading>
                        <Image h={48} source={selectedRecipe?.image} alt={selectedRecipe?.name} />

                        <Heading color='white' fontFamily='heading' fontSize='xl' mt={4} mb={2}>Ingredientes:</Heading>
                        <ScrollView style={{ maxHeight: 100, marginTop: 5 }}>
                            {selectedRecipe && renderIngredients(selectedRecipe.ingredients)}
                        </ScrollView>

                        <Heading color='white' fontFamily='heading' fontSize='xl' mt={4} mb={2}>Modo de Preparo:</Heading>
                        <ScrollView style={{ maxHeight: 150, marginTop: 5 }}>
                            {selectedRecipe && renderPreparationSteps(selectedRecipe.prepare)}
                        </ScrollView>

                        <TouchableOpacity onPress={closeModal} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
                            <Text color='white'>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Recipes;