import Footer from '@/components/ui/Footer'
import styles from './refund.module.css'
import TopNavBar from '@/components/ui/TopNavBar'

function RefundPolicyPage() {
    return (
        <>
            <TopNavBar />
            <main className={styles.legal_content}>

                <h1>Refund Policy</h1>

                <p>Last updated: July 19, 2025</p>

                <p>Thank you for subscribing to Flashquizzr&apos;s services. We hope you are satisfied with our services, but if not, we&apos;re here to help.</p>

                <h2>1. Free Trial</h2>

                <p>Flashquizzr offers a 3-day free trial for new users to experience the services before purchasing a subscription. During the trial period, users can cancel their subscription at any time without being charged.</p>

                <h2>2. Cancellation Policy</h2>

                <p>Subscribers may cancel their recurring subscription at any time. Upon cancellation, your account will remain active until the end of your current billing cycle.</p>

                <h2>3. Refund Eligibility</h2>

                <p>To be eligible for a refund, you must submit a request within 15 days of your subscription start date. Refunds may be considered on a case-by-case basis and are granted at the sole discretion of Flashquizzr.</p>

                <p>Refund requests can be made if you encounter technical issues that prevent you from using our service and that cannot be resolved by our support team. Proof of the issue may be required.</p>

                <p>Please note that refunds are not guaranteed and may vary depending on the circumstances. Refund requests due to issues beyond Flashquizzr&apos;s control (e.g., changes in personal circumstances, third-party hardware or software failures, etc.) will not be honored.</p>

                <h2>4. Process for Requesting a Refund</h2>

                <p>To request a refund, please contact our customer support team at contact@flashquizzr.com. Include your account information, subscription details, and a brief explanation of why you are requesting a refund.</p>

                <h2>5. Refund Processing</h2>

                <p>Once your refund request is received and inspected, we will send you an email to notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within a certain number of days. Please note that refunds can only be made back to the original payment method used at the time of purchase.</p>

                <h2>6. Changes to Refund Policy</h2>

                <p>Flashquizzr reserves the right to modify this refund policy at any time. Changes will take effect immediately upon their posting on the website. By continuing to use our services after changes are made, you agree to be bound by the revised policy.</p>

                <h2>7. Contact Us</h2>

                <p>If you have any questions about our refund policy, please contact us at <a href="">contact@flashquizzr.com.</a></p>

                <h2>Scenarios Where Refunds Would Typically Be Granted:</h2>

                <ul>
                    <li><strong>Technical Issues:</strong> The customer experiences persistent technical issues that prevent them from using the SaaS product effectively, despite multiple attempts by the support team to resolve the problem. For example, the software fails to load or crashes frequently, impeding the customer&apos;s ability to perform necessary tasks.</li>

                    <li><strong>Billing Error:</strong> The customer was incorrectly charged due to a billing error on Flashquizzr&apos;s part. For example, they were billed twice in one month, or charged after cancelling their subscription in accordance with the cancellation policy.</li>

                    <li><strong>Misrepresentation of Features:</strong> The features or capabilities of the SaaS product were misrepresented on the website or during the sales process, and the product does not perform as advertised. For example, if the product was sold with the promise of specific functionalities that are not actually available.</li>
                </ul>
                <h2>Scenarios Where Refunds Would Not Typically Be Granted:</h2>

                <ul>
                    <li><strong>Change of Mind:</strong> The customer decides they no longer want or need the SaaS product after the refund eligibility period has passed. For example, they found a different product they prefer, or they no longer need the service due to changes in their business.</li>

                    <li><strong>Failure to Cancel:</strong> The customer forgot to cancel their subscription before the renewal date and was charged for another cycle. It is the customer&apos;s responsibility to manage their subscription and cancel it before the billing cycle if they do not wish to continue.</li>

                    <li><strong>External Factors:</strong> The customer is unable to use the SaaS product due to factors outside of Flashquizzr&apos;s control, such as incompatible hardware, poor internet connection, or issues with third-party software or services.</li>
                </ul>

            </main>
            <Footer />
        </>
    )
}

export default RefundPolicyPage