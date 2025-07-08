import React from 'react';

const PodcastPage: React.FC = () => {
  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow p-10 pt-10 pb-10 my-10 mx-4">
        <h1 className="text-2xl font-semibold mb-6 text-justify">The Nutrition Farming Podcast</h1>
        <p className="mb-4 text-base font-normal text-justify">
          Welcome to the Nutrition Farming Podcast – a must-listen for food producers dedicated to elevating the quality of their produce while embracing sustainable practices.
        </p>
        <p className="mb-4 text-base font-normal text-justify">
          Every episode is brimming with actionable strategies to help you enhance your farm's profitability, boost productivity, and champion sustainability. This podcast is more than just advice; it's a roadmap to rediscovering the joy and fulfillment in one of the world's most vital professions.
        </p>
        <p className="mb-4 text-base font-normal text-justify">
          Join Graeme Sait, a globally recognized expert in regenerative agriculture, as he delves into the science and art of producing healthier, tastier, and more nutrient-dense food. Whether you're tackling soil health, fine-tuning crop nutrition, or striving for environmental stewardship, this podcast equips you with the tools and knowledge to make a lasting impact – for your farm, your community, and the planet.
        </p>
        <p className="mb-20 text-base font-normal text-justify">
          Tune in and transform the way you farm, one insightful episode at a time.
        </p>
        <iframe
          src="https://castbox.fm/app/castbox/player/id2676038/id759341861?v=8.22.11&autoplay=0"
          frameBorder="0"
          width="100%"
          height="475"
          allow="autoplay"
          title="Nutrition Farming Podcast Player"
          className="rounded"
        />
      </div>
    </div>
  );
};

export default PodcastPage; 