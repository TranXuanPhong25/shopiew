export default  function ProductSpecifications(){
    return (
        <div className="overflow-hidden ">
            <h2 className="text-lg font-medium p-4 bg-muted/50">Product Specifications</h2>
            <div className="divide-y text-sm">
                <div className="grid grid-cols-3 p-4">
                    <span className="text-muted-foreground">Category</span>
                    <span>Bluetooth speakers</span>
                </div>
                <div className="grid grid-cols-3 p-4">
                    <span className="text-muted-foreground">Stock</span>
                    <span>2259</span>
                </div>
                <div className="grid grid-cols-3 p-4">
                    <span className="text-muted-foreground">Bluetooth Function</span>
                    <span>Yes</span>
                </div>
                <div className="grid grid-cols-3 p-4">
                    <span className="text-muted-foreground">Connection Type</span>
                    <span>Wireless</span>
                </div>
                <div className="grid grid-cols-3 p-4">
                    <span className="text-muted-foreground">Ships From</span>
                    <span>Binh Duong</span>
                </div>
            </div>
        </div>
    )
}