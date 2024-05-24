import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const { updateUserProfile, createUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data =>{
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photo)
            .then(() => {
                // create user entry successfully
                const userInfo = {
                    name: data.name,
                    email: data.email
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('user added to the database')
                        reset()
                        Swal.fire({
                            position:'top-end',
                            icon:'success',
                            title:'User created successfully',
                            showConfirmButton:false,
                            timer: 1500
                        });
                        navigate('/');
                    }
                })
                
            })
            .catch(error => console.log(error))
            
        })
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register</h1>
                 </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register('name', {required:true})} placeholder="Name" className="input input-bordered" required />
                        {
                            errors.name && <span className="text-red-500">Name is required</span>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" {...register('photo', {required:true})} placeholder="Photo URL" className="input input-bordered" required />
                        {
                            errors.photo && <span className="text-red-500">Photo URL is required</span>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                             <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email',{required:true})} placeholder="email" className="input input-bordered" required />
                        {
                            errors.email && <span className="text-red-500">Email is required</span>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register('password', {required:true, minLength:6, maxLength:20 , pattern:/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/})} placeholder="password" className="input input-bordered" required />
                        {
                            errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>
                        }
                        {
                            errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least six character</span>
                        }
                        {
                            errors.password?.type === 'maxLength' && <span className="text-red-500">Password at most twenty character</span>
                        }
                        {
                            errors.password?.type === 'pattern' && <span className="text-red-500">Password must be at least one uppercase one lower case one number one special character</span>
                        }
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Sign Up" />
                    </div>
                </form>
                <p className="text-center mb-5"><small>Already Registered? Please <Link to="/login"><span className="text-blue-500">Login</span></Link></small></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    </div>
        </>
    );
};

export default SignUp;