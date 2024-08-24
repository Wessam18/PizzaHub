import React, { useState } from 'react';
import { fetchContact } from '../api/contactApi'; // Import the API function

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contactData = {
        email: formData.email,
        message: `Name: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\nMessage: ${formData.message}`,
      };

      const response = await fetchContact(contactData);

      if (response) {
        setStatus('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: '',
        });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="h-[1000px]">
      <div className="lg:mx-40 mt-4 flex flex-col items-center justify-center bg-white rounded-[50px] py-20">
        <h2 className="title text-3xl mb-16">Contact Us</h2>
        <form
          className="flex flex-col gap-2 lg:w-full lg:px-40 px-[20px]"
          onSubmit={handleSubmit}
        >
          <div className="lg:flex gap-4">
            <input
              placeholder="Enter Your Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="lg:flex gap-4">
            <input
              placeholder="Enter Your Number"
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              placeholder="Enter Your Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <textarea
            className="w-full my-2 rounded-lg p-4 border-2 border-gray-200 text-xl text-slate-400"
            placeholder="Write Your Message..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            cols="30"
            rows="10"
          ></textarea>
          <div className="flex justify-center">
            <button className="bg-yellow-600 lg:w-1/3 m-0" type="submit">
              Submit
            </button>
          </div>
        </form>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default Contact;
