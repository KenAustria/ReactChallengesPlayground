import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const style = {
    container: {
      width: "100%",
      background: "#419be0"
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div style={style.container}>
      <Slider {...settings}>
        <div>
          <h1>A</h1>
        </div>
        <div>
					<h1>B</h1>
        </div>
        <div>
          <h1>C</h1>
        </div>
        <div>
          <h1>D</h1>
        </div>
        <div>
          <h1>E</h1>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
