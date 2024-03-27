import { toast } from "react-toastify";

const CONSTANTS:any = {
    // show toast
    showToastFunc: (text:string, status: string)=>{
        const options:any = {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
        if(status == "success"){
            toast.success(text, options);
        }else if(status == "error"){
            toast.error(text, options);
        }
    }
}
export default CONSTANTS;