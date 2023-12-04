import { Box, Button, ButtonText, Center, HStack, ScrollView, Text, set } from "@gluestack-ui/themed";
import { useState } from "react";
import ConfirmInscription from "../components/clases/ConfirmInscriptionModal";
export default function Clases({ navigation }) {
    const clases = [
        {
            id: 1,
            trainer: "Alanna Spinka",
            clase: "Yoga",
            description: "Haz que cada movimiento cuente, entrena para la vida diaria\n\n" +
                "Capacidad: 40 personas\n\n" +
                "Reservado: 30 personas\n\n" +
                "Disponible: 10 personas\n",
        },
        {
            id: 2,
            trainer: "Albert Cook",
            clase: "Pesas",
            description: "Clase de pesas para principiantes",
        },
        {
            id: 3,
            trainer: "John Doe",
            clase: "Crossfit",
            description: "Clase de crossfit para principiantes",
        },
    ];
    const [showInscriptionModal, setShowInscriptionModal] = useState(false);
    const [classId, setClassId] = useState(0);

    return (
        <>
            <ScrollView p={16} minHeight={"$full"}>
                <Center width="$full" bgColor="white" rounded={8} gap={24} p={24}>
                    <Text fontSize={24} fontWeight="$medium" my={12} color="#5d596c">Clases disponibles</Text>

                    {clases.map((clase) => (
                        <Center borderColor="#dbdade" borderWidth={1} rounded={8} key={clase.id} w={"$full"} p={16} gap={8}>
                            <Text fontSize={28} fontWeight="$medium" color="#6f6b7d" >{clase.clase}</Text>
                            <Text fontSize={16} fontWeight="medium" color="#6f6b7d" >{clase.trainer}</Text>
                            <Text color="#6f6b7d" fontWeight="$normal" textAlign="center" my={12}>{clase.description}</Text>
                            <HStack w={"$full"} justifyContent="space-around" >
                                <Button
                                    w={"auto"}
                                    action="positive"
                                    onPress={
                                        () => {
                                            navigation.navigate("Detalles de la clase", { id: clase.id })
                                        }
                                    }>
                                    <ButtonText>
                                        Ver Detalles
                                    </ButtonText>
                                </Button>
                                <Button
                                    w={"auto"}
                                    onPress={() => {
                                        setClassId(clase.id)
                                        setShowInscriptionModal(true)
                                    }}>
                                    <ButtonText>
                                        Inscribirse
                                    </ButtonText>
                                </Button>
                            </HStack>
                        </Center>
                    ))}
                </Center>
                <ConfirmInscription
                    showInscriptionModal={showInscriptionModal}
                    setShowInscriptionModal={setShowInscriptionModal}
                    classId={classId}
                />
            </ScrollView>

        </>
    );
}