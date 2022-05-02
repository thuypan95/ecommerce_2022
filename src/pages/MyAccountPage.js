import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../components/Layout/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Layout/Breadcrumb/BreadcrumbItem";

const MyAccountPage = () => {
    const isLogin = useSelector(state => state.auth.isLogin);
    const history = useHistory();

    useEffect(() => {

        if (!isLogin) {
            history.push('/sign-in');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>
        <Breadcrumb title="My account">
            <BreadcrumbItem message="My account" active={true} />
        </Breadcrumb>
        <div className="lg:container lg:py-16 lg:px-0 lg:mt-0 px-3 py-4 relative -mt-5 rounded-t-2xl lg:rounded-none bg-white">
            My account
        </div>
    </>
}
export default MyAccountPage;