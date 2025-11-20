import { X } from "lucide-react";
import { ModalStyle } from "../../styles";
import { Box, Modal } from "@mui/material";

export const BaseModal = ({
  open,
  onClose,
  children,
  title,
  showCloseButton = true,
}) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={ModalStyle} tabIndex={-1}>
      {title && (
        <div className="pb-4 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} className="text-gray-600" />
            </button>
          )}
        </div>
      )}
      {children}
    </Box>
  </Modal>
);
