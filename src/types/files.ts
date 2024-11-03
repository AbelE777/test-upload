export interface GroupFilesInterface {
  id: number,
  group_name: string,
  createdAt: string,
  files: FileInterface[],
  user_id: UsuarioFileInterface
}

interface FileInterface {
  id_file: number,
  file_name: string,
  original_file_name: string,
  file_path: string,
  type: string,
  createdAt: string
}
interface UsuarioFileInterface  {
  id_usuario: number,
  usuario: string,
  profile_img: string
}