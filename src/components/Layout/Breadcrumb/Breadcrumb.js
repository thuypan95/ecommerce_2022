import { useHistory } from 'react-router-dom';
import classes from './Breadcrumb.module.css';
const Breadcrumb = (props) => {
    let history = useHistory();
    return <div className={`flex flex-col items-center justify-center relative h-40 md:h-60 px-3 ${classes.containerBreadcrumb}`}>
        <h2 className="text-xs md:text-3xl text-white z-10 font-semibold  uppercase">{props.title}</h2>
        <ul className="flex text-white z-10 mt-4 font-light text-xs md:text-md items-center justify-center flex-wrap">
            <li className="mr-5 pr-5">
                <span className="cursor-pointer" onClick={() => { history.push('/') }}>Home</span>
            </li>
            {
                props.children
            }
        </ul>
    </div>
}
export default Breadcrumb;