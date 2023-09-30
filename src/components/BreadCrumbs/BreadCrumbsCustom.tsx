import { Breadcrumbs } from "@material-tailwind/react";
import { HiChevronRight } from "react-icons/hi2";
import { HiOutlineHome } from "react-icons/hi2";
import { Link } from "react-router-dom";

interface Props {
  labels: Array<Ia>;
}
interface Ia {
  label: string;
  link: string;
}

export function BreadcrumbsCustom({ labels }: Props) {
  return (
    <div className="flex md:block mx-auto  md:mx-14 md:justify-normal justify-center">
      <Breadcrumbs
        separator={
          <HiChevronRight className="h-4 w-4 text-white" strokeWidth={2.5} />
        }
        className="rounded-full border border-none bg-gradient-to-tr from-indigo-500 to-indigo-400 p-1"
      >
        <Link
          to="/"
          className="rounded-full bg-white px-3 py-1 font-medium text-gray-900"
        >
          <HiOutlineHome strokeWidth={2} />
        </Link>
        {labels.map((label) => (
          <Link
            key={label.link}
            to={label.link}
            className="rounded-full bg-white px-3 py-1 font-medium text-gray-900"
          >
            {label.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
