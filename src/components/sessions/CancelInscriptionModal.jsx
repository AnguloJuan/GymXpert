import { Button, ButtonText, CloseIcon, Heading, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, useToast } from "@gluestack-ui/themed";
import { useContext, useRef } from "react";
import BASE_URL from "../../../Constants";
import { AuthContext } from "../../context/AuthContext";
import Toasts from "../Toasts";
import { useNavigation } from "@react-navigation/native";

const CancelInscription = (props) => {
    const {
        showCancelModal,
        setShowCancelModal,
        session
    } = props;
    const toast = useToast();
    const ref = useRef(null);
    const { user, setUser, setSessions } = useContext(AuthContext);

    return (
        <Modal
            isOpen={showCancelModal}
            onClose={() => {
                setShowCancelModal(false);
            }}
            finalFocusRef={ref}
            size="md"
            scrollBehavior="inside"
            minWidth={"$full"}
        >
            <ModalBackdrop />
            <ModalContent bgColor="$white">
                <ModalHeader>
                    <Heading size="lg" color="#5d596c">Cancelar inscripción</Heading>
                    <ModalCloseButton
                        stroke={"#5d596c"}
                        bgColor="$red100"
                        $hover-bg="$red300"
                        $pressed={{
                            bgColor: "$red300",
                        }}
                    >
                        <CloseIcon />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody color="#5d596c" py={12}>
                    <Text>¿Estas seguro que deseas cancelar la inscripción de esta clase?</Text>
                    <Text fontWeight="$medium" textAlign="center">{session !== "" ? session.session.name : ""}</Text>
                </ModalBody>
                <ModalFooter pt={"$3"} pb={"$5"} >
                    <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() => {
                            setShowCancelModal(false);
                        }}
                    >
                        <ButtonText color="#5d596c">Cancelar</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action="negative"
                        borderWidth="$0"
                        onPress={() => {
                            // API call to cancel customer to session
                            const formData = new FormData();
                            formData.append('session_day_id', session.id);
                            formData.append('customer_id', user.id);
                            const headers = {
                                headers: {
                                    'Accept': 'application/json',
                                },
                            }
                            BASE_URL.delete("/session-days/cancel-subscription", {
                                data: {
                                    session_day_id: session.id,
                                    customer_id: user.id
                                }
                            })
                                .then((response) => {
                                    if (response.data.status === "success") {
                                        toast.show({
                                            placement: "bottom",
                                            containerStyle: {
                                                display: "block"
                                            },
                                            render: ({ id }) => {
                                                return <Toasts
                                                    id={id}
                                                    title="Clase cancelada"
                                                    body={<Text>{response.data.message}</Text>}
                                                    variant="accent"
                                                    action="success"
                                                />
                                            },
                                        })
                                        setShowCancelModal(false);
                                        // refresh page to update session
                                        setUser((prevCriteria) => ({
                                            ...prevCriteria,
                                            subscribed_sessions: user.subscribed_sessions.filter((mapedSession) => mapedSession.id !== session.id)
                                        }));
                                        setSessions((prevCriteria) => prevCriteria.filter((mapedSession) => mapedSession.id !== session.id));
                                        // update session current capacity
                                        session.current_capacity = session.current_capacity - 1;

                                    } else if (response.data.status === "failed") {
                                        toast.show({
                                            placement: "bottom",
                                            containerStyle: {
                                                display: "block"
                                            },
                                            render: ({ id }) => {
                                                return <Toasts
                                                    id={id}
                                                    title="Error"
                                                    body={response.data.errors.internal_error.map((error, id) => <Text key={id}>{error}</Text>)}
                                                    variant="accent"
                                                    action="error"
                                                />
                                            },
                                        })
                                        console.log(response);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                    toast.show({
                                        placement: "bottom",
                                        containerStyle: {
                                            display: "block"
                                        },
                                        render: ({ id }) => {
                                            return <Toasts
                                                id={id}
                                                title="Error"
                                                body={<Text>{error.response.data.message}</Text>}
                                                variant="accent"
                                                action="error"
                                            />
                                        },
                                    })
                                });
                        }}
                    >
                        <ButtonText>Confirmar</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
};

export default CancelInscription;
