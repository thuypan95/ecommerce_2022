const ConfirmCheckout = ({ cart }) => {
    const shippingFee = 0;
    return <div className="md:w-1/2 md:ml-5 lg:ml-8">
        <h2 className="font-bold md:text-2xl mb-4 mt-4 md:mt-0">Your orders</h2>
        <div className="h-12 bg-gray-300 flex items-center text-center">
            <div className="w-2/3 font-bold text-sm">Product</div>
            <div className="w-1/3 font-bold text-sm">Total</div>
        </div>
        <div>
            {
                cart.items.map((item, index) => (
                    <div className="flex border-b" key={index}>
                        <div className="w-2/3 text-xs border-r h-12 flex items-center justify-center">{item.name}&nbsp; <span className="font-bold"> x {item.quantity}</span></div>
                        <div className="w-1/3 text-xs h-12 flex items-center justify-center font-semibold">${item.quantity * item.price}</div>
                    </div>
                ))
            }
            <div className="flex border-b">
                <div className="w-2/3 text-xs h-12 flex items-center justify-center font-bold">Cart subtotal</div>
                <div className="w-1/3 text-xs h-12 flex items-center justify-center font-semibold">${cart.totalPrice}</div>
            </div>
            <div className="flex border-b">
                <div className="w-2/3 text-xs h-12 flex items-center justify-center font-bold">Shipping</div>
                <div className="w-1/3 text-xs h-12 flex items-center justify-center font-semibold">${shippingFee.toFixed(2)}</div>
            </div>
            <div className="flex border-b">
                <div className="w-2/3 text-xs h-12 flex items-center justify-center font-bold">Order Total</div>
                <div className="w-1/3 text-xs h-12 flex items-center justify-center font-semibold">${shippingFee + cart.totalPrice}</div>
            </div>
        </div>
    </div>
}
export default ConfirmCheckout;