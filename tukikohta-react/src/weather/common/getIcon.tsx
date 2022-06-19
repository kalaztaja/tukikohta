export const getIcon = (iconId: string) => {
  if (iconId) {
    const imageSource = "/weatherIcons/" + iconId + ".png";
    return <img src={imageSource} alt="Weather icon of forecast"></img>;
  }
  return <></>;
};
