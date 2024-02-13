<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<p>
	Description list from <a href="https://dummyjson.com/docs/products">
		https://dummyjson.com/docs/products</a>
</p>
<div><img src={data.products.thumbnail} alt = "thumbnailFromList" /></div>
<div>{data.products.title}</div>
<div>{data.products.price}</div> 
<div>{data.products.description}</div>
<div>{data.products.title}</div>

{#each data.products.images as imageSrs}
	<div><img src={imageSrs} alt = "productImage" /></div>
{/each}	