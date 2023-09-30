import { Card, List } from "@material-tailwind/react";
import SimpleOptions from "./SimpleOptions";
import AccordionOptions from "./AccordionOptions";
import { mainMenuOptionsArr, menuOptionsArr } from "./options";
import { DarkModeToggle } from "..";
import { currentUserSelector } from "../../recoil/selectors";
import { useRecoilValue } from "recoil";

export default function Sidebar() {
  const { user } = useRecoilValue(currentUserSelector);

  return (
    <div className="sticky top-0 h-screen max-h-screen overflow-y-auto  dark:border-gray-800 dark:border-r">
      <Card className="dark:bg-gray-900 h-[calc(100vh-2rem)] rounded-none sticky w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <List>
          {user.rol !== 3 && (
            <>
              <AccordionOptions mainMenuOptionsArr={mainMenuOptionsArr} />
              <hr className="my-2 border-blue-gray-50 dark:border-gray-700" />
            </>
          )}
          {/* SIMPLE OPTIONS */}

          <SimpleOptions menuOptionsArr={menuOptionsArr} />
          <DarkModeToggle />
        </List>
      </Card>
    </div>
  );
}
