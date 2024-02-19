<script>
	// import { TinySlider } from "svelte-tiny-slider"
	/** @type {import('./$types').PageData} */
	export let data;
	/** git commit -m "commitname"
		git add .
		git push */
</script>

<h1 class="text-3xl font-bold underline">
	Hello world!
  </h1>
<p>
	Description list from <a href="https://dummyjson.com/docs/products">
		https://dummyjson.com/docs/products</a>
</p>
	{#each data.products as product} 
		<div><img src={product.thumbnail} alt = "thumbnailFromList" /></div>
		<div>{product.title}</div>
		<div>{product.price}</div> 
		<div>{product.description}</div>
		<div>{product.title}</div>
	{/each}



<!-- <TinySlider>
	{#each data.products.images as item}
	  <img src={item} alt="" />
	{/each}
  
	<div slot="controls" let:setIndex let:currentIndex>
	  {#each items as _, i}
		<button
		  class:active={i == currentIndex}
		  on:click={() => setIndex(i)}
		  on:focus={() => setIndex(i)}>
		  <img src={item} alt="" height=60 />
		</button>
	  {/each}
	</div>
  </TinySlider> -->
  
  <!-- <div class="overflow-x-auto">
	<table class="table">
	 
	  <thead>
		<tr>
		  <th>
			<label>
			  <input type="checkbox" class="checkbox" />
			</label>
		  </th>
		  <th>Name</th>
		  <th>Job</th>
		  <th>Favorite Color</th>
		  <th></th>
		</tr>
	  </thead>
	  <tbody>
		
		{#each data.products.images as imageSrs} 
		
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
					<img src={imageSrs} alt="Avatar Tailwind CSS Component" />
				  </div>
				</div>
				<div>
				  <div class="font-bold">Hart Hagerty</div>
				  <div class="text-sm opacity-50">United States</div>
				</div>
			  </div>
			</td>
			<td>
			  Zemlak, Daniel and Leannon
			  <br/>
			  <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
			</td>
			<td>Purple</td>
			<th>
			  <button class="btn btn-ghost btn-xs">details</button>
			</th>
		  </tr>
		{/each}	
		
	  
	  <tfoot>
		<tr>
		  <th></th>
		  <th>Name</th>
		  <th>Job</th>
		  <th>Favorite Color</th>
		  <th></th>
		</tr>
	  </tfoot>  
	</table>
  </div> -->

	
