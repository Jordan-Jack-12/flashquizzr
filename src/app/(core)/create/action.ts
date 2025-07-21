"use server"

export async function generateFlashCards() {

    // get user id from session


    // check subscription level
    const subscription = "pro"

    // check tries left or not
    const tries = 3

    if (!subscription && tries <= 0) {
        return
    }

    return []
}