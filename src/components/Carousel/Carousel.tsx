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
import RecipeCard from '../RecipeCard/RecipeCard';
import { RecipeInformation } from '../../interfaces/RecipeInformation';

interface Props {
  recipes: RecipeInformation[]
}

function CarouselComponent({ recipes }: Props) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState<Slider | null>(null);

  return (
    <div style={{ width: '95vw', marginLeft: 'auto', marginRight: 'auto' }}>
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
          color="white"
          colorScheme="teal"
          backgroundColor="teal"
          aria-label="left-arrow"
          position="absolute"
          left="1%"
          bottom="50%"
          transform="translate(0%, -50%)"
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <ArrowBackIcon />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          color="white"
          colorScheme="teal"
          backgroundColor="teal"
          aria-label="right-arrow"
          position="absolute"
          right="1%"
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
          autoplay
          autoplaySpeed={5000}
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
          {recipes
            ? recipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            )) : <Spinner />}
        </Slider>
      </Box>
    </div>

  );
}

export default CarouselComponent;
