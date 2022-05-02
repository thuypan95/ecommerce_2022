import classes from './BreadcrumbItem.module.css';

const BreadcrumbItem = (props) => {
    return <>
        {
            <li className={`flex items-center relative ${props.active ? '' : 'mr-5 pr-5'} ${classes.breadcrumbItem}`}>
                <span
                    onClick={() => {
                        !props.active && props.history.push('/' + props.link)
                    }}
                    className={`inline-block ${props.active ? 'text-gray-300' : 'cursor-pointer'}`}>{props.message}</span>
            </li>

        }
    </>
}
export default BreadcrumbItem;