export default function ProductDescription() {
    return (
        <div className="divide-y text-sm">
            <h2 className="text-lg font-medium p-4 bg-muted/50">Product Descriptions</h2>

            <div className="p-4">
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae
                    purus auctor, ultricies nunc in, suscipit nulla. Nullam nec enim nec erat fermentum lacinia. Sed ac
                    nibh at elit luctus tincidunt. Sed in velit in nisi ultrices venenatis. Nulla facilisi. Nullam vel
                    nisl nec nisi ultricies vestibulum. Sed nec mi nec metus ultrices ultricies. Nulla facilisi. Nullam
                    vel nisl nec nisi ultricies vestibulum. Sed nec mi nec metus ultrices ultricies.</p>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-medium">Product Highlights</h2>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Nullam nec enim nec erat fermentum lacinia.</li>
                    <li>Sed ac nibh at elit luctus tincidunt.</li>
                    <li>Sed in velit in nisi ultrices venenatis.</li>
                    <li>Nulla facilisi. Nullam vel nisl nec nisi ultricies vestibulum.</li>
                    <li>Sed nec mi nec metus ultrices ultricies.</li>
                </ul>
            </div>
        </div>
    )
}