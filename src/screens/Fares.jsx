import { Box, Center, ScrollView, Spinner, Text } from "@gluestack-ui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL  from "../../Constants";
import Fare from "../components/fares/Fare";
import PaymentMethodModal from "../components/fares/PaymetMethodModal";

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
                            <Fare
                                fare={fare}
                                setShowPaymentModal={setShowPaymentModal}
                                key={fare.id}
                            />
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