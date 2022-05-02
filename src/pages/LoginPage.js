import FormLogin from "../components/Login/FormLogin";
import Breadcrumb from "../components/Layout/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Layout/Breadcrumb/BreadcrumbItem";
const LoginPage = () => {
    return <div>
        <Breadcrumb title="Sign in">
            <BreadcrumbItem message="Sign in" active={true} />
        </Breadcrumb>
        <div className="lg:container lg:py-16 lg:px-0 lg:mt-0 px-3 py-4 relative -mt-5 rounded-t-2xl lg:rounded-none bg-white">
            <FormLogin />
        </div>
    </div>
}
export default LoginPage;