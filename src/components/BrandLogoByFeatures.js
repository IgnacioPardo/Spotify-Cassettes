import tdkLogo from "./icons/tdk.svg";
import sonyLogo from "./icons/sony.svg";
import maxellLogo from "./icons/maxell.svg";
import basfLogo from "./icons/basf.svg";

const brandLogos = [tdkLogo, sonyLogo, maxellLogo, basfLogo];

export const BrandLogoByFeatures = (features) => {
  var acousticness = features.acousticness;
  var energy = features.energy;
  var danceability = features.danceability;

  var value = ((acousticness + energy + danceability) * 100) % 4;
  return brandLogos[Math.floor(value)];
};

export const BrandLogoByID = (id) => {
  return brandLogos[id % 4];
};
