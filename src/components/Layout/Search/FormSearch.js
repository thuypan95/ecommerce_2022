import Search from '@material-ui/icons/Search';
import { useEffect, useRef, useState } from 'react';
import PortalSearch from './PortalSearch';
import axios from 'axios';
import { baseURL, domainProduct } from '../../../api';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../redux/ui-slice';
import { checkDeviceType } from '../../../functions';
import config from '../../../config';
const InputSearch = () => {
    const isOpenDrawerSearch = useSelector(state => state.ui.isOpenDrawer.search);
    const dispatch = useDispatch();
    let history = useHistory();
    const inputRef = useRef();
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(textSearch);
    const [results, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const device = checkDeviceType();
    useEffect(() => {
        const boundingClientRect = inputRef.current.getBoundingClientRect();
        const x = parseFloat(boundingClientRect.left);
        const y = parseFloat(boundingClientRect.top) + parseFloat(boundingClientRect.height);
        const w = parseFloat(boundingClientRect.width);
        setTop(y);
        setLeft(x);
        setWidth(w);
    }, []);
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(textSearch)
        }, 500);

        return () => {
            clearTimeout(timerId);
        }
    }, [textSearch]);
    useEffect(() => {
        const search = async () => {
            setIsLoading(true);
            await axios.get(`${baseURL}${domainProduct}?name_contains=${debouncedTerm}`)
                .then(response => {
                    setIsLoading(false);
                    const data = response.data;
                    setResult(data);
                })
        }
        if (debouncedTerm) {
            setIsOpenSearch(true);
            search();
        }

    }, [debouncedTerm]);
    useEffect(() => {
        if (isOpenDrawerSearch) {
            setIsOpenSearch(false);
            inputRef.current.focus();
        }

    }, [isOpenDrawerSearch]);
    const handleInputChange = (value) => {
        setTextSearch(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/category?search=' + textSearch);
        setIsOpenSearch(false);

    }
    const handleClickItem = (rs) => {
        history.push('/product/' + rs.id);
        dispatch(uiActions.toggleOpenDrawer('search'));
        setTextSearch('');
        setResult([]);
    }
    return <>
        {device !== config.isMobile ?
            <div className="">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            className="focus:outline-none h-11 border rounded-3xl px-4 w-126"
                            ref={inputRef}
                            value={textSearch}
                            onChange={(e) => handleInputChange(e.target.value)} />
                        <button className=" h-11 absolute right-0 w-16 rounded-r-full bg-green-600">
                            <Search style={{ fill: "white" }} /></button>
                    </div>
                </form>
                {isOpenSearch &&
                    <PortalSearch top={top} left={left} width={width} onClose={() => { setIsOpenSearch(false) }}>
                        <div>
                            {
                                isLoading ? <div>Loading...</div> :
                                    results.length > 0 ?
                                        results.map(rs => {
                                            return <div key={rs.id} className="cursor-pointer py-1" onClick={() => history.push('/product/' + rs.id)}>{rs.name}</div>
                                        }) :
                                        <div>NO RESULT</div>
                            }
                        </div>
                    </PortalSearch>
                }
            </div>
            :
            <div className="lg:hidden p-3.5">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            className="focus:outline-none h-11 border rounded-3xl px-4 w-full"
                            ref={inputRef}
                            value={textSearch}
                            onChange={(e) => handleInputChange(e.target.value)} />
                        <button className=" h-11 absolute right-0 w-16 rounded-r-full bg-green-600">
                            <Search style={{ fill: "white" }} /></button>
                    </div>
                </form>
                {isOpenSearch &&
                    <div>
                        {
                            isLoading ? <div>Loading...</div> :
                                results.length > 0 ?
                                    results.map(rs => {
                                        return <div key={rs.id} className="cursor-pointer py-1" onClick={handleClickItem.bind(null, rs)}>{rs.name}</div>
                                    }) :
                                    <div>NO RESULT</div>
                        }
                    </div>
                }
            </div>
        }
    </>
}
export default InputSearch