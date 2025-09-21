/**
 * Shop creation page - uses the shops feature
 */
import ProtectedPage from "@/components/auth/ProtectedPage"
import {ShopCreationPage} from "@/features/shops/components/create/ShopCreationPage"
import {AuthProvider} from "@/features/auth";

export default function Page() {
    return <AuthProvider>
        <ProtectedPage>
            <ShopCreationPage/>
        </ProtectedPage>
    </AuthProvider>
}
