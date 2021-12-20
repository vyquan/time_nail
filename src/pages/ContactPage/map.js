import React from 'react';

const Map = () => {
  return (
    <section className="map-area padding-bottom-100px">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d36731.1752731323!2d105.76307168400422!3d21.033016869053537!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1633422810838!5m2!1sen!2sus"
                width={1170}
                height={450}
                style={{ border: 0 , maxWidth: '1170px'}}
               
                frameborder="0" 
                loading="lazy"
                title="This is a unique title"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
