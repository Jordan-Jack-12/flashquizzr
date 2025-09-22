import { getDecksCount } from "@/data/deck/get-decks-count";
import { getSubscription } from "@/data/subscription/subscription";

export async function canGenerateFlashcardsWithText(profileId: string) {
    try {
        const subs = await getSubscription(profileId);
        if (!subs || subs.plan === 'super') {
            const deckCount = await getDecksCount(profileId);
            if (!deckCount) return null;
            if (subs?.plan === 'super') return deckCount < 10 ? true : false;
            return deckCount < 3 ? true : false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function canGenerateFlashcardsWithPdf(profileId: string) {
    try {
        const subs = await getSubscription(profileId);
        if (!subs || subs.plan === 'super') {
            const deckCount = await getDecksCount(profileId);
            if (!deckCount) return null;
            if (subs?.plan === 'super') return deckCount < 10 ? true : false;
            return deckCount < 3 ? true : false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function canGenerateFlashcardsWithImage(profileId: string) {
    try {
        const subs = await getSubscription(profileId);
        if (!subs) return false;
        if (subs.plan === 'super') {
            const count = await getDecksCount(profileId);
            if (!count) return null;
            return count < 10 ? true : false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function canGenerateFlashcardsWithUrl(profileId: string) {
    try {
        const subs = await getSubscription(profileId);
        if (!subs || subs.plan === 'super') {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}