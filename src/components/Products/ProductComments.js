import { Reply } from "@material-ui/icons";
import { useRef, useState } from "react";
import LoadingList from "../UI/LoadingList";

const ProductComments = (props) => {
    const [showInputReply, setShowInputReply] = useState(-1);

    const { listComment, isLoadingComment, isErrorComment, setIsErrorComment, isErrorReply, setIsErrorReply, showReplies, setShowReplies } = props;
    const textareaRef = useRef(null);
    const toggleInputReply = (item) => {
        setShowInputReply(item.id)
    }
    const toggleShowReplies = (id) => {
        setShowReplies(id);
        if (showReplies === id) {
            setShowReplies(-1);
        }
    }
    if (isLoadingComment) {
        return <LoadingList />
    }

    const handleChange = (event) => {
        if (event.target.value === ' ') {
            textareaRef.current.style.height = "56px";
            setIsErrorComment(true)
        }
        else {
            setIsErrorComment(false)
            props.setContentComment(event.target.value);
            textareaRef.current.style.height = "56px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }
    const handleChangeReply = (event) => {
        if (event.target.value === '') {
            setIsErrorReply(true)
        }
        else {
            setIsErrorReply(false)
            props.setContentReply(event.target.value);
        }
    }
    return <div className="lg:container px-3 lg:pt-16 lg:px-0">
        <div className="w-1/2 mb-6">
            <h2 className="font-semibold text-md">Add a comment </h2>
            <p className="italic font-light text-xs text-gray-500 mb-2">Your email address will not be published. Required fields are marked</p>
            <textarea className="w-full rounded-lg border p-4 outline-none h-14"
                ref={textareaRef}
                onChange={handleChange}></textarea>
            {isErrorComment && <p className="text-red-500">You must enter comment </p>}
            <div className="text-right">
                <button
                    onClick={props.handleComment}
                    className="uppercase bg-blue-500 text-white h-10 rounded-sm px-5 mt-4 transition duration-300 ease-linear hover:bg-blue-800">
                    Add comment
                </button>
            </div>
        </div>
        <div className="flex flex-col-reverse">
            {
                listComment.length > 0 ?
                    listComment.map((item, index) => {
                        if (item.parent_id === 0) {
                            return <div key={item.id} className="bg-white p-4 rounded-lg mb-3">
                                <div className="flex items-center">
                                    <span className="font-bold w-6 h-6 text-gray-600 mr-3 flex justify-center items-center bg-gray-300 uppercase">
                                        {item?.users_permissions_user?.username.charAt(0)}
                                    </span>
                                    <span className="font-semibold">{item?.users_permissions_user?.username}</span>
                                </div>
                                <p className="ml-9 font-light text-gray-800 text-sm">{item.comment_content}</p>
                                <button className="text-gray-500 text-xs mt-3" onClick={toggleInputReply.bind(null, item)}>
                                    <Reply fontSize='small' /> Reply to</button>
                                {
                                    item.count_reply > 0 && <span className="text-gray-500 text-xs mt-3 ml-4 cursor-pointer"
                                        onClick={toggleShowReplies.bind(null, item.id)}>
                                        {item.count_reply} replies </span>}
                                {
                                    showInputReply === item.id && <div className="text-right w-1/2 ml-6">
                                        <textarea autoFocus
                                            className="w-full rounded-lg border p-4 outline-none mt-2 block"
                                            onChange={handleChangeReply}></textarea>
                                        {isErrorReply && <p className="text-red-500">You must enter content </p>}
                                        <button
                                            onClick={() => { setShowInputReply(-1) }}
                                            className=" mt-3 uppercase ">
                                            CANCEL
                                        </button>
                                        <button
                                            onClick={props.handleReply.bind(null, item, null)}
                                            className="ml-3 mt-3 uppercase bg-blue-500 text-white h-10 px-4 rounded-sm transition duration-300 ease-linear hover:bg-blue-800">
                                            {isLoadingComment ? 'Loading...' : 'REPLY'}
                                        </button>
                                    </div>
                                }
                                {
                                    showReplies === item.id && listComment.map((i, index) => {
                                        if (item.id === i.parent_id) {
                                            return <div className="ml-6 mt-4" key={i.id}>
                                                <div className="flex items-center">
                                                    <span className="font-bold w-6 h-6 text-gray-600 mr-3 flex justify-center items-center bg-gray-300 uppercase">
                                                        {i?.users_permissions_user?.username.charAt(0)}
                                                    </span>
                                                    <span className="font-semibold">{i?.users_permissions_user?.username}&nbsp;&nbsp;
                                                        {i?.users_permissions_user?.role === 3 &&
                                                            <span className="bg-yellow-500 text-white text-xs rounded-sm p-1" color="#eebc49">ADMIN</span>}
                                                    </span>
                                                </div>
                                                <p className="ml-9 font-light text-gray-800 text-sm"><span className="font-bold">{i.name_reply_to !== null ? `@${i.name_reply_to}:` : ''}</span> {i.comment_content}</p>
                                                <button className="text-gray-500 text-xs block mt-3" onClick={toggleInputReply.bind(null, i)}>
                                                    <Reply fontSize='small' /> Reply to</button>
                                                {showInputReply === i.id && <div className="text-right w-1/2 ml-6">
                                                    <textarea autoFocus className="w-full rounded-lg border p-4 outline-none mt-2 block"
                                                        rows={3}
                                                        onChange={handleChangeReply}></textarea>
                                                    {isErrorReply && <p className="text-red-500">You must enter content </p>}

                                                    <button
                                                        onClick={() => { setShowInputReply(-1) }}
                                                        className="">
                                                        CANCEL
                                                    </button>
                                                    <button
                                                        onClick={props.handleReply.bind(null, item, i)}
                                                        className="ml-3 mt-3 uppercase bg-blue-500 text-white h-10 px-4 rounded-sm transition duration-300 ease-linear hover:bg-blue-800">
                                                        {isLoadingComment ? 'Loading...' : 'REPLY'}
                                                    </button>
                                                </div>}
                                            </div>

                                        }
                                        else return null;
                                    })
                                }
                            </div>
                        }
                        else return null
                    }) : <p>No comments</p>}
        </div>
    </div>
}
export default ProductComments;