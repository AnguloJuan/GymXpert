import { Box, Button, ButtonText, Center, ScrollView, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import PaymentMethodModal from "../components/fares/PaymetMethodModal";

export default function Fares() {
    const fares = [
        {
            id: 1,
            period: "Mensual",
            cost: "$ 1.500",
            description: "Acceso a todas las clases"
        },
        {
            id: 2,
            period: "Anual",
            cost: "$ 10.000",
            description: "Acceso a todas las clases"
        },
        {
            id: 3,
            period: "Diaria",
            cost: "$ 50",
            description: "Acceso a una clase"
        },
    ];
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    return (
        <>
            <ScrollView p={16} minHeight={"$full"}>
                <Center width="$full" bgColor="white" rounded={8} gap={12}>
                    <Text fontSize={24} fontWeight="$medium" mt={40} mb={12} color="#5d596c">Tarifas de GymXpert</Text>

                    <Box p={24} pt={0} w={"$full"}>
                        {fares.map((fare) => (
                            <Box borderColor="#5d596c" borderWidth={1} rounded={8} key={fare.id} w={"$full"} my={24}>
                                <Box p={16}>
                                    <Text fontSize={20} fontWeight="$medium" alignSelf="center" color="#5d596c" my={12}>{fare.period}</Text>
                                    <Text fontSize={28} fontWeight="medium" alignSelf="center" color="$blue600" mt={12} mb={16}>{fare.cost}</Text>
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
                        ))}
                    </Box>
                    <PaymentMethodModal
                showPaymentModal={showPaymentModal}
                setShowPaymentModal={setShowPaymentModal}
            />
                </Center>
            </ScrollView>
            
        </>
    );
}