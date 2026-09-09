type ProductCardProps = {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

function ProductCard({id, name, price, inStock}:ProductCardProps){
    return(
        <>
            <div className="product">
                <p>{name}</p>
                <p>{price}</p>
                <p>{inStock ? "Available" : "Out of Stock"}</p>
            </div>
        </>
    );
}
export default ProductCard;