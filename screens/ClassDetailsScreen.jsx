import { Box, Button, ButtonText, Center, HStack, ScrollView, Text } from "@gluestack-ui/themed";
import { useState } from "react";
export default function ClassDetails() {
    const clase = {
        id: 1,
        trainer: "Alanna Spinka",
        clase: "Yoga",
        description: "Clase de yoga para principiantes",
    }
    const [showInscriptionModal, setShowInscriptionModal] = useState(false);

    return (
        <>
            <ScrollView p={16} minHeight={"$full"}>
                <Center width="$full" bgColor="white" rounded={8} gap={12}>
                    <Text fontSize={24} fontWeight="$medium" mt={40} mb={12} color="#5d596c">Detalles de la clase</Text>

                    <Box p={24} pt={0} w={"$full"}>
                        <Box borderColor="#5d596c" borderWidth={1} rounded={8} key={clase.id} w={"$full"} my={24} p={16}>
                            <Text fontSize={20} fontWeight="$medium" alignSelf="center" color="#5d596c" mt={12} mb={8}>{clase.trainer}</Text>
                            <Text fontSize={28} fontWeight="medium" alignSelf="center" color="#5d596c" mt={12} mb={16}>{clase.clase}</Text>
                            <Text color="#5d596c">{clase.description}</Text>
                            <HStack w={"$full"} justifyContent="space-around" mt={16} >
                                <Button
                                    w={"auto"}
                                    action="positive"
                                    onPress={() => setShowInscriptionModal(true)}>
                                    <ButtonText>
                                        Ver Detalles
                                    </ButtonText>
                                </Button>
                                <Button
                                    w={"auto"}
                                    onPress={() => setShowInscriptionModal(true)}>
                                    <ButtonText>
                                        Inscribirse
                                    </ButtonText>
                                </Button>
                            </HStack>
                        </Box>
                    </Box>

                </Center>
            </ScrollView>

        </>
    );
}