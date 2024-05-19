import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle subHeading="check it out" heading="Featured Item"></SectionTitle>
            <div className="md:flex justify-center bg-slate-500 bg-opacity-40 items-center pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Quidem quaerat minus officiis, veritatis excepturi aut iusto, voluptate at beatae facere similique eligendi suscipit architecto quas error aliquid blanditiis expedita magnam sunt eaque voluptates consectetur. Nisi dicta doloribus atque ratione, ipsum quod nostrum, 
                        libero culpa voluptatem ducimus, quia sint repudiandae vero.</p>
                        <button className="btn btn-outline border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;