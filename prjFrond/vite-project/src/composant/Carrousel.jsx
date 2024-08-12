import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/body.css'; // Importez vos styles CSS ici

function Carrousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="carousel-wrapper"> {/* Créez un conteneur pour le carrousel */}
            <Slider {...settings}>
                <div>
                    <img src="../img1.jpg" alt="Image 1" width={800} height={300} />
                </div>
                <div>
                    <img src="../img2.jpg" alt="Image 2" width={800} height={300} />
                </div>
                <div>
                    <img src="../img3.jpg" alt="Image 3" width={800} height={300} />
                </div>
                <div>
                    <img src="../img4.jpg" alt="Image 4" width={800} height={300} />
                </div>
                <div>
                    <img src="../img5.jpg" alt="Image 5" width={800} height={300} />
                </div>
                {/* Ajoutez d'autres éléments div pour chaque image */}
            </Slider>
        </div>
    );
}

export default Carrousel;
