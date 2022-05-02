import Drawer from "rc-drawer";
import 'rc-drawer/assets/index.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import config from "../../config";
import { checkDeviceType } from "../../functions";
import { uiActions } from "../../redux/ui-slice";

const DrawerUI = (props) => {
    const dispatch = useDispatch();
    const device = checkDeviceType();
    const [width, setWidth] = useState(0);
    useEffect(() => {
        if (device === config.isMobile) {
            setWidth(320)
        }
        else {
            setWidth(400);
        }
    }, [device])

    return <Drawer
        handler={false}
        placement={props.typeDrawer === 'cart' ? "right" : "left"}
        level={null}
        width={width}
        open={props.isOpenDrawer}
        onHandleClick={() => { dispatch(uiActions.toggleOpenDrawer(props.typeDrawer)) }}
        onClose={() => { dispatch(uiActions.toggleOpenDrawer(props.typeDrawer)) }}>
        {props.children}
    </Drawer>
}
export default DrawerUI;