export const UVIndex = (uvIndex: number) => {
  function UvLabel() {
    if (uvIndex <= 2) {
      return <span>Low</span>;
    } else if (uvIndex <= 5) {
      return <span>Moderate</span>;
    } else if (uvIndex <= 7) {
      return <span>High</span>;
    } else if (uvIndex <= 10) {
      return <span>Very high</span>;
    } else {
      return <span>Extreme</span>;
    }
  }
  return (
    <span>
      UV {UvLabel()} ( {uvIndex} )
    </span>
  );
};
