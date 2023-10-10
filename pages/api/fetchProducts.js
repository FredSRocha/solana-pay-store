import products from "./products.json"

export default function handler(req, res) {
// If get request
    console.log(products);
    if (req.method === "GET") {
// Create a copy of products without the hashes and filenames
    console.log(req.query);

const productsNoHashes = products.filter(product=> product.currency === req.query.currency).map((product) => {

const { hash, filename, ...rest } = product;
return rest;
});

res.status(200).json(productsNoHashes);
}
else {
res.status(405).send(`Method ${req.method} not allowed`);
}
}