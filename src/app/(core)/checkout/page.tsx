import PaddleCheckout from "@/components/paddle/PaddleCheckout"
import getSessionUser from "@/data/user/get-session-user"
import { getSessionUserID } from "@/data/user/get-session-user-id"
import { redirect } from "next/navigation"

async function CheckoutPage() {
    const userId = await getSessionUserID();
    const user = await getSessionUser()
    console.log(user?.email);
    if (!user) return redirect('/login'); 

    return (
        <div>
            <PaddleCheckout profile_id={userId} email={user.email} plan="super" priceId={"pri_01j91mr0m6t08a0kgbz4zkytat"}/>
        </div>
    )
}

export default CheckoutPage