var adjectives = ['Hot', 'Fast', 'Miniature', 'Red', 'Western', 'Fancy'];
var nouns = ['Rabbit', 'Dog', 'Cat', 'Deer', 'Frog', 'Fish'];

export const generateAnimalName = () => {
  const randomAdjIndex = Math.round(Math.random() * (adjectives.length - 1));
  const randomNumberNounIndex = Math.round(Math.random() * (adjectives.length - 1));
  const randomName = adjectives[randomAdjIndex] + ' ' + nouns[randomNumberNounIndex];

  return randomName;
};
