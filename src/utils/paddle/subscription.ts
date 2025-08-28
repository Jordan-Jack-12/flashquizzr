// import { prisma } from "@/lib/prisma";
import { SubscriptionCreatedEvent, SubscriptionUpdatedEvent } from "@paddle/paddle-node-sdk";

export async function createOrUpdateSubscription(eventData:  SubscriptionCreatedEvent | SubscriptionUpdatedEvent) {
    console.log(eventData);
    
}