import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { createUser } = useContext(AuthContext);

    const onSubmit = data =>{
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            Swal.fire("Signup successful");
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
            </div>
        </div>
    </div>
        </>
    );
};

export default SignUp;