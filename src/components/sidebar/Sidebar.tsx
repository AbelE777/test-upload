import { Card, List } from "@material-tailwind/react";
import SimpleOptions from "./SimpleOptions";
import AccordionOptions from "./AccordionOptions";
import { doctorMenuOptionsArr, adminMenuOptionsArr } from "./options";
import { DarkModeToggle } from "..";
import { currentUserSelector } from "../../recoil/selectors";
import { useRecoilValue } from "recoil";

export default function Sidebar() {
  const { user } = useRecoilValue(currentUserSelector);
  const { isAdmin } = useRecoilValue(currentUserSelector);

  return (
    <div className="sticky top-0 h-screen max-h-screen overflow-y-auto  dark:border-gray-800 dark:border-r">
      <Card className="dark:bg-gray-900 h-[calc(100vh-2rem)] rounded-none sticky w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <List>
          <SimpleOptions
            menuOptionsArr={
              isAdmin ? adminMenuOptionsArr : doctorMenuOptionsArr
            }
          />
          <DarkModeToggle />
        </List>
      </Card>
    </div>
  );
}
