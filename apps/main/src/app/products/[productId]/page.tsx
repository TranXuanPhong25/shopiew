
import type { Metadata } from "next";
import ProductPage from "./product-page";

export async function generateMetadata({ 
    params 
}: { 
    params: Promise<{ productId: string }> 
}): Promise<Metadata> {
    const { productId } = await params;
    
    try {
        // Fetch product data for metadata
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products/${productId}`, {
            next: { revalidate: 3600 } // Revalidate every hour
        });
        
        if (!response.ok) {
            return {
                title: "Product Not Found | Shopiew",
                description: "The product you're looking for could not be found.",
            };
        }
        
        const product = await response.json();
        
        // Calculate discount percentage if applicable
        const discountPercentage = product.salePrice && product.originalPrice
            ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
            : 0;
        
        // Format price for display
        const formattedPrice = product.salePrice 
            ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)
            : '';
        
        // Build description
        const description = product.description 
            ? product.description.substring(0, 160)
            : `${product.name} - ${formattedPrice}. ${product.rating ? `Rated ${product.rating}/5` : ''} ${product.soldQuantity ? `with ${product.soldQuantity.toLocaleString()} sold` : ''}. Buy now on Shopiew!`;
        
        // Build title with key selling points
        const titleParts = [product.name];
        if (discountPercentage > 0) {
            titleParts.push(`-${discountPercentage}%`);
        }
        if (formattedPrice) {
            titleParts.push(formattedPrice);
        }
        titleParts.push('| Shopiew');
        
        const title = titleParts.join(' ');
        
        // Get product images
        const images = product.imageUrl ? [product.imageUrl] : [];
        if (product.variants && product.variants.length > 0) {
            product.variants.forEach((variant: any) => {
                if (variant.images && Array.isArray(variant.images)) {
                    images.push(...variant.images);
                }
            });
        }
        
        // Build keywords
        const keywords = [
            product.name,
            product.category,
            product.brand?.name,
            ...(product.categoryPath?.map((cat: any) => cat.name) || []),
            'mua sắm online',
            'Shopiew'
        ].filter(Boolean);
        
        return {
            title,
            description,
            keywords: keywords.join(', '),
            openGraph: {
                title: product.name,
                description,
                images: images.slice(0, 4).map(url => ({
                    url,
                    width: 800,
                    height: 800,
                    alt: product.name,
                })),
                type: 'website',
                siteName: 'Shopiew',
                locale: 'vi_VN',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description,
                images: images.slice(0, 1),
            },
            alternates: {
                canonical: `/products/${productId}`,
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
            other: {
                'product:price:amount': product.salePrice?.toString() || product.originalPrice?.toString(),
                'product:price:currency': 'VND',
                'product:availability': product.inStockQuantity > 0 ? 'in stock' : 'out of stock',
                'product:condition': product.status || 'new',
                'product:retailer_item_id': productId,
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: "Product | Shopiew",
            description: "Discover amazing products on Shopiew - Your trusted online shopping platform.",
        };
    }
}

export default function Page({ params }: { params: Promise<{ productId: string }> }) {
    return <ProductPage params={params} />
}