import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import config from './config';
import { format as dateFormat } from 'date-fns';


export const Toast = {
    success: (title) => {
        return toast.success(title, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },
    error: (title) => {
        return toast.error(title, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}
export const SwalDelete = (callback) => {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            callback()

            Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
            )
        }
    })
}
export const SwalAlert = {
    delete: (callback) => {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                callback();

                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                )
            }
        })
    }
}

export const checkDeviceType = () => {
    let deviceType = config.isDesktop;
    if (isMobile)
        deviceType = config.isMobile;
    if (isTablet)
        deviceType = config.isTablet;
    if (isDesktop)
        deviceType = config.isDesktop;
    return deviceType

};
export const authHeader = () => {
    const data = JSON.parse(localStorage.getItem('persist:root'));
    const dataAuth = JSON.parse(data.auth);
    const token = dataAuth.token;

    if (token) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

    } else {
        return {};
    }
}
export const displayDateTime = (date) => {
    return dateFormat(new Date(date), 'dd/MM/yyyy HH:mm:ss');
}