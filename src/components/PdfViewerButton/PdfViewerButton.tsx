import { HiOutlineEye } from "react-icons/hi2";
import { FileWithPreview } from "../../pages/Facturacion/types";

type Props = {
  file: FileWithPreview;
  text: string;
  iconSize: number;
};

function PdfViewerButton({ file, text, iconSize }: Readonly<Props>) {
  return (
    <a
      href={URL.createObjectURL(file)}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group h-full w-full cursor-pointer flex items-center justify-center dark:text-white"
    >
      {text}
      {/* Layout con icono al hacer hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-500 text-white text-sm rounded transition-opacity duration-200 opacity-0 group-hover:opacity-100">
        <HiOutlineEye size={iconSize} />
      </div>
    </a>
  );
}

export default PdfViewerButton;
