interface TagProductProps {
  value?: number;
}

const TagProductSeller = (props: TagProductProps) => {
  const { value } = props;
  return value ? (
    <div className={'rounded-md w-max text-xs flex items-center justify-center p-1 bg-red-700 text-white'}>
      {value}%
    </div>
  ) : (
    <></>
  );
};

export default TagProductSeller;
