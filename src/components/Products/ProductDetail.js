import axios from "axios";
import React from 'react';
import { useEffect, useRef, useState } from "react";
import { domainProduct, baseURL, domainComments } from "../../api";
import LoadingList from '../UI/LoadingList';
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import TabProduct from "./TabProductDetail";
import RelatedProduct from "./RelatedProduct";
import { fetchProductDataByCategory } from "../../redux/product-actions";
import { useSelector } from "react-redux";
import { authHeader, Toast } from "../../functions";
import { socket } from "../../socket";
import ProductInfo from "./ProductInfo";
import ProductComments from "./ProductComments";

const ProductDetail = (props) => {
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [detail, setDetail] = useState({});
    const [images, setImages] = useState([]);
    const [imgIndex, setImageIndex] = useState(0);
    const [isOpenLightBox, setIsOpenLightBox] = useState(false);
    const [selectColor, setSelectColor] = useState({});
    const [selectSize, setSelectSize] = useState({});
    const [errors, setErrors] = useState({});
    const [contentComment, setContentComment] = useState('');
    const [listComment, setListComment] = useState([]);
    const [isErrorComment, setIsErrorComment] = useState(false);
    const [isLoadingComment, setIsLoadingComment] = useState(false);
    const [showReplies, setShowReplies] = useState(-1);
    const [contentReply, setContentReply] = useState('');


    const [isErrorReply, setIsErrorReply] = useState(false);

    const inputRef = useRef();
    const listProductRelated = useSelector((state) => state.product.list);
    const isLoadingRelated = useSelector(state => state.ui.isLoading);

    const settings = {
        customPaging: function (i) {
            return (
                <span><img src={images[i]} alt="" /></span>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                customPaging: function (i) {
                    return (
                        <span />
                    );
                },
                dotsClass: "hidden",
            }
        }]
    };
    const fetchProductDetail = async () => {
        setIsLoading(true);
        await axios.get(`${baseURL + domainProduct}/${props.id}`)
            .then(response => {
                const data = response.data;
                props.setNameProduct(data.name);
                let arrImage = [];
                data.images.map(img => {
                    return arrImage.push(img.url)
                });
                setImages(arrImage);
                setDetail(data);
                setIsLoading(false);
                dispatch(fetchProductDataByCategory(data.categories[0].id));
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error)
            })
    }

    useEffect(() => {
        fetchProductDetail();
        getListComment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    const handleSelectColor = (color) => {
        setSelectColor({ id: color.id, name: color.name, code: color.color_code });
    }
    const handleSelectSize = (size) => {
        setSelectSize({ id: size.id, name: size.name });
    }
    const handleAddToCart = () => {
        let errorsAddToCart = {
            errColor: '', errSize: '', errQty: ''
        }
        const enterQuantity = Number(inputRef.current.value);
        if (enterQuantity <= 0) errorsAddToCart.errQty = 'Quantity must be large than 0';
        else errorsAddToCart.errQty = '';

        if (selectSize.id === undefined) errorsAddToCart.errSize = 'You must be select one size';
        else errorsAddToCart.errSize = '';

        if (selectColor.id === undefined) errorsAddToCart.errColor = 'You must be select one color';
        else errorsAddToCart.errColor = '';

        setErrors(errorsAddToCart);

        if (errorsAddToCart.errColor === '' && errorsAddToCart.errSize === '' && errorsAddToCart.errQty === '') {
            dispatch(cartActions.addItem({ ...detail, quantity: enterQuantity, color: selectColor.name, size: selectSize.name, colorId: selectColor.id, sizeId: selectSize.id }));
            Toast.success('Add to cart success');
        }
    }
    const getListComment = async () => {
        setIsLoadingComment(true);
        await axios.get(`${baseURL + domainComments}?product=${props.id}&_sort=created_at:ASC`)
            .then((response) => {
                const data = response.data;
                setListComment(data);
                setIsLoadingComment(false);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleComment = () => {
        if (contentComment !== '' && !isErrorComment) {
            setIsErrorComment(false);
            if (user.id) {
                setIsLoadingComment(true);
                setContentComment('');
                socket.emit('addComment', { comment_content: contentComment, users_permissions_user: user.id, product: detail },
                    (response) => {
                        if (response.err) {
                            setIsErrorComment(false);
                            Toast.error(response.err);
                        }
                        else {
                            setIsLoadingComment(false)
                            Toast.success('Comment added successfully!');
                            getListComment();
                        }
                    })
            }
            else { Toast.error('You must login!'); }
        }
        else { setIsErrorComment(true); }
    }
    const handleReply = (comment, reply) => {
        console.log("comment", comment, "reply", reply);
        if (contentReply !== '' && !isErrorReply) {
            if (user.id) {
                setIsErrorComment(false);
                setContentReply('');
                socket.emit('addComment', {
                    comment_content: contentReply, users_permissions_user: user.id,
                    product: detail, parent_id: comment.id, name_reply_to: reply?.users_permissions_user?.username
                },
                    (response) => {
                        if (response) {
                            const data = {
                                count_reply: comment.count_reply + 1
                            }
                            setIsLoadingComment(false)
                            Toast.success('Comment added successfully!');
                            axios.put(`${baseURL + domainComments}/${comment.id}`, data, authHeader()).then(() => {
                                setShowReplies(comment.id);
                                getListComment();
                            })
                        }
                    })

            }
            else { Toast.error('You must login!'); }
        }
        else { setIsErrorReply(true); }
    }
    if (isLoading) {
        return <LoadingList />
    }
    return <>
        <ProductInfo settings={settings}
            images={images}
            setIsOpenLightBox={setIsOpenLightBox}
            isOpenLightBox={isOpenLightBox}
            setImageIndex={setImageIndex}
            imgIndex={imgIndex}
            detail={detail}
            selectColor={selectColor}
            selectSize={selectSize}
            handleSelectColor={handleSelectColor}
            handleSelectSize={handleSelectSize}
            errors={errors}
            handleAddToCart={handleAddToCart}
            inputRef={inputRef} />
        <TabProduct
            handleReply={handleReply}
            setContentReply={setContentReply}
            setIsErrorReply={setIsErrorReply}
            isErrorReply={isErrorReply}
            setIsErrorComment={setIsErrorComment}
            isErrorComment={isErrorComment}
            listComment={listComment}
            handleComment={handleComment}
            getListComment={getListComment}
            setContentComment={setContentComment}
            contentComment={contentComment}
            detail={detail}
            isLoadingComment={isLoadingComment} />
        <ProductComments
            showReplies={showReplies}
            setShowReplies={setShowReplies}
            handleReply={handleReply}
            setContentReply={setContentReply}
            contentComment={contentComment}
            setIsErrorReply={setIsErrorReply}
            isErrorReply={isErrorReply}
            setIsErrorComment={setIsErrorComment}
            isErrorComment={isErrorComment}
            isLoadingComment={isLoadingComment}
            listComment={listComment}
            handleComment={handleComment}
            setContentComment={setContentComment} />
        <RelatedProduct listProductRelated={listProductRelated}
            isLoadingRelated={isLoadingRelated} />
    </>
}
export default ProductDetail;