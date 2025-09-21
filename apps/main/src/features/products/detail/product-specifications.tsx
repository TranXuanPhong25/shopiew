export default  function ProductSpecifications({specs}:{specs: Record<string, string>}) {
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