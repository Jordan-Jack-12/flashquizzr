import PaddleCheckout from "@/components/paddle/PaddleCheckout"
import getSessionUser from "@/data/user/get-session-user"
import { redirect } from "next/navigation"

async function CheckoutPage() {
    const user = await getSessionUser()
    if (!user) return redirect('/login'); 

    return (
        <div>
            <PaddleCheckout email={user.email}/>
        </div>
    )
}

export default CheckoutPage