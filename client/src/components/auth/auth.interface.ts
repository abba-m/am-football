export interface AuthComponentProps {
  isOpen: boolean;
  onClose: () => void;
  openRegister?: () => void;
  openLogin?: () => void;
}
