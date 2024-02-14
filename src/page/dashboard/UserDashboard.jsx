import React from 'react';
import CustomCard from '../../components/card/CustomeCard';
import { Stack } from '@mui/material';

function App() {
  const jsonDataArray = [
    {
      title: "Lizard 1",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      imageUrl: "/static/images/cards/contemplative-reptile.jpg",
      altText: "green iguana"
    },
    {
      title: "Lizard 2",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      imageUrl: "/static/images/cards/contemplative-reptile.jpg",
      altText: "green iguana"
    },
    {
      title: "Lizard 3",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      imageUrl: "/static/images/cards/contemplative-reptile.jpg",
      altText: "green iguana"
    },
    {
      title: "Lizard 4",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      imageUrl: "/static/images/cards/contemplative-reptile.jpg",
      altText: "green iguana"
    },
    {
      title: "Lizard 3",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      imageUrl: "/static/images/cards/contemplative-reptile.jpg",
      altText: "green iguana"
    },
    {
      title: "Lizard 3",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      imageUrl: "/static/images/cards/contemplative-reptile.jpg",
      altText: "green iguana"
    },
    {
      title: "Lizard 3",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      imageUrl: "/static/images/cards/contemplative-reptile.jpg",
      altText: "green iguana"
    },
  ];

  return (
    <Stack direction='row' sx={{display: 'flex',    flexWrap:' wrap',gap:'1% 1%' }}>
      {jsonDataArray.map((jsonData, index) => (
        <CustomCard key={index} jsonData={jsonData} />
      ))}
    </Stack>
  );
}

export default App;
