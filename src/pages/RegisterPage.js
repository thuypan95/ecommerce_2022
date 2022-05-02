import FormRegister from "../components/Register/FormRegister";
import Breadcrumb from "../components/Layout/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Layout/Breadcrumb/BreadcrumbItem";
const RegisterPage = () => {
    return <div>
        <Breadcrumb title="Register">
            <BreadcrumbItem message="Register" active={true} />
        </Breadcrumb>
        <div className="container py-16">
            <FormRegister />
        </div>
    </div>
}
export default RegisterPage;