import TopNavBar from "@/components/ui/TopNavBar"
import Footer from "@/components/ui/Footer"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <TopNavBar />
            {children}
            <Footer />
        </>
    )
}