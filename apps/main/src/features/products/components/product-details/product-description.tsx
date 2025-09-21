export default function ProductDescription({ description }: { description: string }) {
    return (
        <div className="divide-y text-sm">
            <h2 className="text-lg font-medium p-4 bg-muted/50">Product Descriptions</h2>

            <div className="p-4">
                {description.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">{line}</p>
                ))}
            </div>
        </div>
    )
}