const CollectionHome = () => {
    const classAnimation = 'transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-110';
    return <div className="lg:container md:pb-16 lg:px-0 px-3 py-6 md:py-0">
        <h2 className="text-center font-bold md:text-2xl mb-4"> DENIM COLLECTION</h2>
        <p className="text-center font-light text-xs md:w-2/4 m-auto text-gray-600 md:text-sm mb-8">Explore the best trends for girls and women at SaleHub! Clothes, shoes and cool accessories for a new season are available now at SaleHub online.</p>
        <div className="grid md:grid-rows-2 md:grid-cols-3 lg:gap-4 gap-3">
            <div className="md:row-span-2 md:col-span-2 overflow-hidden relative">
                <img className={`rounded-xl lg:rounded-none ${classAnimation}`} src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/banner_1_2048x.png" alt="" />
                <div className="caption absolute bottom-20 -translate-x-2/4	 transform left-2/4 text-center w-full">
                    <h2 className="uppercase font-bold text-3xl text-white tracking-wider mb-3">Denim - jacket</h2>
                    <p className="font-light tracking-widest text-white">14 Denim-Jacket Outfits to Live in Now That It Is Fall</p>
                    <button className="transition duration-500 ease-in-out border-white border-2 font-bold hover:text-black hover:bg-white py-3 px-10 mt-4 text-white">SHOP NOW</button>
                </div>
            </div>
            <div className="overflow-hidden relative">
                <img className={`rounded-xl lg:rounded-none ${classAnimation}`} src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/bn-2_676a7adf-ea7b-4fa1-8848-8517abdc2793_1512x.jpg" alt="" />
                <div className="caption absolute bottom-16 -translate-x-2/4	 transform left-2/4 text-center w-full">
                    <h2 className="uppercase font-bold text-3xl text-white tracking-wider mb-3">Denim mini skirt</h2>
                    <button className="transition duration-500 ease-in-out border-white border-2 font-bold hover:text-black hover:bg-white py-3 px-10 mt-4 text-white">SHOP NOW</button>
                </div>
            </div>
            <div className="overflow-hidden relative">
                <img className={`rounded-xl lg:rounded-none ${classAnimation}`} src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/banner_3_2048x.png" alt="" />
                <div className="caption absolute bottom-16 -translate-x-2/4	 transform left-2/4 text-center w-full">
                    <h2 className="uppercase font-bold text-3xl text-white tracking-wider mb-3">Hoodie demin</h2>
                    <p className="font-light tracking-widest text-white">Subtitle from happy customers</p>
                    <button className="transition duration-500 ease-in-out border-white border-2 font-bold hover:text-black hover:bg-white py-3 px-10 mt-4 text-white">SHOP NOW</button>
                </div>
            </div>
        </div>

    </div>
}
export default CollectionHome;