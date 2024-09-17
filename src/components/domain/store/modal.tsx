"use client";

/* import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react';
import { Fragment } from 'react';

import IconButton  from '@/components/domain/store/icon-button'; */
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children
}) => {
  return (
    <Dialog>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
};

export default Modal;