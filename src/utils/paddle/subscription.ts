import { prisma } from "@/lib/prisma";
import {
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from "@paddle/paddle-node-sdk";
import { paddleCustomDataSchema } from "./paddle-types";

export async function createOrUpdateSubscription(
  eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent
) {

  let customData;

  try {
    customData = paddleCustomDataSchema.safeParse(eventData.data.customData);
    if (customData.error) {
      return;
    }
    const subscription = await prisma.subscription.findFirst({
      where: {
        profileId: customData.data.profile_id,
      },
      select: {
        id: true,
      },
    });

    if (!subscription) {
      await prisma.subscription.create({
        data: {
          profileId: customData.data.profile_id,
          paddleCustomerId: eventData.data.customerId,
          paddleSubscriptionId: eventData.data.id,
          plan: customData.data.plan,
          startDate: eventData.data.currentBillingPeriod?.startsAt
            ? new Date(eventData.data.currentBillingPeriod.startsAt)
            : new Date(),
          endDate: eventData.data.currentBillingPeriod?.endsAt
            ? new Date(eventData.data.currentBillingPeriod.endsAt)
            : null,
          status: eventData.data.status,
        },
      });
    } else {
      await prisma.subscription.update({
        where: {
          id: subscription.id,
        },
        data: {
          paddleSubscriptionId: eventData.data.id,
          status: eventData.data.status,
          plan: customData.data.plan,
          startDate: eventData.data.currentBillingPeriod?.startsAt
            ? new Date(eventData.data.currentBillingPeriod.startsAt)
            : new Date(),
          endDate: eventData.data.currentBillingPeriod?.endsAt
            ? new Date(eventData.data.currentBillingPeriod.endsAt)
            : null,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

