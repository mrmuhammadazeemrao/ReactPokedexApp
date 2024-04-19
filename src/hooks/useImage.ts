const useImage: any = () => {
  const generateImageUrl = (index: number) =>
    `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index}.svg`;

  return generateImageUrl;
};

export default useImage;
