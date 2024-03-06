/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const request = await fetch("https://dummyjson.com/products?limit=10");
	const response = await request.json();
	

	response.products.forEach(product => {
		product.count = 1;
		product.sum=0;
	});
	console.log('response', response);
	return {
		products: response.products
	};
}