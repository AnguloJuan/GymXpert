import { Button, ButtonText, Center, Image, ScrollView, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import ConfirmInscription from "../components/sessions/ConfirmInscriptionModal";
export default function ClassDetails({ route }) {
    const { id } = route.params;
    const session = {
        trainer: {
            name: "Albert Cook",
            email: "albert@gmail.com",
            phone: "1234567890",
        },
        session: "Yoga",
        description: "Clase de yoga para principiantes",
        assistants: 10,
        maxAssistants: 20,
    }
    const [showInscriptionModal, setShowInscriptionModal] = useState(false);

    return (
        <>
            <ScrollView p={16} minHeight={"$full"}>
                <Center width="$full" bgColor="white" rounded={8} gap={12} p={24}>
                    <Text fontSize={24} fontWeight="$medium" mt={40} mb={12} color="#5d596c">Detalles de la clase #{id}</Text>

                    <Center borderColor="#dbdade" borderWidth={1} rounded={8} key={session.id} w={"$full"} p={16} gap={8}>
                        <Text fontSize={24} fontWeight="medium" color="#6f6b7d" >Entrenador</Text>
                        <Image source={require("../assets/avatars/5.png")} alt="Entrenador" borderRadius={8} />
                        <Text fontSize={20} fontWeight="$medium" color="#6f6b7d" >{session.trainer.name}</Text>
                        <Text color="#6f6b7d" fontWeight="$normal" textAlign="center">Correo: {session.trainer.email}</Text>
                        <Text color="#6f6b7d" fontWeight="$normal" textAlign="center">Teléfono: {session.trainer.phone}</Text>
                    </Center>
                    <Center borderColor="#dbdade" borderWidth={1} rounded={8} key={session.id} w={"$full"} p={16} gap={8}>
                        <Text fontSize={20} fontWeight="$medium" color="#6f6b7d" >Descripción</Text>
                        <Text color="#6f6b7d" fontWeight="$normal" textAlign="center">{session.description}</Text>
                    </Center>
                    <Center borderColor="#dbdade" borderWidth={1} rounded={8} key={session.id} w={"$full"} p={16}>
                        <Text fontSize={20} fontWeight="$medium" color="#6f6b7d" >Asistentes</Text>
                        <Text fontSize={20} fontWeight="$medium" color="#6f6b7d" >{session.assistants} / {session.maxAssistants}</Text>
                    </Center>
                    <Button
                        w={"$full"}
                        onPress={() => setShowInscriptionModal(true)}>
                        <ButtonText>
                            Inscribirse
                        </ButtonText>
                    </Button>

                </Center>

                <ConfirmInscription
                    showInscriptionModal={showInscriptionModal}
                    setShowInscriptionModal={setShowInscriptionModal}
                    classId={id}
                />
            </ScrollView>

        </>
    );
}