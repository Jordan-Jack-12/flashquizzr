import { createOrUpdateCustomer } from "@/utils/paddle/customer";
import { getPaddleInstance } from "@/utils/paddle/paddleInstance";
import { createOrUpdateSubscription } from "@/utils/paddle/subscription";
import { EventName } from "@paddle/paddle-node-sdk";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const signature = request.headers.get('paddle-signature') || '';
    const rawRequestBody = await request.text();
    const privateKey = process.env['PADDLE_NOTIFICATION_WEBHOOK_SECRET'] || '';

    try {
        if (!signature || !rawRequestBody) {
            return Response.json({ error: 'Missing signature from header' }, { status: 400 });
        }

        const paddle = getPaddleInstance();
        const eventData = await paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
        const eventName = eventData?.eventType ?? 'Unknown event';

        if (eventData) {
            switch (eventData.eventType) {
                case EventName.SubscriptionCreated:
                case EventName.SubscriptionUpdated:
                    await createOrUpdateSubscription(eventData);
                    break;
                case EventName.CustomerCreated:
                case EventName.CustomerUpdated:
                    await createOrUpdateCustomer(eventData);
                    break;
            }
        }

        return Response.json({ status: 200, eventName });
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
