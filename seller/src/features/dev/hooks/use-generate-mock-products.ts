import { useState } from "react";
import { ProductsService } from "@/features/products/service";
import { CreateProductData, Product } from "@/features/products/model";
import { toast } from "sonner";

type GenerateMockProductsOptions = {
  count: number;
  categoryId: number;
  includeImages: boolean;
  shopId: string;
};

type GenerateMockProductsResult = {
  success: boolean;
  count: number;
  products: Product[];
  errors?: Array<{
    index: number;
    error: string;
  }>;
};

export function useGenerateMockProducts() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [errors, setErrors] = useState<Array<{ index: number; error: string }>>([]);
  const [progress, setProgress] = useState(0);

  const generateMockProducts = async (options: GenerateMockProductsOptions): Promise<GenerateMockProductsResult> => {
    const { count, categoryId, includeImages, shopId } = options;

    if (!shopId) {
      toast.error("Shop ID is required");
      return { success: false, count: 0, products: [], errors: [{ index: -1, error: "Shop ID is required" }] };
    }

    setIsGenerating(true);
    setResults([]);
    setErrors([]);
    setProgress(0);

    const createdProducts: Product[] = [];
    const creationErrors: Array<{ index: number; error: string }> = [];

    try {
      // Generate and create products one by one
      for (let i = 0; i < count; i++) {
        try {
          const mockProductData = generateMockProduct(shopId, categoryId, includeImages);

          // Transform the mock data to match the expected CreateProductData structure
          const createProductData: CreateProductData = {
            product: mockProductData.product,
            variants: [
              {
                price: mockProductData.variant.price + "",
                stockQuantity: mockProductData.variant.stockQuantity + "",
                sku: mockProductData.variant.sku,
                images: mockProductData.variant.images,
                attributes: mockProductData.variant.attributes
              }
            ],
            shippingInfo: {
              weightAfterPackaging: `${Math.floor(Math.random() * 1000) + 100}g`,
              dimensions: {
                width: `${Math.floor(Math.random() * 30) + 5}cm`,
                length: `${Math.floor(Math.random() * 30) + 5}cm`,
                height: `${Math.floor(Math.random() * 30) + 5}cm`
              }
            }
          };

          // Call the actual product service to create the product
          const createdProduct = await ProductsService.createDraftProduct(createProductData);
          createdProducts.push(createdProduct);

          // Update state after each successful creation for better UX
          setResults(prev => [...prev, createdProduct]);
          setProgress(Math.round(((i + 1) / count) * 100));

          // Show toast for each product
          toast.success(`Created product ${i + 1}/${count}: ${mockProductData.product.name}`);
        } catch (err) {
          console.error(`Error creating product ${i + 1}:`, err);
          const errorInfo = {
            index: i,
            error: err instanceof Error ? err.message : 'Unknown error'
          };
          creationErrors.push(errorInfo);

          // Update errors state
          setErrors(prev => [...prev, errorInfo]);
          setProgress(Math.round(((i + 1) / count) * 100));

          // Show error toast
          toast.error(`Failed to create product ${i + 1}/${count}`);
        }
      }

      const result = {
        success: creationErrors.length === 0,
        count: createdProducts.length,
        products: createdProducts,
        errors: creationErrors.length > 0 ? creationErrors : undefined
      };

      return result;
    } catch (error) {
      console.error("Error generating mock products:", error);
      return {
        success: false,
        count: 0,
        products: [],
        errors: [{ index: -1, error: error instanceof Error ? error.message : "Unknown error" }]
      };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateMockProducts,
    isGenerating,
    results,
    errors,
    progress,
    reset: () => {
      setResults([]);
      setErrors([]);
      setProgress(0);
    }
  };
}

function generateMockProduct(shopId: string, categoryId: number, includeImages: boolean) {
  // Generate random product name
  const productNames = [
    "Ultra Smart Phone",
    "Cozy Sweater",
    "Ergonomic Office Chair",
    "Luxury Face Cream",
    "Vitamin C Supplement",
    "Interactive Board Game",
    "Bestselling Novel",
    "Professional Tennis Racket",
    "High-Performance Laptop",
    "Wireless Earbuds",
    "Stylish Handbag",
    "Running Shoes",
    "Smartwatch",
    "Gaming Console",
    "Electric Toothbrush",
    "Portable Bluetooth Speaker",
    "Compact Digital Camera",
    "Noise-Cancelling Headphones",
    "Fitness Tracker",
    "Smart Home Device",
    "Electric Kettle",
    "Air Purifier",
    "Robot Vacuum Cleaner",
    "Electric Bike",
    "Camping Tent",
    "Yoga Mat",
    "Kitchen Mixer",
    "Cordless Drill",
    "Pressure Cooker",
    "Electric Grill",
    "Smart Thermostat",
    "LED Desk Lamp",
    "Portable Charger",
    "Wireless Router",
    "Streaming Device",
    "Smart Light Bulb",
    "Electric Shaver",
    "Digital Photo Frame",
    "Cordless Vacuum Cleaner",
    "Smart Coffee Maker",
    "Electric Skillet",
    "Smart Air Fryer",
    "Electric Pressure Washer",
    "Smart Water Bottle",
    "Electric Blanket",
    "Smart Doorbell",
    "Electric Scooter",
    "Smart Security Camera",
    "Electric Fireplace",
    "Smart Mirror",
    "Electric Massage Gun",
    "Smart Pet Feeder",
    "Electric Wine Opener",
    "Smart Plant Monitor",
    "Electric Food Dehydrator",
    "Smart Sleep Tracker",
    "Electric Hair Straightener",
    "Smart Water Filter",
    "Electric Juicer",
    "Smart Scale",
    "Electric Can Opener",
    "Smart Air Quality Monitor",
    "Electric Food Processor",
    "Smart Humidifier",
    "Electric Hand Mixer",
    "Smart Pet Collar",
    "Electric Soap Dispenser",
    "Smart Shower Head",
    "Electric Toothbrush Sanitizer",
    "Smart Luggage Tracker",
    "Electric Nail File",
    "Smart Bike Lock",
    "Electric Foot Massager",
    "Smart Fridge Organizer",
    "Electric Hair Curler"
  ];
  const descriptions = [
    "The latest technology with advanced features for the modern user.",
    "Comfortable and stylish for everyday wear in all seasons.",
    "Designed for maximum comfort during long work hours.",
    "Premium ingredients for youthful, glowing skin.",
    "High-quality supplements for optimal health and wellness.",
    "Hours of fun for the whole family with this engaging game.",
    "Captivating storytelling that will keep you turning pages.",
    "Professional-grade equipment for serious athletes.",
    "Powerful performance for all your computing needs.",
    "Crystal clear sound quality for an immersive audio experience.",
    "Trendy and functional for the fashion-forward individual.",
    "Perfect for running or casual wear, combining style and comfort.",
    "Stay connected and track your fitness goals with this smartwatch.",
    "Next-gen gaming experience with stunning graphics and speed.",
    "Maintain oral hygiene with this advanced electric toothbrush.",
    "Portable sound system with deep bass and clear highs.",
    "Capture life's moments with this compact digital camera.",
    "Block out distractions with these noise-cancelling headphones.",
    "Monitor your health metrics with this sleek fitness tracker.",
    "Control your home environment with smart technology.",
    "Boil water quickly and efficiently with this electric kettle.",
    "Breathe cleaner air with this advanced air purifier.",
    "Keep your floors spotless with this robotic vacuum cleaner.",
    "Ride in style and comfort with this electric bike.",
    "Set up camp easily with this durable camping tent.",
    "Enhance your yoga practice with this high-quality mat.",
    "Mix ingredients effortlessly with this powerful kitchen mixer.",
    "Drill through tough materials with this cordless drill.",
    "Cook meals quickly with this versatile pressure cooker.",
    "Grill your favorite foods to perfection with this electric grill.",
    "Control your home's temperature efficiently with this smart thermostat.",
    "Illuminate your workspace with this stylish LED desk lamp.",
    "Charge your devices on the go with this portable charger.",
    "Ensure a strong internet connection with this wireless router.",
    "Stream your favorite shows seamlessly with this streaming device.",
    "Light up your home smartly with these energy-efficient bulbs.",
    "Achieve a close shave effortlessly with this electric shaver.",
    "Display your favorite photos beautifully with this digital frame.",
    "Clean your home efficiently with this cordless vacuum cleaner.",
    "Brew coffee to perfection with this smart coffee maker.",
    "Cook meals quickly and healthily with this electric skillet.",
    "Fry food with less oil using this smart air fryer.",
    "Clean your outdoor spaces with this electric pressure washer.",
    "Stay hydrated with this smart water bottle that tracks your intake.",
    "Stay warm and cozy with this electric blanket.",
    "Monitor your home's security with this smart doorbell.",
    "Get around town easily with this electric scooter.",
    "Keep an eye on your home with this smart security camera.",
    "Add warmth to your space with this electric fireplace.",
    "Check your appearance effortlessly with this smart mirror.",
    "Relieve muscle tension with this electric massage gun.",
    "Feed your pets automatically with this smart pet feeder.",
    "Open wine bottles effortlessly with this electric wine opener.",
    "Monitor your plants' health with this smart plant monitor.",
    "Dehydrate fruits and vegetables easily with this electric food dehydr  ator.",
    "Track your sleep patterns with this smart sleep tracker.",
    "Style your hair effortlessly with this electric hair straightener.",
  ];

  const price = Math.floor(Math.random() * 3601) + 10;

  // Get random product name and description based on category
  const randomIndex = Math.floor(Math.random() * Math.min(productNames.length - 1, descriptions.length - 1));
  const name = productNames[randomIndex] + " " + Math.floor(Math.random() * 10000);
  const brandId = String(Math.round(Math.random() * 36));
  const description = descriptions[randomIndex];



  const statuses = ["ACTIVE", "DRAFT", "ARCHIVED"] as const;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  const product = {
    shopId,
    name,
    categoryId,
    brand: {
      id: brandId,
    },
    coverImage: includeImages ? `https://picsum.photos/seed/${uuid}/640/480` : "",
    images: includeImages
      ? Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) =>
        `https://picsum.photos/seed/${uuid}-${i}/640/480`)
      : [],
    description,
    createdAt: new Date().toISOString(),
    specs: {
      brand: brandId, // Use brandId string directly
      packageSize: Math.floor(Math.random() * 100).toString(),
      activeIngredients: "Active Compound " + Math.floor(Math.random() * 10),
      ingredients: "Ingredient A, Ingredient B, Ingredient C",
      quantity: Math.floor(Math.random() * 100).toString(),
      responsibleManufacturingAddress: "123 Factory St, Manufacturing City, MC 12345",
      weightValue: Math.floor(Math.random() * 100).toString(),
      weightUnit: ["g", "kg", "ml", "l"][Math.floor(Math.random() * 4)],
      packagingType: ["Type A", "Type B", "Type C"][Math.floor(Math.random() * 3)],
      productSize: ["Small", "Medium", "Large"][Math.floor(Math.random() * 3)],
      packagingMaterial: ["Plastic", "Paper", "Glass"][Math.floor(Math.random() * 3)]
    },
    status: randomStatus,
  };
  // Generate random ID (UUID-like format)

  const variant = {
    price,
    stockQuantity: Math.floor(Math.random() * 1000) + 10,
    sku: "SKU" + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
    images: includeImages
      ? Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) =>
        `https://picsum.photos/seed/${uuid}-${i}/640/480`)
      : [],
    attributes: {
      color: ["Red", "Blue", "Green", "Black", "White"][Math.floor(Math.random() * 5)],
      size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
    }
  };

  return {
    product,
    variant
  };
}
