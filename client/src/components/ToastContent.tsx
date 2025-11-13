import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (msg: string) => {
  toast.success(
    <div className="flex items-start gap-3">
      <CheckCircle className="text-green-500 mt-1" size={20} />
      <div>
        <p className="font-semibold text-sm text-gray-900">{msg}</p>
        <p className="text-xs text-gray-500 mt-1">Thao tác thành công 🎉</p>
      </div>
    </div>,
    {
      className: '!bg-white !text-gray-800 !rounded-xl !shadow-lg !border !border-gray-200',
      progressClassName: '!bg-green-500',
      icon: false,
    },
  );
};

export const notifyError = (msg: string) => {
  toast.error(
    <div className="flex items-start gap-3">
      <XCircle className="text-red-500 mt-1" size={20} />
      <div>
        <p className="font-semibold text-sm text-gray-900">{msg}</p>
        <p className="text-xs text-gray-500 mt-1">Vui lòng thử lại sau!</p>
      </div>
    </div>,
    {
      className: '!bg-white !text-gray-800 !rounded-xl !shadow-lg !border !border-gray-200',
      progressClassName: '!bg-red-500',
      icon: false,
    },
  );
};

export const notifyWarning = (msg: string) => {
  toast.error(
    <div className="flex items-start gap-3">
      <AlertTriangle className="text-yellow-500 mt-1" size={20} />
      <div>
        <p className="font-semibold text-sm text-gray-900">{msg}</p>
        <p className="text-xs text-gray-500 mt-1">Vui lòng thử lại sau!</p>
      </div>
    </div>,
    {
      className: '!bg-white !text-gray-800 !rounded-xl !shadow-lg !border !border-gray-200',
      progressClassName: '!bg-yellow-500',
      icon: false,
    },
  );
};
