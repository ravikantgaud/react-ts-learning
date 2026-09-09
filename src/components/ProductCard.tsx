type ProductCardProps = {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

function ProductCard({ id, name, price, inStock }: ProductCardProps){
    return(
        <div className="product-card">
            <p>{name}</p>
            <p>
                {
                    new Intl.NumberFormat('en-IN', {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                    }).format(price)
                }
            </p>
            <p>{inStock ? "Available" : "Out of Stock"}</p>
        </div>
    );
}
export default ProductCard;