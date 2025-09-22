import { useProductPageContext } from "../../context";
import ExpandableParagraph from "./expandable-paragraph";

export default function ProductDescription() {
    const { product: { description } } = useProductPageContext();

    return (
        <div className="divide-y text-sm">
            <h2 className="text-lg font-medium p-4 bg-muted/50">Product Descriptions</h2>

            <div className="p-4 max-w-4xl mx-auto">
                <ExpandableParagraph text={description || 'No description available.'} />
            </div>
        </div>
    )
}