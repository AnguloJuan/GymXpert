import { Button, ButtonText, CircleIcon, CloseIcon, HStack, Heading, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, useToast } from "@gluestack-ui/themed";
import { useContext, useRef, useState } from "react";
import BASE_URL from "../../../Constants";
import { AuthContext } from "../../context/AuthContext";
import StyledInput from "../Input";
import Toasts from "../Toasts";
import { Text } from "@gluestack-ui/themed";

const PaymentMethodModal = (props) => {
    const {
        showPaymentModal,
        setShowPaymentModal,
        fareId
    } = props;

    const [paymentMethod, setPaymentMethod] = useState(0);
    const [invalidPaymentMethod, setInvalidPaymentMethod] = useState(false);
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const { user } = useContext(AuthContext);
    const toast = useToast();

    const ref = useRef(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "paymentMethod") {
            if (!value.match(/^[0-9]+$/i)) {
                setInvalidPaymentMethod(true);
            } else {
                setInvalidPaymentMethod(false);
            }
        }
        setCreditCardNumber(value);
    };

    const handlePayment = () => {
        if (paymentMethod !== 0 || (paymentMethod === 2 && !invalidPaymentMethod)) {
            const formData = new FormData();
            formData.append('customer_id', user.id);
            formData.append('fare_id', fareId);
            formData.append('payment_type_id', paymentMethod);
            const headers = {
                headers: {
                    'Accept': 'application/json',
                },
            }
            BASE_URL.post(`/fares/pay`, formData, headers)
                .then((res) => {
                    if (res.data.status === "success") {
                        toast.show({
                            placement: "top",
                            render: ({ id }) => {
                                return <Toasts
                                    id={id}
                                    title="Éxito"
                                    body={<Text>res.data.message</Text>}
                                    variant="accent"
                                    action="success"
                                />
                            },
                        })
                        setShowPaymentModal(false);
                    }
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    toast.show({
                        placement: "top",
                        render: ({ id }) => {
                            return <Toasts
                                id={id}
                                title="Error"
                                body={<Text>err.response.data.message</Text>}
                                variant="accent"
                                action="error"
                            />
                        },
                    })
                });
        } else {
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    return <Toasts
                        id={id}
                        title="Error"
                        body={<Text>Por favor, rellene todos los campos</Text>}
                        variant="accent"
                        action="error"
                    />
                },
            })
        }
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
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={
                            (value) => {
                                if (value !== 2) {
                                    setCreditCardNumber("");
                                }
                                setPaymentMethod(value);
                            }
                        }>
                        <HStack space="2xl">
                            <Radio value={2}>
                                <RadioIndicator mr="$2">
                                    <RadioIcon as={CircleIcon} />
                                </RadioIndicator>
                                <RadioLabel>Tarjeta</RadioLabel>
                            </Radio>
                            <Radio value={3}>
                                <RadioIndicator mr="$2">
                                    <RadioIcon as={CircleIcon} />
                                </RadioIndicator>
                                <RadioLabel>Transferencia</RadioLabel>
                            </Radio>
                            <Radio value={1}>
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
                        disabled={paymentMethod !== 2}
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
                        action={(paymentMethod === 2 && creditCardNumber === "") ? "secondary" : "primary"}
                        borderWidth="$0"
                        disabled={paymentMethod === 2 && creditCardNumber === ""}
                        onPress={() => { handlePayment() }}
                    >
                        <ButtonText>Guardar</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
};

export default PaymentMethodModal;
