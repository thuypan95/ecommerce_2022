import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dropzone from "../UI/Dropzone";
import RatingReview from "../UI/Rating";
import { baseURL } from "../../api";
import { authHeader, displayDateTime } from "../../functions";
import LoadingList from "../UI/LoadingList";
const OrderDetail = ({ detail }) => {
    const [activeFit, setActiveFit] = useState(null);
    const listFit = [{ label: 'Too Small' }, { label: 'True to Fit' }, { label: 'Too Large' }]
    const history = useHistory();
    const [files, setFiles] = useState([]);
    const [valueRating, setValueRating] = useState(5);
    const [reviewContent, setReviewContent] = useState('');
    const [review, setReview] = useState(null);
    const [loadingReview, setLoadingReview] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errFit, setErrFit] = useState('');
    const [errContent, setErrContent] = useState('');
    const [errUpload, setErrUpload] = useState('');
    const handleFit = (label) => {
        setActiveFit(label)
        if (activeFit === label) {
            setActiveFit(null);
        }
    }
    const detailReview = () => {
        setLoadingReview(true);
        axios.get(`${baseURL}/reviews?order=${detail.id}`).then(response => {
            if (response.data) {
                setLoadingReview(false);
                setReview(response.data[0])
            }
            else
                setReview(null);
        }).then(err => {
            setLoadingReview(false);
        });
    }
    useEffect(() => {
        detailReview();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleChangeRating = (value) => {
        setValueRating(value);
    }

    const handleReview = () => {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        if (activeFit === null) { setErrFit('You must select one option') }
        else { setErrFit('') }
        if (reviewContent === '') { setErrContent('You must enter review') }
        else { setErrContent('') }
        if (files.length === 0) { setErrUpload('You must upload least one image or video') }
        else { setErrUpload('') }

        if (activeFit !== null && reviewContent !== '' && files.length !== 0)
            setLoadingUpload(true);
        axios.post(`${baseURL}/upload`, formData, authHeader())
            .then(response => {
                if (response.data) {
                    const data = {
                        rating: valueRating,
                        review_content: reviewContent,
                        order: detail,
                        fit: activeFit,
                        images: response.data,
                        product: detail?.dishes[0].id,
                        created_by: detail?.user_id?.username
                    }
                    axios.post(`${baseURL}/reviews`, data, authHeader()).then(response => {
                        setReview(response?.data);
                        setLoadingUpload(false);
                    }).catch(err => {
                        setLoadingUpload(false);
                        console.log(err)
                    })
                }
            })
            .catch(err => {
                setLoadingUpload(false);
                console.log(err)
            })
    }
    return <div className="lg:border-l lg:ml-6 lg:pl-6 lg:w-1/3 lg:mt-0 mt-6 w-full md:flex md:justify-between lg:block">

        <div className="md:w-1/2 lg:w-full">
            <h2 className="font-semibold text-sm">
                Order #{detail.number_order}
            </h2>
            <div className="mt-4">
                {detail.dishes.length > 0 && detail.dishes.map((item, index) => (
                    <div className="flex mt-3 text-xs" key={index}>
                        <img src={item.imgUrl} alt={item.name} className="w-10 rounded-sm" />
                        <div className="flex-1 mx-2">
                            <h2 className="cursor-pointer" onClick={() => history.push('/product/' + item.id)}>{item.name}</h2>
                            <span className="mt-2 text-gray-400">{item.size} - </span> <span className="text-gray-400  mt-2 uppercase">{item.color}</span>
                        </div>
                        <h2 className="font-semibold">${item.price}</h2>
                    </div>))}
            </div>
            <div className="flex justify-between my-4 border-b border-dotted pb-3 w-2/3 ml-auto">
                <span className="font-semibold text-xs">Shipping fee</span>
                <span className="font-semibold text-xs">$0.00</span>
            </div>
            <div className="flex justify-between w-2/3 ml-auto">
                <span className="font-semibold text-md">Total</span>
                <span className="font-bold text-md">${Number(detail.amount).toFixed(2)}</span>
            </div>
        </div>
        <div className="md:w-1/2 md:pl-8 lg:w-full lg:pl-0">
            <div>
                <p className="font-semibold text-sm mt-4 mb-1">Your shipping address :</p>
                <p className="text-xs italic text-gray-500">{detail.info_shipping.first_name} {detail.info_shipping.last_name}, {detail.info_shipping.phone_number}</p>
                <p className="text-xs italic text-gray-500">{detail.info_shipping.address}, {detail.info_shipping.city}, {detail.info_shipping.state}</p>
            </div>
            {detail.note !== null && <div>
                <p className="font-semibold text-sm mt-4 mb-1">Note your order :</p>
                <div className="bg-gray-100 p-2 text-xs border italic text-gray-500">
                    {detail.note}
                </div>
            </div>}
        </div>
        {
            loadingReview ? <LoadingList /> :
                review == null ? <div className="md:w-1/2 lg:w-full mt-4">
                    <h2 className="font-semibold text-sm">Your rating and reviews</h2>
                    <div className=" border px-3.5 py-6 flex flex-col items-center justify-center rounded-md mt-3">
                        <RatingReview handleChangeRating={handleChangeRating} valueRating={valueRating} readonly={false} />
                        <div className="w-full mt-4">
                            <p className="text-xs ml-1">Size & Fit of the product</p>
                            <div className="text-xs flex mt-2">
                                {
                                    listFit.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={handleFit.bind(null, item.label)}
                                            className={`${activeFit === item.label && 'border-green-600'} border  h-10 w-1/3 flex items-center justify-center mx-1 cursor-pointer `}>
                                            {item.label}
                                        </div>
                                    ))
                                }
                            </div>
                            {errFit !== '' && <p>{errFit}</p>}
                        </div>
                        <div className="w-full mt-4 px-1">
                            <p className="text-xs ml-1">Review content</p>
                            <textarea className="w-full rounded-lg border p-4 outline-none mt-2 block"
                                rows={3}
                                onChange={(event) => setReviewContent(event.target.value)} />
                            {errContent !== '' && <p>{errContent}</p>}
                        </div>
                        <div className="mt-4 px-1">
                            <p className="text-xs ml-1 mb-2">Upload images</p>
                            <Dropzone setFiles={setFiles} files={files} />
                            {errUpload !== '' && <p>{errUpload}</p>}
                        </div>
                        <button onClick={handleReview} disabled={loadingUpload} className="h-10 bg-black text-white px-4 rounded-sm">
                            {loadingUpload ? 'Loading...' : 'ADD REVIEW'}
                        </button>
                    </div>
                </div> : <div className="md:w-1/2 lg:w-full mt-4">
                    <h2 className="font-semibold text-sm">Your rating and reviews:</h2>
                    <div className="flex justify-between items-center">
                        <RatingReview valueRating={review.rating} readonly={true} />
                        <p className="text-xs text-gray-500 italic">{displayDateTime(review.created_at)}</p>
                    </div>
                    <p className="mt-3 text-sm">Fitting of the product: {review.fit}</p>
                    <p className="text-xs text-gray-500">{review.review_content}</p>
                    <div className="mt-3">
                        {
                            review.images.length > 0 && review.images.map(file => (
                                <div className="inline-flex border rounded-sm my-2 mr-2 w-24 h-24" key={file.name}>
                                    <div className="flex overflow-hidden">
                                        <img
                                            alt=""
                                            src={baseURL + file.url}
                                            className="block object-cover" />
                                        {
                                            file.mime === "video/mp4" && <video width="320" height="240" controls>
                                                <source src={baseURL + file.url} type="video/mp4" />
                                                <source src={baseURL + file.url} type="video/ogg" />
                                                Your browser does not support the video tag.
                                            </video>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
        }
    </div>
}
export default OrderDetail;