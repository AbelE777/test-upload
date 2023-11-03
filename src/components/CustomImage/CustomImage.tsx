interface FileWithPreview extends File {
  preview: string;
}

const CustomImage = ({ file }: { file: FileWithPreview }) => {
  return (
    <img
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
      src={file.preview}
      alt=""
      width={100}
      height={100}
      className="h-full w-full object-contain rounded-md"
    />
  );
};

export default CustomImage;
