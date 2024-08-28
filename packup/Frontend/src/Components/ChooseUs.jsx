const ChooseUs = () => {
    return (
      <div id="chooseUs" className="flex flex-col lg:mx-40 items-center mx-[20px] mt-12 mb-[5rem]">
        <h2 className="title mb-20">Why Choose Us?</h2>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-[30px] text-center">
          <div className="shadow-lg rounded-3xl p-6 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2">Quality</h3>
            <p>We are committed to excellence in every aspect of our pizza-making process.</p>
          </div>
          <div className="shadow-lg rounded-3xl p-6 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2">Innovation</h3>
            <p>We constantly explore new flavors and techniques to keep our menu exciting.</p>
          </div>
          <div className="shadow-lg rounded-3xl p-6 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2">Community</h3>
            <p>We are proud to be a part of our local community and support local events and initiatives.</p>
          </div>
          <div className="shadow-lg rounded-3xl p-6 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2">Satisfaction</h3>
            <p>Your satisfaction is our top priority, and we strive to exceed your expectations every time.</p>
          </div>
        </div>
        <div className="mt-20 text-center">
          <h2 className="text-3xl mb-4">Join Us</h2>
          <p>
            Whether you are dining in, taking out, or ordering online, we invite you to experience the passion and dedication
            that goes into every pizza we make. Thank you for choosing PizzaHub, where pizza is our passion and
            your satisfaction is our mission.
          </p>
        </div>
      </div>
    );
  };
  
  export default ChooseUs;
