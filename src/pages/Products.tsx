import ProductCard from "../components/ProductCard";

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 75000,
        inStock: true,
    },
    {
        id: 2,
        name: "iPad",
        price: 55000,
        inStock: false,
    },
    {
        id: 3,
        name: "Mac",
        price: 185000,
        inStock: true,
    },
];

function Products() {
    return (
        <div>
            <h1>Products</h1>
            {
                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        inStock={product.inStock}
                    />
                ))
            }
        </div>
    )
}

export default Products;