import { X, Download, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Member } from '@/types';

interface QRCodeModalProps {
    member: Member;
    onClose: () => void;
}

export default function QRCodeModal({ member, onClose }: QRCodeModalProps) {
    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const svg = document.getElementById('member-qr-code');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');

            const downloadLink = document.createElement('a');
            downloadLink.download = `${member.fullName.replace(/\s+/g, '-')}-QR.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-50">Member QR Code</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-50 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Member Info */}
                <div className="text-center mb-6">
                    <p className="text-2xl font-bold text-slate-50 mb-1">{member.fullName}</p>
                    <p className="text-slate-300">{member.phoneNumber}</p>
                </div>

                {/* QR Code */}
                <div className="bg-white p-6 rounded-xl flex items-center justify-center mb-6">
                    <QRCodeSVG
                        id="member-qr-code"
                        value={member.qrCodeToken}
                        size={256}
                        level="H"
                        includeMargin
                    />
                </div>

                <div className="text-center mb-6">
                    <p className="text-sm text-slate-400">Token: {member.qrCodeToken}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                    <button
                        onClick={handlePrint}
                        className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                    >
                        <Printer className="h-4 w-4" />
                        <span>Print</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="btn-primary flex-1 flex items-center justify-center space-x-2"
                    >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
