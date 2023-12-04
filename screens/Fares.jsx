import { Box, Button, ButtonText, Center, ScrollView, Spinner, Text } from "@gluestack-ui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import PaymentMethodModal from "../components/fares/PaymetMethodModal";
import { BASE_URL } from "../Constants";

export default function Fares() {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [fares, setFares] = useState([]);
    /*setFares([
        {
            id: 1,
            name: "Mensual",
            cost: "$ 1.500",
            description: "Acceso a todas las clases"
        },
        {
            id: 2,
            name: "Anual",
            cost: "$ 10.000",
            description: "Acceso a todas las clases"
        },
        {
            id: 3,
            name: "Diaria",
            cost: "$ 50",
            description: "Acceso a una clase"
        },
    ]);*/

    // Fetch fares from backend with axios
    useEffect(() => {
        axios.get(`${BASE_URL}/fares`)
            .then((response) => {
                setFares(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <ScrollView p={16} minHeight={"$full"}>
                <Center width="$full" bgColor="white" rounded={8} gap={12}>
                    <Text fontSize={24} fontWeight="$medium" mt={40} mb={12} color="#5d596c">Tarifas de GymXpert</Text>

                    <Box p={24} pt={0} w={"$full"}>
                        {fares.length !== 0 ? fares.map((fare) => (
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
                        )) : (<Spinner />)}
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