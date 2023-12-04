import { Center, ScrollView, Spinner, Text } from "@gluestack-ui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";
import Session from "../components/sessions/Session";
import ConfirmInscription from "../components/sessions/ConfirmInscriptionModal";
export default function Sessions({ navigation }) {
    const [sessions, setSessions] = useState([]);
    /*setSession([
        {
            id: 1,
            trainer: "Alanna Spinka",
            session: "Yoga",
            description: "Haz que cada movimiento cuente, entrena para la vida diaria\n\n" +
                "Capacidad: 40 personas\n\n" +
                "Reservado: 30 personas\n\n" +
                "Disponible: 10 personas\n",
        },
        {
            id: 2,
            trainer: "Albert Cook",
            session: "Pesas",
            description: "Clase de pesas para principiantes",
        },
        {
            id: 3,
            trainer: "John Doe",
            session: "Crossfit",
            description: "Clase de crossfit para principiantes",
        },
    ]);*/
    const [showInscriptionModal, setShowInscriptionModal] = useState(false);
    const [sessionId, setSessionId] = useState(0);

    // Fetch classes from backend with axios
    useEffect(() => {
        axios.get(`${BASE_URL}/sessions`)
            .then((response) => {
                setSessions(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <ScrollView p={16} minHeight={"$full"}>
                <Center width="$full" bgColor="white" rounded={8} gap={24} p={24}>
                    <Text fontSize={24} fontWeight="$medium" my={12} color="#5d596c">Clases disponibles</Text>

                    {sessions.length !== 0 ? sessions.map((session) => (
                        <Session
                            session={session}
                            navigation={navigation}
                            setShowInscriptionModal={setShowInscriptionModal}
                            setSessionId={setSessionId}
                        />
                    )) : <Spinner />}
                </Center>
                <ConfirmInscription
                    showInscriptionModal={showInscriptionModal}
                    setShowInscriptionModal={setShowInscriptionModal}
                    sessionId={sessionId}
                />
            </ScrollView>

        </>
    );
}