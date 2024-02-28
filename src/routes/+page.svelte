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
		openDialog = true;
	};
	const addProductToCart = (productData) =>{
		productsInCart.push(productData);
		console.log(productsInCart);
		countProductInCart = countProductInCart +1;
		productsInCart = productsInCart;
		productSumm = productSumm + (productData.price - (productData.price / 100) * productData.discountPercentage);

	}
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
					{productDataFormDialog.price - (productDataFormDialog.price / 100) * productDataFormDialog.discountPercentage} $ 
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
										{product.price - (product.price / 100) * product.discountPercentage} $
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
	  <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
		<!-- Sidebar content here -->
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
					{product.price - (product.price / 100) * product.discountPercentage} $
				</div>
			</div>
		</div>
		{/each}
		<div>Summa: {productSumm}</div>
	  </ul>
	  

	</div>
  </div>
  

