import { X } from "lucide-react";
import DaumPostCode, { type Address } from "react-daum-postcode";

interface AddressModalProps {
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: (data: Address) => void;
}

export default function AddressModal({
  setAddressModal,
  onComplete,
}: AddressModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md shadow-lg max-w-lg w-full relative">
        <button
          type="button"
          onClick={() => setAddressModal(false)}
          className="absolute top-2 right-4 text-xl font-bold"
        >
          <X />
        </button>
        <div className="mt-6">
          <DaumPostCode onComplete={onComplete} autoClose={false} />
        </div>
      </div>
    </div>
  );
}
