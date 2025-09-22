import { prisma } from "@/lib/prisma";
import { CustomerCreatedEvent, CustomerUpdatedEvent } from "@paddle/paddle-node-sdk";
import { paddleCustomDataSchema } from "./paddle-types";

export async function createOrUpdateCustomer(evenData: CustomerCreatedEvent | CustomerUpdatedEvent) {
    console.log(evenData);

    try {
        const {data, error} = paddleCustomDataSchema.safeParse(evenData.data.customData);
        if (error) return;

        await prisma.profile.update({
            where: {
                id: data.profile_id,
            },
            data: {
                paddleCustomerId: evenData.data.id
            }
        });

    } catch (error) {
        console.log(error);
        return;
    }
}
