import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
    return (
        <Layout title={'About us - eCommerce app'}>
           <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ducimus nostrum ut id tenetur aspernatur, ipsa voluptas porro excepturi esse illo maxime odit delectus a atque neque culpa nihil sequi totam rerum quod. Maxime qui soluta voluptate similique nam libero.
          </p>
        </div>
      </div>
        </Layout>
    );
};

export default About;