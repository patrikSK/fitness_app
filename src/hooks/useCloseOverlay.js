const useCloseOverlay = () => {
  const closeOverlayOnClick = (e) => {
    if (e.target.className === "overlay") {
      return false;
    }
    return true;
  };

  const closeOverlayOnEscape = (e) => {
    if (e.key === "Escape") {
      return false;
    }
    return true;
  };

  return { closeOverlayOnClick, closeOverlayOnEscape };
};

export default useCloseOverlay;
