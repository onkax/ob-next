import { useResourceProvider } from "../stores/resource";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function ReadMoreButton({
  onClick,
  readMore,
}: {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
  readMore: boolean;
}) {
  const { getResource } = useResourceProvider();
  return (
    <span
      className="flex cursor-pointer flex-row-reverse text-primary items-center leading-10"
      onClick={onClick}
    >
      <ChevronDownIcon
        className={`transition-rotate duration-300 ease-in stroke-primary h-4 w-4 ${
          !readMore ? "rotate-0" : "rotate-180"
        }`}
      />
      {getResource("general.text.readmore")}
    </span>
  );
}
