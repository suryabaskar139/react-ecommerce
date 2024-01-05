import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearAuthError, resetPassword } from "../../actions/userActions";
import { toast } from "react-toastify";


export default function ResetPassword(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const {token} = useParams();
    const { error,isAuthenticated } = useSelector(state => state.authState)

    const handleClick = (e) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('password',password);
        formData.append('confirmPassword', confirmPassword);
        console.log(token);
        dispatch(resetPassword(formData,token))

    }

    useEffect(() => {
        if(isAuthenticated){
            toast('updated',{
                type :'success',
                position : toast.POSITION.TOP_RIGHT
            })
            setPassword('')
            setConfirmPassword('')
            navigate('/')
        }
        if(error){
            toast(error, {
                type: 'error',
                position : toast.POSITION.TOP_RIGHT,
                onOpen: ()=> { dispatch(clearAuthError) }
            })
        }
    },[isAuthenticated,error, navigate, dispatch])


    return(
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={handleClick}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={ e => {setPassword(e.target.value)}}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={ e=> {setConfirmPassword(e.target.value)}}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
    )
}