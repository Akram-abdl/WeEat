import React from 'react';
import {
  Box,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
// import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import CarouselCard from './CarouselCard';
import Recipe from '../../interfaces/Recipe';

function CarouselComponent() {
  // TO REMOVE : test values
  const data: Recipe[] = [
    {
      id: 654959,
      title: 'Pasta With Tuna',
      image: 'https://spoonacular.com/recipeImages/654959-312x231.jpg',
      imageType: 'jpg',
      nutrition: {
        nutrients: [
          {
            name: 'Fat',
            amount: 10.3185,
            unit: 'g',
          },
        ],
      },
    },
    {
      id: 654857,
      title: 'Pasta On The Border',
      image: 'https://spoonacular.com/recipeImages/654857-312x231.jpg',
      imageType: 'jpg',
      nutrition: {
        nutrients: [
          {
            name: 'Fat',
            amount: 19.8995,
            unit: 'g',
          },
        ],
      },
    },
    {
      id: 654883,
      title: 'Pasta Vegetable Soup',
      image: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
      imageType: 'jpg',
      nutrition: {
        nutrients: [
          {
            name: 'Fat',
            amount: 3.36382,
            unit: 'g',
          },
        ],
      },
    },
  ];

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  return (
    <Box
      position="relative"
      height="35rem"
      width="full"
      overflow="hidden"
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left="0%"
        bottom="0%"
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <ArrowBackIcon />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right="0%"
        bottom="0%"
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <ArrowForwardIcon />
      </IconButton>
      {/* Slider */}
      <Slider
        dots
        arrows={false}
        fade
        infinite
        autoplay
        speed={500}
        autoplaySpeed={5000}
        slidesToShow={1}
        slidesToScroll={1}
        ref={(sliderItem) => setSlider(sliderItem)}
      >
        {data
          ? data.map((recipe) => (
            <CarouselCard recipe={recipe} />
          )) : <Spinner />}
      </Slider>
    </Box>
  );
}

export default CarouselComponent;
