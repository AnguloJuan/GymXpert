import { Button, ButtonText, CloseIcon, Heading, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ScrollView, Text, useToast } from "@gluestack-ui/themed";
import { useRef } from "react";

const ConfirmInscription = (props) => {
    const {
        showInscriptionModal,
        setShowInscriptionModal,
        classId
    } = props;

    const toast = useToast();

    const ref = useRef(null);

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
            minHeight={"$full"}
        >
            <ScrollView minWidth={"$full"} minHeight={"$full"}>

                <ModalBackdrop h={"$full"} />
                <ModalContent bgColor="$white" alignSelf="center" mt={"$3"} mb={"$32"} >
                    <ModalHeader>
                        <Heading size="lg" color="#5d596c">Inscripción a la clase #{classId}</Heading>
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
                        <Text>
                            ¿Estas seguro que deseas inscribirte a esta clase?
                        </Text>
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
                                // API connecion and validation first here
                                // ...

                                setShowInscriptionModal(false);
                            }}
                        >
                            <ButtonText>Inscribirse</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ScrollView>
        </Modal>

    );
};

export default ConfirmInscription;