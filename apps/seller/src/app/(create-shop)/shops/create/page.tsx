/**
 * Shop creation page - uses the shops feature
 */
import ProtectedPage from "@/components/auth/ProtectedPage"
import {ShopCreationPage} from "@/features/shops/components/create/ShopCreationPage"

export default function Page() {
    return (    
        <ProtectedPage>
            <ShopCreationPage/>
        </ProtectedPage>
    );
}
