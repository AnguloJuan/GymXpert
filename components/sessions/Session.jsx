import { Button, ButtonText, Center, HStack, Text } from "@gluestack-ui/themed"

export default function Session({ session, navigation, setShowInscriptionModal, setClassId: setSessionId }) {
    <Center borderColor="#dbdade" borderWidth={1} rounded={8} key={session.id} w={"$full"} p={16} gap={8}>
        <Text fontSize={28} fontWeight="$medium" color="#6f6b7d" >{session.session}</Text>
        <Text fontSize={16} fontWeight="medium" color="#6f6b7d" >{session.trainer}</Text>
        <Text color="#6f6b7d" fontWeight="$normal" textAlign="center" my={12}>{session.description}</Text>
        <HStack w={"$full"} justifyContent="space-around" >
            <Button
                w={"auto"}
                action="positive"
                onPress={
                    () => {
                        navigation.navigate("Detalles de la clase", { id: session.id })
                    }
                }>
                <ButtonText>
                    Ver Detalles
                </ButtonText>
            </Button>
            <Button
                w={"auto"}
                onPress={() => {
                    setSessionId(session.id)
                    setShowInscriptionModal(true)
                }}>
                <ButtonText>
                    Inscribirse
                </ButtonText>
            </Button>
        </HStack>
    </Center>
}