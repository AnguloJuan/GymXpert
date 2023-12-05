import { Box, Button, ButtonText, Text } from "@gluestack-ui/themed";

export default function Fare({ fare, setShowPaymentModal }) {
    return (
        <Box borderColor="#5d596c" borderWidth={1} rounded={8} key={fare.id} w={"$full"} my={24}>
            <Box p={16}>
                <Text fontSize={20} fontWeight="$medium" alignSelf="center" color="#5d596c" my={12}>{fare.name}</Text>
                <Text fontSize={28} fontWeight="medium" alignSelf="center" color="$blue600" mt={12} mb={16}>$ {fare.price}</Text>
                <Text color="#5d596c">{fare.description}</Text>
            </Box>
            <Button
                w={"$full"}
                borderTopLeftRadius={0}
                borderTopRightRadius={0}
                onPress={() => setShowPaymentModal(true)}>
                <ButtonText>
                    Comprar
                </ButtonText>
            </Button>
        </Box>
    );
}