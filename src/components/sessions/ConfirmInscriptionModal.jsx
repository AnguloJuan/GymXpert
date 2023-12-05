import { Button, ButtonText, CloseIcon, Heading, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ScrollView, Text, Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";
import axios from "axios";
import { useRef } from "react";
import BASE_URL from "../../../Constants";

const ConfirmInscription = (props) => {
    const {
        showInscriptionModal,
        setShowInscriptionModal,
        session
    } = props;

    const toast = useToast();
    const ref = useRef(null);
    const customerId = 1; // Temporal
    return (
        <Modal
            isOpen={showInscriptionModal}
            onClose={() => {
                setShowInscriptionModal(false);
            }}
            finalFocusRef={ref}
            size="md"
            scrollBehavior="inside"
            minWidth={"$full"}
        >
            <ModalBackdrop />
            <ModalContent bgColor="$white">
                <ModalHeader>
                    <Heading size="lg" color="#5d596c">Inscripción a la clase</Heading>
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
                    <Text>¿Estas seguro que deseas inscribirte a esta clase?</Text>
                    <Text fontWeight="$medium" textAlign="center">{session !== "" ? session.session.name : ""}</Text>
                </ModalBody>
                <ModalFooter pt={"$3"} pb={"$5"} >
                    <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() => {
                            setShowInscriptionModal(false);
                        }}
                    >
                        <ButtonText color="#5d596c">Cancelar</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action="primary"
                        borderWidth="$0"
                        onPress={() => {
                            // API call to register customer to session
                            axios.post(`${BASE_URL}/session-days/subscribe`, {
                                session_day_id: session.id,
                                customer_id: customerId,
                            })
                                .then((response) => {
                                    toast.show({
                                        placement: "bottom",
                                        render: ({ id }) => {
                                            return (
                                                <Toast nativeId={id} action="success" variant="accent">
                                                    <VStack space="xs">
                                                        <ToastTitle>Clase inscrita</ToastTitle>
                                                        <ToastDescription>
                                                            {response.data.message}
                                                        </ToastDescription>
                                                    </VStack>
                                                </Toast>
                                            );
                                        },
                                    })
                                    setShowInscriptionModal(false);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    toast.show({
                                        placement: "bottom",
                                        render: ({ id }) => {
                                            return (
                                                <Toast nativeId={id} action="error" variant="accent">
                                                    <VStack space="xs">
                                                        <ToastTitle>Error</ToastTitle>
                                                        <ToastDescription>
                                                            {error.response.data.message}
                                                        </ToastDescription>
                                                    </VStack>
                                                </Toast>
                                            );
                                        },
                                    })
                                });
                        }}
                    >
                        <ButtonText>Inscribirse</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
};

export default ConfirmInscription;
