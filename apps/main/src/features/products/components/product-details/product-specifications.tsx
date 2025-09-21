import { useProductPageContext } from "../../context";

export default  function ProductSpecifications() {
    const {product: { specs }} = useProductPageContext();
    if (!specs || Object.keys(specs).length === 0) {
        return null;
    }
    return (
        <div className="overflow-hidden ">
            <h2 className="text-lg font-medium p-4 bg-muted/50">Product Specifications</h2>
            <div className="divide-y text-sm">
                {
                    Object.entries(specs).map(([key, value]) => (
                        <div className="grid grid-cols-3 p-4" key={key}>
                            <span className="text-muted-foreground">{key}</span>
                            <span>{value}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}