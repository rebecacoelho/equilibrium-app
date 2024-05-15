import EmotionTracker from "@/components/EmotionTracker";
import { VStack } from "native-base";

export function EmotionsDiary() {

    return (
        <VStack flex={1}>
            <EmotionTracker />
        </VStack>
    )
}