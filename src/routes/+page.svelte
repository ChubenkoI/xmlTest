<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let searchData = '';
	let openDialog = false;
	let openCartSideBar = false;
	let countProductInCart = 0;
	let productsInCart= [];
	let productSumm = 0;
	const searchFunc = () => {
		console.log('searchFiled', searchData);
		fetch(`https://dummyjson.com/products/search?q=${searchData}`)
			.then((res) => res.json())
			.then((resData) => {
				data.products = resData.products;
			});
	};

	let productDataFormDialog = {};

	const getProductData = (product) => {
		console.log('product_25', product);
		productDataFormDialog = product;
	};
	const addProductToCart = (productData) =>{
	const isProductsInCart = productsInCart.find((product)=>product.id == productData.id);
		console.log(isProductsInCart);
		if(isProductsInCart === undefined){
			productsInCart.push(productData);
			console.log(productsInCart);
			countProductInCart = countProductInCart +1;
			productsInCart = productsInCart;
			countSum(productData);
		}
	}
	const countSum = ((productData)=>{
		productSumm =Math.round( productSumm + (productData.price - ((productData.price / 100) * productData.discountPercentage)));
	})
	const countProductSum = ((productData)=>{
		productSumm =Math.round( productSumm - (productData.price - ((productData.price / 100) * productData.discountPercentage)));

	})

	
</script>

<dialog class="modal" class:modal-open={openDialog}>
	<div class="modal-box">
		<form method="dialog">
			<button
				class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
				on:click={() => (openDialog = false)}>✕</button
			>
		</form>
		<h3 class="font-bold text-lg">{productDataFormDialog.title	}</h3>
		<div class="card card-compact bg-base-100 shadow-xl">
			<figure>
				<img src={productDataFormDialog.thumbnail} alt="Shoes" />
			</figure>
			<div class="card-body">
				<h2 class="card-title">{productDataFormDialog.category}</h2>
				<p>{productDataFormDialog.description}</p>
				<p>Remeins {productDataFormDialog.stock}</p>
				<div class="card-actions justify-between">
				<div> 
					{Math.round(product.price - (product.price / 100) * product.discountPercentage)} $ 
					</div>
					<button class="btn btn-primary"
					on:click={addProductToCart(productDataFormDialog)}> Buy Now </button>
				</div>
			</div>
		</div>
	</div>
</dialog>

<h1>List from dummyjson</h1>

<p>
	Description list from <a href="https://dummyjson.com/docs/products"
		>https://dummyjson.com/docs/products</a
	>
</p>

<div class="flex justify-between p-10">
	<div class="join">
		<input
			class="input input-bordered join-item"
			name="search"
			bind:value={searchData}
			placeholder="Search"
		/>
		<button class="btn join-item rounded-r-full" on:click={searchFunc}>Search</button>
	</div>
	<div class="indicator">
		<span class="indicator-item badge badge-secondary">{countProductInCart}</span> 
		<button class="btn btn-square" on:click={()=>(openCartSideBar = !openCartSideBar)}>
			<svg class="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

				<g id="cart">
				
				<path d="M8,16a2,2,0,1,0,2,2A2.002,2.002,0,0,0,8,16Zm0,3a1,1,0,1,1,1-1A1.0013,1.0013,0,0,1,8,19Z"/>
				
				<path d="M18,16a2,2,0,1,0,2,2A2.002,2.002,0,0,0,18,16Zm0,3a1,1,0,1,1,1-1A1.0013,1.0013,0,0,1,18,19Z"/>
				
				<path d="M21.7505,6.7759l-.5557,5A2.4979,2.4979,0,0,1,18.71,14H8.5A2.503,2.503,0,0,1,6,11.5v-5A1.5017,1.5017,0,0,0,4.5,5h-2a.5.5,0,0,1,0-1h2A2.503,2.503,0,0,1,7,6.5v5A1.5017,1.5017,0,0,0,8.5,13H18.71a1.4986,1.4986,0,0,0,1.4907-1.3345l.5556-5a1.5023,1.5023,0,0,0-.373-1.166A1.482,1.482,0,0,0,19.2656,5H10.5a.5.5,0,0,1,0-1h8.7656a2.5008,2.5008,0,0,1,2.4849,2.7759Z"/>
				
				</g>
				
				</svg></button>
	  </div>
</div>

<div class="drawer drawer-end"class:drawer-open="{openCartSideBar}">
	<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
	  <!-- Page content here -->
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
					<th>Description</th>
					<th>Rating</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each data.products as product, index}
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
									<div class="text-sm opacity-50 text-red-500 line-through">{product.price} $</div>
									<div class="text-sm opacity-50">
										{Math.round(product.price - (product.price / 100) * product.discountPercentage)} $
									</div>
								</div>
							</div>
						</td>
						<td>
							{product.description}
							<br />
							<span class="badge badge-ghost badge-sm">{product.brand}</span>
						</td>
						<td>
							<div class="rating">
								<input type="radio" name="rating-{index}" class="mask mask-star-2 bg-green-500" />
								<input type="radio" name="rating-{index}" class="mask mask-star-2 bg-green-500" />
								<input type="radio" name="rating-{index}" class="mask mask-star-2 bg-green-500" />
								<input
									type="radio"
									name="rating-{index}"
									class="mask mask-star-2 bg-green-500"
									checked
								/>
								<input type="radio" name="rating-{index}" class="mask mask-star-2 bg-green-500" />
							</div>
						</td>
						<th>
							<button class="btn btn-ghost btn-xs" on:click={getProductData(product)}>details</button>
						</th>
					</tr>
				{/each}
			</tbody>
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
	</div>
	</div> 
	<div class="drawer-side z-10">
	  <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
	  <ul class="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
		<!-- Sidebar content here -->
	{#if productsInCart.length}
		{#each productsInCart as product}
			<div class="flex items-center gap-3">
				<div class="avatar">
					<div class="mask mask-squircle w-12 h-12">
						<img src={product.thumbnail} alt="Avatar Tailwind CSS Component" />
					</div>
				</div>
				<div>
					<div class="font-bold">{product.title}</div>
					<div class="text-sm opacity-50 text-red-500 line-through">{product.price} $</div>
					<div class="text-sm opacity-50">
						{Math.round(product.price - (product.price / 100) * product.discountPercentage)}
						 $
					</div>
					
				</div>
				<div class="join">
					<button class="btn join-item" on:click= {() =>
						{if(product.count > 1){
							product.count = product.count - 1
							
							countProductSum(product)	
						}
						}}>
						<svg class =  "h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="#000000"/>
							</svg>
					</button>
					<div>
					  <div>
						<!-- Лічильник продукту в корзині -->
						<input 
							type="number" 
							readonly
							class="input input-bordered join-item w-20"  value={product.count}/>
					  </div>
					</div>
				<button class="btn join-item" on:click= {() =>
					{if(product.count !== product.stock){
						product.count = product.count + 1
						countSum(product)						


					}
					}}> 
					<svg class =  "h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#000000"/>
						</svg>
				</button>
				</div>
				
			</div>
			{/each}
			<div>Summa: {productSumm}</div>
		
	{:else}
			<svg class="" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" display="block">
				<title>cart_empty [#1163]</title>
				<desc>Created with Sketch.</desc>
				<defs></defs>
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="Dribbble-Light-Preview" transform="translate(-300.000000, -2999.000000)" fill="#000000">
						<g id="icons" transform="translate(56.000000, 160.000000)">
							<path d="M264,2839 L260,2839 L258,2839 L258,2851 L246,2851 L246,2853.184 C244.837,2853.597 244,2854.696 244,2856 C244,2857.657 245.343,2859 247,2859 C248.657,2859 250,2857.657 250,2856 C250,2854.696 249.163,2853.597 248,2853.184 L248,2853 L258,2853 L258,2853.184 C256.837,2853.597 256,2854.696 256,2856 C256,2857.657 257.343,2859 259,2859 C260.657,2859 262,2857.657 262,2856 C262,2854.696 261.163,2853.597 260,2853.184 L260,2841 L264,2841 L264,2839 Z M247,2854.951 L247.33,2855.068 C247.664,2855.187 248,2855.521 248,2856 C248,2856.551 247.551,2857 247,2857 C246.449,2857 246,2856.551 246,2856 C246,2855.521 246.336,2855.187 246.67,2855.068 L247,2854.951 L247,2854.951 Z M259,2854.951 C259.547,2855.145 260,2855.339 260,2856 C260,2856.551 259.551,2857 259,2857 C258.449,2857 258,2856.551 258,2856 C258,2855.339 258.453,2855.145 259,2854.951 L259,2854.951 Z" id="cart_empty-[#1163]"></path>
						</g>
					</g>
				</g>
			</svg>
	{/if}
	  </ul>
		
	  
	  
	  

	</div>
  </div>
  

