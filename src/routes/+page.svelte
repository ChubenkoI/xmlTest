<script>
	// import { TinySlider } from "svelte-tiny-slider"
	/** @type {import('./$types').PageData} */
	export let data;
	/** 
		git add .
		git commit -m "commitname"
		git push */
</script>

<h1 class="text-3xl font-bold underline">
	Hello world!
  </h1>
<p>
	Description list from <a href="https://dummyjson.com/docs/products">
		https://dummyjson.com/docs/products</a>
</p>
	<!-- {#each data.products as product} 
		<div><img src={product.thumbnail} alt = "thumbnailFromList" /></div>
		<div>{product.title}</div>
		<div>{product.price}</div> 
		<div>{product.description}</div>
		<div>{product.title}</div>
	{/each} -->	
  
   <div class="overflow-x-auto">
	<table class="table">
	 
	  <thead>
		<tr>
		  <th>
			<label>
			  <input type="checkbox" class="checkbox" />
			</label>
		  </th>
		  <th>Title</th>
		  <th>Prise</th>
		  <th>Description</th>
		  <th></th>
		</tr>
	  </thead>
	  <tbody>
		
		{#each data.products as product} 
		
		<tr>
			<th>
			  <label>
				<input type="checkbox" class="checkbox" />
			  </label>
			</th>
			<td>
			  <div class="flex items-center gap-3">
				<div class="avatar">
				  <div class="mask mask-squircle w-12 h-12">
					<img src={product.thumbnail} alt="Avatar Tailwind CSS Component" />
				  </div>
				</div>
				<div>
				  <div class="font-bold">{product.title}</div>
				  <div class="text-sm opacity-50">{product.category}</div>
				</div>
			  </div>
			</td>
			<td style="text-decoration: line-through;color:red">
				{product.price} 
				
			  <br/>
			<span class="badge badge-ghost badge-sm">
				{product.price - (product.price / 100) * product.discountPercentage } $</span>
			</td>
			<td>{product.description}</td>
			<th>
				<div class="rating">
					<input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" />
					<input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500"  />
					<input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" checked/>
					<input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" />
					<input type="radio" name="rating-4" class="mask mask-star-2 bg-green-500" />
				  </div>
			</th>
		  </tr>
		{/each}	
		
	  
	  <tfoot>
		<tr>
		  <th></th>
		  <th>Title</th>
		  <th>Prise</th>
		  <th>Description</th>
		  <th></th>
		</tr>
	  </tfoot>  
	</table>
  </div>

	
