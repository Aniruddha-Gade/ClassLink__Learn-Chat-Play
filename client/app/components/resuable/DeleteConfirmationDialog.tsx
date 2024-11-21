import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "../ui/dialog";
import { Button } from "../ui/button";
import { TriangleAlert } from 'lucide-react'

type DeleteConfirmationDialogProps = {
  dialogTriggerItem: any;
  onConfirm: () => void;
};



const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  onConfirm, dialogTriggerItem
}) => {

  const [isOenDialog, setIsOenDialog] = useState(false)

  return (
    <Dialog open={isOenDialog} onOpenChange={setIsOenDialog}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        {dialogTriggerItem}
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="max-w-md  shadow-lg rounded-lg">
        <DialogHeader>

          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-red-600">
            <TriangleAlert />
            Confirm Deletion
          </DialogTitle>

          <DialogDescription className="mt-2 text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this item?<br /> This action cannot be
            undone, and all associated data will be permanently removed from our
            servers.
          </DialogDescription>
        </DialogHeader>

        {/* Actions */}
        <div className="flex justify-end mt-6 space-x-4">
          {/* Cancel Button */}
          <Button
            variant="secondary"
            onClick={() => setIsOenDialog(false)}
          >
            Cancel
          </Button>

          {/* Confirm Button */}
          <Button
            onClick={() => {
              onConfirm()
              setIsOenDialog(false)
            }}
            className="bg-red-500 dark:bg-red-500 text-white dark:text-white hover:bg-red-600 dark:hover:bg-red-600 "
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
