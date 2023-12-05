import { Button, ButtonText, CircleIcon, CloseIcon, HStack, Heading, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, useToast } from "@gluestack-ui/themed";
import { useRef, useState } from "react";
import StyledInput from "../Input";

const PaymentMethodModal = (props) => {
    const {
        showPaymentModal,
        setShowPaymentModal,
    } = props;

    const [paymentMethod, setPaymentMethod] = useState("Tarjeta")
    const [creditCardNumber, setCreditCardNumber] = useState("")
    const toast = useToast();

    const ref = useRef(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCreditCardNumber(value);
    };

    return (
        <Modal
            isOpen={showPaymentModal}
            onClose={() => {
                setShowPaymentModal(false);
            }}
            finalFocusRef={ref}
            size="md"
            scrollBehavior="inside"
            minWidth={"$full"}
        >
            <ModalBackdrop />
            <ModalContent bgColor="$white">
                <ModalHeader>
                    <Heading size="lg" color="#5d596c">Metodo de pago</Heading>
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
                    <RadioGroup
                        my={12}
                        value={paymentMethod}
                        onChange={
                            (value) => {
                                if (value === "Efectivo") {
                                    setCreditCardNumber("");
                                }
                                setPaymentMethod(value);
                            }
                        }>
                        <HStack space="2xl">
                            <Radio value="Tarjeta">
                                <RadioIndicator mr="$2">
                                    <RadioIcon as={CircleIcon} />
                                </RadioIndicator>
                                <RadioLabel>Tarjeta</RadioLabel>
                            </Radio>
                            <Radio value="Efectivo">
                                <RadioIndicator mr="$2">
                                    <RadioIcon as={CircleIcon} />
                                </RadioIndicator>
                                <RadioLabel>Efectivo</RadioLabel>
                            </Radio>
                        </HStack>
                    </RadioGroup>

                    <StyledInput
                        id="creditCardNumber"
                        label="Tarjeta de credito"
                        type="text"
                        contentType="creditCardNumber"
                        placeholder="1234 1234 1234 1234"
                        autoComplete="creditCardNumber"
                        color="#5d596c"
                        disabled={paymentMethod !== "Tarjeta"}
                        //invalid={invalidName}
                        value={creditCardNumber}
                        onChange={handleInputChange}
                    />
                </ModalBody>
                <ModalFooter pt={"$3"} pb={"$5"} >
                    <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() => {
                            setShowPaymentModal(false);
                        }}
                    >
                        <ButtonText color="#5d596c">Cancelar</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action={(paymentMethod === "Tarjeta" && creditCardNumber === "") ? "secondary" : "primary"}
                        borderWidth="$0"
                        disabled={paymentMethod === "Credit Card" && creditCardNumber === ""}
                        onPress={() => {
                            // API connecion and validation first here
                            // ...

                            setShowPaymentModal(false);
                        }}
                    >
                        <ButtonText>Guardar</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
};

export default PaymentMethodModal;
