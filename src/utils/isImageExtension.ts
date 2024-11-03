export const isImageExtension = (filename: string) => {
  const extension = String(filename.split(".").pop()?.toLowerCase());

  if (["png", "jpg", "jpeg"].includes(extension)) {
    return true;
  } else return false;
};
