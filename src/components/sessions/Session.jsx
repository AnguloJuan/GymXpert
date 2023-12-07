import { Button, ButtonText, Center, HStack, Text } from "@gluestack-ui/themed"

export default function Session({ session, navigation, setShowInscriptionModal, setShowCancelModal, setSessionId, showEnrolled }) {
    return (
        <Center borderColor="#dbdade" borderWidth={1} rounded={8} key={session.id} w={"$full"} p={16} gap={8}>
            <Text fontSize={24} fontWeight="$medium" textAlign="center" color="#6f6b7d" >{session.session.name}</Text>
            <Text fontSize={16} fontWeight="$medium" color="#6f6b7d" >{session.instructor.name}</Text>
            <Text color="#6f6b7d" fontWeight="$normal" textAlign="center" my={12}>{session.session.description}</Text>
            <HStack w={"$full"} justifyContent="space-around" >
                <Button
                    w={"auto"}
                    action="positive"
                    onPress={
                        () => {
                            navigation.navigate("Detalles de la clase", { id: session.id, session: session, showEnrolled: showEnrolled })
                        }
                    }>
                    <ButtonText>
                        Ver Detalles
                    </ButtonText>
                </Button>
                {showEnrolled ? (
                    <Button
                        w={"auto"}
                        action="negative"
                        onPress={() => {
                            setSessionId(session.id)
                            setShowCancelModal(true)
                        }}>
                        <ButtonText>
                            Cancelar
                        </ButtonText>
                    </Button>
                ) : (
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
                )}
            </HStack>
        </Center>
    )
}