import { useState } from "react";
import TabDesciption from "./TabDesrciption";
import TabReturn from "./TabReturn";


const TabProduct = (props) => {
    const [active, setActive] = useState('description')
    const listTab = [
        { label: 'Description', tab: 'description' },
        { label: 'Delivery Policy', tab: 'delivery' },
        { label: 'Returns & Exchanges policy', tab: 'return' },

    ]
    const handleChangeTab = (item) => {
        setActive(item.tab);
    }
    return <div className="bg-gray-100 py-8 mt-10 md:py-16 md:mt-24 px-3 lg:px-0">
        <div className="container">
            <div className="flex mb-8">
                {listTab.map((item, index) => (
                    <div
                        key={item.tab}
                        className={`py-2 uppercase font-bold cursor-pointer text-xs
                        ${index + 1 - listTab.length === 0 ? 'text-right' : 'mr-6 text-center md:text-left'}
                        ${active === item.tab ? 'text-gray-900 border-b-4 border-gray-900' : 'text-gray-400'}`}
                        onClick={handleChangeTab.bind(null, item)} >
                        {item.label}</div>
                )
                )}
            </div>
            {
                active === listTab[0].tab && <div><div dangerouslySetInnerHTML={{ __html: props.detail.description }} />
                </div>
            }
            {
                active === listTab[1].tab && <TabDesciption />
            }
            {
                active === listTab[2].tab && <div><TabReturn /></div>
            }


        </div>

    </div>
}
export default TabProduct;