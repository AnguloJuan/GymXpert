import { ToastDescription, VStack } from "@gluestack-ui/themed";
import { ToastTitle } from "@gluestack-ui/themed";
import { Toast } from "@gluestack-ui/themed";

export default function Toasts({ id, title, body, action, variant }) {
    return (
        <Toast nativeId={id} action={action} variant={variant}>
            <VStack space="xs">
                <ToastTitle>{title}</ToastTitle>
                <ToastDescription>
                    {body}
                </ToastDescription>
            </VStack>
        </Toast>
    );
}