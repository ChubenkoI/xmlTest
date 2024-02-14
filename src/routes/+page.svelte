<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1 class="text-3xl font-bold underline">
	Hello world!
  </h1>
<p>
	Description list from <a href="https://dummyjson.com/docs/products">
		https://dummyjson.com/docs/products</a>
</p>
<button class="btn btn-active btn-neutral">Neutral</button>
<div><img src={data.products.thumbnail} alt = "thumbnailFromList" /></div>
<div>{data.products.title}</div>
<div>{data.products.price}</div> 
<div>{data.products.description}</div>
<div>{data.products.title}</div>
<div class="carousel carousel-center rounded-box">
	<div class="carousel-item">
		{#each data.products.images as imageSrs} 
		<img src={imageSrs} alt ="productImage" />
		{/each}
			
	</div>
</div>


	
