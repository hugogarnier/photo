import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { postArchive } from "@/utils/postArchive";
import { Archive } from "lucide-react";

export const ArchiveContestAlert = ({ id }: { id: number }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Archive className="cursor-pointer text-red-600 hover:text-red-800 dark:hover:text-red-400" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir archiver le concours ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Si vous archivez le concours, vous ne pourrez plus le modifier.
            Veuillez contacter un administrateur pour le réactiver.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => postArchive({ id })}>
            Archiver
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
