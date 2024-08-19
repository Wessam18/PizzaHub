import { about1, about2 } from "../images";
import { useState } from 'react';

const About = () => {
    const [showMore, setShowMore] = useState(false);  // State to control the visibility

    const toggleShowMore = () => {
        setShowMore(true);  // Toggle the state to show/hide additional content
    };
    return (
        <div>
            <style>
                {`
                    .title, h1 {
                        font-size: 1.5rem; /* Adjust size as needed */
                        font-weight: bold; /* Ensures the text is bold */
                        color: #333; /* Adjust color as needed */
                        margin-bottom: 20px; /* Adds space below the header */
                        margin-top: 10px; /* Adds space above the header */
                    }
                `}
            </style>
            <div id='about' className="lg:flex gap-20 items-center lg:mx-40 my-20 m-[20px]">
                <div className="flex gap-4">
                    <div><img src={about1} className="h-[300px] w-56 rounded-3xl" alt="About us image one" /></div>
                    <div><img src={about2} className="h-[300px] w-56 rounded-3xl" alt="About us image two" /></div>
                </div>
                <div className="lg:flex-1 w-full mx-auto justify-center">
                    <h2 className="title my-[20px]">About Us</h2>
                    <h2>Our Story</h2>
                    <p className="mb-[20px]">
                        At PizzaHub, we believe that pizza is more than just a meal; it is an experience.
                        Our journey began in 2024 with a simple dream: to make the most delicious pizza using the best ingredients
                        and share it with our community.
                        Our brand which started as a small, family-run has grown into a beloved local favorite,
                        and this return to our commitment to quality and innovation.
                    </p>
                    <h2>Our Mission</h2>
                    <p>
                        We are the masters of pizza-making, dedicated to perfecting our craft and delighting our customers with every bite.
                        Our mission is to bring joy to your table with pizzas that are as memorable as they are delicious.
                        Whether you are a fan of classic flavors or adventurous new combinations, we have something special for everyone.
                    </p>
                    {!showMore && <button onClick={toggleShowMore}>Read More</button>}
                    {showMore && (
                        <>
                            <h2>Our Ingredients</h2>
                            <p>
                                At PizzaHub, we are passionate about using only the freshest and highest quality ingredients.
                                From our homemade dough to our rich, flavorful sauces and premium toppings, every pizza is made with love and care.
                                We work closely with local suppliers to ensure that each ingredient meets our exacting standards.
                            </p>
                            <h2>Our Team</h2>
                            <p>
                                Our team is made up of passionate pizza enthusiasts who are dedicated to providing the best possible experience for
                                our customers. From our skilled chefs to our friendly staff,
                                everyone at PizzaHub shares a common goal: to make every visit a memorable one.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;
