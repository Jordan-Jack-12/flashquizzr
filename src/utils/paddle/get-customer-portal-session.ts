'use server';

import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { getPaddleInstance } from "./paddleInstance";

export async function getCustomerPortalSession() {
    try {
        const userId = await getSessionUserID();
        const paddleCustomerId = await prisma.profile.findUnique({
            where: {id: userId},
            select: {
                paddleCustomerId: true,
            }
        })
        const subcription = await prisma.subscription.findMany({
            where: {profileId: userId},
            select: {paddleSubscriptionId: true}
        })
        const subscriptionIds = subcription.map((s) => s.paddleSubscriptionId)

        if (!paddleCustomerId || !paddleCustomerId.paddleCustomerId || !subcription) return null

        const paddle = getPaddleInstance();

        const customerPortal = await paddle.customerPortalSessions.create(paddleCustomerId.paddleCustomerId, subscriptionIds)

        return customerPortal.urls.general.overview
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null
    }
}