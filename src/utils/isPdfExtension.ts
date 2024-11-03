export const isPdfExtension = (filename: string) => {
  const extension = String(filename.split(".").pop()?.toLowerCase());

  if (extension === "pdf") {
    return true;
  } else return false;
};
