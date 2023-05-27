import cl from "./LoadingEllipsis.module.scss";

const LoadingEllipsis = () => {
  return (
    <div className={cl.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingEllipsis;
