const PageWrapper = ({ children }) => {
  return (
    <div className='flex flex-grow pb-[60px] flex-col z-[1] bg-transparent'>
      {children}
    </div>
  );
};

export default PageWrapper;
