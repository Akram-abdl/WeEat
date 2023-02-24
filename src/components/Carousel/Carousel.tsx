import React, { useState } from 'react';
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
import { Recipe } from '../../interfaces/Recipe';

function CarouselComponent() {
  // TO REMOVE : test values
  const data: Recipe[] = [
    {
      id: 654959,
      title: 'Pasta With Tuna',
      image: 'https://spoonacular.com/recipeImages/654959-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654857,
      title: 'Pasta On The Border',
      image: 'https://spoonacular.com/recipeImages/654857-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654883,
      title: 'Pasta Vegetable Soup',
      image: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654883,
      title: 'Pasta Vegetable Soup',
      image: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654883,
      title: 'Pasta Vegetable Soup',
      image: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
      imageType: 'jpg',
    },
  ];

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState<Slider | null>(null);

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
        position="absolute"
        left="0%"
        bottom="50%"
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <ArrowBackIcon />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        position="absolute"
        right="0%"
        bottom="50%"
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
        infinite
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        initialSlide={0}
        centerMode
        centerPadding="15%"
        ref={(sliderItem) => setSlider(sliderItem)}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
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
