import {ProductCardProps} from "@/types/product";
import SearchFilter from "@/features/search/search-filters";
import SearchResults from "@/features/search/search-results";

const products: ProductCardProps[] = [
    {
        "id": 1,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Kem Dưỡng Ẩm Hada Labo Advanced Nourish",
        "originalPrice": 250000,
        "salePrice": 199000,
        "soldQuantity": 835,
        "soldAddress": "Hà Nội",
        "rating": 4.5
    },
    {
        "id": 2,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Sữa Rửa Mặt Cetaphil Gentle Skin Cleanser",
        "originalPrice": 300000,
        "salePrice": 259000,
        "soldQuantity": 1245,
        "soldAddress": "Đà Nẵng",
        "rating": 4.7
    },
    {
        "id": 3,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Kem Chống Nắng Anessa Perfect UV Sunscreen",
        "originalPrice": 550000,
        "salePrice": 470000,
        "soldQuantity": 978,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.8
    },
    {
        "id": 4,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Serum Vitamin C Melano CC Rohto",
        "originalPrice": 320000,
        "salePrice": 270000,
        "soldQuantity": 657,
        "soldAddress": "Hà Nội",
        "rating": 4.6
    },
    {
        "id": 5,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Tẩy Trang Bioderma Sensibio H2O",
        "originalPrice": 400000,
        "salePrice": 345000,
        "soldQuantity": 1123,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.9
    },
    {
        "id": 6,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Nước Hoa Hồng Thayers Witch Hazel",
        "originalPrice": 290000,
        "salePrice": 250000,
        "soldQuantity": 788,
        "soldAddress": "Hà Nội",
        "rating": 4.4
    },
    {
        "id": 7,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Sữa Dưỡng Thể Vaseline Healthy White",
        "originalPrice": 220000,
        "salePrice": 180000,
        "soldQuantity": 563,
        "soldAddress": "Đà Nẵng",
        "rating": 4.3
    },
    {
        "id": 8,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Kem Dưỡng Ẩm Neutrogena Hydro Boost",
        "originalPrice": 500000,
        "salePrice": 420000,
        "soldQuantity": 932,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.7
    },
    {
        "id": 9,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Tinh Chất Dưỡng Trắng Some By Mi Yuja Niacin",
        "originalPrice": 450000,
        "salePrice": 390000,
        "soldQuantity": 823,
        "soldAddress": "Hà Nội",
        "rating": 4.6
    },
    {
        "id": 10,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Mặt Nạ Ngủ Phục Hồi Laneige Cica Sleeping Mask",
        "originalPrice": 400000,
        "salePrice": 300000,
        "soldQuantity": 1132,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4
    },
    {
        "id": 11,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Kem Dưỡng Ẩm Clinique Moisture Surge",
        "originalPrice": 780000,
        "salePrice": 690000,
        "soldQuantity": 510,
        "soldAddress": "Hà Nội",
        "rating": 4.8
    },
    {
        "id": 12,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Dầu Tẩy Trang DHC Deep Cleansing Oil",
        "originalPrice": 650000,
        "salePrice": 580000,
        "soldQuantity": 432,
        "soldAddress": "Đà Nẵng",
        "rating": 4.7
    },
    {
        "id": 13,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Serum B5 The Ordinary Hyaluronic Acid",
        "originalPrice": 350000,
        "salePrice": 295000,
        "soldQuantity": 670,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.5
    },
    {
        "id": 14,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Serum B5 The Ordinary Hyaluronic Acid",
        "originalPrice": 350000,
        "salePrice": 295000,
        "soldQuantity": 670,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.5
    },
    {
        "id": 15,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Xịt Khoáng Evoluderm Eau Pure",
        "originalPrice": 200000,
        "salePrice": 170000,
        "soldQuantity": 780,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.6
    },
    {
        "id": 16,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Sữa Rửa Mặt Innisfree Green Tea Foam Cleanser",
        "originalPrice": 280000,
        "salePrice": 230000,
        "soldQuantity": 600,
        "soldAddress": "Đà Nẵng",
        "rating": 4.5
    },
    {
        "id": 17,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Kem Chống Nắng Biore UV Aqua Rich Watery Essence",
        "originalPrice": 450000,
        "salePrice": 400000,
        "soldQuantity": 850,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.8
    },
    {
        "id": 18,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Serum Retinol RoC Retinol Correxion",
        "originalPrice": 600000,
        "salePrice": 540000,
        "soldQuantity": 500,
        "soldAddress": "Hà Nội",
        "rating": 4.4
    },
    {
        "id": 19,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Mặt Nạ Dưỡng Ẩm Innisfree My Real Squeeze Mask",
        "originalPrice": 300000,
        "salePrice": 260000,
        "soldQuantity": 710,
        "soldAddress": "Đà Nẵng",
        "rating": 4.6
    },
    {
        "id": 20,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Tinh Chất Dưỡng Da The Ordinary Niacinamide 10% + Zinc 1%",
        "originalPrice": 350000,
        "salePrice": 310000,
        "soldQuantity": 920,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.5
    },
    {
        "id": 21,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Dầu Trị Mụn La Roche-Posay Effaclar Duo",
        "originalPrice": 700000,
        "salePrice": 640000,
        "soldQuantity": 650,
        "soldAddress": "Hà Nội",
        "rating": 4.7
    },
    {
        "id": 22,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Toner Paula's Choice Skin Balancing",
        "originalPrice": 320000,
        "salePrice": 280000,
        "soldQuantity": 480,
        "soldAddress": "Đà Nẵng",
        "rating": 4.6
    },
    {
        "id": 23,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Kem Dưỡng Da Kiehl's Ultra Facial Cream",
        "originalPrice": 800000,
        "salePrice": 750000,
        "soldQuantity": 540,
        "soldAddress": "Hồ Chí Minh",
        "rating": 4.8
    },
    {
        "id": 24,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Serum Hyaluronic Acid Neutrogena Hydro Boost",
        "originalPrice": 400000,
        "salePrice": 350000,
        "soldQuantity": 860,
        "soldAddress": "Hà Nội",
        "rating": 4.7
    },
    {
        "id": 25,
        "imageUrl": "https://placehold.co/400x400.png",
        "name": "Mặt Nạ Clay Aztec Secret Indian Healing Clay",
        "originalPrice": 150000,
        "salePrice": 120000,
        "soldQuantity": 1100,
        "soldAddress": "Đà Nẵng",
        "rating": 4.5
    }
]
export async function generateMetadata({ params }:{ params: Promise<{ category: string }> }) {
     const { category } = await params;
     const decodedCategory = decodeURIComponent(category).replace(/(%20)|-/g, " ");
    return {
        title: `${decodedCategory} | Shopiew`,
        description: `:D:D:D:`,
    };
}
export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
    const {category} = await props.params;
    return (
        <div className="max-w-7xl mx-auto flex relative  my-4 gap-4">
            <SearchFilter/>
            <SearchResults products={products}/>
        </div>
    );
}
